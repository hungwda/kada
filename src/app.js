// Main Application Component
function App() {
  const { html, useState, useEffect } = window;

  const [currentView, setCurrentView] = useState('home'); // 'home', 'lesson', 'progress'
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [progress, setProgress] = useState(null);

  // Load progress on mount
  useEffect(() => {
    const savedProgress = window.Storage.getProgress();
    setProgress(savedProgress);
  }, []);

  const handleSelectLesson = (lesson) => {
    const status = window.Storage.getLessonStatus(lesson.id);
    if (status === 'locked') {
      window.AudioUtil.playError();
      return;
    }

    window.AudioUtil.playClick();
    setSelectedLesson(lesson);
    setCurrentView('lesson');
  };

  const handleCompleteLesson = (score) => {
    const newProgress = window.Storage.completeLesson(selectedLesson.id, 3);
    setProgress(newProgress);
    window.AudioUtil.playCelebration();

    // Show celebration modal
    setTimeout(() => {
      setCurrentView('home');
      setSelectedLesson(null);
    }, 2000);
  };

  const handleNavigate = (view) => {
    window.AudioUtil.playClick();
    setCurrentView(view);
    setSelectedLesson(null);
  };

  const handleBackToHome = () => {
    window.AudioUtil.playClick();
    setCurrentView('home');
    setSelectedLesson(null);
  };

  // Home view - Lesson selection
  const renderHome = () => {
    return html`
      <div class="max-w-6xl mx-auto p-6">
        <h2 class="text-3xl font-bold text-center mb-8 text-indigo-600">
          🎓 Choose a Lesson
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${window.KannadaLessons.lessons.map(lesson => {
            const status = window.Storage.getLessonStatus(lesson.id);
            const isCompleted = status === 'completed';
            const isLocked = status === 'locked';

            return html`
              <button
                onclick="${() => handleSelectLesson(lesson)}"
                disabled="${isLocked}"
                class="bg-white rounded-3xl p-6 card-shadow text-left
                       transform transition-all hover:scale-105 active:scale-95
                       ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}
                       relative overflow-hidden"
              >
                <!-- Completed Badge -->
                ${isCompleted ? html`
                  <div class="absolute top-4 right-4 text-4xl animate-bounce star">
                    ✓
                  </div>
                ` : ''}

                <!-- Locked Badge -->
                ${isLocked ? html`
                  <div class="absolute top-4 right-4 text-4xl">
                    🔒
                  </div>
                ` : ''}

                <!-- Lesson Info -->
                <div class="text-5xl mb-3">${lesson.emoji}</div>
                <h3 class="text-xl font-bold text-indigo-600 mb-2">
                  Lesson ${lesson.id}
                </h3>
                <p class="text-gray-700 font-semibold mb-3">${lesson.title}</p>
                <div class="text-sm text-gray-500">
                  ${lesson.characters.length} letters to learn
                </div>

                <!-- Progress indicator -->
                ${isCompleted ? html`
                  <div class="mt-3 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    ✓ Completed
                  </div>
                ` : isLocked ? html`
                  <div class="mt-3 bg-gray-200 text-gray-500 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    🔒 Locked
                  </div>
                ` : html`
                  <div class="mt-3 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold inline-block">
                    → Start Lesson
                  </div>
                `}
              </button>
            `;
          })}
        </div>

        <!-- Fun fact -->
        <div class="mt-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-6 text-white text-center">
          <div class="text-4xl mb-2">💡</div>
          <div class="font-bold text-lg mb-2">Did you know?</div>
          <div class="text-sm">
            Kannada is one of the oldest languages in India and is spoken by over 50 million people!
            The Kannada script is beautiful and has 49 letters.
          </div>
        </div>
      </div>
    `;
  };

  return html`
    <div class="min-h-screen pb-20">
      <!-- Navigation -->
      ${window.Navigation({
        currentView: currentView === 'lesson' ? 'home' : currentView,
        onNavigate: handleNavigate,
        progress: progress
      })}

      <!-- Main Content -->
      ${currentView === 'home' && renderHome()}

      ${currentView === 'progress' && window.ProgressView({
        progress: progress
      })}

      ${currentView === 'lesson' && selectedLesson && window.LessonView({
        lesson: selectedLesson,
        onComplete: handleCompleteLesson,
        onBack: handleBackToHome
      })}

      <!-- Footer -->
      <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div class="max-w-4xl mx-auto text-center">
          <p class="text-xs text-gray-500">
            Made with ❤️ for kids learning Kannada
          </p>
          <button
            onclick="${() => {
              if (confirm('Reset all progress? This cannot be undone!')) {
                window.Storage.resetProgress();
                setProgress(window.Storage.getProgress());
                window.AudioUtil.playClick();
              }
            }}"
            class="mt-2 text-xs text-gray-400 hover:text-gray-600"
          >
            Reset Progress
          </button>
        </div>
      </footer>
    </div>
  `;
}

// Render the app
window.addEventListener('DOMContentLoaded', () => {
  const { h, render } = window;
  render(h(App), document.getElementById('app'));
});
