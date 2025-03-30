// Array of songs
const songs = [
  { title: "Don't Talk", artist: "Artist 1", src: "Musics/dont-talk-315229.mp3" },
  { title: "Experimental Cinematic Hip Hop", artist: "Artist 2", src: "Musics/experimental-cinematic-hip-hop-315904.mp3" },
  { title: "Gorila", artist: "Artist 3", src: "Musics/gorila-315977.mp3" }
];

// Track current song index
let currentSongIndex = 0;

// Select elements
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playButton = document.getElementById("play");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playIcon = playButton.querySelector('i');

// Load song details
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playIcon.classList.replace('fa-play', 'fa-pause');
}

function pauseSong() {
  audio.pause();
  playIcon.classList.replace('fa-pause', 'fa-play');
}

let isPlaying = false;

playButton.addEventListener('click', () => {
  isPlaying ? pauseSong() : playSong();
  isPlaying = !isPlaying;
});

// Play the next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audio.play();
  }
}

// Play the previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) {
    audio.play();
  }
}

// Event listeners
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);

// Update time display
function updateTimeDisplay() {
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  currentTimeEl.textContent = `${minutes}:${seconds}`;

  if (audio.duration) {
    const durMin = Math.floor(audio.duration / 60);
    const durSec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
    durationEl.textContent = `${durMin}:${durSec}`;
  }
}

// Update progress bar and time display
audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  updateTimeDisplay();
});

// Ensure time display updates even when paused
setInterval(updateTimeDisplay, 500);

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value * audio.duration) / 100;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

// Initial load
loadSong(currentSongIndex);
