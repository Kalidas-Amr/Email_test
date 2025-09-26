import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { subject, message } = await req.json();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_SMTP_HOST,
      port: Number(process.env.NEXT_PUBLIC_SMTP_PORT),
      secure: false, // true for 465
      auth: {
        user: process.env.NEXT_PUBLIC_SMTP_USER,
        pass: process.env.NEXT_PUBLIC_SMTP_PASS,
      },
    });

    // Send email always to admin
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.NEXT_PUBLIC_SMTP_USER}>`,
      to: "kalidas@amrinnovations.com",
      subject,
      text: message,
    });

    return NextResponse.json({ success: true, message: "✅ Email sent successfully" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
