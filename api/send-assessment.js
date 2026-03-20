import { Resend } from 'resend';

const COACH_EMAIL = 'kristi@kristicattcoaching.com';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { pdfBase64, clientName, clientEmail } = req.body;

    if (!pdfBase64 || !clientName) {
      return res.status(400).json({ error: 'Missing required fields: pdfBase64 and clientName are required' });
    }

    console.log(`Sending assessment email for: ${clientName} (${clientEmail || 'no email'})`);
    console.log(`PDF base64 length: ${pdfBase64.length}`);

    const { data, error } = await resend.emails.send({
      from: 'KC Coaching <onboarding@resend.dev>',
      to: [COACH_EMAIL],
      subject: `Life Coaching Assessment - ${clientName}`,
      replyTo: clientEmail || undefined,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c5f4a;">New Life Coaching Assessment</h2>
          <p>A new assessment has been submitted:</p>
          <ul style="line-height: 1.8;">
            <li><strong>Client Name:</strong> ${clientName}</li>
            <li><strong>Client Email:</strong> ${clientEmail || 'Not provided'}</li>
            <li><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</li>
          </ul>
          <p>The completed assessment is attached as a PDF.</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px;">This email was sent from the KC Coaching website assessment form.</p>
        </div>
      `,
      attachments: [
        {
          filename: `Life_Coaching_Assessment_${clientName.replace(/\s+/g, '_')}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    if (error) {
      console.error('Resend API error:', JSON.stringify(error));
      return res.status(500).json({ error: error.message, details: error });
    }

    console.log('Email sent successfully:', data.id);
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Server error:', err.message, err.stack);
    return res.status(500).json({ error: err.message || 'Failed to send email' });
  }
}
