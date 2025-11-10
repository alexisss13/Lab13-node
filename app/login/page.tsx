"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-sm w-full text-center border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Bienvenido 👋</h1>
        <p className="text-gray-600 mb-8">Inicia sesión para continuar</p>

        <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:border-gray-400 transition-all text-gray-700 font-medium py-3 rounded-lg shadow-sm hover:shadow-md"
        >
        <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Google_Favicon_2025.svg/250px-Google_Favicon_2025.svg.png"
            alt="Google logo"
            width={24}
            height={24}
            className="rounded-sm"
        />
        Iniciar sesión con Google
        </button>

      </div>
    </div>
  );
}
