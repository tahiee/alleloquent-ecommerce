import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { productsData } from '../app/data/products';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();

async function migrateProducts() {
  console.log('Starting product migration...\n');

  const products = Object.values(productsData);
  const batch = db.batch();
  let successCount = 0;
  let errorCount = 0;

  for (const product of products) {
    try {
      const { id, ...productData } = product;

      // Add Firestore metadata
      const firestoreProduct = {
        ...productData,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'migration',
      };

      const docRef = db.collection('products').doc(id);
      batch.set(docRef, firestoreProduct);

      console.log(`✓ Prepared: ${product.name} (ID: ${id})`);
      successCount++;
    } catch (error) {
      console.error(`✗ Error preparing ${product.name}:`, error);
      errorCount++;
    }
  }

  try {
    await batch.commit();
    console.log('\n✓ Migration completed successfully!');
    console.log(`  - ${successCount} products migrated`);
    console.log(`  - ${errorCount} errors`);
  } catch (error) {
    console.error('\n✗ Batch commit failed:', error);
    throw error;
  }
}

// Run migration
migrateProducts()
  .then(() => {
    console.log('\nMigration complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nMigration failed:', error);
    process.exit(1);
  });
