const express = require('express');
const multer = require('multer');
const path = require('path');
const { getBoardingHouses, getBoardingHouseById, getRoomById, getRoomsByBoardingHouseId, getRoomFacilitiesByRoomId, getRoomInteriorsByRoomId, getRoomImagesByRoomId, createBoardingHouse, createRoom, updateRoomStatus, deleteRoomById, getRoomDetails, getRoomByIdDetails, updateRoomById } = require('../../controllers/boardingHouse/boardingHouseController');

const boardingHouseRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      // Generate a unique filename using original name and timestamp
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      // Accept only certain file types (e.g., images)
      const fileTypes = /jpeg|jpg|png|gif/;
      const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimeType = fileTypes.test(file.mimetype);
  
      if (extName && mimeType) {
        cb(null, true);
      } else {
        cb('Error: Images Only!');
      }
    },
  });
// Route to fetch all boarding houses
boardingHouseRouter.get('/boarding-house/info', getBoardingHouses);
boardingHouseRouter.get('/boarding-house/info/:id', getBoardingHouseById);
boardingHouseRouter.get('/boarding-house/:id/rooms', getRoomsByBoardingHouseId);
boardingHouseRouter.get('/boarding-house/rooms/:roomId', getRoomById);
boardingHouseRouter.get('/boarding-house/rooms/:roomId/facilities', getRoomFacilitiesByRoomId);
boardingHouseRouter.get('/boarding-house/rooms/:roomId/interiors', getRoomInteriorsByRoomId);
boardingHouseRouter.get('/boarding-house/rooms/:roomId/images', getRoomImagesByRoomId);
boardingHouseRouter.get('/boarding-house/room/:roomId/details', getRoomByIdDetails);
boardingHouseRouter.post('/boarding-house', createBoardingHouse);
boardingHouseRouter.post('/rooms', upload.array('images[]'), createRoom);
boardingHouseRouter.put('/rooms/:roomId/status', updateRoomStatus);
boardingHouseRouter.delete('/boarding-house/rooms/:roomId', deleteRoomById);
boardingHouseRouter.put('/rooms/:roomId', upload.array('images[]'), updateRoomById);

module.exports = boardingHouseRouter;
