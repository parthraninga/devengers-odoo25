const { Worker } = require("bullmq");
const redisConnection = require("../Config/RedisConfig");
const nodemailer = require("nodemailer")
const path = require("path")
const dotenv = require("dotenv")
dotenv.config();

// KEYS bull:email-queue:*
// LLEN bull:email-queue:waiting
const emailWorker = new Worker("email-queue", async (job) => {
    console.log(`EmailWorker Processing email-queue with job ${job.id} with data:`, job.data);

    const { to, subject, text, options } = job.data;

    try {
        // 1. Create a transporter - object that will send the email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER, // Your email address
                pass: process.env.GMAIL_PASS, // Your app specific password
            },
        });

        // Default company data for ReWear
        const companyData = {
            name: "ReWear",
            website: "https://rewear.com",
            supportEmail: "support@rewear.com",
            socialLinks: {
                facebook: "https://www.facebook.com/ReWear",
                instagram: "https://www.instagram.com/ReWear",
                twitter: "https://twitter.com/rewear_app",
            },
            ...options.templateData, // Merge with any additional data passed in options
        };

        // 2. Define the email options with ReWear themed template
        const mailOptions = {
            from: `"${companyData.name}" <${process.env.GMAIL_USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(124, 58, 237, 0.15);">
                <!-- Header with gradient background -->
                <div style="background-image: linear-gradient(to right, #9333ea, #7c3aed); padding: 30px 20px; text-align: center;">
                    <img src="cid:company-logo" alt="${companyData.name}" style="height: 50px;" />
                    <h1 style="color: white; font-weight: 600; margin-top: 10px; font-size: 24px;">Sustainable Fashion Revolution</h1>
                </div>
                
                <!-- Body with subtle gradient background -->
                <div style="background-color: #ffffff; background-image: linear-gradient(to bottom right, rgba(147, 51, 234, 0.03), rgba(124, 58, 237, 0.05)); padding: 30px 25px;">
                    <h2 style="color: #6d28d9; font-size: 22px; margin-bottom: 20px; font-weight: 600;">${subject}</h2>
                    <div style="color: #4b5563; font-size: 16px; line-height: 1.7;">
                        ${text}
                    </div>
                    
                    <!-- Info box with purple accent -->
                    <div style="margin: 30px 0; padding: 20px; background-color: #f5f3ff; border-left: 4px solid #8b5cf6; border-radius: 6px;">
                        <p style="margin: 0; font-size: 15px; color: #4c1d95;">
                            Need help? Our sustainable fashion experts are here for you!<br>
                            Contact us at
                            <a href="mailto:${companyData.supportEmail}" style="color: #7c3aed; text-decoration: none; font-weight: 500;">
                                ${companyData.supportEmail}
                            </a>
                        </p>
                    </div>
                    
                    <!-- CTA Button -->
                    <div style="text-align: center; margin-top: 35px;">
                        <a href="${companyData.website}" 
                           style="display: inline-block; background-image: linear-gradient(to right, #9333ea, #7c3aed); color: #fff; padding: 12px 28px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.25); transition: all 0.3s ease;">
                            Explore ReWear
                        </a>
                    </div>
                    
                    <!-- Environmental impact message -->
                    <div style="margin-top: 35px; text-align: center; padding: 15px; background-color: #ecfdf5; border-radius: 8px;">
                        <p style="color: #065f46; font-size: 14px; margin: 0;">
                            <span style="font-weight: 600;">🌿 Making a difference:</span> By using ReWear, you've helped reduce fashion waste and carbon emissions.
                        </p>
                    </div>
                </div>
                
                <!-- Footer -->
                <div style="background-color: #f9fafb; padding: 30px 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                    <p style="color: #9ca3af; font-size: 12px; margin-top: 25px;">
                        This email was sent to you because you signed up for ReWear. If you no longer wish to receive these emails, 
                        you can <a href="${companyData.website}/unsubscribe?email=${to}" style="color: #7c3aed; text-decoration: none;">unsubscribe here</a>.
                    </p>
                </div>
            </div>
            `,
            // Adding attachments
            attachments: [
                // Company logo as embedded image
                {
                    filename: "rewear-logo.png",
                    path: path.join(__dirname, "../../../public/images/logo.png"),
                    cid: "company-logo",
                },
                // Additional attachments provided by the caller
                ...(options.attachments || []),
            ],
        };

        const mailResponse = await transporter.sendMail(mailOptions);
        if (mailResponse) {
            console.log("Email sent successfully");
            return mailResponse;
        } else {
            console.log("Error in sending email");
            return null; // Return null to indicate failure
        }
    } catch (err) {
        console.log("Error in EmailWorker :: mailSend", err);
        throw err; 
    }
}, {
    connection: redisConnection, 
    concurrency: 5, // Number of jobs processed concurrently   
});


emailWorker.on("completed", (job) => {
    console.log(`EmailWorker Job ${job.id} completed successfully`);
})

emailWorker.on("failed", (job, error) => {
    console.error(`EmailWorker Job ${job.id} failed with error: ${error.message}`);
})


module.exports = emailWorker