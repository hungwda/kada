// Listening Game - Listen and identify the correct character
window.ListeningGame = function({ lesson, onComplete, onBack }) {
  const { html, useState, useEffect } = window;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null);

  const character = lesson.characters[currentIndex];
  const isLastCharacter = currentIndex === lesson.characters.length - 1;

  useEffect(() => {
    generateOptions();
    // Auto-play sound when question loads
    setTimeout(() => playSound(), 500);
  }, [currentIndex]);

  const generateOptions = () => {
    const correct = lesson.characters[currentIndex];
    const allChars = lesson.characters.filter(c => c.char !== correct.char);
    const shuffled = allChars.sort(() => Math.random() - 0.5);
    const wrong = shuffled.slice(0, 3);

    const allOptions = [correct, ...wrong].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const playSound = () => {
    window.AudioUtil.playClick();
    window.AudioUtil.speak(character.char);
  };

  const handleAnswer = (selectedChar) => {
    window.AudioUtil.playClick();

    if (selectedChar.char === character.char) {
      // Correct!
      window.AudioUtil.playSuccess();
      setShowFeedback('correct');
      setScore(score + 10);

      setTimeout(() => {
        setShowFeedback(null);
        if (isLastCharacter) {
          window.AudioUtil.playCelebration();
          onComplete(score + 10);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }, 1500);
    } else {
      // Wrong
      window.AudioUtil.playError();
      setShowFeedback('wrong');

      setTimeout(() => {
        setShowFeedback(null);
      }, 1000);
    }
  };

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
          <h2 class="text-2xl font-bold text-indigo-600">👂 Listening Game</h2>
          <p class="text-sm text-gray-600">Listen and pick the right letter!</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-yellow-600">⭐ ${score}</div>
        </div>
      </div>

      <!-- Progress -->
      <div class="mb-6">
        <div class="text-center mb-2 text-lg font-semibold text-gray-700">
          ${currentIndex + 1} / ${lesson.characters.length}
        </div>
        <div class="bg-gray-200 rounded-full h-3">
          <div
            class="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-300"
            style="width: ${((currentIndex + 1) / lesson.characters.length) * 100}%"
          ></div>
        </div>
      </div>

      <!-- Sound Button -->
      <div class="text-center mb-8">
        <button
          onclick="${playSound}"
          class="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full
                 px-12 py-8 text-3xl font-bold transform transition-all hover:scale-110
                 active:scale-95 shadow-xl animate-pulse"
        >
          🔊 Play Sound
        </button>
        <p class="mt-4 text-gray-600 font-semibold">Tap to hear the letter!</p>
      </div>

      <!-- Options -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        ${options.map(opt => html`
          <button
            onclick="${() => handleAnswer(opt)}"
            disabled="${showFeedback !== null}"
            class="bg-white rounded-3xl p-8 card-shadow kannada-text text-6xl font-bold
                   text-indigo-600 transform transition-all hover:scale-105 active:scale-95
                   ${showFeedback === 'correct' && opt.char === character.char
                     ? 'bg-green-400 text-white animate-pop'
                     : showFeedback === 'wrong' && opt.char !== character.char
                       ? 'opacity-50'
                       : ''}"
          >
            ${opt.char}
            ${showFeedback === 'correct' && opt.char === character.char ? html`
              <div class="text-4xl mt-2">✓</div>
            ` : ''}
          </button>
        `)}
      </div>

      <!-- Feedback -->
      ${showFeedback === 'correct' ? html`
        <div class="bg-green-100 border-4 border-green-400 rounded-3xl p-6 text-center animate-pop">
          <div class="text-6xl mb-2">🎉</div>
          <div class="text-2xl font-bold text-green-600">Perfect!</div>
          <div class="text-lg text-green-700 kannada-text mt-2">
            ${character.char} = ${character.roman}
          </div>
        </div>
      ` : showFeedback === 'wrong' ? html`
        <div class="bg-red-100 border-4 border-red-400 rounded-3xl p-6 text-center animate-wiggle">
          <div class="text-6xl mb-2">😅</div>
          <div class="text-2xl font-bold text-red-600">Try Again!</div>
          <div class="text-lg text-red-700">Listen carefully and try once more!</div>
        </div>
      ` : html`
        <div class="bg-blue-50 rounded-3xl p-6 text-center">
          <div class="text-4xl mb-2">💡</div>
          <div class="text-lg text-blue-600 font-semibold">
            Listen to the sound and choose the matching letter!
          </div>
        </div>
      `}
    </div>
  `;
};
