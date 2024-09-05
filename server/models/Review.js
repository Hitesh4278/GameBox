const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewText: {
        type: String,
        required: true
    },
    gameId: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    upvotedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }],
    downvotedBy: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }]
});

module.exports = mongoose.model('review', ReviewSchema);
