const { BrevoClient } = require("@getbrevo/brevo");

const sendEnquiryEmail = async (contact) => {
  try {
    const brevo = new BrevoClient({
      apiKey: process.env.BREVO_API_KEY,
    });

    const result = await brevo.transactionalEmails.sendTransacEmail({
      subject: `New Enquiry - ${
        contact.subject || "Madhav IT Services"
      }`,

      sender: {
        name: process.env.BREVO_SENDER_NAME,
        email: process.env.BREVO_SENDER_EMAIL,
      },

      to: [
        {
          email: process.env.ADMIN_EMAIL_1,
        },
        {
          email: process.env.ADMIN_EMAIL_2,
        },
      ],

      htmlContent: `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 30px;">
            
            <div style="max-width: 650px; margin: auto; background: #ffffff; padding: 30px; border-radius: 12px;">
              
              <h2 style="color: #ff6500;">
                New Enquiry - Madhav IT Services
              </h2>

              <p>
                You have received a new enquiry from the website.
              </p>

              <hr />

              <p>
                <strong>Name:</strong> ${contact.name}
              </p>

              <p>
                <strong>Email:</strong> ${contact.email}
              </p>

              <p>
                <strong>Phone:</strong> ${
                  contact.phone || "Not provided"
                }
              </p>

              <p>
                <strong>Subject:</strong> ${
                  contact.subject || "Not provided"
                }
              </p>

              <p>
                <strong>Message:</strong>
              </p>

              <div style="background: #f9f9f9; padding: 15px; border-radius: 8px;">
                ${contact.message}
              </div>

              <hr />

              <p style="font-size: 12px; color: #777;">
                This enquiry was submitted from the Madhav IT Services website.
              </p>

            </div>

          </body>
        </html>
      `,
    });

    console.log("Brevo email sent successfully:", result);

    return result;
  } catch (error) {
    console.error(
      "Brevo email error:",
      error.body || error.message || error
    );

    throw error;
  }
};

module.exports = {
  sendEnquiryEmail,
};