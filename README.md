# StudySync

StudySync is a comprehensive study management platform designed to help students organize courses, track tasks, take notes, manage focus sessions, and get AI-powered study assistance.

![StudySync Dashboard](https://example.com/studysync-dashboard.png)

## Features

- **Course Management**: Create and organize courses with custom thumbnails and progress tracking
- **Task Planning**: Schedule and prioritize tasks with due dates and course associations
- **Note Taking**: Rich markdown editor with AI-assisted note enhancement
- **Focus Mode**: Pomodoro timer with music integration for productive study sessions
- **AI Assistant**: Gemini-powered AI chat to help with study questions
- **Analytics**: Track study habits and progress over time

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: NextAuth.js with Supabase Auth
- **Storage**: Supabase Storage for file uploads
- **AI**: Google Gemini AI for the assistant

## Prerequisites

- Node.js 18+ and npm
- Supabase account (for database and authentication)
- Neon account (optional, for serverless PostgreSQL)
- Google Gemini API key

## Getting Started

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

\`\`\`env
# Database
DATABASE_URL="postgresql://postgres:password@db.example.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret

# Google Auth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key
\`\`\`

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/studysync.git
cd studysync
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Set up the database:

\`\`\`bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
\`\`\`

### Running the Application

#### Development Mode

\`\`\`bash
npm run dev
\`\`\`

The application will be available at http://localhost:3000.

#### Production Build

\`\`\`bash
npm run build
npm start
\`\`\`

### Data Migration

If you're migrating from the localStorage version to the database version, run:

\`\`\`bash
npm run migrate-data
\`\`\`

This script will prompt you to log in and then migrate your existing data to the database.

## API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed information about the available API endpoints.

## Project Structure

\`\`\`
studysync/
├── app/                  # Next.js App Router
│   ├── api/              # API Routes
│   ├── auth/             # Authentication pages
│   └── ...               # Application pages
├── components/           # React components
├── lib/                  # Utility functions and shared code
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
└── scripts/              # Utility scripts
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
