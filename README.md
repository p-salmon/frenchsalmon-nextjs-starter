# FrenchSalmon NextJS Starter

A modern full-stack application built with Next.js, Prisma, and Better-Auth, featuring a modular architecture and comprehensive authentication system.

## Tech Stack

- **Next.js 16.1.1** - React framework with App Router
- **Prisma 7.2.0** - Type-safe database ORM with PostgreSQL
- **Better-Auth 1.4.9** - Modern authentication library
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **React 19.2.3** - UI library
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Zod** - Schema validation

## Project Structure

```
./
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth route group
│   ├── (main)/            # Main route group
│   └── api/               # API routes
│       └── auth/          # Better-Auth API handler
├── src/
│   ├── __template__/      # Template structure for new modules
│   │   ├── api/           # API endpoints
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   └── types/         # TypeScript types
│   ├── auth/              # Authentication module
│   │   ├── auth.ts        # Server-side auth configuration
│   │   ├── auth-client.ts # Client-side auth client
│   │   ├── components/    # Auth UI components
│   │   └── hooks/         # Auth-related hooks
│   ├── db/                # Database module
│   │   ├── db-client.ts   # Prisma client instance
│   │   └── slugify.ts     # Utility functions
│   └── ui/                # UI component library
│       ├── components/    # Reusable UI components
│       ├── hooks/         # UI-related hooks
│       └── globals.css    # Global styles
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── generated/
│   └── prisma/            # Generated Prisma client
└── public/                # Static assets
```

## Module Architecture

The project follows a modular architecture pattern. Each module should be structured as follows:

```
module-name/
├── api/           # API endpoints (server-side)
├── components/    # React components
├── hooks/         # Custom React hooks
└── types/         # TypeScript type definitions
```

A template structure is available at `src/__template__/` to help you create new modules following this pattern.

## Prisma Setup

### Database Schema

The project uses Prisma with PostgreSQL. The schema includes:

- **User** - User accounts with email/password authentication
- **Session** - User sessions for authentication
- **Account** - OAuth and credential accounts
- **Verification** - Email verification tokens

### Prisma Configuration

- **Client Output**: `generated/prisma` (custom output path)
- **Provider**: PostgreSQL
- **Migrations**: Located in `prisma/migrations/`

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration-name

# Apply migrations
npx prisma migrate deploy

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Better-Auth Configuration

Better-Auth is configured with:

- **Email/Password Authentication**: Enabled
- **Email Verification**: Disabled (set to `true` in production)
- **Session Duration**: 7 days
- **Session Update**: Every 24 hours
- **Database Adapter**: Prisma (PostgreSQL)

### Auth Routes

- Server-side auth handler: `app/api/auth/[...all]/route.ts`
- Client-side auth client: `src/auth/auth-client.ts`

### Auth Components

- `sign-in-form.tsx` - Sign in form component
- `sign-up-form.tsx` - Sign up form component
- `user-menu.tsx` - User menu dropdown
- `protected-route.tsx` - Route protection wrapper
- `navigation.tsx` - Navigation component with auth state

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/database-name

# Better-Auth
BETTER_AUTH_SECRET="RANDOM_SECRET_KEY"
BETTER_AUTH_URL="http://localhost:3000"
```

### Environment Variables Explained

- **DATABASE_URL**: PostgreSQL connection string
  - Format: `postgresql://[user]:[password]@[host]:[port]/[database]`
  - Required for Prisma to connect to your database

- **BETTER_AUTH_SECRET**: Secret key for Better-Auth
  - Generate a random secret key (minimum 32 characters)
  - Used for signing tokens and encrypting session data
  - **Never commit this to version control**

- **BETTER_AUTH_URL**: Base URL for your application
  - Development: `http://localhost:3000`
  - Production: Your production domain (e.g., `https://yourdomain.com`)

### Production Environment

For production, also set:

```env
NEXT_PUBLIC_AUTH_URL=https://yourdomain.com
```

This is used by the client-side auth client to determine the correct base URL.

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your actual values
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Development Rules & Guidelines

### Code Organization

1. **Follow the module structure**: Use the template at `src/__template__/` when creating new modules
2. **Keep modules self-contained**: Each module should have its own API, components, hooks, and types
3. **Use TypeScript**: All code should be properly typed
4. **Component location**: 
   - Module-specific components go in `src/[module]/components/`
   - Shared UI components go in `src/ui/components/`

### Authentication

1. **Protected routes**: Use the `ProtectedRoute` component to protect pages
2. **Server vs Client**: 
   - Use `auth` from `src/auth/auth.ts` on the server
   - Use `authClient` from `src/auth/auth-client.ts` on the client
3. **Session management**: Sessions are automatically managed by Better-Auth

### Database

1. **Migrations**: Always create migrations for schema changes
2. **Prisma Client**: Use `dbClient` from `src/db/db-client.ts`
3. **Generated Client**: The Prisma client is generated to `generated/prisma/`

### Styling

1. **Tailwind CSS**: Use Tailwind utility classes for styling
2. **UI Components**: Use components from `src/ui/components/` for consistent UI
3. **Custom styles**: Add global styles in `src/ui/globals.css`

### TypeScript

1. **Path aliases**: Use `@/` prefix for imports (configured in `tsconfig.json`)
2. **Type safety**: Leverage Prisma generated types and Better-Auth types
3. **Strict mode**: TypeScript strict mode is enabled

## Deployment

### Environment Variables for Production

Make sure to set:
- `DATABASE_URL` - Your production database URL
- `BETTER_AUTH_SECRET` - A strong random secret
- `BETTER_AUTH_URL` - Your production domain
- `NEXT_PUBLIC_AUTH_URL` - Your production domain (for client-side)

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Better-Auth Documentation](https://www.better-auth.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
