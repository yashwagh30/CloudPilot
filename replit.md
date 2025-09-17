# AWS Resource Management Dashboard

## Overview

This is a modern AWS resource management dashboard built with React and Express.js, featuring a glassmorphism design inspired by modern cloud platforms like Vercel Dashboard and Linear. The application provides a comprehensive interface for managing AWS resources including EC2 instances, S3 buckets, RDS databases, and Lambda functions, with real-time monitoring, cost tracking, and activity feeds.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client is built using **React with TypeScript** and leverages several key architectural decisions:

- **Component Library**: Utilizes shadcn/ui components built on Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with custom glassmorphism design system featuring dark theme by default
- **State Management**: React hooks for local state, TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Authentication**: JWT-based authentication with local storage persistence
- **Motion**: Framer Motion for animations with reduced motion support
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
The server follows a **REST API architecture** using Express.js:

- **Framework**: Express.js with TypeScript for type safety
- **Authentication**: JWT token-based authentication with bcrypt for password hashing
- **Storage**: In-memory local storage for demo purposes (no database integration)
- **API Structure**: RESTful endpoints under `/api` namespace
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reload with Vite integration for seamless development experience

### Design System
The application implements a **glassmorphism design approach**:

- **Color Palette**: Dark theme with deep blue-gray backgrounds and cyan/blue accents
- **Typography**: Inter font family with consistent weight hierarchy
- **Visual Effects**: Backdrop blur, glass overlays, and subtle neon glows
- **Responsive**: Mobile-first responsive design with collapsible sidebar
- **Accessibility**: Reduced motion support and screen reader compatibility

### Data Architecture
The application uses **mock data patterns** for AWS resources:

- **Resource Types**: EC2, S3, RDS, Lambda services with standardized interfaces
- **Metrics**: Real-time usage statistics, cost tracking, and performance indicators
- **Activity Feeds**: System events and user actions with timestamps
- **Charts**: Cost analysis and resource utilization visualizations using Recharts

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with hooks and modern patterns
- **Express.js**: Backend web framework for Node.js
- **TypeScript**: Type safety across the entire stack
- **Vite**: Build tool and development server

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **shadcn/ui**: Pre-built component library built on Radix
- **Framer Motion**: Animation library for smooth transitions
- **Lucide React**: Icon library for consistent iconography

### State and Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema parsing
- **date-fns**: Date manipulation and formatting utilities

### Authentication and Security
- **bcrypt**: Password hashing and verification
- **jsonwebtoken**: JWT token generation and verification
- **@hookform/resolvers**: Form validation resolvers

### Charts and Visualization
- **Recharts**: Chart library for data visualization
- **Embla Carousel**: Touch-friendly carousel component

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer
- **Wouter**: Lightweight routing library

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling for Replit environment

The application is designed to be easily extensible with real AWS SDK integration, database connectivity, and production authentication systems when moving beyond the demo phase.