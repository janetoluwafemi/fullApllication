import express from 'express';
import BucketService from "../services/bucket_service.js";
const router = express.Router();

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

export default router;
