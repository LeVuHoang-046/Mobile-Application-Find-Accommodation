const { connection } = require('../configs/connectDB');  // Adjust the path as needed

// Register function to check if user exists and add if not
const register = (req, res) => {
    const { full_name, phone } = req.body;

    // First, check if the user already exists by phone number
    const sqlCheck = "SELECT * FROM users WHERE phone = ?";
    connection.query(sqlCheck, [phone], (err, results) => {
        if (err) {
            console.error("Error checking user existence:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            // User already exists
            return res.status(400).json({ message: "User already registered" });
        } else {
            // Insert the new user into the database
            const sqlInsert = "INSERT INTO users (full_name, phone) VALUES (?, ?)";
            connection.query(sqlInsert, [full_name, phone], (err, results) => {
                if (err) {
                    console.error("Error inserting new user:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                // Respond with success message
                return res.status(201).json({ message: "User registered successfully" });
            });
        }
    });
};

module.exports = { register };
