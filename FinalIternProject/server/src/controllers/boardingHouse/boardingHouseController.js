
const asyncHandle = require('express-async-handler');
const { connection } = require('../../configs/connectDB');

// Controller to get all boarding houses
// Controller to get all boarding houses
const getBoardingHouses = asyncHandle(async (req, res) => {
    const sqlQuery = `
        SELECT 
            bh.id,
            bh.description,
            bh.detail_address,
            bh.email,
            bh.name_building,
            bh.parking_space,
            bh.staff_phone,
            bh.title,
            bh.type_house,
            c.name AS city_name,
            d.name AS district_name,
            w.name AS ward_name
        FROM 
            boarding_house bh
        JOIN 
            cities c ON bh.city_id = c.id
        JOIN 
            districts d ON bh.district_id = d.id
        JOIN 
            wards w ON bh.ward_id = w.id;
    `;

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching boarding houses:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        const formattedResults = results.map(result => ({
            ...result,
            ward_name: `Ward ${result.ward_name}`,
            district_name: `District ${result.district_name}`,
            city_name: `City ${result.city_name}`
        }));

        // Send the formatted results as a JSON response
        res.status(200).json({
            success: true,
            data: formattedResults,
        });
    });
});

const getBoardingHouseById = asyncHandle(async (req, res) => {
    const { id } = req.params;
    
    const sqlQuery = `
        SELECT 
            bh.id,
            bh.description,
            bh.detail_address,
            bh.email,
            bh.name_building,
            bh.parking_space,
            bh.staff_phone,
            bh.title,
            bh.type_house,
            c.name AS city_name,
            d.name AS district_name,
            w.name AS ward_name
        FROM 
            boarding_house bh
        JOIN 
            cities c ON bh.city_id = c.id
        JOIN 
            districts d ON bh.district_id = d.id
        JOIN 
            wards w ON bh.ward_id = w.id
        WHERE bh.id = ?;
    `;

    connection.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching boarding house by ID:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Boarding house not found' });
        }

        const result = results[0];

        // Send the result as a JSON response
        res.status(200).json({
            success: true,
            data: {
                ...result,
                ward_name: `Ward ${result.ward_name}`,
                district_name: `District ${result.district_name}`,
                city_name: `City ${result.city_name}`
            }
        });
    });
});

const getRoomsByBoardingHouseId = asyncHandle(async (req, res) => {
    const { id } = req.params; // Boarding house ID

    const sqlQuery = `
        SELECT 
            r.id, 
            r.name, 
            r.price, 
            r.area, 
            r.deposit,
            r.floor, 
            r.capacity, 
            r.gender 
        FROM 
            rooms r
        WHERE 
            r.boarding_house_id = ?;
    `;

    connection.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching rooms:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No rooms found for this boarding house' });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
});


const getRoomById = asyncHandle(async (req, res) => {
    const { roomId } = req.params; // Room ID from the route

    const sqlQuery = `
        SELECT 
            r.id, 
            r.name, 
            r.price, 
            r.area, 
            r.deposit,
            r.floor, 
            r.capacity, 
            r.gender
        FROM 
            rooms r
        JOIN 
            boarding_house bh ON r.boarding_house_id = bh.id
        WHERE 
            r.id = ?;
    `;

    connection.query(sqlQuery, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching room by ID:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        const room = results[0];

        // Send the room details as a JSON response
        res.status(200).json({
            success: true,
            data: room,
        });
    });
});

// Existing controllers...

const getRoomFacilitiesByRoomId = asyncHandle(async (req, res) => {
    const { roomId } = req.params;

    const sqlQuery = `
        SELECT 
            f.id, 
            f.name, 
            f.icon
        FROM 
            room_facilities rf
        JOIN 
            facilities f ON rf.facility_id = f.id
        WHERE 
            rf.room_id = ?;
    `;

    connection.query(sqlQuery, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching facilities for room:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No facilities found for this room' });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
});

const getRoomInteriorsByRoomId = asyncHandle(async (req, res) => {
    const { roomId } = req.params;

    const sqlQuery = `
        SELECT 
            i.id, 
            i.name, 
            i.icon
        FROM 
            room_interiors rf
        JOIN 
            interiors i ON rf.interior_id = i.id
        WHERE 
            rf.room_id = ?;
    `;

    connection.query(sqlQuery, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching interiors for room:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No interiors found for this room' });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
});

const getRoomImagesByRoomId = asyncHandle(async (req, res) => {
    const { roomId } = req.params;

    const sqlQuery = `
        SELECT 
            id, 
            image_url
        FROM 
            room_images
        WHERE 
            room_id = ?;
    `;

    connection.query(sqlQuery, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching room images:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No images found for this room' });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
});


module.exports = { 
    getBoardingHouses, 
    getBoardingHouseById, 
    getRoomsByBoardingHouseId, 
    getRoomById, 
    getRoomFacilitiesByRoomId,
    getRoomInteriorsByRoomId,
    getRoomImagesByRoomId,
};



