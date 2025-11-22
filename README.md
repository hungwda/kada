# 🎓 Kannada Kids - Learn Kannada Alphabet

A fun, interactive, kid-friendly Progressive Web App (PWA) for learning the Kannada alphabet, inspired by Duolingo ABC. Built with modern web standards for self-hosted, offline-first learning.

![Kannada Kids](https://img.shields.io/badge/Language-Kannada-orange) ![PWA](https://img.shields.io/badge/PWA-Enabled-blue) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 📚 **12 Comprehensive Lessons**
- **Vowels** (ಅ, ಆ, ಇ, etc.) - 3 lessons covering all Kannada vowels
- **Consonants** (ಕ, ಖ, ಗ, etc.) - 7 lessons covering all consonant groups
- **Words** - 2 lessons with simple words and phrases

### 🎮 **3 Interactive Mini-Games**
1. **🎯 Matching Game** - Match Kannada letters with their romanized sounds
2. **✍️ Tracing Game** - Draw letters on a touch-friendly canvas
3. **👂 Listening Game** - Listen and identify the correct letter

### 🌟 **Gamification & Progress**
- ⭐ Star rewards for completing lessons
- 🔥 Daily streak tracking
- 🏆 Achievement badges
- 📊 Detailed progress dashboard
- 🔒 Progressive unlocking system

### 🎨 **Kid-Friendly Design**
- Colorful, engaging interface
- Large, easy-to-read Kannada text
- Fun animations and sound effects
- Touch-optimized for tablets and phones
- Encouraging feedback and celebrations

### 📱 **PWA Features**
- **Offline-first** - Works without internet connection
- **Installable** - Add to home screen like a native app
- **Fast** - Loads quickly with service worker caching
- **Responsive** - Works on all devices (phones, tablets, desktops)

## 🚀 Getting Started

### Installation

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser
3. **That's it!** No server or build process required

### For Production Use

Serve the files using any web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### Installing as PWA

1. Open the app in Chrome, Edge, or Safari
2. Look for the "Install" button in the address bar
3. Click "Install" to add to your home screen
4. Launch like a native app!

## 🏗️ Technology Stack

- **Preact** (3KB) - Lightweight React alternative
- **Tailwind CSS** - Utility-first CSS framework (via CDN)
- **HTM** - JSX-like syntax without build tools
- **Web Audio API** - Sound effects and text-to-speech
- **LocalStorage** - Offline progress tracking
- **Service Workers** - PWA offline functionality
- **Canvas API** - Letter tracing game

## 📂 Project Structure

```
kada/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
├── src/
│   ├── app.js             # Main application
│   ├── data/
│   │   └── kannada-lessons.js    # Lesson content
│   ├── utils/
│   │   ├── storage.js     # Progress tracking
│   │   └── audio.js       # Sound utilities
│   ├── components/
│   │   ├── Navigation.js  # Top navigation
│   │   ├── Progress.js    # Progress dashboard
│   │   └── Lesson.js      # Lesson viewer
│   └── games/
│       ├── MatchingGame.js
│       ├── TracingGame.js
│       └── ListeningGame.js
└── assets/
    ├── generate-icons.html  # Icon generator
    ├── icon-192.png
    └── icon-512.png
```

## 🎯 How It Works

### Lesson Flow
1. **Select a lesson** from the home screen
2. **Learn each letter** with visual aids and audio
3. **Complete the lesson** by viewing all letters
4. **Play games** to reinforce learning
5. **Earn stars** and unlock new lessons

### Progress Tracking
- All progress is saved locally using `localStorage`
- Track completed lessons, stars earned, and daily streaks
- View achievements and statistics in the Progress tab
- Data persists across sessions and works offline

### Audio Features
- **Text-to-Speech** - Hear Kannada letters pronounced (browser-dependent)
- **Sound Effects** - Fun beeps and celebrations for engagement
- **Audio Feedback** - Positive reinforcement for correct answers

## 🌐 Browser Support

Works best in modern browsers with:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ⚠️ Text-to-speech for Kannada requires browser support

## 🎨 Customization

### Adding More Lessons

Edit `src/data/kannada-lessons.js`:

```javascript
{
  id: 13,
  title: "Your Lesson Title",
  emoji: "🎯",
  type: "words",
  characters: [
    {
      char: "ನಮಸ್ಕಾರ",
      roman: "namaskāra",
      sound: "namaskara",
      meaning: "Hello",
      example: "ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಿ?"
    }
  ]
}
```

### Customizing Colors

The app uses Tailwind CSS. Modify the gradient colors in `index.html` or component files:

```javascript
// Change from purple to blue
className="bg-gradient-to-r from-blue-500 to-cyan-500"
```

### Adjusting Difficulty

Modify game parameters in the game files:
- Number of options in listening game
- Time limits (if you add them)
- Stars required to unlock lessons

## 🔧 Troubleshooting

### Icons not showing?
1. Open `assets/generate-icons.html` in your browser
2. Download the generated PNG files
3. Save them as `icon-192.png` and `icon-512.png` in the `assets/` folder

### Audio not working?
- Check browser permissions for audio
- Some browsers require user interaction before playing audio
- Text-to-speech availability varies by browser and OS

### PWA not installing?
- Ensure you're using HTTPS (or localhost)
- Check that manifest.json is accessible
- Verify service worker is registered (check DevTools > Application)

## 📝 License

MIT License - feel free to use this for educational purposes!

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add more lessons
- Improve games
- Add new features
- Fix bugs
- Improve documentation

## 🎓 Educational Value

This app helps children:
- **Learn the Kannada script** through visual and audio reinforcement
- **Develop fine motor skills** with the tracing game
- **Improve memory** with matching and listening games
- **Build confidence** with progressive unlocking and rewards
- **Practice independently** with offline functionality

## 🌟 Credits

- **Kannada Language Content** - Traditional Kannada alphabet
- **Font** - Google Fonts (Noto Sans Kannada, Fredoka)
- **Icons** - Emoji characters for kid-friendly design
- **Inspiration** - Duolingo ABC

---

Made with ❤️ for kids learning Kannada

Happy Learning! 🎉 ಕಲಿಯಿರಿ! (Kaliyiri!)