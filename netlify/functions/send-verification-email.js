import { Resend } from "resend"

const resend = new Resend("re_9eQ7USZd_P5HvQUBhY3K7zN6rdCpSmMyi")

export const handler = async (event, context) => {
  console.log("Function called with method:", event.httpMethod)
  console.log("Function body:", event.body)

  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    }
  }

  try {
    const { email, verificationCode, eventTitle } = JSON.parse(event.body)
    console.log("Parsed data:", { email, verificationCode, eventTitle })

    if (!email || !verificationCode || !eventTitle) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      }
    }

    console.log("Attempting to send email to:", email)
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [email],
      subject: "Verify Your Event Submission - Things to Do in the Hamptons",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Event Submission Verification</h2>
          <p>Thank you for submitting your event "<strong>${eventTitle}</strong>" to Things to Do in the Hamptons!</p>
          <p>To complete your submission, please enter this verification code:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 4px; margin: 0;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 24 hours.</p>
          <p>If you didn't submit this event, please ignore this email.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Things to Do in the Hamptons<br>
            Your comprehensive guide to events and activities in the Hamptons
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      console.error("Error details:", JSON.stringify(error, null, 2))
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Failed to send email: " + error.message,
        }),
      }
    }

    console.log("Email sent successfully! Message ID:", data.id)

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        messageId: data.id,
      }),
    }
  } catch (error) {
    console.error("Function error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    }
  }
}
