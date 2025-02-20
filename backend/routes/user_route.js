const express = require('express');
const router = express.Router();
const UserService = require('../services/user_service.js');

router.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, password } = req.body;
        if (!firstName || !lastName || !phoneNumber || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const userId = await UserService.createUser(req.body);
        return res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
});

module.exports = router;