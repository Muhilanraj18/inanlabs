import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please provide a valid email address"),
  enquiryType: z.enum([
    "partnership",
    "engineering",
    "product_inquiry",
    "research",
    "other",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          errors: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, enquiryType, message } = result.data;

    // Log the valid contact request server-side
    console.log("[INAN LABS CONTACT API]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      enquiryType,
      messageLength: message.length,
    });

    return NextResponse.json({
      success: true,
      message: "Transmission received. The INAN LABS engineering team will review your inquiry.",
      ticketId: `INAN-${Date.now().toString(36).toUpperCase()}`,
    });
  } catch (error) {
    console.error("[INAN LABS CONTACT ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Failed to process transmission." },
      { status: 500 }
    );
  }
}
