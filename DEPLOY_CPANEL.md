# Deployment Guide for cPanel

This guide will help you replace your existing WordPress site with your new Next.js application on cPanel.

## Prerequisites

1.  **Access to cPanel** of your hosting account.
2.  **Node.js Support**: Check if your cPanel has an icon called **"Setup Node.js App"** (usually under "Software").
    *   *If you do NOT have this, you must use the [Static Export Method](#static-export-method-fallback).*

---

## Method 1: Node.js App (Recommended)

This method allows your site to use all features (dynamic routing, API, internationalization) properly.

### Step 1: Prepare the Domain
1.  **Backup**: Go to File Manager, compress (zip) your existing `public_html` content and download it.
2.  **Clean Up**: Move existing WordPress files from `public_html` to a valid backup folder (e.g., `old_wordpress`). Keep `public_html` empty or compliant with the new app.
    *   *Note*: Some cPanel setups require the Node app to live in a specific folder; others let you map it to the root domain.

### Step 2: Create the Node.js Application
1.  Go to **"Setup Node.js App"** in cPanel.
2.  Click **"Create Application"**.
3.  **Python/Node Version**: Select **Node.js 18.x** or higher (20.x recommended).
4.  **Application Mode**: Select **Production**.
5.  **Application Root**: Enter the folder name where you uploaded your files (e.g., `your-morocco`).
6.  **Application URL**: Select your domain (e.g., `your-morocco.com`).
7.  **Application Startup File**: Enter `server.js`.
8.  Click **Create**.

### Step 3: Upload Files
1.  Go to **File Manager**.
2.  Navigate to your Application Root folder (e.g., `your-morocco`).
3.  Upload your project files. You can zip your local project (excluding `node_modules` and `.next` folder) and unzip it on the server.
    *   **Include**: `package.json`, `next.config.ts`, `server.js`, `src/`, `public/`, `.env` (if any), `messages/`.
    *   **Exclude**: `node_modules`, `.next`, `.git`.

### Step 4: Install Dependencies & Build
1.  Back in **"Setup Node.js App"**, scroll down to the detected configuration file (`package.json`).
2.  Click **"Run NPM Install"**. Wait for it to finish.
3.  **Build the App**:
    *   If you have SSH access, run `npm run build` in the terminal.
    *   If NOT, add a "postinstall" script in `package.json` to run build, or try to run the command via the "Run JS Script" button if available.
    *   *Alternative*: Build locally (`npm run build`), zip the `.next` folder, upload it, and unzip it in the Application Root. This is often safer on shared hosting.

### Step 5: Start the App
1.  Click **"Restart"** in the Node.js App selector.
2.  Visit your website.

---

## Static Export Method (Fallback)

Use this ONLY if your cPanel does not support Node.js. Note: Some features like dynamic image optimization or server-side redirects might behave differently.

1.  Open `next.config.ts`.
2.  Add `output: 'export'` inside the `nextConfig` object:
    ```typescript
    const nextConfig: NextConfig = {
      output: 'export',
      images: { unoptimized: true }, // Required for static export
      // ... existing config
    };
    ```
3.  Local Build: Run `npm run build` on your computer.
4.  This creates an `out` folder.
5.  Upload the **contents** of the `out` folder to `public_html` on cPanel.

---

## Troubleshooting

-   **500 Error**: Check the `stderr.log` in your application root.
-   **Missing Images**: Ensure the `public` folder was uploaded correctly.
-   **"Internal Server Error"**: Verify `server.js` is set as the startup file and Node version is compatible.
