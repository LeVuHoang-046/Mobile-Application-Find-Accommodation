
const asyncHandle = require('express-async-handler');
const { connection } = require('../../configs/connectDB');

// Controller to create a new booking
const createBooking = asyncHandle(async (req, res) => {
    console.log('Received booking data:', req.body); // Log the received data

    const {
        booking_date,
        room_id,
        status,
        boarding_house_id,
        user_id,

    } = req.body;

    // Convert booking_date from ISO string to MySQL DATETIME format (YYYY-MM-DD HH:mm:ss)
    const bookingDateUTC = new Date(booking_date); // Create a Date object from the ISO string
    const formattedBookingDate = bookingDateUTC.toISOString().slice(0, 19).replace('T', ' '); // Format to YYYY-MM-DD HH:mm:ss

    const sqlQuery = `
        INSERT INTO bookings (boarding_house_id, user_id, booking_date, room_id, status)
        VALUES (?, ?, ?, ?, ?);
    `;

    connection.query(
        sqlQuery,
        [
            boarding_house_id,
            user_id,
            formattedBookingDate, // Use the formatted date here
            room_id,
            status,
        ],
        (err, result) => {
            if (err) {
                console.error('Error creating booking:', err); // Log the error message
                return res.status(500).json({ error: 'Database error' });
            }
            console.log('Booking created successfully');

            res.status(200).json({
                success: true,
                message: 'Booking created successfully',
                bookingId: result.insertId,
            });
        }
    );
});
  

// Controller to get all bookings with optional status filter
const getBookings = asyncHandle(async (req, res) => {
    const { status } = req.query; // Extract status from query parameters
    let sqlQuery = `
        SELECT 
            b.*, 
            u.full_name AS customer_name, 
            u.phone AS phone_number,
            bh.title AS boarding_house_title
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN boarding_house bh ON b.boarding_house_id = bh.id`;
    const params = [];

    // If a status is provided, filter bookings by that status
    if (status) {
        sqlQuery += ' WHERE status = ?';
        params.push(status);
    }

    connection.query(sqlQuery, params, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            success: true,
            data: results,
        });
    });
});


// Controller to get a booking by ID
const getBookingById = asyncHandle(async (req, res) => {
    const { id } = req.params;

    const sqlQuery = `SELECT * FROM bookings WHERE id = ?;`;

    connection.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching booking by ID:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({
            success: true,
            data: results[0],
        });
    });
});

// src/controllers/booking/bookingController.js

// Controller to get bookings by user ID
const getBookingByUserId = asyncHandle(async (req, res) => {
    const { user_id } = req.query;
    console.log('Received request to get bookings by user ID:', user_id); // Log the request

    // Ensure user_id is a valid integer
    if (!user_id || isNaN(user_id)) {
        return res.status(400).json({ success: false, message: "Valid User ID is required" });
    }

    // Log parsed user_id
    const parsedUserId = parseInt(user_id);
    console.log('Parsed User ID:', parsedUserId);

    const sqlQuery = `
        SELECT 
            b.*, 
            u.full_name AS customer_name, 
            u.phone AS phone_number,
            bh.title AS boarding_house_title
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        JOIN boarding_house bh ON b.boarding_house_id = bh.id
        WHERE b.user_id = ?;
    `;
    console.log("Executing SQL Query:", sqlQuery, [parsedUserId]);

    connection.query(sqlQuery, [parsedUserId], (err, results) => {
        if (err) {
            console.error("Error fetching bookings:", err);
            return res.status(500).json({ success: false, error: "Database error" });
        }

        console.log("Query results:", results); // Log the results from the query

        if (results.length > 0) {
            const bookings = results.map((booking) => ({
                booking_id: booking.id,
                boarding_house_id: booking.boarding_house_id,
                user_id: booking.user_id,
                customer_name: booking.customer_name,
                phone_number: booking.phone_number,
                booking_date: booking.booking_date,
                // room_id: booking.room_id,
                status: booking.status,
                boarding_house_title: booking.boarding_house_title,
            }));

            return res.status(200).json({
                success: true,
                data: bookings,
            });
        } else {
            console.log('No bookings found for user ID:', parsedUserId); // Log if no bookings are found
            return res.status(404).json({ success: false, message: "No bookings found for this user" });
        }
    });
});

// Controller to cancel a booking by ID
const cancelBookingById = asyncHandle(async (req, res) => {
    const { id } = req.params;

    // Assuming status '5' is the status for canceled bookings
    const newStatus = 5;

    // Update the status instead of deleting
    const sqlQuery = `UPDATE bookings SET status = ? WHERE id = ?;`;

    connection.query(sqlQuery, [newStatus, id], (err, result) => {
        if (err) {
            console.error('Error cancelling booking:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Booking canceled successfully',
        });
    });
});

const changeStatusBooking = asyncHandle(async (req, res) => {
    console.log('Received request to change booking status:', req.params.id, req.body);
    const { status } = req.body; // The new status should be passed in the request body

    const sqlQuery = `UPDATE bookings SET status = ? WHERE id = ?;`;

    connection.query(sqlQuery, [status, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating booking status:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({
            message: 'Booking status updated successfully',
        });
    });
});






module.exports = {
    createBooking,
    getBookings,
    getBookingById,
    getBookingByUserId,
    cancelBookingById,
    changeStatusBooking,
};

