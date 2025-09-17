import { Variants } from "framer-motion";

// Check for reduced motion preference
const prefersReducedMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

// Helper to create motion-aware variants
const createVariant = (motion: Variants, reduced?: Variants): Variants => 
  prefersReducedMotion && reduced ? reduced : motion;

// Container variants for staggered children
export const containerVariants: Variants = createVariant(
  {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
  }
);

// Card variants for organic feel
export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 8,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    }
  },
  hover: { 
    y: -2, 
    scale: 1.01,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    }
  },
  tap: { 
    scale: 0.98,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30,
    }
  },
};

// Button variants
export const buttonVariants: Variants = {
  hover: { 
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 25 }
  },
  tap: { 
    scale: 0.98,
    transition: { type: "spring", stiffness: 400, damping: 30 }
  },
};

// Input focus variants
export const inputVariants: Variants = {
  focus: {
    boxShadow: "0 0 0 2px hsl(var(--primary) / 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
};

// Slide in from right  
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
};

// Scale in
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
};

// Fade in up
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 }
  },
};

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
};