const mongoose = require('mongoose');

const Users = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
    },
    avatar: {
        type: String,
    },
    image: {
        type: String,
    },
    userName: {
        type: String,
        // required: true,
        // unique: true,
    },
    lastName: {
        type: String,
        // required: true,
    },
    data: {
        type: Date,
        default: Date.now(),
    },
    textOfThePost: {
        type: String,
        required: true,
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            }
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            name: {
                type: String,
                required: true,
            },
            avatar: {
                type: String,
            },
            textOfTheComment: {
                type: String,
          
            },
            data: {
                type: Date,
                default: Date.now(),
            },
            likes: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'user',
                    }
                }
            ],
        }
    ]
  
})

let PostSchema = mongoose.model("fullPosts", Users);
module.exports = PostSchema
