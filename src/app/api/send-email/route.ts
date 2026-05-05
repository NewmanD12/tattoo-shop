// app/api/send-email/route.ts
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const artist = (formData.get('artist') as string) || 'Any';
    const message = formData.get('message') as string;

    // Get all files from the form
    const fileAttachments = formData.getAll('files') as File[];

    // Process files into Resend-compatible attachment objects
    const attachmentPromises = fileAttachments.map(async (file): Promise<{
      filename: string;
      content: string;
      contentType?: string;
    } | null> => {
      // Skip empty or invalid files
      if (!file || file.size === 0 || !file.name) {
        return null;
      }

      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer.toString('base64'),
          contentType: file.type || undefined, // Helps email clients display correctly
        };
      } catch (err) {
        console.error(`Error processing file ${file.name}:`, err);
        return null;
      }
    });

    const attachmentsArray = await Promise.all(attachmentPromises);

    // Filter out null values and narrow the type for TypeScript
    const validAttachments = attachmentsArray.filter(
      (att): att is { filename: string; content: string; contentType?: string } => att !== null
    );

    const { data, error } = await resend.emails.send({
      from: 'Ink of the Mountains <bookings@inkofthemountains.com>', // Must be a verified sender in Resend
      to: ['bookings@inkofthemountains.com'], // Change if needed (can be array of multiple)
      subject: `New Tattoo Inquiry - ${name} (${artist})`,
      html: `
        <h2 style="color: #d97706;">New Message Received</h2>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Interested in:</strong> ${artist}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; margin: 1em 0;">${message || 'No message provided'}</p>
        ${
          validAttachments.length > 0
            ? `<p><strong>Reference Photos:</strong> ${validAttachments.length} file(s) attached</p>`
            : ''
        }
        <hr style="border-color: #4b5563;" />
        <p style="color: #9ca3af; font-size: 0.9em;">
          This message was sent from the Ink of the Mountains website contact form.
        </p>
      `,
      // Only include attachments if we have valid ones
      ...(validAttachments.length > 0 ? { attachments: validAttachments } : {}),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('Server error in send-email route:', err);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}