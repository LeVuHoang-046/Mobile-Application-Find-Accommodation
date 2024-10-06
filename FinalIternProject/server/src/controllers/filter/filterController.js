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

module.exports = {
    getFacilities,
    getInteriors
};
