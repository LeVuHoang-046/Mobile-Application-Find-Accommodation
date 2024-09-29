const express = require('express');
const { getFacilities, getInteriors } = require('../../controllers/filter/filterController');
const filterRouter = express.Router();

filterRouter.get('/filter/facilities', getFacilities);
filterRouter.get('/filter/interiors', getInteriors)

module.exports = filterRouter;
