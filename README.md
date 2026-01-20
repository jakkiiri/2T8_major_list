# EngSci 2T8 Major Tracker 🎓

A beautiful, interactive website to track intended majors for the Engineering Science Class of 2T8 at the University of Toronto.

![EngSci](https://img.shields.io/badge/EngSci-2T8-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

- **Student Directory**: Alphabetically sorted list of all students with their intended majors
- **Analytics Dashboard**: Visual charts and statistics showing major distribution
- **Leaderboard**: Real-time popularity rankings of all 9 majors
- **Major Grid**: Explore students grouped by their chosen major
- **Beautiful UI**: Modern glass morphism design with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile

## 🚀 Available Majors

1. 🚀 **Aerospace** - Designing the future of flight and space exploration
2. 🧬 **Biomedical** - Engineering solutions for healthcare and medicine
3. ⚡ **Energy Systems** - Powering a sustainable future
4. ⚛️ **Engineering Physics** - Understanding and harnessing the laws of nature
5. 💻 **Electrical and Computer** - Building the digital infrastructure of tomorrow
6. 📊 **Math Stats Finance** - Quantitative methods for complex systems
7. 🤖 **Machine Intelligence** - Creating intelligent systems that learn and adapt
8. 🦾 **Robotics** - Designing autonomous machines for the real world
9. 🚄 **Transportation** - Revolutionizing how people and goods move

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Adding New Students

To add new students, edit the `src/data/students.json` file:

```json
{
  "students": [
    { "id": 1, "name": "Student Name", "major": "Machine Intelligence" },
    // Add more students here...
  ]
}
```

**Available majors:**
- Aerospace
- Biomedical
- Energy Systems
- Engineering Physics
- Electrical and Computer
- Math Stats Finance
- Machine Intelligence
- Robotics
- Transportation

## 🌐 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy!

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## 📄 License

MIT License - Made with ❤️ by EngSci 2T8

---

*University of Toronto • Faculty of Applied Science & Engineering • Engineering Science*
