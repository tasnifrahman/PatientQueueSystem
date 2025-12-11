# 🏥 Patient Queue Management System

---

## 🛠️ Tech Stack

### Frontend (Client)
* **Framework:** [Next.js 16+](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Components:** [Shadcn/UI](https://ui.shadcn.com/)
* **State Management:** React Context API + Custom Hooks
* **Notifications:** Sonner
* **HTTP Client:** Axios

### Backend (Server)
* **Runtime:** Node.js
* **Framework:** Express.js
* **Language:** TypeScript
* **Validation:** Zod
* **Storage:** In-memory repository (Data resets on server restart)

---

### 1. Backend Setup (Port 3030)

1.  Navigate to the backend folder:
    ```bash
    cd Backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configuration**: Create a `.env` file in the `Backend` root:
    ```env
    PORT=3030
    NODE_ENV=development
    ```
4.  Start the server:
    ```bash
    npm run dev
    ```
    ✅ *Console output:* `⚡️ Server is running at http://localhost:3030`

### 2. Frontend Setup (Port 3000)

1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Configuration**: Verify the API base URL in `src/lib/api.ts`:
    ```typescript
    const BASE_URL = 'http://localhost:3030';
    ```
4.  Start the application:
    ```bash
    npm run dev
    ```
    ✅ *Access the app at:* `http://localhost:3000`

---
