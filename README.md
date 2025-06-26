
# Persona Fact Sheet Generator - Deployment Guide

This guide provides step-by-step instructions to build and deploy the Persona Fact Sheet Generator application to the web using GitHub Pages.

## Core Concepts

- **Build Step:** This application is written in TypeScript/TSX, which browsers cannot run directly. We must first "build" the project, which compiles all the TSX code into a single JavaScript file that browsers can understand.
- **Static Site:** After the build step, the output is a set of static files (HTML, CSS, JS) that can be hosted anywhere.
- **GitHub Pages:** A free service from GitHub to host static websites directly from a repository.
- **API Key Handling:** Your Gemini API key is **not** included in the build. The live application requires each user to enter their own API key in the browser. The key is stored temporarily in the browser's `sessionStorage` and is forgotten when the tab is closed.

---

### **Prerequisites**

You must have **Node.js** and **npm** installed on your computer. To get them, download and install the "LTS" (Long-Term Support) version from [nodejs.org](https://nodejs.org/).

---

## Step 1: Get a Google Gemini API Key

1.  Go to the [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Sign in with your Google account.
3.  Click the "**Create API key**" button.
4.  Copy your newly generated API key. Keep it safe and do not share it publicly.

---

## Step 2: Set Up Your Project Locally

1.  **Download Files:** Make sure you have all the project files on your computer, including the new `package.json` file.

2.  **Open Terminal:** Open a terminal or command prompt, navigate into your project's main directory.

3.  **Install Dependencies:** Run the following command. This will read `package.json` and download the `esbuild` tool into a `node_modules` folder.
    ```bash
    npm install
    ```

---

## Step 3: Build Your Application

1.  **Run the Build Command:** In the same terminal, run this command:
    ```bash
    npm run build
    ```
    This will take all your `.tsx` source files, compile them, and create a single, browser-ready JavaScript file at `dist/bundle.js`.

2.  **Check for Output:** You should now see a new `dist` folder in your project, containing `bundle.js`.

---

## Step 4: Set Up and Deploy to GitHub

1.  **Create a GitHub Repository:**
    - Go to [GitHub](https://github.com) and create a new **public** repository (e.g., `persona-fact-sheet-app`).

2.  **Upload ALL Files:**
    - On your new repository's page, click "**Add file**" -> "**Upload files**".
    - Drag and drop ALL your project files and folders, **including the new `dist` folder and its `bundle.js` file**.
    - The full list of items to upload should be:
        - `index.html`
        - `index.tsx`
        - `App.tsx`
        - `package.json`
        - `.gitignore`
        - `types.ts`
        - `constants.ts`
        - `metadata.json`
        - `README.md`
        - `components` (folder)
        - `services` (folder)
        - `dist` (folder, containing `bundle.js`)
    - Commit the files.

3.  **Enable GitHub Pages:**
    - In your repository, go to "**Settings**" -> "**Pages**".
    - Under "Build and deployment", select Source: "**Deploy from a branch**".
    - Select Branch: `main` and Folder: `/(root)`.
    - Click **Save**.

4.  **Wait and Verify:**
    - Wait a few minutes for GitHub to deploy your site. You can check the progress under your repository's "**Actions**" tab.
    - Once the deployment is complete (a green checkmark appears in Actions), visit the URL provided in the Pages settings.

---

## Step 5: Use Your Live Application

1.  **Visit the URL:** Open the URL provided by GitHub Pages.
2.  **Enter Your API Key:** You will see an input field asking for your Gemini API Key. Paste the key you created in Step 1.
3.  **Generate Fact Sheets:** The application is now ready to use.

**IMPORTANT:** Any time you make changes to the `.tsx` code, you must run `npm run build` again locally and commit the updated `dist/bundle.js` file to GitHub for your changes to appear on the live site.
