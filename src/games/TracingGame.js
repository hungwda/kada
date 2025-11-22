// Tracing Game - Trace Kannada letters on a canvas
window.TracingGame = function({ lesson, onComplete, onBack }) {
  const { html, useState, useEffect } = window;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [score, setScore] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);

  const character = lesson.characters[currentIndex];
  const isLastCharacter = currentIndex === lesson.characters.length - 1;

  useEffect(() => {
    const canvas = document.getElementById('tracing-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw the character in light gray as a guide
    ctx.font = 'bold 200px "Noto Sans Kannada"';
    ctx.fillStyle = '#E5E7EB';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character.char, canvas.width / 2, canvas.height / 2);
  }, [currentIndex]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setHasDrawn(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = document.getElementById('tracing-canvas');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

    const canvas = document.getElementById('tracing-canvas');
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    let x, y;
    if (e.type.includes('touch')) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#4F46E5';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    window.AudioUtil.playClick();
    const canvas = document.getElementById('tracing-canvas');
    const ctx = canvas.getContext('2d');

    // Clear and redraw guide
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 200px "Noto Sans Kannada"';
    ctx.fillStyle = '#E5E7EB';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character.char, canvas.width / 2, canvas.height / 2);

    setHasDrawn(false);
  };

  const handleNext = () => {
    if (!hasDrawn) {
      window.AudioUtil.playError();
      return;
    }

    window.AudioUtil.playSuccess();
    window.AudioUtil.speak(character.char);
    setScore(score + 10);
    setHasDrawn(false);

    if (isLastCharacter) {
      setTimeout(() => {
        window.AudioUtil.playCelebration();
        onComplete(score + 10);
      }, 500);
    } else {
      setCurrentIndex(currentIndex + 1);
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
          <h2 class="text-2xl font-bold text-indigo-600">✍️ Tracing Game</h2>
          <p class="text-sm text-gray-600">Trace the letter with your finger!</p>
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
            class="bg-gradient-to-r from-purple-400 to-purple-600 h-3 rounded-full transition-all duration-300"
            style="width: ${((currentIndex + 1) / lesson.characters.length) * 100}%"
          ></div>
        </div>
      </div>

      <!-- Character Info -->
      <div class="bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-2xl p-4 mb-6 text-center">
        <div class="text-4xl kannada-text font-bold mb-2">${character.char}</div>
        <div class="text-xl font-semibold">${character.roman}</div>
      </div>

      <!-- Canvas -->
      <div class="bg-white rounded-3xl p-4 card-shadow mb-6 relative">
        <canvas
          id="tracing-canvas"
          class="w-full h-80 touch-none cursor-crosshair"
          onmousedown="${startDrawing}"
          onmouseup="${stopDrawing}"
          onmousemove="${draw}"
          onmouseleave="${stopDrawing}"
          ontouchstart="${startDrawing}"
          ontouchend="${stopDrawing}"
          ontouchmove="${draw}"
        ></canvas>
      </div>

      <!-- Controls -->
      <div class="flex justify-between items-center">
        <button
          onclick="${clearCanvas}"
          class="px-6 py-3 bg-gray-300 text-gray-700 rounded-full font-bold
                 transform transition-all hover:scale-105 active:scale-95"
        >
          🗑️ Clear
        </button>

        <button
          onclick="${handleNext}"
          class="px-6 py-3 rounded-full font-bold bg-gradient-to-r from-purple-500 to-pink-500
                 text-white transform transition-all hover:scale-105 active:scale-95 shadow-lg
                 ${!hasDrawn ? 'opacity-50' : ''}"
        >
          ${isLastCharacter ? 'Finish! 🎉' : 'Next →'}
        </button>
      </div>

      ${!hasDrawn ? html`
        <div class="mt-4 text-center animate-bounce">
          <p class="text-indigo-600 font-semibold">
            ✨ Trace the letter to continue!
          </p>
        </div>
      ` : ''}
    </div>
  `;
};
