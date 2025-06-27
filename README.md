# Portfolio

[![Deploy to GitHub Pages](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/deploy.yml)
[![CI](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/portfolio/actions/workflows/ci.yml)

A modern Angular portfolio website showcasing my projects and skills.

## 🚀 Live Demo

Visit the live site: [https://YOUR_USERNAME.github.io/portfolio/](https://YOUR_USERNAME.github.io/portfolio/)

## 🛠️ Tech Stack

- **Frontend**: Angular 18
- **Styling**: CSS3
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📦 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/portfolio.git
   cd portfolio
   ```

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and visit `http://localhost:4200`

## 🏗️ Build

To build the project for production:

```bash
cd frontend
npm run build:prod
```

To build for GitHub Pages deployment:

```bash
cd frontend
npm run build:gh-pages
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers:

1. **CI Pipeline**: Runs tests and builds the application
2. **Deployment Pipeline**: Deploys the built application to GitHub Pages

### Manual Deployment

If you need to deploy manually, you can use the GitHub Pages build script:

```bash
cd frontend
npm run build:gh-pages
```

Then commit and push the changes to trigger the deployment workflow.

## 📁 Project Structure

```
portfolio/
├── frontend/           # Angular application
│   ├── src/
│   │   ├── app/       # Angular components
│   │   ├── models/    # TypeScript models
│   │   └── services/  # Angular services
│   └── public/        # Static assets
├── .github/
│   └── workflows/     # GitHub Actions workflows
└── README.md
```

## 🔧 Development

- `npm start` - Start development server
- `npm run build` - Build for development
- `npm run build:prod` - Build for production
- `npm run test` - Run unit tests
- `npm run build:gh-pages` - Build for GitHub Pages

## 📝 License

This project is licensed under the MIT License.

---

**Note**: Replace `YOUR_USERNAME` in the URLs above with your actual GitHub username.