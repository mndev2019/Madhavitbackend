const Contact = require("../models/Contact");
const { sendEnquiryEmail } = require("../service/emailService");

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }

    // Save enquiry in MongoDB
    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Send enquiry email through Brevo
    try {
      await sendEnquiryEmail(contact);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  submitContact,
};