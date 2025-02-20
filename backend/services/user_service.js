const User = require('../models/user_model');
const CardService = require('../services/card_service');
const BucketService = require('../services/bucket_service');
const {Error} = require("mongoose");

class UserService {
    async createUser(userDetails) {
        try {
            const user = new User(userDetails);
            const savedUser = await user.save();
            console.log("New User Created:", user);

            return savedUser._id;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async checkIfUserAlreadyExist(id){
        try {
            const user = await User.findById(id)
            await user.save();
            return user._id;
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async createACard(userId, cardData){
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            return await CardService.addCard(cardData);
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async createFirstTypeOfBucket(userId){
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            return await BucketService.createTypeBucket();
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async createSecondTypeOfBucket(userId){
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            return await BucketService.createAnotherTypeBucket();
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async createThirdTypeOfBucket(userId){
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            return await BucketService.createAnotherTypeBucketAgain();
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async createLastTypeOfBucket(userId){
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            return await BucketService.createLastTypeBucket();
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
    async updateCart(userId, data){
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            return await CardService.updateCard(data);
        }
        catch (error){
            throw new Error(error.message);
        }
    }
    async deleteCart(userId, id){
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            return await CardService.deleteCard(id);
        }
        catch (error){
            throw new Error(error.message);
        }
    }
}

module.exports = new UserService;