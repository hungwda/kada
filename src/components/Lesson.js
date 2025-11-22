// Lesson Component
window.LessonView = function({ lesson, onComplete, onBack }) {
  const { html, useState } = window;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [gameType, setGameType] = useState(null);

  const character = lesson.characters[currentIndex];
  const isLastCharacter = currentIndex === lesson.characters.length - 1;

  const handleNext = () => {
    window.AudioUtil.playClick();
    if (isLastCharacter) {
      setShowGame(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    window.AudioUtil.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSpeak = () => {
    window.AudioUtil.playClick();
    window.AudioUtil.speak(character.char);
  };

  const handlePlayGame = (type) => {
    window.AudioUtil.playClick();
    setGameType(type);
  };

  const handleGameComplete = (score) => {
    setGameType(null);
    setShowGame(false);
    onComplete(score);
  };

  // If playing a game, show the game component
  if (gameType) {
    if (gameType === 'matching') {
      return window.MatchingGame({
        lesson,
        onComplete: handleGameComplete,
        onBack: () => setGameType(null)
      });
    } else if (gameType === 'tracing') {
      return window.TracingGame({
        lesson,
        onComplete: handleGameComplete,
        onBack: () => setGameType(null)
      });
    } else if (gameType === 'listening') {
      return window.ListeningGame({
        lesson,
        onComplete: handleGameComplete,
        onBack: () => setGameType(null)
      });
    }
  }

  // If showing game selection
  if (showGame) {
    return html`
      <div class="max-w-4xl mx-auto p-6">
        <div class="bg-white rounded-3xl p-8 card-shadow text-center">
          <div class="text-6xl mb-4 animate-bounce">🎮</div>
          <h2 class="text-3xl font-bold text-indigo-600 mb-2">Great Job!</h2>
          <p class="text-gray-600 mb-8">Now let's play some games to practice!</p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Matching Game -->
            <button
              onclick="${() => handlePlayGame('matching')}"
              class="bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-2xl p-6
                     transform transition-all hover:scale-105 active:scale-95"
            >
              <div class="text-5xl mb-2">🎯</div>
              <div class="font-bold text-xl">Matching</div>
              <div class="text-sm opacity-90">Match letters</div>
            </button>

            <!-- Tracing Game -->
            <button
              onclick="${() => handlePlayGame('tracing')}"
              class="bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-2xl p-6
                     transform transition-all hover:scale-105 active:scale-95"
            >
              <div class="text-5xl mb-2">✍️</div>
              <div class="font-bold text-xl">Tracing</div>
              <div class="text-sm opacity-90">Trace letters</div>
            </button>

            <!-- Listening Game -->
            <button
              onclick="${() => handlePlayGame('listening')}"
              class="bg-gradient-to-br from-green-400 to-green-600 text-white rounded-2xl p-6
                     transform transition-all hover:scale-105 active:scale-95"
            >
              <div class="text-5xl mb-2">👂</div>
              <div class="font-bold text-xl">Listening</div>
              <div class="text-sm opacity-90">Hear and find</div>
            </button>
          </div>

          <button
            onclick="${() => { setShowGame(false); setCurrentIndex(0); }}"
            class="mt-6 px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold
                   transform transition-all hover:scale-105"
          >
            Review Lesson
          </button>
        </div>
      </div>
    `;
  }

  // Main lesson view
  return html`
    <div class="max-w-4xl mx-auto p-6">
      <!-- Back Button -->
      <button
        onclick="${onBack}"
        class="mb-4 flex items-center space-x-2 text-indigo-600 font-semibold
               transform transition-all hover:scale-105"
      >
        <span class="text-2xl">←</span>
        <span>Back to Lessons</span>
      </button>

      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-semibold text-gray-600">
            ${currentIndex + 1} of ${lesson.characters.length}
          </span>
          <span class="text-sm font-semibold text-indigo-600">
            ${Math.round(((currentIndex + 1) / lesson.characters.length) * 100)}%
          </span>
        </div>
        <div class="bg-gray-200 rounded-full h-3">
          <div
            class="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style="width: ${((currentIndex + 1) / lesson.characters.length) * 100}%"
          ></div>
        </div>
      </div>

      <!-- Character Card -->
      <div class="bg-white rounded-3xl p-8 card-shadow mb-6">
        <!-- Kannada Character - Large -->
        <div class="text-center mb-6">
          <div class="kannada-text text-9xl font-bold text-indigo-600 mb-4 animate-pop">
            ${character.char}
          </div>

          <!-- Sound Button -->
          <button
            onclick="${handleSpeak}"
            class="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full
                   px-8 py-4 text-xl font-bold transform transition-all hover:scale-110
                   active:scale-95 shadow-lg"
          >
            🔊 Listen
          </button>
        </div>

        <!-- Character Info -->
        <div class="space-y-4">
          <!-- Romanization -->
          <div class="bg-blue-50 rounded-2xl p-4">
            <div class="text-sm text-gray-600 mb-1">Roman Script:</div>
            <div class="text-2xl font-bold text-blue-600">${character.roman}</div>
          </div>

          <!-- Pronunciation -->
          <div class="bg-purple-50 rounded-2xl p-4">
            <div class="text-sm text-gray-600 mb-1">Sounds like:</div>
            <div class="text-2xl font-bold text-purple-600">"${character.sound}"</div>
          </div>

          <!-- Example -->
          <div class="bg-pink-50 rounded-2xl p-4">
            <div class="text-sm text-gray-600 mb-1">Example:</div>
            <div class="text-lg font-bold text-pink-600 kannada-text">${character.example}</div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center">
        <button
          onclick="${handlePrevious}"
          disabled="${currentIndex === 0}"
          class="px-6 py-3 rounded-full font-bold text-lg
                 ${currentIndex === 0
                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                   : 'bg-gray-300 text-gray-700 transform transition-all hover:scale-105 active:scale-95'}"
        >
          ← Previous
        </button>

        <div class="flex space-x-2">
          ${lesson.characters.map((_, idx) => html`
            <div class="${idx === currentIndex
              ? 'w-3 h-3 rounded-full bg-indigo-600'
              : idx < currentIndex
                ? 'w-3 h-3 rounded-full bg-green-400'
                : 'w-3 h-3 rounded-full bg-gray-300'}"
            ></div>
          `)}
        </div>

        <button
          onclick="${handleNext}"
          class="px-6 py-3 rounded-full font-bold text-lg bg-gradient-to-r from-indigo-500 to-purple-500
                 text-white transform transition-all hover:scale-105 active:scale-95 shadow-lg"
        >
          ${isLastCharacter ? 'Play Games! 🎮' : 'Next →'}
        </button>
      </div>
    </div>
  `;
};
