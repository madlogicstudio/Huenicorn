import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://colormind.io/api/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "default",
      }),
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch palette" },
      { status: 500 }
    );
  }
}