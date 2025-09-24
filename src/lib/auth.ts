// import { useAuthStore } from "@/store/auth";
// import type { AuthResponse } from "@/types/auth";


// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export async function login(email: string, password: string): Promise<AuthResponse> {
//     const res = await fetch(`${apiUrl}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
  
//     if (!res.ok) throw new Error("Login falhou");
  
//     return res.json() as Promise<AuthResponse>;
//   }