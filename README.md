

  Bijli Rides

A high-performance, futuristic electric mobility landing platform engineered with interactive scroll-driven canvas sequence animations, real-time telemetry HUDs, and modular UI components.

[Bijli Rides Hero Preview] [ https://drive.google.com/file/d/1e01UeA3bo6z6_i09C_XZB369mXqFR1M7/view?usp=sharing ]

##  Features

Scroll-Driven Canvas Frame Sequences**: 150+ ultra-smooth canvas image sequence rendering synchronized with scroll progress using Framer Motion springs.

Interactive Telemetry & Specs HUD**: Real-time multi-stage breakdown covering Powertrain (PMSM Hub Motor Core), Battery Swap Infrastructure, and Chassis/Aero dynamics. 

Ultra-Fast Runtime**: Built on **Bun** with React and Vite for blazing fast HMR and compilation.

 Futuristic Cyberpunk / Studio Aesthetic**: Custom dark palette with emerald neon accents, frosted glassmorphic HUD overlays, and responsive typography.

Fully Responsive**: Pixel-perfect layout optimization across ultra-wide monitors, laptops, tablets, and mobile devices.

---

##  Tech Stack

- **Framework / Library**: React 18+ (TypeScript)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **Styling**: Tailwind CSS
- **Motion & Scroll Physics**: Framer Motion (`useScroll`, `useSpring`, `useTransform`)
- **Routing**: React Router DOM

---

##  Getting Started

Follow the steps below to set up and run the project locally.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed:

```bash
# Install Bun (macOS / Linux)
curl -fsSL https://bun.sh/install | bash
```

*(Alternatively, Node.js v18+ and npm/yarn/pnpm can also be used).*

---

### Installation & Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Ayuxxyadav/Bijli-Rides.git
   cd Bijli-Rides
   ```

2. **Navigate to the frontend directory** (if applicable):
   ```bash
   cd frontend
   ```

3. **Install Dependencies**
   ```bash
   bun install
   ```

4. **Start the Development Server**
   ```bash
   bun run dev
   ```

5. **Open the Application**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
   *(or the port specified in your terminal, e.g., `http://localhost:5173`)*

---

##  Build for Production

To create an optimized production build:

```bash
bun run build
```

To preview the production build locally:

```bash
bun run preview
```

---

## 📁 Project Structure

```text
Bijli-Rides/
├── public/
│   ├── sequence/          # Canvas animation image sequence frames
│   └── favicon.svg
├── src/
│   ├── components/        # Reusable UI & HUD components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   └── TelemetrySpecs.tsx
│   ├── pages/             # Application route views
│   │   └── HomePage.tsx
│   ├── App.tsx            # App root & route configurations
│   ├── frontend.tsx       # DOM root entry with HMR-safe hydration
│   └── index.css          # Global Tailwind directives & styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

---

## 👨‍💻 Author

**Ayush Yadav**
- GitHub: [@Ayuxxyadav](https://github.com/Ayuxxyadav)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
