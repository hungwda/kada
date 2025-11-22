// Progress Component
window.ProgressView = function({ progress }) {
  const { html } = window;
  const { completedLessons, stars, streak, currentLesson } = progress;
  const totalLessons = window.KannadaLessons.getTotalLessons();
  const completionRate = Math.round((completedLessons.length / totalLessons) * 100);

  return html`
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-3xl font-bold text-center mb-8 text-indigo-600">
        🎉 Your Progress 🎉
      </h2>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 gap-4 mb-8">
        <!-- Completion Rate -->
        <div class="bg-white rounded-3xl p-6 card-shadow text-center">
          <div class="text-5xl mb-2">📈</div>
          <div class="text-4xl font-bold text-indigo-600 mb-1">${completionRate}%</div>
          <div class="text-sm text-gray-600">Completed</div>
          <div class="mt-3 bg-gray-200 rounded-full h-3">
            <div
              class="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style="width: ${completionRate}%"
            ></div>
          </div>
        </div>

        <!-- Total Stars -->
        <div class="bg-white rounded-3xl p-6 card-shadow text-center">
          <div class="text-5xl mb-2 star">⭐</div>
          <div class="text-4xl font-bold text-yellow-600 mb-1">${stars}</div>
          <div class="text-sm text-gray-600">Stars Earned</div>
        </div>

        <!-- Streak -->
        <div class="bg-white rounded-3xl p-6 card-shadow text-center">
          <div class="text-5xl mb-2">🔥</div>
          <div class="text-4xl font-bold text-orange-600 mb-1">${streak}</div>
          <div class="text-sm text-gray-600">Day Streak</div>
        </div>

        <!-- Lessons Completed -->
        <div class="bg-white rounded-3xl p-6 card-shadow text-center">
          <div class="text-5xl mb-2">✅</div>
          <div class="text-4xl font-bold text-green-600 mb-1">${completedLessons.length}</div>
          <div class="text-sm text-gray-600">Lessons Done</div>
        </div>
      </div>

      <!-- Achievement Badges -->
      <div class="bg-white rounded-3xl p-6 card-shadow mb-8">
        <h3 class="text-xl font-bold text-center mb-4 text-indigo-600">🏆 Achievements</h3>
        <div class="flex justify-around flex-wrap gap-4">
          ${completedLessons.length >= 1 ? html`
            <div class="text-center">
              <div class="text-4xl mb-1 animate-pop">🌟</div>
              <div class="text-xs text-gray-600">First Lesson</div>
            </div>
          ` : ''}

          ${completedLessons.length >= 5 ? html`
            <div class="text-center">
              <div class="text-4xl mb-1 animate-pop">🎯</div>
              <div class="text-xs text-gray-600">5 Lessons</div>
            </div>
          ` : ''}

          ${completedLessons.length >= 10 ? html`
            <div class="text-center">
              <div class="text-4xl mb-1 animate-pop">🏅</div>
              <div class="text-xs text-gray-600">10 Lessons</div>
            </div>
          ` : ''}

          ${streak >= 3 ? html`
            <div class="text-center">
              <div class="text-4xl mb-1 animate-pop">🔥</div>
              <div class="text-xs text-gray-600">3 Day Streak</div>
            </div>
          ` : ''}

          ${streak >= 7 ? html`
            <div class="text-center">
              <div class="text-4xl mb-1 animate-pop">💪</div>
              <div class="text-xs text-gray-600">Week Warrior</div>
            </div>
          ` : ''}

          ${stars >= 50 ? html`
            <div class="text-center">
              <div class="text-4xl mb-1 animate-pop">🌠</div>
              <div class="text-xs text-gray-600">Star Collector</div>
            </div>
          ` : ''}

          ${completionRate === 100 ? html`
            <div class="text-center">
              <div class="text-4xl mb-1 animate-pop">👑</div>
              <div class="text-xs text-gray-600">Master!</div>
            </div>
          ` : ''}
        </div>
      </div>

      <!-- Encouragement Message -->
      <div class="bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl p-6 text-white text-center">
        <div class="text-3xl mb-2">
          ${completionRate === 0 ? '🚀' :
            completionRate < 50 ? '👏' :
            completionRate < 100 ? '🎊' : '🎉'}
        </div>
        <div class="font-bold text-lg">
          ${completionRate === 0 ? 'Start your Kannada journey!' :
            completionRate < 50 ? 'Great progress! Keep going!' :
            completionRate < 100 ? 'Almost there! You\'re doing amazing!' :
            'Congratulations! You\'re a Kannada master! 🎓'}
        </div>
      </div>
    </div>
  `;
};
