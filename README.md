# Dexcarte - Comércio de Ferro Forjado e Construções

A professional, fully responsive website for Dexcarte, a Portuguese metalworking company specializing in wrought iron work and metal construction.

## Live Demo

The project is built to be hosted on GitHub Pages.  
[Live Website Link](https://grim-hue.github.io/dexcarte/)

---

## Features

- **Service Catalog**: Detailed overview of portões, gradeamentos, escadas, and estruturas metálicas.
- **Portfolio Showcase**: Image gallery of completed projects and works.
- **Responsive Design**: Mobile-first architecture using Tailwind CSS.
- **Modern Typography**: Utilizing `Playfair Display` for elegant headings and `Inter` for clean body text.
- **Internationalization (i18n)**: Seamless translation between PT and EN.
- **Functional Contact & Quote Forms**: Fully working contact and budget request forms powered by Web3Forms.

---

## Technology Stack

- **HTML5 & CSS3**
- **JavaScript** (Vanilla script for logic and `i18n.js` for localization)
- **Tailwind CSS** (via CDN for rapid styling)
- **Web3Forms** (Serverless form handling)
- **Feather Icons & Material Icons**
- **GSAP** (for animations)

_(Note: Some unused React files exist in the repository from an earlier iteration, but the active site is purely static HTML/JS)._

---

## Form Setup (Web3Forms)

The site uses [Web3Forms](https://web3forms.com/) to handle contact form submissions without a backend server.

### How it works:

1. When a user submits the form on the `contactos/` or `pedido-orcamento/` page, an HTTP POST request is sent directly to the Web3Forms API.
2. Web3Forms captures the data and instantly emails it to the configured email address (`dexcarte@gmail.com`).
3. To change the receiving email address, you must generate a new Access Key on the Web3Forms website and update the `access_key` hidden input field in both HTML files.

---

## Deployment (GitHub Pages)

This site is a static HTML project, making it perfectly suited for free hosting on GitHub Pages.

**To deploy the site:**

1. Navigate to the repository settings on GitHub.
2. Click on **Pages** in the left sidebar.
3. Under "Build and deployment", set the **Source** to `Deploy from a branch`.
4. Select the `main` branch and the `/ (root)` folder, then click **Save**.
5. Wait 1-2 minutes, and your site will be live!

---

## License & Copyright

© 2025 All rights reserved to Dexcarte - Comércio de Ferro Forjado e Construções. Powered by Páginas Amarelas.
