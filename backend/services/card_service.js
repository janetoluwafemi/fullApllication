import mongoose from 'mongoose';
import Card from '../models/card_model.js';
import Bucket from '../models/bucket_model.js';

const { Types } = mongoose;  // Import mongoose

class CardService {

    async addCard(bucketId, cardData) {
        try {
            const card =
                new Card({name: cardData.name, link: cardData.link, bucketId: new Types.ObjectId(bucketId)});
            const savedCard = await card.save();
            console.log('Card created:', savedCard);
            return savedCard._id;
        } catch (error) {
            console.error('Error creating card:', error);
        }
    }
    async updateCard(cardId, data) {
        // const cardId = new mongoose.Types.ObjectId(data._id);
        const card = await Card.findById(cardId);
        const updatedCard =
            new Card({name: data.name, link: data.link, bucketId: new Types.ObjectId(bucketId)});
        if (card != null) {
            return new Error('Card not found');
        }
        if (data.name != null) {
            card.name = data.name;
        }
        if (data.link != null) {
            card.link = data.link;
        }
        const savedCard = await updatedCard.save();
        console.log('Card updated:', savedCard);
        return savedCard;
    }

    async deleteCard(id) {

        const deletedCard = await Card.deleteOne(id)
        if (!deletedCard) {
            throw new Error('Card not found');
        }
        console.log(`Deleted card with id: ${id}`);
    }

    async getAllCardsByBucket(bucketId) {
        return Bucket.find({ bucketId });
    }

    async getCardById(id) {
        return Bucket.findOne({ id });
    }
}

export default CardService