"use server"

import { db } from "@/lib/db";

export async function getCropDataset() {
  return await db.cropDataset.findMany();
}

export async function getSoilDataset() {
  return await db.soilDataset.findMany();
}

export async function getWeatherDataset() {
  return await db.weatherDataset.findMany({
    orderBy: { date: 'desc' }
  });
}

export async function getIrrigationDataset() {
  return await db.irrigationDataset.findMany();
}
