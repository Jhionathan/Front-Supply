import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const token = req.headers.get("authorization");

  const res = await fetch("http://r3suprimentos188810.winthor.cloudtotvs.com.br/api/purchases/v1/products", {
    headers: {
      Authorization: token || "",
      "Content-Type": "application/json",
    },
    cache: "no-store", 
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Erro ao buscar dados", status: res.status }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}