const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactFormSchema = new Schema({
    name: String,
    email: String,
    phone: Number,
    message: String
});

const ContactForm = mongoose.model('ContactForm', ContactFormSchema);

module.exports = ContactForm;