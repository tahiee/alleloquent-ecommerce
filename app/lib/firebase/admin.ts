import admin from "firebase-admin";

// Initialize Firebase Admin SDK for server-side operations
function initializeFirebaseAdmin() {
  if (admin.apps.length === 0) {
    // Check if we're in a server environment
    if (typeof window === "undefined") {
      try {
        const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
        const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(
          /\\n/g,
          "\n"
        );
        const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

        if (!projectId || !privateKey || !clientEmail) {
          console.warn(
            "Firebase Admin credentials not configured. Some server-side features may not work."
          );
          console.warn(
            "Please check your .env.local file and ensure these variables are set:"
          );
          console.warn("- FIREBASE_ADMIN_PROJECT_ID");
          console.warn("- FIREBASE_ADMIN_PRIVATE_KEY");
          console.warn("- FIREBASE_ADMIN_CLIENT_EMAIL");
          return null;
        }

        // Check for placeholder values
        if (privateKey.includes("ABC12345") || privateKey.length < 100) {
          console.error(
            "Firebase Admin private key appears to be a placeholder!"
          );
          console.error(
            "Please download the real service account key from Firebase Console"
          );
          console.error("See GET_FIREBASE_CREDENTIALS.md for instructions");
          return null;
        }

        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            privateKey,
            clientEmail,
          }),
        });

        console.log("Firebase Admin initialized successfully");
      } catch (error) {
        console.error("Error initializing Firebase Admin:", error);
        return null;
      }
    }
  }

  return admin;
}

// Initialize on module load
const adminSDK = initializeFirebaseAdmin();

// Export Firestore and Auth instances
export const adminDb = adminSDK?.firestore();
export const adminAuth = adminSDK?.auth();

// Export db as an alias for adminDb (for compatibility)
export const db = adminDb;

// Helper function to set custom claims for admin users
export async function setAdminClaim(uid: string, isAdmin: boolean) {
  if (!adminAuth) {
    throw new Error("Firebase Admin not initialized");
  }

  try {
    await adminAuth.setCustomUserClaims(uid, { admin: isAdmin });
    console.log(`Admin claim set for user ${uid}: ${isAdmin}`);
    return true;
  } catch (error) {
    console.error("Error setting admin claim:", error);
    throw error;
  }
}

// Helper function to verify admin access
export async function verifyAdminAccess(uid: string): Promise<boolean> {
  if (!adminAuth) {
    console.warn("Firebase Admin not initialized, cannot verify admin access");
    return false;
  }

  try {
    const user = await adminAuth.getUser(uid);
    return user.customClaims?.admin === true;
  } catch (error) {
    console.error("Error verifying admin access:", error);
    return false;
  }
}

// Helper function to create user document in Firestore
export async function createUserDocument(userData: {
  uid: string;
  email: string;
  displayName: string;
  role?: "customer" | "admin";
}) {
  if (!adminDb) {
    throw new Error("Firebase Admin Firestore not initialized");
  }

  const userRef = adminDb.collection("users").doc(userData.uid);

  await userRef.set({
    uid: userData.uid,
    email: userData.email,
    displayName: userData.displayName,
    role: userData.role || "customer",
    isActive: true,
    emailVerified: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  return userRef.id;
}

export default adminSDK;
