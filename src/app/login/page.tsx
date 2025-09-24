"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { setToken } = useAuthStore();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email e senha são obrigatórios");
      return;
    }

    setIsLoading(true);

    try {
      const { access_token } = await login(email, password);
      setToken(access_token);
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        const status = (err as unknown as { response: { status: number } })?.response?.status;
        if (status === 401) setError("Email ou senha incorretos");
        else if (status === 429) setError("Muitas tentativas. Tente novamente em alguns minutos");
        else if (err.message === "Network Error") setError("Falha de conexão. Verifique sua internet");
        else setError("Erro ao fazer login. Tente novamente");
      } else {
        setError("Erro ao fazer login. Tente novamente");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-light text-slate-800">
              Entrar
            </h1>
            <p className="text-slate-500 text-sm">
              Acesse sua conta
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            <div className="space-y-1">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                className="h-12 border-0 bg-slate-50 rounded-xl px-4 text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all"
              />
            </div>

            <div className="space-y-1">
              <Input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                className="h-12 border-0 bg-slate-50 rounded-xl px-4 text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors" 
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}