import { promises as fs } from "fs";
import path from "path";

import type {
  CreatePropertyInput,
  Property,
  UpdatePropertyInput,
} from "@/entities/property/model/property.types";

const dataDirectory = path.join(process.cwd(), "data");
const filePath = path.join(dataDirectory, "properties.json");

async function ensureDataFile() {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(dataDirectory, { recursive: true });
    await fs.writeFile(filePath, "[]", "utf-8");
  }
}

export async function readProperties(): Promise<Property[]> {
  await ensureDataFile();

  const fileContent = await fs.readFile(filePath, "utf-8");

  if (!fileContent.trim()) {
    return [];
  }

  const parsed: unknown = JSON.parse(fileContent);

  if (!Array.isArray(parsed)) {
    return [];
  }

  return parsed as Property[];
}

export async function writeProperties(properties: Property[]) {
  await ensureDataFile();

  await fs.writeFile(filePath, JSON.stringify(properties, null, 2), "utf-8");
}

export async function getPropertyById(id: string) {
  const properties = await readProperties();

  return properties.find((property) => property.id === id) ?? null;
}

export async function createProperty(input: CreatePropertyInput) {
  const properties = await readProperties();
  const now = new Date().toISOString();

  const newProperty: Property = {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    ...input,
  };

  const updatedProperties = [newProperty, ...properties];

  await writeProperties(updatedProperties);

  return newProperty;
}

export async function updateProperty(
  id: string,
  input: UpdatePropertyInput,
) {
  const properties = await readProperties();
  const index = properties.findIndex((property) => property.id === id);

  if (index === -1) {
    return null;
  }

  const updatedProperty: Property = {
    ...properties[index],
    ...input,
    updatedAt: new Date().toISOString(),
  };

  properties[index] = updatedProperty;

  await writeProperties(properties);

  return updatedProperty;
}

export async function deleteProperty(id: string) {
  const properties = await readProperties();
  const propertyExists = properties.some((property) => property.id === id);

  if (!propertyExists) {
    return false;
  }

  const filteredProperties = properties.filter((property) => property.id !== id);

  await writeProperties(filteredProperties);

  return true;
}