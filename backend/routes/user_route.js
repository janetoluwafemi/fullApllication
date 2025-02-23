// import express from 'express';
// import UserService from '../services/user_service.js';
// import BucketService from "../services/bucket_service.js";
// import CardService from "../services/card_service.js";
//
// const router = express.Router();
//
// router.post('/users', async (req, res) => {
//     try {
//         const { firstName, lastName, phoneNumber, email, password } = req.body;
//
//         if (!firstName || !lastName || !phoneNumber || !email || !password) {
//             return res.status(400).json({ message: "All fields are required." });
//         }
//         const userService = new UserService();
//         const userId = await userService.createUser(req.body);
//
//         return res.status(201).json({ message: "User created successfully", userId });
//     } catch (error) {
//         if (error.message === 'Email or Phone Number already in use.') {
//             return res.status(400).json({ message: 'Email or Phone Number already in use.' });
//         }
//         console.error("Error creating user:", error);
//         return res.status(500).json({ message: "Error creating user", error: error.message });
//     }
// });
// router.post('/buckets', async (req, res) => {
//     try {
//         const { name, type } = req.body;
//         if (!name || !type) {
//             return res.status(400).json({ message: "All fields are required." });
//         }
//
//         const bucketService = new BucketService();
//         const bucketId = await bucketService.createTypeBucket({ name, type });
//         return res.status(201).json({ message: "Bucket created successfully", bucketId });
//
//     } catch (error) {
//         if (error.message === 'Name already in use.') {
//             return res.status(400).json({ message: 'Name already in use.' });
//         }
//
//         console.error("Error creating bucket:", error);
//         return res.status(500).json({ message: "Error creating bucket", error: error.message });
//     }
// });
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

// export default router;
import express from 'express';
import UserService from '../services/user_service.js';
import BucketService from "../services/bucket_service.js";
import CardService from "../services/card_service.js";

const router = express.Router();
const userService = new UserService();

// Middleware to check if user exists
async function checkUserExists(req, res, next) {
    try {
        const userId = req.body.userId || req.params.userId;
        const userService = new UserService();
        await userService.checkIfUserAlreadyExist(userId);
        next(); // Proceed to next middleware or route handler
    } catch (error) {
        console.error("User not found:", error);
        return res.status(404).json({ message: 'User not found', error: error.message });
    }
}
router.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, password } = req.body;

        if (!firstName || !lastName || !phoneNumber || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const userService = new UserService();
        const userId = await userService.createUser(req.body);
        console.log("Returned User ID (String):", userId); // This should log a string

        return res.status(201).json({ message: "User created successfully", userId: userId });
    } catch (error) {
        if (error.message === 'Email or Phone Number already in use.') {
            return res.status(400).json({ message: 'Email or Phone Number already in use.' });
        }
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user", error: error.message });
    }
});



router.post('/buckets', checkUserExists, async (req, res) => {
    try {
        const { name, type, userId } = req.body;
        if (!name || !type || !userId) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const bucketId = await userService.createBucket(userId,{ name, type });
        return res.status(201).json({ message: "Bucket created successfully", bucketId });
    } catch (error) {
        console.error("Error creating bucket:", error);
        return res.status(500).json({ message: "Error creating bucket", error: error.message });
    }
});

router.post('/cards', async (req, res) => {
    try {
        const { name, link, bucketId } = req.body;

        if (!name || !link || !bucketId) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const cardId = await userService.createACard(bucketId, req.body);
        return res.status(201).json({ message: "Card created successfully", cardId });
    } catch (error) {
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
        const deletedCard = await userService.deleteCard(cardId);
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
        const updatedCard = await userService.updateCard(cardId, { name, link });

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

        const cardId = await userService.getCardByName(name);

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
