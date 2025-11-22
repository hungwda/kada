// LocalStorage utility for progress tracking
window.Storage = {
  // Get user progress
  getProgress: function() {
    const progress = localStorage.getItem('kannadaProgress');
    return progress ? JSON.parse(progress) : {
      completedLessons: [],
      stars: 0,
      currentLesson: 1,
      streak: 0,
      lastPlayed: null
    };
  },

  // Save user progress
  saveProgress: function(progress) {
    localStorage.setItem('kannadaProgress', JSON.stringify(progress));
  },

  // Mark lesson as completed
  completeLesson: function(lessonId, stars = 3) {
    const progress = this.getProgress();

    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.stars += stars;
      progress.currentLesson = Math.max(progress.currentLesson, lessonId + 1);
    }

    // Update streak
    const today = new Date().toDateString();
    const lastPlayed = progress.lastPlayed ? new Date(progress.lastPlayed).toDateString() : null;

    if (lastPlayed !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastPlayed === yesterday.toDateString()) {
        progress.streak += 1;
      } else if (lastPlayed !== today) {
        progress.streak = 1;
      }
    }

    progress.lastPlayed = new Date().toISOString();
    this.saveProgress(progress);
    return progress;
  },

  // Get lesson status
  getLessonStatus: function(lessonId) {
    const progress = this.getProgress();
    if (progress.completedLessons.includes(lessonId)) {
      return 'completed';
    }
    if (lessonId <= progress.currentLesson) {
      return 'available';
    }
    return 'locked';
  },

  // Reset progress (for testing)
  resetProgress: function() {
    localStorage.removeItem('kannadaProgress');
  },

  // Get high score for a specific game
  getGameScore: function(gameType, lessonId) {
    const key = `game_${gameType}_${lessonId}`;
    return parseInt(localStorage.getItem(key) || '0');
  },

  // Save game score
  saveGameScore: function(gameType, lessonId, score) {
    const key = `game_${gameType}_${lessonId}`;
    const currentHigh = this.getGameScore(gameType, lessonId);
    if (score > currentHigh) {
      localStorage.setItem(key, score.toString());
    }
  }
};
