import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/reppy_api/profiles/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${session?.accessToken}`,
      },
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }
  return NextResponse.json(data);
}
