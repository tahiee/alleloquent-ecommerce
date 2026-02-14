# How to Get Firebase Admin SDK Credentials

## Step-by-Step Guide

### 1. Go to Firebase Console
Open: https://console.firebase.google.com/

### 2. Select Your Project
Click on **"hacksmit-f8865"**

### 3. Access Project Settings
1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Click **"Project settings"**

### 4. Go to Service Accounts Tab
1. Click the **"Service accounts"** tab at the top
2. You'll see a section titled "Firebase Admin SDK"

### 5. Generate New Private Key
1. Scroll down to find the **"Generate new private key"** button
2. Click it
3. A dialog will appear - click **"Generate key"**
4. A JSON file will download to your computer

### 6. Open the Downloaded JSON File
The file will be named something like:
`hacksmit-f8865-firebase-adminsdk-xxxxx-xxxxxxxxxx.json`

It will look like this:
```json
{
  "type": "service_account",
  "project_id": "hacksmit-f8865",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIB...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@hacksmit-f8865.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "..."
}
```

### 7. Update Your `.env.local` File

Copy the values from the JSON file to your `.env.local`:

```env
# Firebase Admin SDK (Server-side only)
FIREBASE_ADMIN_PROJECT_ID=hacksmit-f8865
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIB...[FULL KEY HERE]...\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@hacksmit-f8865.iam.gserviceaccount.com
```

**IMPORTANT:**
- Keep the private key wrapped in **double quotes**
- The `\n` characters should stay in the key
- The client email is a **service account email** (not your personal email)

### 8. Complete `.env.local` Example

Your complete `.env.local` should look like:

```env
# Firebase Client SDK (Public - safe to expose)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBqhZ_PywfdHrBKcU8KOCc_gt_c8dZfdgw
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=hacksmit-f8865.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=hacksmit-f8865
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=hacksmit-f8865.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=793410670570
NEXT_PUBLIC_FIREBASE_APP_ID=1:793410670570:web:2b1592fd2b1a76c190ac93
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-ESJPL7RENM

# Firebase Admin SDK (Server-side only - KEEP SECRET!)
FIREBASE_ADMIN_PROJECT_ID=hacksmit-f8865
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...[REST OF KEY]...\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@hacksmit-f8865.iam.gserviceaccount.com
```

### 9. Restart Your Dev Server

After updating `.env.local`:

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### 10. Verify It Works

Open a new terminal and check:

```bash
npm run build
```

You should no longer see "Firebase Admin not initialized" errors.

## Security Notes ⚠️

1. **NEVER commit `.env.local` to Git**
   - It's already in `.gitignore`
   - Keep your private key secret!

2. **Different keys for different environments**
   - Use different service accounts for dev/staging/production
   - Rotate keys periodically

3. **If you accidentally expose your key:**
   - Go to Firebase Console → Service Accounts
   - Delete the compromised key
   - Generate a new one

## Troubleshooting

### "Firebase Admin not initialized" still appears:
1. Double-check the environment variable names (no typos)
2. Ensure the private key is wrapped in double quotes
3. Verify the `\n` characters are preserved in the key
4. Restart your terminal/IDE
5. Clear Next.js cache: `rm -rf .next` then rebuild

### "Invalid key format" error:
- The private key must start with `-----BEGIN PRIVATE KEY-----`
- It must end with `-----END PRIVATE KEY-----`
- Keep the `\n` characters (they represent newlines)
- Wrap the entire key in double quotes

### Still not working:
- Delete the `.next` folder
- Stop all running dev servers
- Run `npm install` again
- Restart your computer (clears environment variable cache)
- Try `npm run dev` again
