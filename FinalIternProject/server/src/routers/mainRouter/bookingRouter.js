// src/routers/mainRouter/bookingRouter.js
const express = require('express');
const { createBooking, getBookings, getBookingById, getBookingByUserId, cancelBookingById, changeStatusBooking } = require('../../controllers/booking/bookingController');

const bookingRouter = express.Router();

// Route to create a new booking
bookingRouter.post('/bookings', createBooking);

// Route to fetch all bookings
bookingRouter.get('/bookings', getBookings);



bookingRouter.get('/bookings/user', getBookingByUserId); 
bookingRouter.get('/bookings/:id', getBookingById);
bookingRouter.patch('/bookings/:id/cancel', cancelBookingById);
bookingRouter.put('/bookings/:id/status', changeStatusBooking);

module.exports = bookingRouter;
