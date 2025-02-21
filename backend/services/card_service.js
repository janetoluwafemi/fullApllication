import mongoose from 'mongoose';
import Card from '../models/card_model.js';
import Bucket from '../models/bucket_model.js';

const { Types } = mongoose;  // Import mongoose

class CardService {

    async addCard(cardData) {
        try {
            const newBucket = new Bucket({
                name: 'Entertainment Bucket',
                type: 'entertainmentVideos',
                id: '67b478439b188ad2a4f05c41'
            });
            const savedBucket = await newBucket.save();
            console.log('Bucket created:', savedBucket);
            const card = new Card(cardData);
            const savedCard = await card.save();
            console.log('Card created:', savedCard);
            return savedCard._id;
        } catch (error) {
            console.error('Error creating card:', error);
        }
    }
    async updateCard(data) {
        const cardId = new mongoose.Types.ObjectId(data._id);
        const card = await Card.findById(cardId);
        if (!card) {
            return new Error('Card not found');
        }
        if (data.name) {
            card.name = data.name;
        }
        if (data.link) {
            card.link = data.link;
        }
        if (data.bucketId) {
            console.log(`Looking for bucket with ID: ${data.bucketId}`);
            const bucket = await Bucket.findById(data.bucketId);
            if (!bucket) {
                console.error(`Bucket with ID: ${data.bucketId} not found`);
                throw new Error('Bucket not found');
            }
            console.log(`Found bucket: ${bucket.name}`);
            card.bucketId = bucket._id;
        }
        const updatedCard = await card.save();
        console.log('Card updated:', updatedCard);
        return updatedCard;
    }

    async deleteCard(id) {
        const deletedCard = await Card.findByIdAndDelete(id);
        if (!deletedCard) {
            throw new Error('Card not found');
        }
        console.log(`Deleted card with id: ${id}`);
    }
}

export default CardService