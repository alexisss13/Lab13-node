"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Bienvenido a tu App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Autenticación con Google y GitHub
        </p>

        {session ? (
          <div className="space-x-4">
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Ir al Dashboard
            </Link>
            {session.user.role === "admin" && (
              <Link
                href="/admin"
                className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition"
              >
                Panel de Admin
              </Link>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </div>
  );
}