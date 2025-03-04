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
        const card = await Card.findById(cardId);
        const updatedCard =
            new Card({name: data.name, link: data.link, cardId: new Types.ObjectId(cardId)});
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

    async deleteCard(cardId) {
        try {
            const card = await Card.findById(cardId);
            if (!card) {
                return new Error('Card not found');
            }
            await Card.findByIdAndDelete(new Types.ObjectId(cardId));
            return card;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async getAllCardsByBucket(bucketId) {
        return Bucket.find({ bucketId });
    }

    async getCardByName(name) {
        try {
            const card = await Card.findOne({ name: name });
            if (!card) {
                return  new Error('Card not found');
            }
            return card._id.toString();
        } catch (error) {
            console.error('Error finding card:', error);
            throw new Error('Error finding card');
        }
    }
}

export default CardService