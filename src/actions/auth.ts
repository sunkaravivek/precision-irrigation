'use server';

import { db } from '@/lib/db';
import { createSession, clearSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(data: FormData) {
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  const user = await db.user.findUnique({ where: { email } });
  
  // Simple check for demo purposes
  if (!user || user.password !== password) {
    return { error: 'Invalid credentials. Use demo@example.com / password123' };
  }

  await createSession(user.id);
  return { success: true };
}

export async function register(data: FormData) {
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  try {
    const user = await db.user.create({
      data: { name, email, password },
    });
    await createSession(user.id);
    return { success: true };
  } catch (error) {
    return { error: 'Registration failed or email already exists.' };
  }
}

export async function logout() {
  await clearSession();
  redirect('/login');
}
