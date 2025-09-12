"use client";

import Orb from "@/components/Orb";
import { useState } from "react";
import { login } from "@/lib/api";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import PrismaticBurst from "@/components/PrismaticBurst";
import Threads from "@/components/Threads";
import Image from "next/image";

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
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Email ou senha incorretos");
      } else if (err.response?.status === 429) {
        setError("Muitas tentativas. Tente novamente em alguns minutos");
      } else {
        setError("Erro ao fazer login. Tente novamente");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black">

      <div className="absolute inset-0 z-0">
        <Image src={'/wp2.png'} width={2048} height={1536} alt="Wallpaper" className="object-cover" />
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg shadow bg-white">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Fazer login
            </h1>
            <p className="text-sm text-muted-foreground">
              Digite seu email e senha para acessar sua conta
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}