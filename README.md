# 🏥 MediCare Frontend – AI Powered Health Guardian

MediCare is a preventive healthcare platform designed to help users understand their medical reports, check medicine safety, track health progress, and receive AI-powered health guidance. This repository contains the **React-based frontend** of the application.

---

## 🌟 Key Features

*   **ScanSense AI**: Scan medicine barcodes to check safety, generic alternatives, and drug interactions.
*   **Medical Report Analysis**: Upload blood tests or other reports for AI-powered explanations.
*   **Health Dashboard**: Visualize health trends (HbA1c, Cholesterol, etc.) with dynamic charts.
*   **AI Health Chatbot**: Personalized health assistant powered by Google Gemini.
*   **Profile Management**: Personalized health risk assessment based on user profile.
*   **Notifications**: Stay updated with medicine alerts and report results.

---

## 🛠️ Technology Stack

*   **Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite 7](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Icons**: [Tabler Icons](https://tabler-icons.io/)
*   **Charts**: [Chart.js](https://www.chartjs.org/) & [react-chartjs-2](https://react-chartjs-2.js.org/)
*   **Networking**: [Axios](https://axios-http.com/)
*   **AI Integration**: React-Markdown for rendering AI insights.

---

## 📂 Project Structure

```bash
MediCare-frontend/
├── src/
│   ├── components/      # Reusable UI components (Navbar, Sidebar, etc.)
│   ├── pages/           # Page-level components (Dashboard, Scanner, etc.)
    │   ├── auth/        # Login and Registration pages
    │   ├── profile/     # Profile setup and editing
    │   ├── reports/     # Medical report list and details
│   ├── store/           # Redux slices and store configuration
│   ├── services/         # API integration logic
│   ├── assets/          # Static assets (images, icons)
│   ├── App.jsx          # Root component & Routing
│   └── main.jsx         # Entry point
├── public/              # Static public files
└── package.json         # Dependencies and scripts
```

---

## 🚀 Getting Started

### Prerequisites

*   **Node.js**: v18 or higher recommended.
*   **NPM**: v9 or higher.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [repository-url]
    cd MediCare-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory (if required) and add any necessary backend API URLs:
    ```env
    VITE_API_BASE_URL=http://localhost:8080/api
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.

---

## 📜 Available Scripts

*   `npm run dev`: Runs the app in development mode with HMR.
*   `npm run build`: Builds the app for production in the `dist` folder.
*   `npm run preview`: Locally previews the production build.
*   `npm run lint`: Runs ESLint to check for code quality issues.

---

## 🛡️ License

This project is developed for educational and healthcare awareness purposes.

---

*MediCare – Your Smart Digital Health Guardian.*
