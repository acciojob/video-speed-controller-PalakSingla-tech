
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const playButton = player.querySelector(".player__button");
const progress = player.querySelector(".progress");
const progressFilled = player.querySelector(".progress__filled");
const skipButtons = player.querySelectorAll("[data-skip]");
const volumeInput = player.querySelector('input[name="volume"]');
const speedInput = player.querySelector('input[name="playbackSpeed"]');

// Play and pause toggle
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  playButton.textContent = video.paused ? "►" : "❚ ❚";
}

playButton.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

// Update progress bar
function updateProgress() {
  const percentage = (video.currentTime / video.duration) * 100;
  progressFilled.style.width = `${percentage || 0}%`;
}

video.addEventListener("timeupdate", updateProgress);

// Seek by clicking the progress bar
progress.addEventListener("click", function (event) {
  if (!video.duration) return;

  const clickPosition = event.offsetX / progress.offsetWidth;
  video.currentTime = clickPosition * video.duration;
});

// Skip backward or forward
skipButtons.forEach(button => {
  button.addEventListener("click", function () {
    video.currentTime += Number(this.dataset.skip);
  });
});

// Volume control
volumeInput.addEventListener("input", function () {
  video.volume = Number(this.value);
});

// Playback speed control
speedInput.addEventListener("input", function () {
  video.playbackRate = Number(this.value);
});
