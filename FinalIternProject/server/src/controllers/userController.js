const { connection } = require("../configs/connectDB");
const asyncHandle = require('express-async-handler');

const getUsersByRole = asyncHandle(async (req, res) => {
    // Get the roles from the query parameters
    const { roles } = req.query;

    if (!roles) {
        return res.status(400).json({ error: "Roles are required" });
    }

    // Split the roles into an array
    const roleArray = roles.split(',').map(role => role.trim());

    // Create a placeholder for the query
    const placeholders = roleArray.map(() => '?').join(',');
    const sqlQuery = `SELECT * FROM users WHERE role IN (${placeholders})`;

    connection.query(sqlQuery, roleArray, (err, results) => {
        if (err) {
            console.error("Error fetching users by roles:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            // Transform the results to match the desired format
            const formattedUsers = results.map(user => ({
                user_id: user.id,            // Map 'id' to 'user_id'
                fullName: user.full_name,    // Map 'full_name' to 'fullName'
                phone: user.phone,
                email: user.email,
                role: user.role,
            }));

            // Return the formatted response
            return res.status(200).json({
                success: true,
                data: formattedUsers,
            });
        } else {
            return res.status(404).json({ message: `No users found with roles: ${roles}` });
        }
    });
});

module.exports = { getUsersByRole };