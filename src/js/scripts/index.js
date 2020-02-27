const musicContainer = document.getElementById('music'),
  playBtn = document.getElementById('play'),
  prevBtn = document.getElementById('prev'),
  nextBtn = document.getElementById('next'),
  audio = document.getElementById('audio'),
  progress = document.getElementById('progress'),
  progressContainer = document.getElementById('progress-container'),
  artistField = document.getElementById('artist'),
  titleField = document.getElementById('title'),
  cover = document.getElementById('cover'),
  timer = document.getElementById('timer'),
  duration = document.getElementById('duration');

// Song titles
const songs = [
  { artist: 'Goodbye Band', title: 'hey' },
  { artist: 'Lovely Winter', title: 'summer' },
  { artist: 'Hawai Boys', title: 'ukulele' }
];

// Keep track of song
let songIndex = 0;

// ----------------------------------------------------

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong({ artist, title }) {
  cover.src = `./images/${title}.jpg`;
  artistField.textContent = artist;
  titleField.textContent = `${title.charAt(0).toUpperCase()}${title.slice(
    1
  )} Song`;
  audio.src = `./music/${title}.mp3`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('img').src = './images/pause-icon.svg';
  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('img').src = './images/play-icon.svg';
  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Previous song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update progress
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  // Set timer & duration
  setTimerAndDuration(duration, currentTime);

  // Set progress bar
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth,
    clickX = e.offsetX,
    durationTime = audio.duration;

  audio.currentTime = (clickX / width) * durationTime;
}

// Set timer and duration
function setTimerAndDuration(durationTime, currentTime) {
  // Set timer
  let minsTimer = Math.floor(currentTime / 60);
  if (minsTimer < 10) {
    minsTimer = `0${minsTimer}`;
  }

  let secsTimer = Math.floor(currentTime % 60);
  if (secsTimer < 10) {
    secsTimer = `0${secsTimer}`;
  }

  timer.textContent = `${minsTimer}:${secsTimer}`;

  // Set duration
  let minsDuration = Math.floor(durationTime / 60);
  if (minsDuration < 10) {
    minsDuration = `0${minsDuration}`;
  }

  let secsDuration = Math.floor(durationTime % 60);
  if (secsDuration < 10) {
    secsDuration = `0${secsDuration}`;
  }

  duration.textContent = `${minsDuration}:${secsDuration}`;
}

// ----------------------------------------------------

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/Song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);
