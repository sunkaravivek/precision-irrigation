"use server";

import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { runSimulation, SimulationInput, SimulationOutput } from "@/lib/simulation/state-engine";
import { revalidatePath } from "next/cache";

export async function executeSimulation(input: SimulationInput, farmId: string) {
  const session = await getSession();
  if (!session) return { error: "Unauthorized" };

  try {
    // 1. Run Pure Function Simulation
    const result = runSimulation(input);

    const { irrigationMethod, ...prismaInput } = input;

    // 2. Persist History
    const saved = await db.simulation.create({
      data: {
        userId: session.userId as string,
        farmId,
        ...prismaInput,
        currentState: result.currentState,
        nextState: result.nextState,
        irrigationRequired: result.irrigationRequired,
        recommendedWater: result.recommendedWater,
        efficiencyScore: result.efficiencyScore,
        riskLevel: result.riskLevel,
        explanation: result.explanation,
      }
    });

    // 3. Trigger cache revalidation
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/history");
    
    return { success: true, result, id: saved.id };
  } catch(e) {
    console.error(e);
    return { error: "An error occurred while compiling the simulation." };
  }
}
