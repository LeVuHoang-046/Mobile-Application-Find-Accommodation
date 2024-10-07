const asyncHandle = require('express-async-handler');
const { connection } = require('../../configs/connectDB');

// Controller to get all facilities
const getFacilities = asyncHandle(async (req, res) => {
    const sqlQuery = `
        SELECT 
            id, 
            name, 
            icon
        FROM 
            facilities;
    `;

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching facilities:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Send the results as a JSON response
        res.status(200).json({
            success: true,
            data: results,
        });
    });
});

const getInteriors = asyncHandle(async (req, res) => {
    const sqlQuery = `
        SELECT 
            id, 
            name, 
            icon
        FROM 
            interiors;
    `;

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching interiors:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Send the results as a JSON response
        res.status(200).json({
            success: true,
            data: results,
        });
    });
});



const getCities = asyncHandle(async (req, res) => {
    const sqlQuery = 'SELECT id, name FROM cities';
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({
            success: true,
            data: results,
        });
    });
});

// Get districts based on city_id
const getDistrictsByCity = asyncHandle(async (req, res) => {
    const { city_id } = req.params;
    const sqlQuery = 'SELECT id, name FROM districts WHERE city_id = ?';
    connection.query(sqlQuery, [city_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({
            success: true,
            data: results,
        });
    });
});

// Get wards based on district_id
const getWardsByDistrict = asyncHandle(async (req, res) => {
    const { district_id } = req.params;
    const sqlQuery = 'SELECT id, name FROM wards WHERE district_id = ?';
    connection.query(sqlQuery, [district_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({
            success: true,
            data: results,
        });
    });
});



module.exports = {
    getFacilities,
    getInteriors,
    getCities,
    getDistrictsByCity,
    getWardsByDistrict
};
