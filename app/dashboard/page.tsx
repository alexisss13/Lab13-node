"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-semibold text-gray-600">
        Cargando...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center border">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No tienes acceso
          </h2>
          <p className="text-gray-600">Por favor, inicia sesión primero.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md text-center border">
        <div className="flex flex-col items-center">
          <Image
            src={session.user?.image || "/default-avatar.png"}
            alt="Foto de perfil"
            width={100}
            height={100}
            className="rounded-full shadow-md"
          />

          <h1 className="mt-4 text-3xl font-bold text-gray-800">
            Hola, {session.user?.name}
          </h1>

          <p className="text-gray-600 mt-1">{session.user?.email}</p>

          <button
            onClick={() => signOut()}
            className="mt-6 px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-all shadow-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
