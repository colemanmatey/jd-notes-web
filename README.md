# JD Notes

A modern React-based note-taking application with real-time API integration.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/colemanmatey/jd-notes-web.git
cd jd-notes-web
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```
Edit the `.env` file with your configuration:

```env
# API Configuration
VITE_API_BASE_URL=https://jd-notes-backend-production.up.railway.app
VITE_API_TIMEOUT=10000
VITE_API_RETRY_ATTEMPTS=3

# Development Settings
VITE_APP_ENV=development
VITE_DEBUG_MODE=true

# Application Configuration
VITE_APP_NAME=JD Notes
VITE_APP_VERSION=2.0.0
```

4. Start the development server
```bash
npm run dev
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://jd-notes-backend-production.up.railway.app` |
| `VITE_API_TIMEOUT` | API request timeout (ms) | `10000` |
| `VITE_API_RETRY_ATTEMPTS` | Number of retry attempts for failed requests | `3` |
| `VITE_APP_ENV` | Application environment | `production` |
| `VITE_DEBUG_MODE` | Enable debug mode | `false` |
| `VITE_APP_NAME` | Application name | `JD Notes` |
| `VITE_APP_VERSION` | Application version | `2.0.0` |

## Build

```bash
npm run build
```

## Features

- Modern React architecture with feature-based organization
- Real-time API integration with graceful fallbacks
- Responsive design with Tailwind CSS
- User authentication and authorization
- Note creation, editing, and management
- Advanced search and filtering
- API health monitoring
