"use client";

import useSWR from "swr";
import { useAuthedFetcher } from "@/utils/fetcher";

interface Produto {
    id: number;
    nome: string;
    sku: string;
    preco: number;
}

export default function ProdutosPage() {
  const fetcher = useAuthedFetcher();

  const { data, error, isLoading } = useSWR("/api/produtos", fetcher);

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar produtos</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {data?.map((p: Produto) => (
        <div key={p.id} className="border rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-lg font-semibold">{p.nome}</h2>
          <p className="text-sm text-gray-500">{p.sku}</p>
          <p className="text-blue-600 font-bold">R$ {p.preco.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}