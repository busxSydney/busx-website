import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { name, email, phone, service, message, tripType, startFrom, endTo, date, time, company } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          error: 'Missing required fields' 
        }),
      };
    }

    // Create HTML email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0D2E4D; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
            .intro { margin-bottom: 20px; color: #444; }
            .field { margin-bottom: 15px; padding: 10px; background: white; border-radius: 4px; }
            .label { font-weight: bold; color: #0D2E4D; display: block; margin-bottom: 5px; }
            .value { color: #333; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .highlight { background-color: #FF8B00; color: white; padding: 2px 8px; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New booking enquiry – Bus-X</h1>
            </div>
            <div class="content">
              <p class="intro">
                You have received a new booking enquiry submitted via the Bus-X website. The details are provided below for your review and follow-up.
              </p>

              <h2 style="color: #0D2E4D; margin-top: 0;">Customer details</h2>
              
              <div class="field">
                <span class="label">Name</span>
                <span class="value">${name}</span>
              </div>
              
              <div class="field">
                <span class="label">Email</span>
                <span class="value"><a href="mailto:${email}">${email}</a></span>
              </div>
              
              <div class="field">
                <span class="label">Phone</span>
                <span class="value"><a href="tel:${phone}">${phone}</a></span>
              </div>

              <h2 style="color: #0D2E4D;">Trip details</h2>
              
              ${tripType ? `
              <div class="field">
                <span class="label">Trip type</span>
                <span class="value"><span class="highlight">${tripType === 'single' ? 'Single trip' : 'Round trip'}</span></span>
              </div>
              ` : ''}
              
              ${startFrom ? `
              <div class="field">
                <span class="label">Departure location</span>
                <span class="value">${startFrom}</span>
              </div>
              ` : ''}
              
              ${endTo ? `
              <div class="field">
                <span class="label">Destination</span>
                <span class="value">${endTo}</span>
              </div>
              ` : ''}
              
              ${date ? `
              <div class="field">
                <span class="label">Date</span>
                <span class="value">${new Date(date).toLocaleDateString('en-AU', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              ` : ''}
              
              ${time ? `
              <div class="field">
                <span class="label">Time</span>
                <span class="value">${time}</span>
              </div>
              ` : ''}
              
              ${company ? `
              <div class="field">
                <span class="label">Number of passengers</span>
                <span class="value"><strong>${company}</strong></span>
              </div>
              ` : ''}
              
              ${service ? `
              <div class="field">
                <span class="label">Service type</span>
                <span class="value">${service}</span>
              </div>
              ` : ''}

              <h2 style="color: #0D2E4D;">Customer message</h2>
              
              <div class="field">
                <span class="label">Message</span>
                <div class="value" style="margin-top: 8px; white-space: pre-wrap;">${message}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>This message was generated automatically from the Bus-X website contact form.</p>
              <p>If you wish to respond, you can reply directly to this email and it will go to the customer.</p>
              <p style="color: #999; font-size: 11px;">Received on ${new Date().toLocaleString('en-AU', { 
                timeZone: 'Australia/Sydney'
              })}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
New booking enquiry – Bus-X

You have received a new booking enquiry submitted via the Bus-X website. The details are provided below.

Customer details:
Name: ${name}
Email: ${email}
Phone: ${phone}

Trip details:
${tripType ? `Trip type: ${tripType === 'single' ? 'Single trip' : 'Round trip'}\n` : ''}${startFrom ? `Departure location: ${startFrom}\n` : ''}${endTo ? `Destination: ${endTo}\n` : ''}${date ? `Date: ${date}\n` : ''}${time ? `Time: ${time}\n` : ''}${company ? `Number of passengers: ${company}\n` : ''}${service ? `Service type: ${service}\n` : ''}
Customer message:
${message}

---
This message was generated automatically from the Bus-X website contact form.
Received on ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Bus-X Bookings <onboarding@resend.dev>',
      to: ['info@busx.com.au', 'shidiqadm@gmail.com'],
      replyTo: email,
      subject: `New booking enquiry from ${name}`,
      html: htmlContent,
      text: textContent,
    });

    console.log('Email sent successfully:', data);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Email sent successfully',
        id: data.id 
      }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email' 
      }),
    };
  }
};
