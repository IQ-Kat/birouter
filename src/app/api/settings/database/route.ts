import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/localDb";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { DatabaseSettings, DEFAULT_DATABASE_SETTINGS } from "@/types/databaseSettings";
import { getDatabaseStats } from "@/lib/db/stats";

type UserSettableKeys = keyof Omit<DatabaseSettings, "location" | "stats">;

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSettings();
    const dbStats = await getDatabaseStats();

    // Get current settings from key_value table (user settings)
    const userSettings: Partial<DatabaseSettings> = {};
    const allKeys = await getAllUserSettableKeys();

    for (const key of allKeys) {
      const value = settings[key as keyof typeof settings];
      if (value !== undefined) {
        (userSettings as Record<string, unknown>)[key] = value;
      }
    }

    // Merge with defaults and stats
    const merged: DatabaseSettings = {
      location: dbStats.location,
      logs: { ...DEFAULT_DATABASE_SETTINGS.logs, ...userSettings.logs },
      backup: { ...DEFAULT_DATABASE_SETTINGS.backup, ...userSettings.backup },
      cache: { ...DEFAULT_DATABASE_SETTINGS.cache, ...userSettings.cache },
      retention: { ...DEFAULT_DATABASE_SETTINGS.retention, ...userSettings.retention },
      aggregation: { ...DEFAULT_DATABASE_SETTINGS.aggregation, ...userSettings.aggregation },
      optimization: { ...DEFAULT_DATABASE_SETTINGS.optimization, ...userSettings.optimization },
      stats: dbStats.stats,
    };

    return NextResponse.json(merged);
  } catch (error) {
    console.error("Error getting database settings:", error);
    return NextResponse.json({ error: "Failed to load database settings" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getSettings();
    const userSettableKeys = await getUserSettableKeys();

    const validation = await validateBody(
      request,
      z
        .record(z.string(), z.unknown())
        .partial()
        .refine(
          (data) => {
            // Ensure only user-settable fields are present
            return Object.keys(data).every((key) => userSettableKeys.includes(key));
          },
          { message: "Attempting to set restricted fields" }
        )
    );

    if (isValidationFailure(validation)) {
      return validation;
    }

    const updates = validation.data;
    const updatedSettings = { ...settings };

    // Update only user-settable fields
    for (const [key, value] of Object.entries(updates)) {
      if (userSettableKeys.includes(key)) {
        (updatedSettings as Record<string, unknown>)[key] = value;
      }
    }

    await updateSettings(updatedSettings);

    // Return merged settings (GET response pattern)
    return await GET(request);
  } catch (error) {
    console.error("Error updating database settings:", error);
    return NextResponse.json({ error: "Failed to update database settings" }, { status: 500 });
  }
}

async function getUserSettableKeys(): Promise<UserSettableKeys[]> {
  // These are the fields that users are allowed to modify
  const allowedKeys: UserSettableKeys[] = [
    // Logs
    "logs",

    // Backup
    "backup",

    // Cache
    "cache",

    // Retention
    "retention",

    // Aggregation
    "aggregation",

    // Optimization
    "optimization",
  ];

  return allowedKeys;
}

async function getAllUserSettableKeys(): Promise<string[]> {
  const settableKeys: string[] = [];
  const userSettableSections = await getUserSettableKeys();

  // Get all nested keys under each user-settable section
  const allDefaultKeys = Object.keys(DEFAULT_DATABASE_SETTINGS) as (keyof DatabaseSettings)[];

  for (const section of userSettableSections) {
    if (section in DEFAULT_DATABASE_SETTINGS) {
      const sectionKeys = Object.keys(
        DEFAULT_DATABASE_SETTINGS[section as keyof typeof DEFAULT_DATABASE_SETTINGS]
      );
      sectionKeys.forEach((key) => {
        settableKeys.push(`${section}.${key}`);
      });
    }
  }

  return settableKeys;
}
