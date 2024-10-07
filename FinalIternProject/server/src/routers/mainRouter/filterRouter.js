const express = require('express');
const { getFacilities, getInteriors, getCities, getDistrictsByCity, getWardsByDistrict } = require('../../controllers/filter/filterController');
const filterRouter = express.Router();

filterRouter.get('/filter/facilities', getFacilities);
filterRouter.get('/filter/interiors', getInteriors)
filterRouter.get('/filter/cities', getCities);
filterRouter.get('/filter/districts/:city_id', getDistrictsByCity);
filterRouter.get('/filter/wards/:district_id', getWardsByDistrict);

module.exports = filterRouter;
