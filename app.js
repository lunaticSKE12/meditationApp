const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const replay = document.querySelector('.replay');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  // Sound
  const sounds = document.querySelectorAll('.sound-picker button');
  // Time display
  const timeDisplay = document.querySelector('.time-display');
  // Time select
  const timeSelect = document.querySelectorAll('.time-select button');
  // Get the length of the outline
  const outlineLength = outline.getTotalLength();
  // console.log(outlineLength);

  // Duration 600s
  let duration = 600;

  // Set circle outline length
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;
  timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(
    duration % 60
  )}`;

  // Pick different sounds
  sounds.forEach((sound) => {
    sound.addEventListener('click', function () {
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
    });
  });

  // play sound
  play.addEventListener('click', () => {
    checkPlaying(song);
  });

  // replay sound
  replay.addEventListener('click', function () {
    restartSong(song);
  });

  const restartSong = (song) => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log('ciao');
  };

  // Select time
  timeSelect.forEach((option) => {
    option.addEventListener('click', function () {
      // prase int
      duration = +this.getAttribute('data-time') * 60;
      // console.log(duration);
      timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(
        duration % 60
      )}`;
    });
  });

  // Create a function specific to stop and play the sounds
  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = './svg/pause.svg';
    } else {
      song.pause();
      video.pause();
      play.src = './svg/play.svg';
    }
  };

  // We can animated the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = duration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate the circle
    let progress = outlineLength - (currentTime / duration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= duration) {
      song.pause();
      song.currentTime = 0;
      play.src = './svg/play.svg';
      video.pause();
    }
  };
};

app();
