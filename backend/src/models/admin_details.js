import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const admin_schema = new Schema({
    adminName: {
        type: String,
        required: true,
        // unique: true 
    },
    adminPassword: {
        type: String,
        required: true
    },
    adminRole: {
        type: String,
        default: "admin"
    }
});

