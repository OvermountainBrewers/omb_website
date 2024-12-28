import { NextResponse } from "next/server";
import { Resend } from "resend";

// Make sure to validate the environment variable
if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    console.log("Received form data:", {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Add validation for required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Honeypot check
    if (formData.get("website")) {
      return NextResponse.json({ success: true });
    }

    console.log("Attempting to send email...");
    const result = await resend.emails.send({
      from: "contact@overmountainbrewers.com",
      to: "ombrewers@gmail.com",
      subject: `New Contact Form Submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Message: ${message}
            `,
    });
    console.log("Email send result:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error sending email" },
      { status: 500 },
    );
  }
}
