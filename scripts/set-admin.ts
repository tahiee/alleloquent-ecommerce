import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnvLocal() {
  const envPath = join(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex < 0) continue;

    const key = line.slice(0, separatorIndex).trim();
    let value = line.slice(separatorIndex + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

if (!getApps().length) {
  if (!process.env.FIREBASE_ADMIN_PROJECT_ID) {
    throw new Error(
      "Missing FIREBASE_ADMIN_PROJECT_ID. Check .env.local values."
    );
  }
  if (!process.env.FIREBASE_ADMIN_CLIENT_EMAIL) {
    throw new Error(
      "Missing FIREBASE_ADMIN_CLIENT_EMAIL. Check .env.local values."
    );
  }
  if (!process.env.FIREBASE_ADMIN_PRIVATE_KEY) {
    throw new Error(
      "Missing FIREBASE_ADMIN_PRIVATE_KEY. Check .env.local values."
    );
  }

  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const auth = getAuth();

type FirebaseAuthError = {
  code?: string;
  message?: string;
};

async function setAdminClaim(email: string) {
  try {
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`Admin claim set for ${email} (UID: ${user.uid})`);
    console.log(
      "User needs to sign out and sign back in for changes to take effect."
    );
  } catch (error: unknown) {
    const authError = error as FirebaseAuthError;
    if (authError.code === "auth/user-not-found") {
      console.error(`User not found: ${email}`);
      console.log("Please create this user in Firebase Console first.");
    } else {
      console.error(
        "Error setting admin claim:",
        authError.message ?? "Unknown error"
      );
    }
    throw error;
  }
}

const adminEmail = process.argv[2] || "admin@example.com";

console.log(`Setting admin claim for: ${adminEmail}\n`);

setAdminClaim(adminEmail)
  .then(() => {
    console.log("\nAdmin setup complete!");
    process.exit(0);
  })
  .catch(() => {
    console.log("\nAdmin setup failed!");
    process.exit(1);
  });
