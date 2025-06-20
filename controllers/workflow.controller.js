import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
import { sendReminderEmail } from '../utils/send-email.js';
const require = createRequire(import.meta.url); 
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7,5,2,1]; // days before renewal date to send reminders


export const sendReminders= serve(async(context)=>{
    const {subscriptionId } = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);
    if(!subscription || !subscription.status !== 'active'){
        return ;
    }
    const renewalDate = dayjs(subscription.renewalDate);
    if(!renewalDate.isBefore(dayjs())){
        console.log(`renewal date has passed for subscription ${subscriptionId}.Stopping workflow`);
        return;
    }
    for(const daysBefore of REMINDERS){
        const remindersDate = renewalDate.subtract(daysBefore, 'day');
        //renewal date is 22 feb, reminderDate = 15 feb, 17, 20, 21
        if(remindersDate.isAfter(dayjs())){
            await sleepuntilReminder(context, `reminder-${daysBefore}`, remindersDate);
        }
        if(dayjs().isSame(remindersDate, 'day')){
            await triggerEmail(context, `${daysBefore} days before reminder`, subscription);
        }
    }
})

const fetchSubscription = async (context, subscriptionId) =>{
    return await context.run('get subscription', async()=>{
        return Subscription.findById(subscriptionId).populate('user', 'email');

    })
}

const sleepuntilReminder = async(context, label,date) =>{
    console.log(`Sleeping until ${date} for label ${label}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerEmail = async(context, label, subscription)=>{
    return await context.run(label, async() =>{
        console.log(`Triggering ${label} reminder`);
        //send email, sms, push notification....
        await sendReminderEmail({
            to: subscription.user.email,
            type: label,
            subscription,
        })
    })
}