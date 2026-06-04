import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import brevo from '@getbrevo/brevo';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from root directory
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Brevo API
if (!process.env.BREVO_API_KEY) {
  console.error('ERROR: BREVO_API_KEY is not set in .env file');
  console.error('Please add BREVO_API_KEY=your_key_here to your .env file in the root directory');
}

console.log('Brevo API Key loaded:', process.env.BREVO_API_KEY ? 'Yes' : 'No');

// Initialize Brevo API client
const defaultClient = brevo.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new brevo.TransactionalEmailsApi();

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    // Check if Brevo API key is configured
    if (!process.env.BREVO_API_KEY) {
      console.error('Brevo API key is not configured');
      return res.status(500).json({ 
        error: 'Email service is not configured. Please contact the administrator.',
        details: 'BREVO_API_KEY is missing'
      });
    }

    const { name, organization, email, role, message } = req.body;

    // Validate required fields
    if (!name || !email || !organization || !role || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, organization, role, and message are required' 
      });
    }

    const emailContent = `
      <h2>New Contact Form Submission - BAC Intelligence</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Organization:</strong> ${organization}</p>
      <p><strong>Role:</strong> ${role}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = 'New Contact Form Submission - BAC Intelligence';
    sendSmtpEmail.htmlContent = emailContent;
    sendSmtpEmail.sender = { name: 'BAC Intelligence', email: 'contact@bacintelligence.com' };
    sendSmtpEmail.to = [{ email: 'contact@bacintelligence.com', name: 'BAC Intelligence' }];
    sendSmtpEmail.replyTo = { email: email, name: name };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    
    console.log('Email sent successfully:', result);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status,
      response: error.response?.data
    });
    res.status(500).json({ 
      error: 'Failed to send email. Please try again later.',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

