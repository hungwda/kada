// Matching Game - Match Kannada letters with their romanizations
window.MatchingGame = function({ lesson, onComplete, onBack }) {
  const { html, useState, useEffect } = window;
  const [characters, setCharacters] = useState([]);
  const [selectedChar, setSelectedChar] = useState(null);
  const [selectedRoman, setSelectedRoman] = useState(null);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Shuffle and select characters for the game
    const shuffled = [...lesson.characters].sort(() => Math.random() - 0.5).slice(0, 5);
    setCharacters(shuffled);
  }, []);

  const handleCharClick = (char) => {
    if (matched.includes(char.char)) return;

    window.AudioUtil.playClick();
    setSelectedChar(char);

    if (selectedRoman) {
      checkMatch(char, selectedRoman);
    }
  };

  const handleRomanClick = (char) => {
    if (matched.includes(char.char)) return;

    window.AudioUtil.playClick();
    setSelectedRoman(char);

    if (selectedChar) {
      checkMatch(selectedChar, char);
    }
  };

  const checkMatch = (charObj, romanObj) => {
    setAttempts(attempts + 1);

    if (charObj.char === romanObj.char) {
      // Correct match!
      window.AudioUtil.playSuccess();
      window.AudioUtil.speak(charObj.char);
      setMatched([...matched, charObj.char]);
      setScore(score + 10);
      setSelectedChar(null);
      setSelectedRoman(null);

      // Check if game is complete
      if (matched.length + 1 === characters.length) {
        setTimeout(() => {
          window.AudioUtil.playCelebration();
          const finalScore = Math.round((score + 10) / (attempts + 1) * 100);
          onComplete(finalScore);
        }, 500);
      }
    } else {
      // Wrong match
      window.AudioUtil.playError();
      setTimeout(() => {
        setSelectedChar(null);
        setSelectedRoman(null);
      }, 500);
    }
  };

  const shuffledRomans = [...characters].sort(() => Math.random() - 0.5);

  return html`
    <div class="max-w-4xl mx-auto p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <button
          onclick="${onBack}"
          class="text-2xl transform transition-all hover:scale-110"
        >
          ←
        </button>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-indigo-600">🎯 Matching Game</h2>
          <p class="text-sm text-gray-600">Match the letters with their sounds!</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-yellow-600">⭐ ${score}</div>
        </div>
      </div>

      <!-- Progress -->
      <div class="mb-6">
        <div class="text-center mb-2 text-lg font-semibold text-gray-700">
          ${matched.length} / ${characters.length} matched
        </div>
        <div class="bg-gray-200 rounded-full h-3">
          <div
            class="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
            style="width: ${(matched.length / characters.length) * 100}%"
          ></div>
        </div>
      </div>

      <!-- Game Board -->
      <div class="grid grid-cols-2 gap-6">
        <!-- Kannada Characters Column -->
        <div class="space-y-3">
          <h3 class="text-center font-bold text-gray-700 mb-3">Kannada Letters</h3>
          ${characters.map(char => html`
            <button
              onclick="${() => handleCharClick(char)}"
              disabled="${matched.includes(char.char)}"
              class="w-full p-6 rounded-2xl kannada-text text-4xl font-bold
                     transform transition-all hover:scale-105 active:scale-95
                     ${matched.includes(char.char)
                       ? 'bg-green-100 text-green-400 cursor-not-allowed opacity-50'
                       : selectedChar?.char === char.char
                         ? 'bg-indigo-500 text-white shadow-lg scale-105'
                         : 'bg-white text-indigo-600 card-shadow'}"
            >
              ${matched.includes(char.char) ? '✓' : char.char}
            </button>
          `)}
        </div>

        <!-- Romanizations Column -->
        <div class="space-y-3">
          <h3 class="text-center font-bold text-gray-700 mb-3">Roman Letters</h3>
          ${shuffledRomans.map(char => html`
            <button
              onclick="${() => handleRomanClick(char)}"
              disabled="${matched.includes(char.char)}"
              class="w-full p-6 rounded-2xl text-3xl font-bold
                     transform transition-all hover:scale-105 active:scale-95
                     ${matched.includes(char.char)
                       ? 'bg-green-100 text-green-400 cursor-not-allowed opacity-50'
                       : selectedRoman?.char === char.char
                         ? 'bg-purple-500 text-white shadow-lg scale-105'
                         : 'bg-white text-purple-600 card-shadow'}"
            >
              ${matched.includes(char.char) ? '✓' : char.roman}
            </button>
          `)}
        </div>
      </div>

      <!-- Hint -->
      ${selectedChar && !selectedRoman ? html`
        <div class="mt-6 text-center animate-bounce">
          <p class="text-lg text-indigo-600 font-semibold">
            👉 Now pick the matching sound!
          </p>
        </div>
      ` : selectedRoman && !selectedChar ? html`
        <div class="mt-6 text-center animate-bounce">
          <p class="text-lg text-purple-600 font-semibold">
            👉 Now pick the matching letter!
          </p>
        </div>
      ` : ''}
    </div>
  `;
};
