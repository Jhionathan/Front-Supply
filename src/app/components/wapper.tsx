"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, _hasHydrated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (_hasHydrated && !isAuthenticated) {
            router.replace("/login");
        }
    }, [_hasHydrated, isAuthenticated, router]);

    if (!_hasHydrated) {
        return (
            <div className="flex flex-col items-center justify-center min-h-scree text-black">
                <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-apple-blue-light rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-3 h-3 bg-apple-blue-light rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-3 h-3 bg-apple-blue-light rounded-full animate-bounce" />
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}