const express = require('express');
const { getBoardingHouses, getBoardingHouseById, getRoomById, getRoomsByBoardingHouseId, getRoomFacilitiesByRoomId, getRoomInteriorsByRoomId, getRoomImagesByRoomId } = require('../../controllers/boardingHouse/boardingHouseController');

const boardingHouseRouter = express.Router();

// Route to fetch all boarding houses
boardingHouseRouter.get('/boarding-house/info', getBoardingHouses);
boardingHouseRouter.get('/boarding-house/info/:id', getBoardingHouseById);
boardingHouseRouter.get('/boarding-house/:id/rooms', getRoomsByBoardingHouseId);
boardingHouseRouter.get('/boarding-house/rooms/:roomId', getRoomById);
boardingHouseRouter.get('/boarding-house/rooms/:roomId/facilities', getRoomFacilitiesByRoomId);
boardingHouseRouter.get('/boarding-house/rooms/:roomId/interiors', getRoomInteriorsByRoomId);
boardingHouseRouter.get('/boarding-house/rooms/:roomId/images', getRoomImagesByRoomId);

module.exports = boardingHouseRouter;
