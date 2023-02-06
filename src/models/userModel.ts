import mongoose, { Schema, InferSchemaType } from 'mongoose';
import bcrypt from "bcrypt";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

schema.pre('save', function(next){
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(error, salt){
        if(error) return next(error);

        bcrypt.hash(user.password, salt, function(error, hash){
            if(error) return next(error);

            user.password = hash;
            next();
        });
    });
});

type User = InferSchemaType<typeof schema>;

export const userSchema = mongoose.model('User', schema);
