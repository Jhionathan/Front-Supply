// components/Header.tsx
"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart, Bell } from "lucide-react"; // ícones lucide (leve e bonito)
import Image from "next/image";
import Container from "./Container";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="h-16 bg-gradient-to-b from-apple-blue-light to-white shadow-sm flex items-center px-6">
            <Container>

                <div className="flex items-center">
                    <Image src="/logoCleaner.png" alt="Logo" width={120} height={40} className="h-8 w-auto" />
                </div>


                <nav className="hidden md:flex ml-10 space-x-6 text-sm font-medium text-gray-700">
                    <a href="#" className="hover:text-blue-600">Pedidos</a>
                    <a href="#" className="hover:text-blue-600">Histórico</a>
                    <a href="#" className="hover:text-blue-600">Perfil</a>
                </nav>


                <div className="ml-auto flex items-center space-x-4">
                    <button className="relative text-gray-600 hover:text-blue-600">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </button>
                    <button className="text-gray-600 hover:text-blue-600">
                        <ShoppingCart size={20} />
                    </button>

                    <button
                        className="md:hidden text-gray-600 hover:text-blue-600"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>


                {mobileOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col space-y-4 p-4 md:hidden">
                        <a href="#" className="text-gray-700 hover:text-blue-600">Pedidos</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Histórico</a>
                        <a href="#" className="text-gray-700 hover:text-blue-600">Perfil</a>
                    </div>
                )}
            </Container>
        </header>
    );
}