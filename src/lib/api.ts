
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type AuthResponse = {
  access_token: string;
};

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Login falhou: ${errorData.message || 'Erro desconhecido'}`);
  }

  const data = await res.json();
  console.log(data);
  return data; 
}