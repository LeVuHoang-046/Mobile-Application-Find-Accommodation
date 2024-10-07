
const asyncHandle = require('express-async-handler');
const { connection } = require('../../configs/connectDB');

// Controller to get all boarding houses
// Controller to get all boarding houses
const getBoardingHouses = asyncHandle(async (req, res) => {
    const sqlQuery = `
        SELECT 
            bh.id,
            bh.description,
            bh.detail_address,
            bh.staff_id,
            bh.name_building,
            bh.parking_space,
            bh.title,
            bh.type_house,
            c.name AS city_name,
            d.name AS district_name,
            w.name AS ward_name,
            u.full_name AS staff_name,    
            u.email AS email,
            u.phone AS staff_phone  
        FROM 
            boarding_house bh
        JOIN 
            cities c ON bh.city_id = c.id
        JOIN 
            districts d ON bh.district_id = d.id
        JOIN 
            wards w ON bh.ward_id = w.id
        JOIN 
            users u ON bh.staff_id = u.id;   -- Joining users table based on staff_id
    `;

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error fetching boarding houses:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        const formattedResults = results.map(result => ({
            ...result,
            ward_name: `Ward ${result.ward_name}`,
            district_name: `District ${result.district_name}`,
            city_name: `City ${result.city_name}`,
            // staff: {
            //     id: result.staff_id,
            //     name: result.staff_name,
            //     email: result.staff_email,
            //     phone: result.staff_phone,
            // }
        }));

        // Send the formatted results as a JSON response
        res.status(200).json({
            success: true,
            data: formattedResults,
        });
    });
});


const getBoardingHouseById = asyncHandle(async (req, res) => {
    const { id } = req.params;
    
    const sqlQuery = `
        SELECT 
            bh.id,
            bh.description,
            bh.detail_address,
            bh.staff_id,
            bh.name_building,
            bh.parking_space,
            bh.title,
            bh.type_house,
            c.name AS city_name,
            d.name AS district_name,
            w.name AS ward_name,
            u.full_name AS staff_name,    
            u.email AS email,
            u.phone AS staff_phone 
        FROM 
            boarding_house bh
        JOIN 
            cities c ON bh.city_id = c.id
        JOIN 
            districts d ON bh.district_id = d.id
        JOIN 
            wards w ON bh.ward_id = w.id
        JOIN 
            users u ON bh.staff_id = u.id
        WHERE bh.id = ?;
    `;

    connection.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching boarding house by ID:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Boarding house not found' });
        }

        const result = results[0];

        // Send the result as a JSON response
        res.status(200).json({
            success: true,
            data: {
                ...result,
                ward_name: `Ward ${result.ward_name}`,
                district_name: `District ${result.district_name}`,
                city_name: `City ${result.city_name}`
            }
        });
    });
});

const getRoomsByBoardingHouseId = asyncHandle(async (req, res) => {
    const { id } = req.params; // Boarding house ID

    const sqlQuery = `
        SELECT 
            r.id, 
            r.name, 
            r.price, 
            r.area, 
            r.deposit,
            r.floor, 
            r.capacity, 
            r.gender,
            r.status
        FROM 
            rooms r
        WHERE 
            r.boarding_house_id = ?;
    `;

    connection.query(sqlQuery, [id], (err, results) => {
        if (err) {
            console.error('Error fetching rooms:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No rooms found for this boarding house' });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
});


const getRoomById = asyncHandle(async (req, res) => {
    const { roomId } = req.params; // Room ID from the route

    const sqlQuery = `
        SELECT 
            r.id, 
            r.name, 
            r.price, 
            r.area, 
            r.deposit,
            r.floor, 
            r.capacity, 
            r.gender,
            r.status
        FROM 
            rooms r
        JOIN 
            boarding_house bh ON r.boarding_house_id = bh.id
        WHERE 
            r.id = ?;
    `;

    connection.query(sqlQuery, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching room by ID:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        const room = results[0];

        // Send the room details as a JSON response
        res.status(200).json({
            success: true,
            data: room,
        });
    });
});

const updateRoomStatus = asyncHandle(async (req, res) => {
    const { roomId } = req.params; // Get room ID from route
    const { status } = req.body; // Get new status from request body
  
    const sqlQuery = `
      UPDATE rooms
      SET status = ?
      WHERE id = ?;
    `;
  
    connection.query(sqlQuery, [status, roomId], (err, results) => {
      if (err) {
        console.error('Error updating room status:', err);
        return res.status(500).json({ error: 'Database error while updating room status' });
      }
  
      // Check if any row was updated
      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
  
      res.status(200).json({ success: true, message: 'Room status updated successfully' });
    });
  });

  const getRoomByIdDetails = asyncHandle(async (req, res) => {
    const { roomId } = req.params; // Room ID from the route

    // Query to fetch room details
    const roomDetailsQuery = `
        SELECT 
            r.id, 
            r.name, 
            r.price, 
            r.area, 
            r.deposit,
            r.floor, 
            r.capacity, 
            r.gender,
            r.status
        FROM 
            rooms r
        WHERE 
            r.id = ?;
    `;

    // Query to fetch room facilities
    const facilitiesQuery = `
        SELECT 
            f.id, 
            f.name, 
            f.icon 
        FROM 
            room_facilities rf
        JOIN 
            facilities f ON rf.facility_id = f.id
        WHERE 
            rf.room_id = ?;
    `;

    // Query to fetch room interiors
    const interiorsQuery = `
        SELECT 
            i.id, 
            i.name, 
            i.icon 
        FROM 
            room_interiors ri
        JOIN 
            interiors i ON ri.interior_id = i.id
        WHERE 
            ri.room_id = ?;
    `;

    // Query to fetch room images
    const imagesQuery = `
        SELECT 
            image_url 
        FROM 
            room_images
        WHERE 
            room_id = ?;
    `;

    try {
        // Fetch room details first
        connection.query(roomDetailsQuery, [roomId], (err, roomResults) => {
            if (err) {
                console.error('Error fetching room by ID:', err);
                return res.status(500).json({ error: 'Database error' });
            }

            // Check if room exists
            if (roomResults.length === 0) {
                return res.status(404).json({ success: false, message: 'Room not found' });
            }

            // Store the room details
            const room = roomResults[0];

            // Fetch room facilities
            connection.query(facilitiesQuery, [roomId], (err, facilityResults) => {
                if (err) {
                    console.error('Error fetching room facilities:', err);
                    return res.status(500).json({ error: 'Database error' });
                }

                // Fetch room interiors
                connection.query(interiorsQuery, [roomId], (err, interiorResults) => {
                    if (err) {
                        console.error('Error fetching room interiors:', err);
                        return res.status(500).json({ error: 'Database error' });
                    }

                    // Fetch room images
                    connection.query(imagesQuery, [roomId], (err, imageResults) => {
                        if (err) {
                            console.error('Error fetching room images:', err);
                            return res.status(500).json({ error: 'Database error' });
                        }

                        // Combine all data into a single response
                        const roomDetails = {
                            ...room, // Merge room details here
                            facilities: facilityResults || [], // Ensure this is an array
                            interiors: interiorResults || [], // Ensure this is an array
                            images: imageResults.map(img => ({ path: img.image_url })) || [], // Ensure this is an array
                        };

                        // Send the combined room details as a JSON response
                        res.status(200).json({
                            success: true,
                            data: roomDetails,
                        });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        return res.status(500).json({ error: 'Unexpected server error' });
    }
});



  const deleteRoomById = asyncHandle(async (req, res) => {
    const { roomId } = req.params; // Get room ID from route
  
    const sqlQuery = `
      DELETE FROM rooms
      WHERE id = ?;
    `;
  
    connection.query(sqlQuery, [roomId], (err, results) => {
      if (err) {
        console.error('Error deleting room:', err);
        return res.status(500).json({ error: 'Database error while deleting room' });
      }
  
      // Check if any row was deleted
      if (results.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
  
      res.status(200).json({ success: true, message: 'Room deleted successfully' });
    });
  });
  
  
 
  
  

const getRoomFacilitiesByRoomId = asyncHandle(async (req, res) => {
    const { roomId } = req.params;

    const sqlQuery = `
        SELECT 
            f.id, 
            f.name, 
            f.icon
        FROM 
            room_facilities rf
        JOIN 
            facilities f ON rf.facility_id = f.id
        WHERE 
            rf.room_id = ?;
    `;

    connection.query(sqlQuery, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching facilities for room:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No facilities found for this room' });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
});

const getRoomInteriorsByRoomId = asyncHandle(async (req, res) => {
    const { roomId } = req.params;

    const sqlQuery = `
        SELECT 
            i.id, 
            i.name, 
            i.icon
        FROM 
            room_interiors rf
        JOIN 
            interiors i ON rf.interior_id = i.id
        WHERE 
            rf.room_id = ?;
    `;

    connection.query(sqlQuery, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching interiors for room:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No interiors found for this room' });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
});

const getRoomImagesByRoomId = asyncHandle(async (req, res) => {
    const { roomId } = req.params;

    const sqlQuery = `
        SELECT 
            id, 
            image_url
        FROM 
            room_images
        WHERE 
            room_id = ?;
    `;

    connection.query(sqlQuery, [roomId], (err, results) => {
        if (err) {
            console.error('Error fetching room images:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: 'No images found for this room' });
        }

        res.status(200).json({
            success: true,
            data: results
        });
    });
});


const createBoardingHouse = asyncHandle(async (req, res) => {
    console.log('Received request to create boarding house:', req.body); 
    const {
        description,
        detail_address,
        staff_id,
        name_building,
        parking_space,
        title,
        type_house,
        city_id,
        district_id,
        ward_id,
    } = req.body;
    console.log('Received data:', req.body);
    // Validate input data (you can enhance this with more validation)
    // if (!description || !detail_address || !staff_name || !email || !name_building || !type_house) {
    //     return res.status(400).json({ success: false, message: 'All fields are required.' });
    // }

    const sqlQuery = `
        INSERT INTO boarding_house (
            description,
            detail_address,
            staff_id,
            name_building,
            parking_space,
            title,
            type_house,
            city_id,
            district_id,
            ward_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const values = [
        description,
        detail_address,
        staff_id,
        name_building,
        parking_space,
        title,
        type_house,
        city_id,
        district_id,
        ward_id,
    ];

    connection.query(sqlQuery, values, (err, results) => {
        if (err) {
            console.error('Error creating boarding house:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({
            success: true,
            message: 'Boarding house created successfully',
            data: {
                id: results.insertId, // return the ID of the new boarding house
                ...req.body,
            },
        });
    });
});


// Controller to create a new room
// const createRoom = asyncHandle(async (req, res) => {
//     const { name, price, area, deposit, floor, capacity, gender, boarding_house_id, facilities, images, interiors } = req.body;

//     // Insert room into rooms table
//     const insertRoomQuery = `
//         INSERT INTO rooms (name, price, area, deposit, floor, capacity, gender, boarding_house_id, status)
//         VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//     connection.query(
//         insertRoomQuery, 
//         [name, price, area, deposit, floor, capacity, gender, boarding_house_id, 0],
//         (err, results) => {
//             if (err) {
//                 console.error('Error creating room:', JSON.stringify(err)); // More detailed error logging
//                 return res.status(500).json({ error: 'Database error while creating room' });
//             }

//             const roomId = results.insertId;

//             // Prepare promises to insert facilities, images, and interiors
//             const facilityQueries = facilities?.map(facility_id => {
//                 return new Promise((resolve, reject) => {
//                     const insertFacilityQuery = 'INSERT INTO room_facilities (room_id, facility_id) VALUES (?, ?)';
//                     connection.query(insertFacilityQuery, [roomId, facility_id], (err) => {
//                         if (err) {
//                             console.error('Error inserting facility:', JSON.stringify(err)); // More detailed error logging
//                             return reject(err);
//                         }
//                         resolve();
//                     });
//                 });
//             }) || [];

//             const imageQueries = images?.map(image_url => {
//                 return new Promise((resolve, reject) => {
//                     const insertImageQuery = 'INSERT INTO room_images (room_id, image_url) VALUES (?, ?)';
//                     connection.query(insertImageQuery, [roomId, image_url], (err) => {
//                         if (err) {
//                             console.error('Error inserting image:', JSON.stringify(err)); // More detailed error logging
//                             return reject(err);
//                         }
//                         resolve();
//                     });
//                 });
//             }) || [];

//             const interiorQueries = interiors?.map(interior_id => {
//                 return new Promise((resolve, reject) => {
//                     const insertInteriorQuery = 'INSERT INTO room_interiors (room_id, interior_id) VALUES (?, ?)';
//                     connection.query(insertInteriorQuery, [roomId, interior_id], (err) => {
//                         if (err) {
//                             console.error('Error inserting interior:', JSON.stringify(err)); // More detailed error logging
//                             return reject(err);
//                         }
//                         resolve();
//                     });
//                 });
//             }) || [];

//             // Wait for all queries (facilities, images, interiors) to complete
//             Promise.all([...facilityQueries, ...imageQueries, ...interiorQueries])
//                 .then(() => {
//                     res.status(200).json({ success: true, roomId });
//                 })
//                 .catch(err => {
//                     console.error('Error adding room details:', JSON.stringify(err)); // More detailed error logging
//                     res.status(500).json({ error: 'Database error when adding room details' });
//                 });
//         }
//     );
// });

const createRoom = asyncHandle(async (req, res) => {
    const { 
        name, 
        price, 
        area, 
        deposit, 
        floor, 
        capacity, 
        gender, 
        boarding_house_id, 
        facilities, 
        interiors 
    } = req.body;
    
    // Get the uploaded file paths
    const images = req.files.map(file => file.path); 

    // Insert room into rooms table
    const insertRoomQuery = `
        INSERT INTO rooms (name, price, area, deposit, floor, capacity, gender, boarding_house_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        insertRoomQuery, 
        [name, price, area, deposit, floor, capacity, gender, boarding_house_id],
        (err, results) => {
            if (err) {
                console.error('Error creating room:', JSON.stringify(err)); // More detailed error logging
                return res.status(500).json({ error: 'Database error while creating room' });
            }

            const roomId = results.insertId;

            // Prepare promises to insert facilities, images, and interiors
            const facilityQueries = (facilities || []).map(facility_id => {
                return new Promise((resolve, reject) => {
                    const insertFacilityQuery = 'INSERT INTO room_facilities (room_id, facility_id) VALUES (?, ?)';
                    connection.query(insertFacilityQuery, [roomId, facility_id], (err) => {
                        if (err) {
                            console.error('Error inserting facility:', JSON.stringify(err)); // More detailed error logging
                            return reject(err);
                        }
                        resolve();
                    });
                });
            });

            const imageQueries = (images || []).map(image_url => {
                return new Promise((resolve, reject) => {
                    const insertImageQuery = 'INSERT INTO room_images (room_id, image_url) VALUES (?, ?)';
                    connection.query(insertImageQuery, [roomId, image_url], (err) => {
                        if (err) {
                            console.error('Error inserting image:', JSON.stringify(err)); // More detailed error logging
                            return reject(err);
                        }
                        resolve();
                    });
                });
            });

            const interiorQueries = (interiors || []).map(interior_id => {
                return new Promise((resolve, reject) => {
                    const insertInteriorQuery = 'INSERT INTO room_interiors (room_id, interior_id) VALUES (?, ?)';
                    connection.query(insertInteriorQuery, [roomId, interior_id], (err) => {
                        if (err) {
                            console.error('Error inserting interior:', JSON.stringify(err)); // More detailed error logging
                            return reject(err);
                        }
                        resolve();
                    });
                });
            });

            // Wait for all queries (facilities, images, interiors) to complete
            Promise.all([...facilityQueries, ...imageQueries, ...interiorQueries])
                .then(() => {
                    res.status(200).json({ success: true, roomId });
                })
                .catch(err => {
                    console.error('Error adding room details:', JSON.stringify(err)); // More detailed error logging
                    res.status(500).json({ error: 'Database error when adding room details' });
                });
        }
    );
});

const updateRoomById = asyncHandle(async (req, res) => {
    const { roomId } = req.params;
    const { name, price, area, deposit, floor, capacity, gender, facilities, interiors } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];
    console.log('Request data:', { roomId, name, price, area, deposit, floor, capacity, gender, facilities, interiors, images });
 

    // Update room main details
    const updateRoomQuery = `
        UPDATE rooms
        SET name = ?, price = ?, area = ?, deposit = ?, floor = ?, capacity = ?, gender = ?
        WHERE id = ?;
    `;

    connection.query(
        updateRoomQuery,
        [name, price, area, deposit, floor, capacity, gender, roomId],
        (err, results) => {
            if (err) {
                console.error('Error updating room:', err);
                return res.status(500).json({ error: 'Database error while updating room' });
            }

            // Check if any row was updated
            if (results.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Room not found' });
            }

            // Handle facilities, interiors, and images only if provided
            if (facilities && facilities.length > 0) {
                // Delete old facilities and add new ones
                connection.query(`DELETE FROM room_facilities WHERE room_id = ?`, [roomId], (err) => {
                    if (err) {
                        console.error('Error deleting old facilities:', err);
                    } else {
                        // Add new facilities
                        const facilityQueries = facilities.map(facility_id => new Promise((resolve, reject) => {
                            const insertFacilityQuery = 'INSERT INTO room_facilities (room_id, facility_id) VALUES (?, ?)';
                            connection.query(insertFacilityQuery, [roomId, facility_id], (err) => {
                                if (err) return reject(err);
                                resolve();
                            });
                        }));
                        Promise.all(facilityQueries).catch(err => console.error('Error inserting facilities:', err));
                    }
                });
            }

            if (interiors && interiors.length > 0) {
                // Delete old interiors and add new ones
                connection.query(`DELETE FROM room_interiors WHERE room_id = ?`, [roomId], (err) => {
                    if (err) {
                        console.error('Error deleting old interiors:', err);
                    } else {
                        // Add new interiors
                        const interiorQueries = interiors.map(interior_id => new Promise((resolve, reject) => {
                            const insertInteriorQuery = 'INSERT INTO room_interiors (room_id, interior_id) VALUES (?, ?)';
                            connection.query(insertInteriorQuery, [roomId, interior_id], (err) => {
                                if (err) return reject(err);
                                resolve();
                            });
                        }));
                        Promise.all(interiorQueries).catch(err => console.error('Error inserting interiors:', err));
                    }
                });
            }

            // Handle images: only delete and add if new images are provided
            if (images && images.length > 0) {
                connection.query(`DELETE FROM room_images WHERE room_id = ?`, [roomId], (err) => {
                    if (err) {
                        console.error('Error deleting old images:', err);
                    } else {
                        // Add new images
                        const imageQueries = images.map(image_url => new Promise((resolve, reject) => {
                            const insertImageQuery = 'INSERT INTO room_images (room_id, image_url) VALUES (?, ?)';
                            connection.query(insertImageQuery, [roomId, image_url], (err) => {
                                if (err) return reject(err);
                                resolve();
                            });
                        }));
                        Promise.all(imageQueries).catch(err => console.error('Error inserting images:', err));
                    }
                });
            }

            res.status(200).json({ success: true, message: 'Room updated successfully' });
        }
    );
});







module.exports = { 
    getBoardingHouses, 
    getBoardingHouseById, 
    getRoomsByBoardingHouseId, 
    getRoomById, 
    getRoomFacilitiesByRoomId,
    getRoomInteriorsByRoomId,
    getRoomImagesByRoomId,
    createBoardingHouse,
    createRoom,
    updateRoomStatus,
    deleteRoomById,
    getRoomByIdDetails,
    updateRoomById
};



