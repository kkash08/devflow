import mongoose  from "mongoose";

// 1 -> Create a schema
// 2 -> Create a model based off of that schema

const userSchema = new mongoose.Schema(
    {
        firstName : {
            type : String,
            required: true,
            trim: true
        },

        lastName : {
            type : String,
            required: true,
            trim: true
        },

        userEmail: {
            type : String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type : String,
            required: true
        }
    },
    {
        timestamps : true
    }
);

const User = mongoose.model('User', userSchema);

export default User