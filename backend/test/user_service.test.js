const mongoose = require('mongoose');
const UserService = require('../services/user_service');
const User = require('../models/user_model');
const fs = require('fs');
const {expect} = require("@jest/globals");
const { MongoMemoryServer } = require('mongodb-memory-server');
const axios = require("axios");
const CardService = require("../services/card_service");
const cardModel = require("../models/card_model");
const BucketService = require("../services/bucket_service");
const bucketModel = require("../models/bucket_model");


jest.mock('axios');
jest.mock('fs');
describe('UserService - createUser', () => {
    let userId;
    let cardId;
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true});
        await mongoose.connection.db.dropDatabase();
    });
    afterAll(async () => {
        await User.deleteMany({});
        await mongoose.connection.close();
    });
    it('should create a user and return an id', async () => {
        const mockImageBuffer = Buffer.from('mock-image-data');
        fs.readFileSync.mockReturnValue(mockImageBuffer);
        const userDetails = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: 'securepassword',
            phoneNumber: '123456789',
            accountNumber: '987654321',
            address: 'Some address',
        };
        userId = await UserService.createUser(userDetails);
        const user = await User.findById(userId);
        console.log(user)
        expect(userId).toBe(userId._id);
        expect(userId).not.toBeNull();
        expect(user).not.toBeNull();
    });
    it('should return the user ID if the user exists', async () => {
        const mockUserId = userId;
        const mockUser = { _id: mockUserId, save: jest.fn() };
        const findByIdMock = jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        const result = await UserService.checkIfUserAlreadyExist(mockUserId);
        console.log('User ID:', mockUserId);
        expect(result).toBe(mockUserId);
        expect(findByIdMock).toHaveBeenCalledWith(mockUserId);
        expect(mockUser.save).toHaveBeenCalled();
        findByIdMock.mockRestore();
    });
    it('should check if user exists and create a card', async () => {
        const mockUserId = 'mockUserId';
        const mockUser = { _id: mockUserId, save: jest.fn() };
        const findByIdMock = jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        const userExists = await UserService.checkIfUserAlreadyExist(mockUserId);
        const cardData = {
            name: 'Sample Card',
            link: 'https://www.youtube.com/watch?v=0oP8KBFyqt0',
            bucketId: '67b42901bac8f0e331d54d94',
        };
        cardId = await CardService.addCard(cardData);

        const card = await cardModel.findById(cardId);

        expect(userExists).toBe(mockUserId);
        expect(findByIdMock).toHaveBeenCalledWith(mockUserId);
        expect(mockUser.save).toHaveBeenCalled();
        expect(card).not.toBeNull();
        expect(card.name).toBe(cardData.name);
        expect(card.link).toBe(cardData.link);

    });
    it('should create a new bucket and return all buckets', async () => {
        const mockUserId = 'mockUserId';
        const mockUser = { _id: mockUserId, save: jest.fn() };
        const findByIdMock = jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        const userExists = await UserService.checkIfUserAlreadyExist(mockUserId);
        const buckets = await BucketService.createTypeBucket();
        console.log('Buckets:', buckets);
        expect(Array.isArray(buckets)).toBe(true);
        const bucketNames = buckets.map(bucket => bucket.name);
        console.log(bucketNames);
        expect(userExists).toBe(mockUserId);
        expect(findByIdMock).toHaveBeenCalledWith(mockUserId);
        expect(mockUser.save).toHaveBeenCalled();
        expect(bucketNames).toContain('Entertainment Videos');
    });
    it('should create another type of bucket and return all buckets', async () => {
        const mockUserId = 'mockUserId';
        const mockUser = { _id: mockUserId, save: jest.fn() };
        const findByIdMock = jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        const userExists = await UserService.checkIfUserAlreadyExist(mockUserId);
        const buckets = await BucketService.createAnotherTypeBucket();
        console.log('Buckets:', buckets);
        expect(Array.isArray(buckets)).toBe(true);
        const bucketNames = buckets.map(bucket => bucket.name);
        console.log(bucketNames);
        expect(userExists).toBe(mockUserId);
        expect(findByIdMock).toHaveBeenCalledWith(mockUserId);
        expect(mockUser.save).toHaveBeenCalled();
        expect(bucketNames).toContain('Education Videos');
    });
    it('should create another type of bucket again and return all buckets', async () => {
        const mockUserId = 'mockUserId';
        const mockUser = { _id: mockUserId, save: jest.fn() };
        const findByIdMock = jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        const userExists = await UserService.checkIfUserAlreadyExist(mockUserId);
        const buckets = await BucketService.createAnotherTypeBucketAgain();
        console.log('Buckets:', buckets);
        expect(Array.isArray(buckets)).toBe(true);
        const bucketNames = buckets.map(bucket => bucket.name);
        console.log(bucketNames);
        expect(userExists).toBe(mockUserId);
        expect(findByIdMock).toHaveBeenCalledWith(mockUserId);
        expect(mockUser.save).toHaveBeenCalled();
        expect(bucketNames).toContain('Live Videos');
    });
    it('should create last type of bucket and return all buckets', async () => {
        const mockUserId = 'mockUserId';
        const mockUser = { _id: mockUserId, save: jest.fn() };
        const findByIdMock = jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        const userExists = await UserService.checkIfUserAlreadyExist(mockUserId);
        const buckets = await BucketService.createLastTypeBucket();
        console.log('Buckets:', buckets);
        expect(Array.isArray(buckets)).toBe(true);
        const bucketNames = buckets.map(bucket => bucket.name);
        console.log(bucketNames);
        expect(userExists).toBe(mockUserId);
        expect(findByIdMock).toHaveBeenCalledWith(mockUserId);
        expect(mockUser.save).toHaveBeenCalled();
        expect(bucketNames).toContain('Promotion Videos');
    });
    it('should update a card', async () => {
        const mockUserId = 'mockUserId';
        const mockUser = { _id: mockUserId, save: jest.fn() };
        const findByIdMock = jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        const userExists = await UserService.checkIfUserAlreadyExist(mockUserId);
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
        expect(userExists).toBe(mockUserId);
        expect(findByIdMock).toHaveBeenCalledWith(mockUserId);
        expect(mockUser.save).toHaveBeenCalled();
        expect(updatedCard.name).toBe('Updated Card');
        expect(updatedCard.link).toBe('https://www.youtube.com/watch?v=g13odpvV1Lg&t=240s');
        expect(updatedCard.bucketId.toString()).toBe(savedBucket._id.toString());
    });

    it('should delete an existing card', async () => {
        const mockUserId = 'mockUserId';
        const mockUser = { _id: mockUserId, save: jest.fn() };
        const findByIdMock = jest.spyOn(User, 'findById').mockResolvedValue(mockUser);
        const userExists = await UserService.checkIfUserAlreadyExist(mockUserId);
        const deleted = jest.spyOn(cardModel, 'findByIdAndDelete').mockResolvedValue({
            _id: cardId,
            name: 'Sample Card',
            link: 'https://www.youtube.com/watch?v=0oP8KBFyqt0',
            bucketId: '67b42901bac8f0e331d54d94',
        });
        await CardService.deleteCard(cardId);
        expect(userExists).toBe(mockUserId);
        expect(findByIdMock).toHaveBeenCalledWith(mockUserId);
        expect(mockUser.save).toHaveBeenCalled();
        expect(deleted).toHaveBeenCalledWith(cardId);
        expect(deleted).toHaveBeenCalledTimes(1);
        const deletedCard = await cardModel.findById(cardId);
        expect(deletedCard).toBeNull();
        deleted.mockRestore();
    });
});
