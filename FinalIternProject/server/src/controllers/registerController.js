const { connection } = require("../configs/connectDB");
const asyncHandle = require('express-async-handler');

// Register function to check if user exists and add if not
const register = asyncHandle(async (req, res) => {
    const { name, phoneNumber } = req.body;

    console.log(req.body)
    if (!name || name.trim() === '') {
        return res.status(400).json({ message: "Full name is required" });
    }

    // First, check if the user already exists by phone number
    const sqlCheck = "SELECT * FROM users WHERE phone = ?";
    connection.query(sqlCheck, [phoneNumber], (err, results) => {
        if (err) {
            console.error("Error checking user existence:", err);
            return res.status(500).json({ error: "Database error" });
        }
        console.log({results})

        if (results.length > 0) {
            // User already exists
            return res.status(400).json({ message: "User already registered" });
        } else {
            // Insert the new user into the database
            const sqlInsert = "INSERT INTO users (full_name, phone) VALUES (?, ?)";
            connection.query(sqlInsert, [name, phoneNumber], (err, results) => {
                if (err) {
                    console.error("Error inserting new user:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                // Respond with success message
                return res.status(200).json({ message: "User registered successfully" });
            });
        }
    });
});

const login = asyncHandle(async (req, res) => {
    const { phoneNumber } = req.body;

    console.log(req.body);
        // Check if phone number is provided
    if (!phoneNumber) {
        return res.status(400).json({ error: "Phone number is required" });
    }

    // Check if the phone number exists in the database
    const sqlCheck = "SELECT * FROM users WHERE phone = ?";
    connection.query(sqlCheck, [phoneNumber], (err, results) => {
        if (err) {
            console.error("Error checking user existence:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            // User exists, login successful
            return res.status(200).json({ message: "Login successful", user: results[0] });
        } else {
            // User does not exist
            return res.status(400).json({ error: "Phone number not registered" });
        }
    });
});

module.exports = { register, login };
