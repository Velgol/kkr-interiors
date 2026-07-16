/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoints
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, phone, email, propertyType, budget, message, service } = req.body;

      if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Name, email, and phone are required.' });
      }

      console.log('Received contact inquiry:', { name, phone, email, propertyType, budget, service });

      // Retrieve credentials from environment variables
      const gmailUser = process.env.GMAIL_USER;
      const gmailPass = process.env.GMAIL_PASS;
      const adminEmail = process.env.ADMIN_GMAIL || 'shubham.sbg77@gmail.com';

      const dateStr = new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });
      const timeStr = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });

      let emailStatus = 'Simulated (Sandbox Mode)';

      if (gmailUser && gmailPass) {
        try {
          // Setup real SMTP transport with Gmail or another mailer
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: gmailUser,
              pass: gmailPass,
            },
          });

          // 1. Send inquiry to Admin (shubham.sbg77@gmail.com or customized)
          const adminMailOptions = {
            from: `"KKR Interiors Lead" <${gmailUser}>`,
            to: adminEmail,
            subject: `New Premium Design Enquiry - ${name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37; padding: 20px; background-color: #0B0B0B; color: #FFFFFF;">
                <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">KKR Interiors - New Lead Enquiry</h2>
                <p><strong>Date:</strong> ${dateStr} at ${timeStr}</p>
                <hr style="border-color: #A67C00;" />
                <table style="width: 100%; text-align: left; margin-top: 15px;">
                  <tr><th style="padding: 5px; color: #E6C77B;">Name:</th><td style="padding: 5px;">${name}</td></tr>
                  <tr><th style="padding: 5px; color: #E6C77B;">Phone:</th><td style="padding: 5px;">${phone}</td></tr>
                  <tr><th style="padding: 5px; color: #E6C77B;">Email:</th><td style="padding: 5px;">${email}</td></tr>
                  <tr><th style="padding: 5px; color: #E6C77B;">Property Type:</th><td style="padding: 5px;">${propertyType || 'N/A'}</td></tr>
                  <tr><th style="padding: 5px; color: #E6C77B;">Service Required:</th><td style="padding: 5px;">${service || 'N/A'}</td></tr>
                  <tr><th style="padding: 5px; color: #E6C77B;">Budget Range:</th><td style="padding: 5px;">${budget || 'N/A'}</td></tr>
                </table>
                <div style="margin-top: 20px; padding: 15px; background-color: #1A1A1A; border-left: 3px solid #D4AF37;">
                  <strong style="color: #E6C77B;">Message:</strong>
                  <p style="margin-top: 5px; line-height: 1.6;">${message || 'No additional message provided.'}</p>
                </div>
                <div style="margin-top: 30px; text-align: center; font-size: 11px; color: #888;">
                  This is an automated request generated from the KKR Interiors Luxury Applet.
                </div>
              </div>
            `,
          };

          // 2. Send confirmation to Customer
          const customerMailOptions = {
            from: `"KKR Interiors" <${gmailUser}>`,
            to: email,
            subject: 'Thank you for contacting KKR Interiors - Designing Your Dreams',
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37; padding: 25px; background-color: #F8F6F2; color: #333333;">
                <div style="text-align: center; margin-bottom: 20px;">
                  <h1 style="color: #0B0B0B; margin: 0; font-family: 'Times New Roman', Times, serif; font-size: 28px; letter-spacing: 2px;">KKR INTERIORS</h1>
                  <span style="color: #D4AF37; font-size: 12px; text-transform: uppercase; letter-spacing: 3px;">Designing Your Dreams</span>
                </div>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for reaching out to <strong>KKR Interiors</strong>. We have received your design enquiry and our lead architect will connect with you within the next 24 business hours to understand your requirements.</p>
                
                <div style="background-color: #FFFFFF; padding: 15px; border: 1px solid #E6C77B; margin: 20px 0; border-radius: 4px;">
                  <h3 style="margin-top: 0; color: #D4AF37; border-bottom: 1px solid #F8F6F2; padding-bottom: 5px;">Enquiry Summary</h3>
                  <p style="margin: 5px 0;"><strong>Service:</strong> ${service || 'Bespoke Premium Design'}</p>
                  <p style="margin: 5px 0;"><strong>Property Type:</strong> ${propertyType || 'N/A'}</p>
                  <p style="margin: 5px 0;"><strong>Budget Category:</strong> ${budget || 'N/A'}</p>
                </div>

                <p>In the meantime, feel free to browse our premium portfolio gallery and conceptual layouts on our website. You can also chat directly with our consultants via WhatsApp at your convenience.</p>
                
                <p style="margin-top: 30px;">Warm regards,</p>
                <p style="margin: 0; font-weight: bold; color: #0B0B0B;">The KKR Interiors Team</p>
                <p style="margin: 0; font-size: 12px; color: #666;">Bengaluru, Karnataka</p>
                <p style="margin: 0; font-size: 11px; color: #999;">Address: No. 876, RR Nagar, Bengaluru - 560098</p>
              </div>
            `,
          };

          await transporter.sendMail(adminMailOptions);
          await transporter.sendMail(customerMailOptions);
          emailStatus = 'Sent successfully via SMTP';
          console.log('Real emails sent successfully to Admin & Customer!');
        } catch (mailError) {
          console.error('Nodemailer SMTP failed, falling back to simulation:', mailError);
          emailStatus = 'Simulation Fallback (SMTP Error)';
        }
      } else {
        console.log(`[SIMULATED EMAIL] SMTP credentials not set in environment.
--------------------------------------------------
Admin Email Sent To: ${adminEmail}
Subject: New Premium Design Enquiry - ${name}
Content Profile: Property: ${propertyType}, Budget: ${budget}, Message: ${message}

Customer Confirmation Sent To: ${email}
Subject: Thank you for contacting KKR Interiors
--------------------------------------------------`);
      }

      return res.status(200).json({
        success: true,
        message: 'Enquiry submitted successfully!',
        details: {
          name,
          phone,
          email,
          createdAt: new Date().toISOString(),
          emailStatus
        }
      });
    } catch (error: any) {
      console.error('Error handling contact API:', error);
      return res.status(500).json({ error: error.message || 'An error occurred.' });
    }
  });

  // Serve static files in production or use Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[KKR Interiors Backend] Server running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
}

startServer();
