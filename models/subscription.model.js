import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "subscription name is required"],
        trim: true,
        minlength: [2, "atleast 2 character"],
        maxlength: [100, "maximum 50 character"],
    },
    price:{
        type: Number,
        required:[true, "price is required"],
        min:[0, "Price must be greater than 0"],
    },
    currency:{
        type: String,
        enum: ['USD', 'EUR', 'GBP','INR', 'AUD', 'CAD', 'JPY'],
        default: 'INR',
        required: [true, "currency is required"],
    },
    frequency:{
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
        default: 'monthly',
        required: [true, "frequency is required"],
    },
    category:{
        type: String,
        enum: ['entertainment', 'education', 'health', 'fitness', 'food', 'travel'],
        required: [true, "category is required"],
    },
    paymentMethod:{
        type: String,
        required: [true, "payment method is required"],
        trim: true,
    },
    status:{
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active',
    },
    startDate:{
        type: Date,
        required: [true, "start date is required"],
        validate: {
            validator: function (value) {
                 return value < new Date()
            },
            message: "Start date must be in the past",
        }
    },
    renewalDate:{
        type: Date,
        validate:{
            validator: function(value) {  
                return value > this.startDate 
            },
            message: "Renewal date must be in the future",
        }
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, "user is required"],
        index: true,
    }
    
}, {timestamps: true})

//auto-calculate renewal date is missing
// it is kind of middleware
subscriptionSchema.pre('save', function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    //auto-update status if renewal date is passed
    if(this.renewalDate < new Date()){
        this.status= 'expired';
    }

    next(); //proceed to the creation for next document
});


const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;