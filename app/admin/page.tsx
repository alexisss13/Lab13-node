"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "admin") {
      router.push("/dashboard");
    } else {
      fetchUsers();
    }
  }, [session, status, router]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (response.ok) {
        fetchUsers();
        alert("✅ Rol actualizado correctamente");
      }
    } catch (error) {
      console.error("Error al cambiar rol:", error);
      alert("❌ Error al cambiar el rol");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session || session.user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            🚫 Acceso Denegado
          </h1>
          <p className="text-gray-600">
            Debes ser administrador para acceder a esta página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Panel de Administración
            </h1>
            <p className="text-gray-600">
              Bienvenido, <span className="font-semibold">{session.user.name}</span>
            </p>
          </div>

          {/* Gestión de Usuarios */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              📋 Gestión de Usuarios
            </h2>
          </div>

          {/* Tabla de usuarios */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Usuario
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Rol Actual
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    Cambiar Rol
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={user.image || "/default-avatar.png"}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-800">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {user.role === "admin" ? "👑 Admin" : "👤 User"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={user.role}
                        onChange={(e) => changeUserRole(user.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="user">Usuario</option>
                        <option value="admin">Administrador</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {users.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No hay usuarios registrados
              </p>
            )}
          </div>

          {/* Botón volver */}
          <div className="mt-6">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition"
            >
              ← Volver al Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}