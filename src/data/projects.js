export const projects = [
  {
    n: "01",
    slug: "salon-booking-platform",
    tags: ["Full-stack", "Mobile"],
    year: "2025",
    placeholder: "salon platform",
    title: "Salon Booking Platform",
    description:
      "A production salon booking platform handling 25+ daily bookings — a React Native (Expo) mobile app and a Spring Boot (Java 21) REST API with JWT auth, role-based access, Stripe payments, and a React admin dashboard.",
    stack: ["React Native", "Expo", "Spring Boot", "Java 21", "MongoDB Atlas", "Stripe"],
    role: "Full-Stack Developer",
    timeline: "2025 — Present",
    github: "https://github.com/Arshad9633",
    live: "",
    overview:
      "A production booking platform for Salon Studio (Warsaw) handling 25+ bookings a day — a cross-platform mobile app for clients and a secure backend with a web admin dashboard for the business.",
    builtSteps: [
      { title: "Mobile app", body: "A React Native (Expo) app for clients to browse services and book appointments, shipped to iOS and Android." },
      { title: "Secure API", body: "A Spring Boot (Java 21) REST API secured with JWT authentication and role-based access control." },
      { title: "Payments & data", body: "Integrated Stripe payments and MongoDB Atlas, with secure async email verification and password reset via the Resend API and Cloudflare DNS." },
      { title: "Admin dashboard & delivery", body: "A React admin dashboard with CRUD, data visualization, and real-time booking management; backend deployed on Railway via GitHub CI/CD." },
    ],
    keyFeatures: [
      "25+ daily bookings in production",
      "JWT auth + role-based access",
      "Stripe payments integration",
      "Real-time admin booking management",
      "Tested with JUnit 5, Mockito, Spring Boot Test",
      "CI/CD deploy to Railway",
    ],
    heroImage: "",
    screens: ["mobile booking", "admin dashboard", "payment flow"],
    youtube: "",
  },
  {
    n: "02",
    slug: "cartup-ecommerce",
    tags: ["AI", "Full-stack"],
    year: "2025",
    placeholder: "cartup store",
    title: "AI-Assisted Fashion E-Commerce",
    description:
      "An AI-assisted fashion e-commerce platform live at cartup.store — React (Vite) + Tailwind on Cloudflare Pages, with Java Spring Boot REST APIs for auth, products, cart, orders, and admin on Render.",
    stack: ["React", "Vite", "Tailwind CSS", "Spring Boot", "MongoDB Atlas", "Cloudinary"],
    role: "Full-Stack Developer",
    timeline: "2025 — Present",
    github: "https://github.com/Arshad9633",
    live: "https://cartup.store",
    overview:
      "A live AI-assisted fashion e-commerce platform (cartup.store) with a full shopping flow — from browsing and cart to checkout — backed by Spring Boot REST APIs and an admin dashboard.",
    builtSteps: [
      { title: "Frontend", body: "A React (Vite) + Tailwind storefront deployed on Cloudflare Pages, with category filters and a full checkout/billing flow." },
      { title: "Backend APIs", body: "Java Spring Boot REST APIs for auth, products, cart, orders, and admin, deployed on Render." },
      { title: "Data & media", body: "MongoDB Atlas for data with Cloudinary-hosted product images." },
      { title: "Cart & auth", body: "JWT authentication with a guest-to-user cart merge, so items carry over once a shopper signs in." },
    ],
    keyFeatures: [
      "Live in production at cartup.store",
      "JWT auth + guest-to-user cart merge",
      "Category filters & checkout flow",
      "Cloudinary-hosted product images",
      "Admin dashboard",
    ],
    cardImages: [
      "/ecommerce/test.png",
      "/ecommerce/Product.png",
      "/ecommerce/Add_Cart.png",
      "/ecommerce/Sign_IN.png",
    ],
    heroImage: "/ecommerce/test.png",
    screens: [
      {
        src: "/ecommerce/Sign_UP.png",
        title: "Sign Up",
        body: "A simple and intuitive sign-up process with email verification and password strength requirements.",
      },
      {
        src: "/ecommerce/Sign_IN.png",
        title: "Sign In",
        body: "A simple and intuitive sign-in process with email verification and password reset.",
      },
      {
        src: "/ecommerce/Product.png",
        title: "Product",
        body: "A product page with detailed information, images, and related products to enhance the shopping experience.",
      },
      {
        src: "/ecommerce/Add_Cart.png",
        title: "Add to Cart",
        body: "Add-to-basket with a guest-to-user cart merge, flowing into a full checkout and billing flow backed by Spring Boot REST APIs.",
      },
      {
        src: "/ecommerce/check_out.png",
        title: "Checkout",
        body: "A seamless checkout experience with multiple payment options and order confirmation.",
      },
    ],
    youtube: "",
  },
  {
    n: "03",
    slug: "orance-booking-system",
    tags: ["Backend"],
    year: "2022",
    placeholder: "booking system",
    title: "Booking System Web App",
    description:
      "A booking-system web application built during a backend internship at Orance Media Group — Python, Django, and PostgreSQL with REST APIs, plus GitLab CI/CD for automated testing and deployment.",
    stack: ["Python", "Django", "PostgreSQL", "REST APIs", "GitLab CI/CD"],
    role: "Backend Developer Intern",
    timeline: "Jun 2022 — Dec 2022",
    github: "https://github.com/Arshad9633",
    live: "",
    overview:
      "A booking-system web app built and maintained during a backend internship at Orance Media Group (Warsaw), working in an Agile team.",
    builtSteps: [
      { title: "Backend & APIs", body: "Built and maintained a booking-system web app in Python, Django, and PostgreSQL with REST APIs." },
      { title: "CI/CD", body: "Helped set up GitLab CI/CD to automate testing and deployment to staging and production." },
      { title: "Agile delivery", body: "Worked in an Agile team — participating in stand-ups and code reviews to deliver features and fix bugs." },
    ],
    keyFeatures: [
      "Django + PostgreSQL REST APIs",
      "Automated GitLab CI/CD pipeline",
      "Staging & production deployments",
      "Agile team workflow",
    ],
    heroImage: "",
    screens: ["booking flow", "api docs"],
    youtube: "",
  },
];

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);