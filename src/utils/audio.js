// Audio utility for sound effects and pronunciation
window.AudioUtil = {
  context: null,

  // Initialize audio context
  init: function() {
    if (!this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
    }
    return this.context;
  },

  // Play a simple beep/tone
  playTone: function(frequency = 440, duration = 200, type = 'sine') {
    const ctx = this.init();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration / 1000);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration / 1000);
  },

  // Play success sound
  playSuccess: function() {
    this.playTone(523.25, 100); // C5
    setTimeout(() => this.playTone(659.25, 100), 100); // E5
    setTimeout(() => this.playTone(783.99, 200), 200); // G5
  },

  // Play error sound
  playError: function() {
    this.playTone(200, 100, 'square');
    setTimeout(() => this.playTone(150, 200, 'square'), 100);
  },

  // Play click sound
  playClick: function() {
    this.playTone(800, 50, 'square');
  },

  // Play celebration sound
  playCelebration: function() {
    const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
    notes.forEach((note, i) => {
      setTimeout(() => this.playTone(note, 150), i * 100);
    });
  },

  // Text-to-speech for Kannada characters (uses browser TTS if available)
  speak: function(text, lang = 'kn-IN') {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8; // Slower for kids
      utterance.pitch = 1.2; // Slightly higher pitch

      // Try to find a Kannada voice
      const voices = speechSynthesis.getVoices();
      const kannadaVoice = voices.find(voice => voice.lang.startsWith('kn'));
      if (kannadaVoice) {
        utterance.voice = kannadaVoice;
      }

      speechSynthesis.speak(utterance);
    }
  },

  // Preload voices (needed for some browsers)
  preloadVoices: function() {
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices();
      };
    }
  }
};

// Preload voices on script load
AudioUtil.preloadVoices();
