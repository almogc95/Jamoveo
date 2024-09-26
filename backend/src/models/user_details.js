import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const user_schema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userInstrument: {
        type: String,
        enum: ['Drums', 'Guitars', 'Bass', 'Saxophone', 'Keyboards', 'Vocals'],
        required: true
    }
});

