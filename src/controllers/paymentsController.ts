import { PaymentSchema } from "../models/paymentsModel";
import { Request, Response } from "express";

const Index = async (req: Request, res: Response) => {
    const query = { userId: req.session._id };
    try{
        var listPayments = await PaymentSchema.find(query);
        res.status(200).json({ status: 'Success', paymentList: listPayments });
    }catch(error: any){
        res.status(500).json({ status: 'Failed', message: error.message });
    }
};

const getOne = async (req: Request, res: Response) => {
    const query = { _id: req.params.id };
    try{
        var findOne = await PaymentSchema.findById(query);
        res.status(200).json({ status: 'Success', payment: findOne });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

const Store = async (req: Request, res: Response) => {
    const userData = new PaymentSchema({
        userId: req.session._id,
        title: req.body.title,
        description: req.body.description,
        value: req.body.value,
        category: req.body.category,
        datePayment: req.body.datePayment
    });

    try{
        var storeUser = await userData.save();
        res.status(200).json({ status: 'Success', message: 'Payment created!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

const Update = async (req: Request, res: Response) => {
    const query = { _id: req.params.id };
    const userData = {
        title: req.body.title,
        description: req.body.decription,
        value: req.body.value
    };

    try{
        var getPayment = await PaymentSchema.findById(query);
        if(!getPayment){
            res.status(404).json({ status: 'Failed', message: 'Payment not found!' });
            return;
        }

        if(req.session._id !== getPayment.userId){
            res.status(403).json({ status: 'Failed', message: 'Unauthorized!' });
            return;
        }

        var updatePayment = await PaymentSchema.findByIdAndUpdate(query, userData);
        res.status(200).json({ status: 'Success', message: 'Payment updated!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

const Destroy = async (req: Request, res: Response) => {
    const query = { _id: req.params.id };
    try{
        var findPayment = await PaymentSchema.findById(query);

        if(!findPayment){
            res.status(404).json({ status: 'Failed', message: 'Payment not found!' });
            return;
        }

        if(req.session._id !== findPayment.userId){
            res.status(403).json({ status: 'Failed', message: 'Unauthorized!' });
            return;
        }

        var deletePayment = await PaymentSchema.findByIdAndDelete(query);
        res.status(200).json({ status: 'Success', message: 'Payment deleted!' });
    }catch(error: any){
        res.status(400).json({ status: 'Failed', message: error.message });
    }
};

export { Index, Store, getOne, Update, Destroy };
