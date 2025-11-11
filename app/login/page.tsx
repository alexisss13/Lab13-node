"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-sm w-full text-center border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Bienvenido 👋</h1>
        <p className="text-gray-600 mb-8">Inicia sesión para continuar</p>

        <div className="space-y-4">
          {/* Botón de Google */}
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

          {/* Botón de GitHub */}
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 transition-all text-white font-medium py-3 rounded-lg shadow-sm hover:shadow-md"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            Iniciar sesión con GitHub
          </button>
        </div>
      </div>
    </div>
  );
}