import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";


export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "No autorizado" },
      { status: 403 }
    );
  }

  const users = [
    {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      role: session.user.role,
      image: session.user.image,
    },
  ];

  return NextResponse.json({ users });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "No autorizado" },
      { status: 403 }
    );
  }

  const { userId, role } = await request.json();

  if (!userId || !role) {
    return NextResponse.json(
      { message: "Datos incompletos" },
      { status: 400 }
    );
  }

  console.log(`Usuario ${userId} cambiado a rol: ${role}`);

  return NextResponse.json({
    message: "Rol actualizado correctamente",
    userId,
    newRole: role,
  });
}