import express from 'express';
import CardService from "../services/card_service.js";
const router = express.Router();

router.post('/cards', async (req, res) => {
    try {
        const { name, link, bucketId } = req.body;

        if (!name || !link || !bucketId) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const cardService = new CardService();
        const data = await cardService.addCard(req.body);

        return res.status(201).json({ message: "Card created successfully", data });
    } catch (error) {
        if (error.message === 'Name already in use.') {
            return res.status(400).json({ message: 'Name already in use.' });
        }
        console.error("Error creating card:", error);
        return res.status(500).json({ message: "Error creating card", error: error.message });
    }
});

router.delete('/cards/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;

        if (!cardId) {
            return res.status(400).json({ message: "Card ID is required." });
        }

        const cardService = new CardService();
        const deletedCard = await cardService.deleteCard(cardId);

        if (!deletedCard) {
            return res.status(404).json({ message: "Card not found." });
        }

        return res.status(200).json({ message: "Card deleted successfully", deletedCard });
    } catch (error) {
        console.error("Error deleting card:", error);
        return res.status(500).json({ message: "Error deleting card", error: error.message });
    }
});



router.put('/update/:cardId', async (req, res) => {
    try {
        const { cardId } = req.params;
        const { name, link } = req.body;

        if (!name || !link) {
            return res.status(400).json({ message: "Name and Link are required." });
        }

        const cardService = new CardService();
        const updatedCard = await cardService.updateCard(cardId, { name, link });

        if (updatedCard instanceof Error) {
            return res.status(404).json({ message: updatedCard.message });
        }
        return res.status(200).json({ message: "Card updated successfully", data: updatedCard });
    } catch (error) {
        console.error("Error updating card:", error);
        return res.status(500).json({ message: "Error updating card", error: error.message });
    }
});

router.get('/card/:name', async (req, res) => {
    try {
        const { name } = req.params;
        if (!name) {
            return res.status(400).json({ message: "Name is required." });
        }

        const cardService = new CardService();
        const cardId = await cardService.getCardByName(name);
        if (cardId instanceof Error) {
            return res.status(404).json({ message: cardId.message });
        }
        return res.status(200).json({ cardId });

    } catch (error) {
        console.error('Error in getCardByName route:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


export default router;

