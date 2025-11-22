// Navigation Component
window.Navigation = function({ currentView, onNavigate, progress }) {
  const { html } = window;

  return html`
    <nav class="bg-white shadow-lg rounded-b-3xl p-4 mb-6">
      <div class="flex items-center justify-between max-w-4xl mx-auto">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="text-4xl animate-bounce-slow">📚</div>
          <div>
            <h1 class="text-xl font-bold text-indigo-600">Kannada Kids</h1>
            <p class="text-xs text-gray-500">Learn with fun!</p>
          </div>
        </div>

        <!-- Stats -->
        <div class="flex items-center space-x-4">
          <!-- Streak -->
          <div class="flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full">
            <span class="text-xl">🔥</span>
            <span class="font-bold text-orange-600">${progress?.streak || 0}</span>
          </div>

          <!-- Stars -->
          <div class="flex items-center space-x-1 bg-yellow-100 px-3 py-1 rounded-full">
            <span class="text-xl star">⭐</span>
            <span class="font-bold text-yellow-600">${progress?.stars || 0}</span>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="flex justify-center mt-4 space-x-2">
        <button
          onclick="${() => onNavigate('home')}"
          class="${currentView === 'home'
            ? 'bg-indigo-500 text-white'
            : 'bg-gray-200 text-gray-600'}
            px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105"
        >
          🏠 Lessons
        </button>
        <button
          onclick="${() => onNavigate('progress')}"
          class="${currentView === 'progress'
            ? 'bg-indigo-500 text-white'
            : 'bg-gray-200 text-gray-600'}
            px-6 py-2 rounded-full font-semibold transition-all transform hover:scale-105"
        >
          📊 Progress
        </button>
      </div>
    </nav>
  `;
};
