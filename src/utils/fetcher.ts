import { useAuthStore } from "@/store/auth";

export const useAuthedFetcher = () => {
  const token = useAuthStore((s) => s.token);

  const fetcher = async (url: string) => {
    if (!token) throw new Error("No token available");

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Erro na API");
    }

    return res.json();
  };
  console.log("Token no fetcher:", token);
  return fetcher;
};