// import User from '../models/user_model.js';
// import CardService from '../services/card_service.js';
// import BucketService from '../services/bucket_service.js';
// import mongoose from 'mongoose';
//
// const { Error } = mongoose;
//
// class UserService {
//     async createUser(userDetails) {
//         try {
//             const existingUser = await User.findOne({
//                 $or: [{ email: userDetails.email }, { phoneNumber: userDetails.phoneNumber }]
//             });
//             if (existingUser) {
//                 return new Error('Email or Phone Number already in use.');
//             }
//             const user = new User(userDetails);
//             const savedUser = await user.save();
//             console.log("New User Created:", user);
//             return savedUser._id;
//         } catch (err) {
//             throw new Error(err.message);
//         }
//     }
//
//     async checkIfUserAlreadyExist(id){
//         try {
//             const user = await User.findById(id)
//             await user.save();
//             return user._id;
//         } catch (err) {
//             throw new Error(err.message);
//         }
//     }
//     async createACard(userId, cardData){
//         try {
//             const user = await User.findById(userId);
//             if (!user) {
//                 return new Error('User not found');
//             }
//             await user.save();
//             const cardService = new CardService();
//             return await cardService.addCard(cardData);
//         }
//         catch (err) {
//             throw new Error(err.message);
//         }
//     }
//
//     async updateCart(userId, data){
//         try {
//             const user = await User.findById(userId);
//             if (!user) {
//                 return new Error('User not found');
//             }
//             await user.save();
//             const cardService = new CardService();
//             return await cardService.updateCard(data);
//         }
//         catch (error){
//             throw new Error(error.message);
//         }
//     }
//     async deleteCart(userId, id){
//         try {
//             const user = await User.findById(userId);
//             if (!user) {
//                 return new Error('User not found');
//             }
//             await user.save();
//             const cardService = new CardService();
//             return await cardService.deleteCard(id);
//         }
//         catch (error){
//             throw new Error(error.message);
//         }
//     }
//     async createBucket(userId, bucketDetails) {
//         try {
//             const user = await User.findById(userId);
//             if (!user) {
//                 return new Error('User not found');
//             }
//             await user.save();
//             const bucketService = new BucketService();
//             return await bucketService.createTypeBucket(bucketDetails)
//         } catch (err) {
//             throw new Error(err.message);
//         }
//     }
//     async getAllBuckets(userId){
//         try {
//             const user = await User.findById(userId);
//             if (!user) {
//                 return new Error('User not found');
//             }
//             await user.save();
//             const bucketService = new BucketService();
//             return await bucketService.getBuckets()
//         }
//         catch (error){
//             throw new Error(error.message);
//         }
//     }
// }
//
// export default UserService;
import User from '../models/user_model.js';
import CardService from '../services/card_service.js';
import BucketService from '../services/bucket_service.js';
import mongoose from 'mongoose';
import Bucket from "../models/bucket_model.js";
import Card from "../models/card_model.js";

const { Error } = mongoose;

class UserService {
// UserService class method
    async createUser(userDetails) {
        try {
            const existingUser = await User.findOne({
                $or: [{ email: userDetails.email }, { phoneNumber: userDetails.phoneNumber }]
            });

            if (existingUser) {
                return  new Error('Email or Phone Number already in use.');
            }

            const user = new User(userDetails);
            const savedUser = await user.save();

            console.log("Saved User _id Type:", savedUser._id);
            return savedUser._id.toString();
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
    async createACard(bucketId, cardData){
        try {
            const bucket = await Bucket.findById(bucketId);
            if (!bucket) {
                return new Error('Bucket not found');
            }
            await bucket.save();
            const cardService = new CardService();
            return await cardService.addCard(bucketId, cardData);
        }
        catch (err) {
            throw new Error(err.message);
        }
    }

    async updateCard(cardId, data){
        try {
            const card = await Card.findById(cardId);
            if (!card) {
                return new Error('card not found');
            }
            await card.save();
            const cardService = new CardService();
            return await cardService.updateCard(data);
        }
        catch (error){
            throw new Error(error.message);
        }
    }
    async deleteCard(cardId){
        try {
            const card = await Card.findById(cardId);
            if (!card) {
                return new Error('card not found');
            }
            await card.save();
            const cardService = new CardService();
            return await cardService.deleteCard(cardId);
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
            return await bucketService.createTypeBucket(userId, bucketDetails)
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
            const bucketService = new BucketService();
            return await bucketService.getAllBuckets()
        }
        catch (error){
            throw new Error(error.message);
        }
    }
    async getCardByName(name){
        const cardService = new CardService();
        return await cardService.getCardByName(name);    }
}

export default UserService;