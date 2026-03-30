'use server';

import { db } from '@/lib/db';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createFarm(data: FormData) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  try {
    const name = data.get('name') as string;
    const location = data.get('location') as string;
    const area = parseFloat(data.get('area') as string);
    const cropType = data.get('cropType') as string;
    const soilType = data.get('soilType') as string;
    const irrigationMethod = data.get('irrigationMethod') as string;

    await db.farm.create({
      data: {
        userId: session.userId as string,
        name,
        location,
        area,
        cropType,
        soilType,
        irrigationMethod,
      },
    });

    revalidatePath('/dashboard/farms');
    revalidatePath('/dashboard/simulation');
    return { success: true };
  } catch (err) {
    return { error: 'Failed to create farm' };
  }
}

export async function deleteFarm(id: string) {
  const session = await getSession();
  if (!session) return { error: 'Unauthorized' };

  try {
    await db.farm.delete({
      where: {
        id,
        userId: session.userId as string, // Ensure ownership
      },
    });

    revalidatePath('/dashboard/farms');
    revalidatePath('/dashboard/simulation');
    return { success: true };
  } catch (err) {
    return { error: 'Failed to delete farm' };
  }
}
