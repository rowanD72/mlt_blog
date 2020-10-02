const ContactForm = require("../models/ContactForm");

module.exports = async (req, res) => {
    const contactform = await ContactForm.create(req.body)
    console.log(contactform);
    res.render('contact')
}