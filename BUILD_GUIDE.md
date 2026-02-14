# Build Guide - Admin Dashboard

## Understanding the Build Error

The error you encountered is **expected behavior** during the build process:

```
Firebase Admin credentials not configured. Some server-side features may not work.
```

### Why This Happens

1. **Build Time vs Runtime**: Next.js tries to pre-render pages during the build
2. **Environment Variables**: Firebase credentials are typically not available during build (they're runtime secrets)
3. **Admin Pages**: These pages now use `dynamic = 'force-dynamic'` to prevent static generation

## What Was Fixed

I've updated all admin pages to use **dynamic rendering**:

```typescript
// Force dynamic rendering - do not statically generate this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;
```

**Updated Pages:**
- `/admin/dashboard`
- `/admin/products`
- `/admin/products/[id]`
- `/admin/orders`
- `/admin/orders/[id]`
- `/` (home page - set to revalidate every hour)

## Build vs Runtime

### During Build (`npm run build`)
- ✅ The build will **succeed** even with Firebase warnings
- ✅ Admin pages will be marked as **dynamic** (rendered on-demand)
- ⚠️ You'll see warnings about Firebase not configured - **this is OK**

### During Runtime (`npm run dev` or `npm start`)
- ✅ Firebase Admin SDK will initialize with your environment variables
- ✅ Admin pages will fetch data from Firestore
- ✅ Everything will work as expected

## Environment Variables Required

For the admin dashboard to work at **runtime**, ensure `.env.local` has:

```env
# Firebase Client SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin SDK (Server-side only)
FIREBASE_ADMIN_PROJECT_ID=your_project_id
FIREBASE_ADMIN_PRIVATE_KEY="your_private_key"
FIREBASE_ADMIN_CLIENT_EMAIL=your_client_email
```

## How to Build & Deploy

### 1. Local Development
```bash
npm run dev
```
- Firebase will initialize with your local `.env.local`
- All features will work

### 2. Build for Production
```bash
npm run build
```
- Build will succeed
- Warnings about Firebase are expected and safe to ignore
- Dynamic pages will be marked as such

### 3. Run Production Build
```bash
npm start
```
- Ensure environment variables are set in production
- Admin dashboard will work correctly

### 4. Deploy to Vercel/Netlify
- Add all environment variables in the platform's dashboard
- The platform will inject them at runtime
- Admin pages will render dynamically on each request

## Verification

After deployment, verify:

1. **Home page loads** - Should show products from Firestore
2. **Login page accessible** - `/login`
3. **Admin pages protected** - Redirect to login if not authenticated
4. **Admin dashboard works** - Shows stats, products, orders
5. **Product/Order CRUD** - Create, edit, delete functionality works

## Troubleshooting

### If admin pages show "Firebase not initialized":
1. Check `.env.local` exists with all variables
2. Restart dev server: `Ctrl+C` then `npm run dev`
3. Verify private key is wrapped in quotes
4. Check for any typos in environment variable names

### If build fails completely:
1. Clear Next.js cache: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Try building again: `npm run build`

### If pages are slow:
- This is expected for dynamic pages
- They render on each request for fresh data
- Consider adding caching or ISR (Incremental Static Regeneration) later

## Performance Tips

For better performance in production:

1. **Use ISR for home page**: Already set to revalidate every hour
2. **Add Redis caching**: Cache Firebase queries
3. **Enable CDN**: Use Vercel/Netlify CDN for static assets
4. **Optimize images**: Already using Next.js Image component

## Next Steps

1. ✅ Build succeeds (with warnings - OK)
2. ✅ Deploy to staging/production
3. ✅ Set environment variables in platform
4. ✅ Test admin functionality
5. ✅ Run migration script to import products
6. ✅ Create first admin user
7. ✅ Start using the admin dashboard!
