import { promises as fs } from "fs";
import path from "path";

import {
  OPPORTUNITY_SOURCES,
  OPPORTUNITY_STATUSES,
  type CreateOpportunityInput,
  type Opportunity,
  type UpdateOpportunityInput,
} from "@/entities/opportunity/model/opportunity.types";
import type { Property } from "@/entities/property/model/property.types";

const dataDirectory = path.join(process.cwd(), "data");
const filePath = path.join(dataDirectory, "opportunities.json");

async function ensureDataFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(dataDirectory, { recursive: true });
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

export async function readOpportunities(): Promise<Opportunity[]> {
  await ensureDataFile();

  const fileContent = await fs.readFile(filePath, "utf-8");

  if (!fileContent.trim()) {
    return [];
  }

  const parsed: unknown = JSON.parse(fileContent);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed as Opportunity[];
}

export async function writeOpportunities(opportunities: Opportunity[]) {
  await ensureDataFile();

  await fs.writeFile(
    filePath,
    JSON.stringify(opportunities, null, 2),
    "utf-8",
  );
}

export async function getOpportunityById(id: string) {
  const opportunities = await readOpportunities();

  return opportunities.find((opportunity) => opportunity.id === id) ?? null;
}

/**
 * Builds a fresh opportunity record by combining the requested input with the
 * denormalized property fields. Storing title/location/price keeps the admin
 * view renderable even if the underlying property is later edited or removed.
 */
export async function createOpportunity(
  input: CreateOpportunityInput,
  property: Property,
): Promise<Opportunity> {
  const opportunities = await readOpportunities();
  const now = new Date().toISOString();

  const newOpportunity: Opportunity = {
    id: crypto.randomUUID(),
    propertyId: property.id,
    propertyTitle: property.title,
    propertyLocation: property.location,
    propertyPrice: property.price,
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    clientPhone: input.clientPhone,
    status: input.status ?? OPPORTUNITY_STATUSES.new,
    source: input.source ?? OPPORTUNITY_SOURCES.manual,
    appointmentId: input.appointmentId ?? null,
    estimatedValue:
      typeof input.estimatedValue === "number" && input.estimatedValue >= 0
        ? input.estimatedValue
        : property.price,
    notes: input.notes ?? "",
    createdAt: now,
    updatedAt: now,
  };

  await writeOpportunities([newOpportunity, ...opportunities]);

  return newOpportunity;
}

export async function updateOpportunity(
  id: string,
  input: UpdateOpportunityInput,
) {
  const opportunities = await readOpportunities();
  const index = opportunities.findIndex((opportunity) => opportunity.id === id);

  if (index === -1) {
    return null;
  }

  const updatedOpportunity: Opportunity = {
    ...opportunities[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  opportunities[index] = updatedOpportunity;

  await writeOpportunities(opportunities);

  return updatedOpportunity;
}

export async function deleteOpportunity(id: string) {
  const opportunities = await readOpportunities();
  const exists = opportunities.some((opportunity) => opportunity.id === id);

  if (!exists) {
    return false;
  }

  const filtered = opportunities.filter((opportunity) => opportunity.id !== id);

  await writeOpportunities(filtered);

  return true;
}
