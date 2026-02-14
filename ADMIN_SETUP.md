# Admin Dashboard Setup Guide

This guide will help you set up and run the admin dashboard for the ecommerce seafood application.

## Prerequisites

- Firebase project with Admin SDK configured
- Node.js and npm installed
- Environment variables set up in `.env.local`

## Setup Steps

### 1. Install Dependencies

Make sure all dependencies are installed:

```bash
npm install
```

### 2. Migrate Products to Firestore

Before using the admin dashboard, you need to migrate the static products to Firestore:

```bash
npx tsx scripts/migrate-products.ts
```

This will:
- Read all products from `app/data/products.ts`
- Create documents in the Firestore `products` collection
- Add metadata like `isActive`, `createdAt`, `updatedAt`, etc.

**Note:** Run this only once. Running it again will duplicate products.

### 3. Create Admin User

To access the admin dashboard, you need at least one admin user.

#### Option A: Using Firebase Console

1. Go to Firebase Console → Authentication
2. Create a new user with email/password
3. Note the User UID
4. Go to Firebase Console → Firestore Database
5. Run this in the Firebase Console or create a script:

```javascript
// In Firebase Console → Firestore → Rules playground or use a Node script
const admin = require('firebase-admin');

// Initialize admin SDK (if not already initialized)

async function setAdminClaim(uid) {
  await admin.auth().setCustomUserClaims(uid, { admin: true });
  console.log('Admin claim set for user:', uid);
}

// Replace with your admin user's UID
setAdminClaim('YOUR_USER_UID_HERE');
```

#### Option B: Using the Admin SDK Script

Create a file `scripts/set-admin.ts`:

```typescript
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const auth = getAuth();

async function setAdminClaim(email: string) {
  try {
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`✓ Admin claim set for ${email} (UID: ${user.uid})`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
  }
}

// Replace with your admin user's email
const adminEmail = 'admin@example.com';
setAdminClaim(adminEmail)
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
```

Run it with:

```bash
npx tsx scripts/set-admin.ts
```

### 4. Update Firestore Security Rules

Update your Firestore security rules to restrict admin operations:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // Products: Public read, admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }

    // Orders: User can read their own, admin can read all
    match /orders/{orderId} {
      allow read: if request.auth != null &&
        (resource.data.userId == request.auth.uid || request.auth.token.admin == true);
      allow create: if request.auth != null;
      allow update: if request.auth != null && request.auth.token.admin == true;
      allow delete: if request.auth != null && request.auth.token.admin == true;
    }

    // Users: Can read/write own data, admin can read all
    match /users/{userId} {
      allow read: if request.auth != null &&
        (request.auth.uid == userId || request.auth.token.admin == true);
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Start the Development Server

```bash
npm run dev
```

### 6. Access the Admin Dashboard

1. Navigate to `http://localhost:3000/login`
2. Sign in with your admin credentials
3. You'll be redirected to `/admin/dashboard`

## Admin Dashboard Features

### Dashboard (`/admin/dashboard`)
- View total products, orders, and revenue statistics
- See recent orders
- View low stock alerts
- Quick actions to add products or view orders

### Products Management (`/admin/products`)
- View all products with search and filters
- Add new products with variants
- Edit existing products
- Delete (soft delete) products
- Manage pricing and stock for each variant

### Orders Management (`/admin/orders`)
- View all orders with status filters
- Search orders by number, customer name, or phone
- View order details
- Update order status with notes
- Update payment status
- View order timeline/history

## Troubleshooting

### "Unauthorized" or redirect to login
- Make sure the admin custom claim is set for your user
- Sign out and sign back in (tokens are cached)
- Check that Firebase Admin SDK is properly configured

### Products not showing
- Run the migration script: `npx tsx scripts/migrate-products.ts`
- Check Firebase Console → Firestore to verify products exist

### Can't create products
- Verify Firestore security rules allow admin writes
- Check browser console for errors
- Ensure all required fields are filled

### Toast notifications not showing
- Verify `Toaster` component is added to root layout
- Check browser console for errors

## Environment Variables

Ensure these are set in `.env.local`:

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_PRIVATE_KEY="your_private_key"
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
```

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use different Firebase projects** for development and production
3. **Limit admin users** - only give admin access to trusted users
4. **Monitor Firestore usage** to prevent abuse
5. **Enable MFA** for admin accounts in production
6. **Regularly audit** admin actions through Firestore logs

## Next Steps

- Set up email notifications for new orders
- Add analytics and reporting
- Implement inventory management
- Create customer management interface
- Add export functionality for orders/products
