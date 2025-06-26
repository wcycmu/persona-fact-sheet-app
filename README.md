
# Persona Fact Sheet Generator - Deployment Guide

This guide provides step-by-step instructions to deploy the Persona Fact Sheet Generator application to the web using GitHub Pages.

## Core Concepts

- **Static Site:** This is a purely client-side application. All the logic runs in the user's browser.
- **GitHub Pages:** A free service from GitHub to host static websites directly from a repository.
- **API Key Handling:** Because GitHub Pages does not have a secure backend, your Gemini API key cannot be stored securely on a server. This application is designed for you to **enter your API key directly in the browser**. The key is stored in your browser's `sessionStorage`, meaning it's forgotten when you close the tab. **Do not commit your API key to any file in the repository.**

---

## Step 1: Get a Google Gemini API Key

1.  Go to the [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  Sign in with your Google account.
3.  Click the "**Create API key**" button.
4.  Copy your newly generated API key. Keep it safe and do not share it publicly.

---

## Step 2: Set Up Your GitHub Repository

1.  **Create a New Repository:**
    - Go to [GitHub](https://github.com) and log in.
    - Click the `+` icon in the top-right corner and select "**New repository**".
    - Give your repository a name (e.g., `persona-fact-sheet-app`).
    - Choose "Public".
    - You can skip adding a README, .gitignore, or license for now.
    - Click "**Create repository**".

2.  **Upload the Application Files:**
    - On your new repository's main page, click the "**Add file**" button and select "**Upload files**".
    - Drag and drop all the application files and folders into the upload area:
        - `index.html`
        - `index.tsx`
        - `App.tsx`
        - `types.ts`
        - `constants.ts`
        - `metadata.json`
        - `README.md` (this file)
        - The entire `components` folder
        - The entire `services` folder
    - Once all files are uploaded, add a commit message (e.g., "Initial commit") and click "**Commit changes**".

---

## Step 3: Enable GitHub Pages

1.  **Go to Settings:** In your GitHub repository, click on the "**Settings**" tab.

2.  **Navigate to Pages:** In the left sidebar, click on "**Pages**".

3.  **Configure the Source:**
    - Under "Build and deployment", for the "Source" option, select "**Deploy from a branch**".
    - Under "Branch", select the `main` branch (or `master` if that's your default).
    - For the folder, select `/(root)`.
    - Click "**Save**".

4.  **Wait for Deployment:**
    - GitHub will now build and deploy your site. This may take a few minutes.
    - Once it's ready, a green banner will appear at the top of the Pages settings page with your live site's URL, like `https://<your-username>.github.io/<your-repository-name>/`.

---

## Step 4: Use Your Live Application

1.  **Visit the URL:** Open the URL provided by GitHub Pages in your browser.
2.  **Enter Your API Key:** You will see an input field asking for your Gemini API Key. Paste the key you created in Step 1 into this field and click "Save Key".
3.  **Generate Fact Sheets:** The application is now ready to use. Enter a person's name and generate fact sheets. The key will be remembered as long as you keep the browser tab open.

Congratulations, your Persona Fact Sheet Generator is now live on the web!
