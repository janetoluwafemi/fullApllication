const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const CardService = require('../services/card_service');
const cardModel = require('../models/card_model');
const bucketModel = require('../models/bucket_model');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    // const mongoUri = 'mongodb://localhost/testDB';
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('CardService', () => {
    let cardId;
    it('should add a new card and return the id', async () => {
        const cardData = {
            name: 'Sample Card',
            link: 'https://www.youtube.com/watch?v=0oP8KBFyqt0',
            bucketId: '67b42901bac8f0e331d54d94',
        };

        cardId = await CardService.addCard(cardData);
        const card = await cardModel.findById(cardId);
        expect(card).not.toBeNull();
        expect(card.name).toBe(cardData.name);
        expect(card.link).toBe(cardData.link);
    });
    it('should update a card', async () => {
        const newBucket = new bucketModel({
            name: 'Entertainment Videos',
            type: 'entertainmentVideos',
        });
        const savedBucket = await newBucket.save();
        const cardData = {
            name: 'Sample Card',
            link: 'https://www.youtube.com/watch?v=0oP8KBFyqt0',
            bucketId: savedBucket._id,
        };
        const cardId = await CardService.addCard(cardData);
        const updatedCard = await CardService.updateCard({
            _id: cardId,
            name: 'Updated Card',
            link: 'https://www.youtube.com/watch?v=g13odpvV1Lg&t=240s',
            bucketId: savedBucket._id
        });
        console.log('Updated card:', updatedCard);
        expect(updatedCard.name).toBe('Updated Card');
        expect(updatedCard.link).toBe('https://www.youtube.com/watch?v=g13odpvV1Lg&t=240s');
        expect(updatedCard.bucketId.toString()).toBe(savedBucket._id.toString());
    });

    it('should delete an existing card', async () => {
        const deleted = jest.spyOn(cardModel, 'findByIdAndDelete').mockResolvedValue({
            _id: cardId,
            name: 'Sample Card',
            link: 'https://www.youtube.com/watch?v=0oP8KBFyqt0',
            bucketId: '67b42901bac8f0e331d54d94',
        });
        await CardService.deleteCard(cardId);
        expect(deleted).toHaveBeenCalledWith(cardId);
        expect(deleted).toHaveBeenCalledTimes(1);
        const deletedCard = await cardModel.findById(cardId);
        expect(deletedCard).toBeNull();
        deleted.mockRestore();
    });
});
