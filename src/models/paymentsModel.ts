import mongoose, { Schema, InferSchemaType, mongo } from "mongoose";

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    value: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    datePayment: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

type Payment = InferSchemaType<typeof schema>;

export const PaymentSchema = mongoose.model('Payments', schema);
