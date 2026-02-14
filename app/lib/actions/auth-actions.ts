"use server";

import { adminAuth } from "../firebase/admin";

export async function verifySession(idToken: string) {
  try {
    if (!adminAuth) {
      throw new Error("Firebase Admin Auth not initialized");
    }
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
      isAdmin: !!decodedToken.admin,
    };
  } catch (error) {
    console.error("Error verifying session:", error);
    return null;
  }
}

export async function setAdminClaimAction(uid: string) {
  try {
    if (!adminAuth) {
      throw new Error("Firebase Admin Auth not initialized");
    }
    await adminAuth.setCustomUserClaims(uid, { admin: true });
    return { success: true };
  } catch (error) {
    console.error("Error setting admin claim:", error);
    return { success: false, error: "Failed to set admin claim" };
  }
}

export async function verifyAdminAccess(idToken: string) {
  try {
    if (!adminAuth) {
      throw new Error("Firebase Admin Auth not initialized");
    }
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (!decodedToken.admin) {
      throw new Error("User is not an admin");
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email,
    };
  } catch (error) {
    console.error("Error verifying admin access:", error);
    throw error;
  }
}

export async function createUserDocument(
  uid: string,
  email: string,
  name?: string
) {
  try {
    const { adminDb: db } = await import("../firebase/admin");

    if (!db) {
      throw new Error("Firebase Admin Firestore not initialized");
    }

    await db
      .collection("users")
      .doc(uid)
      .set({
        email,
        name: name || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        role: "customer",
      });

    return { success: true };
  } catch (error) {
    console.error("Error creating user document:", error);
    return { success: false, error: "Failed to create user document" };
  }
}
