# AWS Resource Management Dashboard - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from modern cloud platforms like Vercel Dashboard, Linear, and AWS Console, combined with glassmorphism design trends for a premium, technical aesthetic.

## Core Design Elements

### A. Color Palette
**Dark Theme Primary:**
- Background: 220 25% 8% (deep dark blue-gray)
- Card backgrounds: 220 20% 12% with glassmorphism overlay
- Primary accent: 200 100% 60% (bright cyan/blue)
- Success states: 142 76% 56% (emerald green)
- Warning states: 38 92% 50% (amber)
- Danger states: 0 84% 60% (red)

**Glassmorphism Effects:**
- Glass overlay: rgba(255, 255, 255, 0.1) with backdrop blur
- Border highlights: rgba(255, 255, 255, 0.2)
- Neon accents: Subtle cyan/blue glows on interactive elements

### B. Typography
**Font Stack:** Inter via Google Fonts
- Headings: 600-700 weight
- Body text: 400-500 weight
- Code/metrics: JetBrains Mono for technical data
- Size scale: text-sm, text-base, text-lg, text-xl, text-2xl

### C. Layout System
**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8
- Consistent padding: p-4, p-6, p-8
- Gap spacing: gap-4, gap-6
- Margins: m-4, m-6, m-8

### D. Component Library

**Navigation Components:**
- Glassmorphism sidebar with backdrop blur and subtle borders
- Top navbar with search bar, profile, and notification icons
- Navigation items with hover glow effects and active states

**Dashboard Cards:**
- AWS service cards with glassmorphism background
- Rounded corners (rounded-xl) with subtle shadows
- Interactive buttons with neon accent colors
- Status indicators with colored dots and labels

**Data Visualization:**
- Progress bars with animated fills and gradient backgrounds
- Chart placeholders with dark theme styling
- Metric cards with large numbers and trend indicators
- Cost tracking cards with spending visualizations

**Interactive Elements:**
- Primary buttons with cyan gradient backgrounds
- Secondary buttons with glass effect and borders
- Icon buttons with subtle hover glows
- Form inputs with dark backgrounds and cyan focus states

### E. Animations
**Minimal Motion Design:**
- Subtle hover effects on cards (slight elevation change)
- Smooth transitions on navigation state changes
- Progress bar fill animations on dashboard load
- Gentle fade-in effects for content sections

## Page-Specific Guidelines

### Login/Signup Pages
- Centered form with glassmorphism card effect
- Animated form field focus states
- Smooth transitions between login/signup modes
- Subtle background gradient with dark overlay

### Dashboard Layout
- Fixed glassmorphism sidebar (collapsed on mobile)
- Sticky top navigation bar
- Grid layout for AWS service cards (responsive: 1-2-3-4 columns)
- Dedicated sections for billing, resources, and quick actions

## Responsive Behavior
- **Desktop:** Full sidebar, 4-column card grid
- **Tablet:** Collapsible sidebar, 2-3 column grid  
- **Mobile:** Hidden sidebar with hamburger menu, single column cards

## Key Design Principles
1. **Technical Precision:** Clean, data-focused interface suitable for cloud engineers
2. **Glassmorphism Consistency:** All elevated elements use consistent glass effects
3. **Dark-First Design:** Optimized for extended technical work sessions
4. **Subtle Animation:** Enhance usability without distraction
5. **Information Hierarchy:** Clear visual separation between service types and metrics