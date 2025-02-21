import express from 'express';
import CardService from "../services/card_service.js";
const router = express.Router();

// router.post('/cards', async (req, res) => {
//     try {
//         const { name, link, bucketId } = req.body;
//
//         if (!name || !link || !bucketId) {
//             return res.status(400).json({ message: "All fields are required." });
//         }
//         const cardService = new CardService();
//         const userId = await cardService.addCard(req.body);
//
//         return res.status(201).json({ message: "Card created successfully", userId });
//     } catch (error) {
//         if (error.message === 'Name already in use.') {
//             return res.status(400).json({ message: 'Name already in use.' });
//         }
//         console.error("Error creating card:", error);
//         return res.status(500).json({ message: "Error creating card", error: error.message });
//     }
// });

export default router;