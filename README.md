# Eumelos.AI — Academic Coordination Portal

[![Stack](https://img.shields.io/badge/Stack-React_|_Vite_|_Vanilla_CSS-blue?style=flat-square)](https://reactjs.org/)
[![Design](https://img.shields.io/badge/Design-Void_Black_%2B_Electric_Blue-black?style=flat-square)](#ui--aesthetic-philosophy)

Eumelos.AI is a structured, web-based academic course selection and scheduling platform designed to streamline student registration and administrative oversight. Moving away from the cluttered and fragmented nature of traditional educational portals, Eumelos provides a calm, functional, and efficient environment for both students and administrators.

---

## The Reality vs. Our Solution

### The Reality
Most academic portals are built on legacy foundations—fragmented, cluttered with unnecessary information, and visually exhausting. They prioritize administrative data entry over the actual user experience, leading to "portal fatigue" and decreased student engagement.

- **Unified Management**: Tools that provide a clear visualization of credits, schedules, and institutional data in a high-performance interface.
- **Automated Validation**: Integrated logic that identifies and prevents time-slot overlaps during the course registration process.

---

## Frontend Stack

We utilized a modern, high-performance stack to ensure the platform feels as fast as it looks.

- **Core**: [React 19](https://react.dev/) (Functional Components & Hooks)
- **Build Tool**: [Vite](https://vitejs.dev/) (Lightning-fast HMR and bundling)
- **Routing**: [React Router DOM v7](https://reactrouter.com/) (Dynamic, role-based navigation)
- **State Management**: [Context API](https://react.dev/learn/passing-data-deeply-with-context) (Lightweight, global auth and theme state)
- **Networking**: [Axios](https://axios-http.com/) (Structured API service layer)
- **Styling**: Vanilla CSS (Maximum control over the bespoke Glass Black design system)

---

## UI & Aesthetic Philosophy

The Eumelos interface is designed to be **investor-ready** and **premium**. It follows strict rules to maintain a calm yet powerful presence.

### 80 / 20 Color Rule
- **Foundation**: Pure Void Black (`#000000`) for absolute contrast.
- **Surface**: Deep Onyx (`#050505`) and Dark Coal (`#0A0A0A`) for structural separation.
- **Accents**: High-vibrancy Electric Blue (`#3B82F6`) and Alert Red (`#EF4444`) used sparingly for critical feedback and navigation.

### Key Visual Elements
- **Typography**: Inter (Modern sans-serif) with wide letter-spacing (`0.2em`) for primary headers.
- **Minimalist Geometry**: Utilizing dots and pill-shaped decorative elements for subtle brand recognition.
- **Focus States**: High-contrast borders and subtle background shifts—no heavy gradients or unnecessary shadows.

---

## Key Features

### 1. Structured Dashboards
- **Student Portal**: Visualize academic progress including course schedules, average attendance, and credit milestones.
- **Admin Console**: High-level Institutional oversight with domain-locked secure access.

### 2. Secure Gateways
- **Role Selection**: A dedicated entrance for identifying user personas.
- **Multi-Factor Auth**: Secure login flows with Captcha verification and 2FA code placeholders.
- **Domain Locking**: Automated validation for `@eumelos.ai` (Admin) and university-specific ID formats (Student).

### 3. Academic Coordination
- **Live Schedule**: Dynamic cards that highlight active classes based on the current system time.
- **Course Catalog**: A clean, card-based enrollment system with instructor details and schedule transparency.

---

## Meet the Team

Eumelos.AI is built by a specialized team focused on redefining academic infrastructure.

- **D D Gangadhar**: Frontend Engineering, UI & UX Design
- **Pranav Adithya**: Backend Engineering (Spring Boot)
- **Rushi Kiran**: API Architecture & Deployment

---

## Development

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Key Directories
- `/src/components`: Reusable UI elements (Navbar, Sidebar, Cards).
- `/src/pages`: Feature-specific modules (Dashboard, CourseList, Auth).
- `/src/context`: Global state management for Authentication and Dark Mode.
- `/src/services`: Centralized Axios instance and service definitions.

---

**Eumelos.AI — Academic Coordination.**
