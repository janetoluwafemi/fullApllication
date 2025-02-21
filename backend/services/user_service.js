import User from '../models/user_model.js';
import CardService from '../services/card_service.js';
import BucketService from '../services/bucket_service.js';
import mongoose from 'mongoose';

const { Error } = mongoose;

class UserService {
    async createUser(userDetails) {
        try {
            const existingUser = await User.findOne({
                $or: [{ email: userDetails.email }, { phoneNumber: userDetails.phoneNumber }]
            });
            if (existingUser) {
                return new Error('Email or Phone Number already in use.');
            }
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
            const cardService = new CardService();
            return await cardService.addCard(cardData);
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
            const cardService = new CardService();
            return await cardService.updateCard(data);
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
            const cardService = new CardService();
            return await cardService.deleteCard(id);
        }
        catch (error){
            throw new Error(error.message);
        }
    }
    async createBucket(userId, bucketDetails) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            const bucketService = new BucketService();
            return await bucketService.createTypeBucket(bucketDetails)
        } catch (err) {
            throw new Error(err.message);
        }
    }
    async getAllBuckets(userId){
        try {
            const user = await User.findById(userId);
            if (!user) {
                return new Error('User not found');
            }
            await user.save();
            const bucketService = new BucketService();
            return await bucketService.getBuckets()
        }
        catch (error){
            throw new Error(error.message);
        }
    }
}

export default UserService;