import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}auth/users/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        email: body.email,
        password: body.password,
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data }, { status: response.status });
  }

  return NextResponse.json(data);
}
