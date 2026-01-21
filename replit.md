# ReviseDirect

## Overview

ReviseDirect is an e-commerce web application for selling premium revision resources for Cambridge IGCSE Physical Education (0413) and AS Level Sport & Physical Education (8386). The platform offers digital products including infographics, exam-style questions, mark schemes, and worksheets. It features Stripe payment integration, a contact form, and links to free YouTube and podcast content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with hot module replacement
- **Theme**: Light/dark mode support with CSS variables

The frontend follows a component-based architecture with pages in `client/src/pages/` and reusable components in `client/src/components/`. The UI uses the shadcn/ui "new-york" style with Radix UI primitives.

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: REST endpoints under `/api/`
- **Build**: esbuild for production bundling with selective dependency bundling

The server handles product listing, checkout session creation, Stripe webhooks, and contact form submissions. Static files are served from the built frontend in production.

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` (shared between frontend and backend)
- **Migrations**: Drizzle Kit with push-based migrations
- **Tables**: 
  - `orders` - tracks purchase transactions
  - `contact_messages` - stores contact form submissions
  - Stripe-managed tables in `stripe` schema (products, prices, etc.)

### Payment Processing
- **Provider**: Stripe with Replit connector integration
- **Sync**: Uses `stripe-replit-sync` for automatic product/price synchronization
- **Webhooks**: Managed webhook setup with signature verification
- **Environment**: Supports both development and production Stripe environments

### Path Aliases
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

## External Dependencies

### Third-Party Services
- **Stripe**: Payment processing via Replit connector (automatic credential management)
- **PostgreSQL**: Database (requires `DATABASE_URL` environment variable)

### Key NPM Packages
- `stripe` / `stripe-replit-sync`: Payment integration
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `@tanstack/react-query`: Server state management
- `react-hook-form` / `zod`: Form handling and validation
- `wouter`: Client-side routing
- Radix UI primitives: Accessible UI components

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- Stripe credentials are automatically managed via Replit connector (no manual setup needed)

## Future Plans
- Additional subjects will be added (approximately 1 month out)
- To add a new subject:
  1. Create products in Stripe Dashboard with metadata: `course` (e.g., "new-subject-code"), `unitNumber`, `available`, `youtubeUrl`, `podbeanUrl`
  2. Add a new filter tab in `client/src/pages/Products.tsx`
  3. Update course descriptions in `client/src/pages/Home.tsx` if needed