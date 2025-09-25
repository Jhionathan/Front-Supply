
"use client";

import { useState } from "react";
import { Menu, X, ShoppingCart, Bell } from "lucide-react";
import Image from "next/image";
import Container from "./Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="h-16 bg-gradient-to-b from-apple-blue-light to-white shadow-sm flex items-center px-6">
            <Container>

                <div className="flex items-center">
                    <Image src="/logoCleaner.png" alt="Logo" width={120} height={40} className="h-8 w-auto" />
                </div>


                <nav className="hidden md:flex ml-10 space-x-6 text-sm font-medium text-gray-700">
                    <Link href="#" className="hover:border-b-blue-400">Pedidos</Link>
                    <Link href="#" className="hover:text-blue-600">Histórico</Link>
                    <Link href="#" className="hover:text-blue-600">Perfil</Link>
                </nav>


                <div className="ml-auto flex items-center">
                    <Button variant={"ghost"} className="relative text-gray-600 hover:text-blue-600 cursor-pointer">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </Button>
                    <Button variant={"ghost"} className="text-gray-600 hover:text-blue-600 cursor-pointer">
                        <ShoppingCart size={20} />
                    </Button>

                    <Button variant={"ghost"}
                        className="md:hidden text-gray-600 hover:text-blue-600"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>


                {mobileOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col space-y-4 p-4 md:hidden">
                        <Link href="#" className="hover:text-blue-600">Pedidos</Link>
                        <Link href="#" className="hover:text-blue-600">Histórico</Link>
                        <Link href="#" className="hover:text-blue-600">Perfil</Link>
                    </div>
                )}
            </Container>
        </header>
    );
}