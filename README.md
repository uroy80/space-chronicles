# 🚀 Space Chronicle - Daily Space History Explorer

<div align="center">

![Space Chronicle Logo](https://img.shields.io/badge/Space-Chronicle-blue?style=for-the-badge&logo=rocket)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Discover the astronomical events, space missions, and cosmic discoveries that happened on this day throughout history**

[🌐 Live Demo](https://space.kiwi.ind.in) • [📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [🤝 Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 Demo](#-demo)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [🏗️ Project Structure](#️-project-structure)
- [🎨 Technologies Used](#-technologies-used)
- [📚 API Documentation](#-api-documentation)
- [🌐 Deployment](#-deployment)
- [🔒 Environment Variables](#-environment-variables)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👥 Team](#-team)
- [🙏 Acknowledgments](#-acknowledgments)

---

## ✨ Features

### 🌟 Core Features
- **📅 Daily Space Events**: Discover historical space events for any date
- **🤖 AI-Powered Articles**: Generate detailed articles about space events using OpenAI GPT-4
- **📰 Newspaper Layout**: Beautiful, responsive newspaper-style design
- **🌤️ Space Weather**: Real-time space weather conditions and forecasts
- **📱 Mobile Responsive**: Optimized for all devices and screen sizes
- **🔍 Smart Search**: Find specific events, missions, or discoveries
- **📊 Interactive Timeline**: Browse through space history chronologically

### 🎨 Design Features
- **🌌 Cosmic Theme**: Stunning space-themed UI with animated backgrounds
- **✨ Smooth Animations**: Framer Motion powered interactions
- **🎭 Glass Morphism**: Modern glassmorphism design elements
- **🌈 Dynamic Colors**: Category-based color coding for events
- **🔮 Charming Logos**: Animated logo components with various themes

### 🚀 Technical Features
- **⚡ Server-Side Rendering**: Next.js 14 with App Router
- **🧠 AI Integration**: OpenAI GPT-4 for content generation
- **📡 Real-time Data**: Live space weather from NOAA SWPC
- **🔄 Caching**: Optimized API responses and static generation
- **🛡️ Type Safety**: Full TypeScript implementation
- **📈 Performance**: Optimized for Core Web Vitals

---

## 🎯 Demo

### 🌐 Live Website
Visit our live demo: **[space.kiwi.ind.in](https://space.kiwi.ind.in)**

### 📸 Screenshots

<div align="center">

| Desktop View | Mobile View |
|:---:|:---:|
| ![Desktop](https://via.placeholder.com/400x300/1a1a2e/ffffff?text=Desktop+View) | ![Mobile](https://via.placeholder.com/200x300/1a1a2e/ffffff?text=Mobile+View) |

| Space Weather Widget | AI Article Generation |
|:---:|:---:|
| ![Weather](https://via.placeholder.com/300x200/1a1a2e/ffffff?text=Space+Weather) | ![AI Article](https://via.placeholder.com/300x200/1a1a2e/ffffff?text=AI+Articles) |

</div>

---

## 🚀 Quick Start

Get Space Chronicle running locally in under 5 minutes!

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** or **yarn** or **pnpm**
- **OpenAI API Key** ([Get one here](https://platform.openai.com/api-keys))

### 1️⃣ Clone the Repository
\`\`\`bash
git clone https://github.com/your-username/space-history-explorer.git
cd space-history-explorer
\`\`\`

### 2️⃣ Install Dependencies
\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

### 3️⃣ Set Up Environment Variables
\`\`\`bash
cp .env.example .env.local
\`\`\`

Edit `.env.local` and add your OpenAI API key:
\`\`\`env
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
\`\`\`

### 4️⃣ Run the Development Server
\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

### 5️⃣ Open Your Browser
Visit [http://localhost:3000](http://localhost:3000) to see Space Chronicle in action! 🎉

---

## ⚙️ Installation

### Development Setup

1. **Clone and Navigate**
   \`\`\`bash
   git clone https://github.com/your-username/space-history-explorer.git
   cd space-history-explorer
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   \`\`\`

4. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

### Production Build

1. **Build the Application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start Production Server**
   \`\`\`bash
   npm start
   \`\`\`

3. **Verify Build**
   \`\`\`bash
   npm run lint
   \`\`\`

---

## 🔧 Configuration

### OpenAI API Setup

1. **Get API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Create an account or sign in
   - Navigate to API Keys section
   - Create a new secret key

2. **Configure Environment**
   \`\`\`env
   OPENAI_API_KEY=sk-proj-your-key-here
   \`\`\`

3. **Verify Configuration**
   The app will show a configuration status indicator in the bottom-right corner.

### Customization Options

#### Theme Configuration
\`\`\`typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        cosmic: { /* your cosmic colors */ },
        stellar: { /* your stellar colors */ },
        nebula: { /* your nebula colors */ },
      }
    }
  }
}
\`\`\`

#### API Configuration
\`\`\`typescript
// lib/config.ts
export const config = {
  openai: {
    model: "gpt-4o", // Change model here
    maxTokens: 1500,  // Adjust token limit
  }
}
\`\`\`

---

## 🏗️ Project Structure

\`\`\`
space-history-explorer/
├── 📁 app/                          # Next.js App Router
│   ├── 📁 api/                      # API Routes
│   │   ├── 📄 chat/route.ts         # AI Chat API
│   │   ├── 📄 generate-article/route.ts
│   │   ├── 📄 enhanced-events/route.ts
│   │   └── 📄 space-weather/route.ts
│   ├── 📄 globals.css               # Global Styles
│   ├── 📄 layout.tsx                # Root Layout
│   ├── 📄 loading.tsx               # Loading UI
│   └── 📄 page.tsx                  # Home Page
├── 📁 components/                   # React Components
│   ├── 📁 ui/                       # Shadcn/ui Components
│   │   ├── 📄 button.tsx
│   │   ├── 📄 card.tsx
│   │   ├── 📄 input.tsx
│   │   └── 📄 badge.tsx
│   ├── 📄 charming-logo.tsx         # Animated Logo Component
│   ├── 📄 daily-insights.tsx        # Daily Insights Widget
│   ├── 📄 enhanced-event-card.tsx   # Event Card Component
│   ├── 📄 event-article.tsx         # Article Display
│   ├── 📄 newspaper-header.tsx      # Header Component
│   ├── 📄 sidebar-news.tsx          # Sidebar Component
│   ├── 📄 todays-headlines.tsx      # Headlines Component
│   └── 📄 weather-widget.tsx        # Space Weather Widget
├── 📁 lib/                          # Utility Libraries
│   ├── 📄 config.ts                 # App Configuration
│   ├── 📄 space-events.ts           # Event Database
│   └── 📄 utils.ts                  # Utility Functions
├── 📁 public/                       # Static Assets
├── 📄 .env.example                  # Environment Template
├── 📄 .env.local                    # Your Environment Variables
├── 📄 .gitignore                    # Git Ignore Rules
├── 📄 next.config.mjs               # Next.js Configuration
├── 📄 package.json                  # Dependencies
├── 📄 README.md                     # This File
├── 📄 tailwind.config.ts            # Tailwind Configuration
└── 📄 tsconfig.json                 # TypeScript Configuration
\`\`\`

---

## 🎨 Technologies Used

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### Backend & AI
- **[OpenAI API](https://openai.com/)** - GPT-4 for content generation
- **[Vercel AI SDK](https://sdk.vercel.ai/)** - AI integration toolkit
- **[NOAA SWPC API](https://www.swpc.noaa.gov/)** - Space weather data

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

### Deployment
- **[Vercel](https://vercel.com/)** - Hosting platform
- **[Digital Ocean](https://www.digitalocean.com/)** - VPS hosting
- **[Nginx](https://nginx.org/)** - Web server
- **[PM2](https://pm2.keymetrics.io/)** - Process manager

---

## 📚 API Documentation

### Internal APIs

#### 🤖 Chat API
\`\`\`typescript
POST /api/chat
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "Tell me about Apollo 11"
    }
  ]
}
\`\`\`

#### 📝 Generate Article API
\`\`\`typescript
POST /api/generate-article
Content-Type: application/json

{
  "event": {
    "title": "Apollo 11 Moon Landing",
    "year": 1969,
    "category": "Landing",
    "description": "First human moon landing"
  }
}
\`\`\`

#### 🌟 Enhanced Events API
\`\`\`typescript
POST /api/enhanced-events
Content-Type: application/json

{
  "date": "2024-07-20T00:00:00.000Z"
}
\`\`\`

#### 🌤️ Space Weather API
\`\`\`typescript
GET /api/space-weather

Response:
{
  "solarActivity": {
    "level": "Moderate",
    "color": "yellow"
  },
  "solarWind": {
    "speed": 425,
    "density": 8.2
  },
  "geomagneticActivity": {
    "kIndex": 3,
    "level": "Unsettled"
  }
}
\`\`\`

### External APIs Used

- **OpenAI GPT-4**: Content generation
- **NOAA SWPC**: Space weather data
- **NASA APIs**: Historical space data (planned)

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**
   \`\`\`bash
   # Push to GitHub
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables
   - Deploy automatically

3. **Environment Variables**
   \`\`\`env
   OPENAI_API_KEY=your-openai-key
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   \`\`\`

### Digital Ocean VPS Deployment

#### Server Setup
\`\`\`bash
# Connect to server
ssh -i your-key.pem root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Install Nginx
apt update && apt install nginx
\`\`\`

#### Application Deployment
\`\`\`bash
# Clone repository
git clone https://github.com/your-username/space-history-explorer.git
cd space-history-explorer

# Install dependencies
npm install

# Build application
npm run build

# Start with PM2
pm2 start npm --name "space-chronicles" -- start

# Configure Nginx
# See deployment section for full Nginx config
\`\`\`

#### SSL Setup
\`\`\`bash
# Install Certbot
apt install certbot python3-certbot-nginx

# Get SSL certificate
certbot --nginx -d your-domain.com

# Auto-renewal
certbot renew --dry-run
\`\`\`

### Docker Deployment

\`\`\`dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
\`\`\`

\`\`\`bash
# Build and run
docker build -t space-chronicles .
docker run -p 3000:3000 -e OPENAI_API_KEY=your-key space-chronicles
\`\`\`

---

## 🔒 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for content generation | `sk-proj-...` |

### Optional Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `NODE_ENV` | Environment mode | `development` | `production` |
| `NEXT_PUBLIC_APP_URL` | Public app URL | `http://localhost:3000` | `https://space.kiwi.ind.in` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | - | `G-XXXXXXXXXX` |

### Environment File Template

\`\`\`env
# .env.local
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your-openai-api-key-here

# App Configuration
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Database (Future)
# DATABASE_URL=your-database-connection-string
\`\`\`

---

## 🧪 Testing

### Running Tests

\`\`\`bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
\`\`\`

### Test Structure

\`\`\`
tests/
├── 📁 __tests__/
│   ├── 📄 components.test.tsx
│   ├── 📄 api.test.ts
│   └── 📄 utils.test.ts
├── 📁 e2e/
│   ├── 📄 homepage.spec.ts
│   └── 📄 navigation.spec.ts
└── 📁 fixtures/
    └── 📄 mock-data.ts
\`\`\`

### Testing Guidelines

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test API routes and data flow
- **E2E Tests**: Test complete user workflows
- **Visual Tests**: Test UI components and layouts

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports

1. **Check existing issues** first
2. **Use the bug report template**
3. **Provide detailed reproduction steps**
4. **Include screenshots if applicable**

### ✨ Feature Requests

1. **Check the roadmap** for planned features
2. **Use the feature request template**
3. **Explain the use case clearly**
4. **Consider implementation complexity**

### 🔧 Development Workflow

1. **Fork the repository**
   \`\`\`bash
   git clone https://github.com/your-username/space-history-explorer.git
   \`\`\`

2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

3. **Make your changes**
   - Follow the coding standards
   - Add tests for new features
   - Update documentation

4. **Test your changes**
   \`\`\`bash
   npm run test
   npm run lint
   npm run build
   \`\`\`

5. **Commit your changes**
   \`\`\`bash
   git commit -m "feat: add amazing feature"
   \`\`\`

6. **Push and create PR**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`

### 📝 Coding Standards

- **TypeScript**: Use strict type checking
- **ESLint**: Follow the configured rules
- **Prettier**: Format code consistently
- **Conventional Commits**: Use semantic commit messages

### 🎯 Areas for Contribution

- 🌟 **New Features**: Event categories, data sources
- 🎨 **UI/UX**: Design improvements, animations
- 🚀 **Performance**: Optimization, caching
- 📱 **Mobile**: Mobile-specific features
- 🌐 **Internationalization**: Multi-language support
- 📊 **Analytics**: User behavior tracking
- 🧪 **Testing**: Test coverage improvements

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

\`\`\`
MIT License

Copyright (c) 2024 Space Chronicle Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
\`\`\`

---

## 👥 Team

### 🚀 Core Team

<div align="center">

| Role | Name | GitHub | LinkedIn |
|------|------|--------|----------|
| **Lead Developer** | Team Kiwi | [@teamkiwi](https://github.com/teamkiwi) | [LinkedIn](https://linkedin.com/in/teamkiwi) |
| **UI/UX Designer** | Space Designer | [@spacedesigner](https://github.com/spacedesigner) | [LinkedIn](https://linkedin.com/in/spacedesigner) |
| **AI Engineer** | Cosmic AI | [@cosmicai](https://github.com/cosmicai) | [LinkedIn](https://linkedin.com/in/cosmicai) |

</div>

### 🌟 Contributors

Thanks to all the amazing contributors who have helped make Space Chronicle better!

<div align="center">

[![Contributors](https://contrib.rocks/image?repo=your-username/space-history-explorer)](https://github.com/your-username/space-history-explorer/graphs/contributors)

</div>

---

## 🙏 Acknowledgments

### 🎯 Inspiration
- **NASA**: For making space exploration data accessible
- **SpaceX**: For inspiring the next generation of space enthusiasts
- **Carl Sagan**: For teaching us to look up at the stars

### 📚 Data Sources
- **NASA Open Data**: Historical mission data
- **NOAA SWPC**: Space weather information
- **ESA Archives**: European space mission data
- **SpaceX API**: Launch and mission data

### 🛠️ Tools & Libraries
- **Next.js Team**: For the amazing React framework
- **Vercel**: For the incredible deployment platform
- **OpenAI**: For powerful AI capabilities
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **Shadcn/ui**: For beautiful UI components

### 🎨 Design Inspiration
- **Apple**: For clean, intuitive design principles
- **SpaceX**: For bold, futuristic aesthetics
- **NASA**: For scientific accuracy and clarity
- **Dribbble**: For creative design inspiration

---

## 📞 Support

### 🆘 Getting Help

- **📖 Documentation**: Check this README and inline comments
- **🐛 Issues**: [GitHub Issues](https://github.com/your-username/space-history-explorer/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/your-username/space-history-explorer/discussions)
- **📧 Email**: support@space.kiwi.ind.in

### 🔗 Links

- **🌐 Website**: [space.kiwi.ind.in](https://space.kiwi.ind.in)
- **📱 GitHub**: [Repository](https://github.com/your-username/space-history-explorer)
- **🐦 Twitter**: [@SpaceChronicle](https://twitter.com/SpaceChronicle)
- **📺 YouTube**: [Space Chronicle Channel](https://youtube.com/@SpaceChronicle)

---

## 🗺️ Roadmap

### 🎯 Version 2.0 (Q2 2024)
- [ ] **🌍 Multi-language Support**: Internationalization
- [ ] **📱 Mobile App**: React Native companion app
- [ ] **🔔 Notifications**: Daily space event notifications
- [ ] **👤 User Accounts**: Personalized experience
- [ ] **❤️ Favorites**: Save and organize favorite events

### 🚀 Version 3.0 (Q3 2024)
- [ ] **🎮 Interactive Timeline**: 3D timeline visualization
- [ ] **🌌 AR Features**: Augmented reality space exploration
- [ ] **📊 Analytics Dashboard**: User engagement metrics
- [ ] **🤝 Social Features**: Share and discuss events
- [ ] **🎓 Educational Mode**: Structured learning paths

### 🌟 Future Ideas
- [ ] **🎥 Video Integration**: NASA video archives
- [ ] **🎵 Space Sounds**: Audio from space missions
- [ ] **🎨 AI Art Generation**: Space-themed artwork
- [ ] **🎯 Gamification**: Space exploration challenges
- [ ] **🔬 Scientific Papers**: Link to research publications

---

<div align="center">

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=your-username/space-history-explorer&type=Date)](https://star-history.com/#your-username/space-history-explorer&Date)

---

**Made with ❤️ and ☕ by the Space Chronicle Team**

*"The cosmos is within us. We are made of star-stuff."* - Carl Sagan

[![Built with Love](https://img.shields.io/badge/Built%20with-❤️-red?style=for-the-badge)](https://space.kiwi.ind.in)
[![Powered by Coffee](https://img.shields.io/badge/Powered%20by-☕-brown?style=for-the-badge)](https://space.kiwi.ind.in)
[![Inspired by Stars](https://img.shields.io/badge/Inspired%20by-⭐-yellow?style=for-the-badge)](https://space.kiwi.ind.in)

</div>
