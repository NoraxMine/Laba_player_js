const sound_arr = [
    'ace-of-base-beautiful-life.mp3',
    'britney-spears-baby-one-more-time.mp3',
    'madcon-beggin.mp3',
    'ofenbach-be-mine.mp3',
    'nico-vinz-am-i-wrong.mp3'
];

const titles = [
    'Beautiful Life',
    '...Baby One More Time',
    'Beggin',
    'Be Mine',
    'Am I Wrong'
];

const artists = [
    'Ace of Base',
    'Britney Spears',
    'Madcon',
    'Ofenbach',
    'Nico & Vinz'
];

let currentIndex = 0;
let isShuffle = false;

const audio = document.getElementById('audio-player');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

function openPlayer(index) {
    currentIndex = index;
    document.getElementById('list-screen').classList.remove('active');
    document.getElementById('player-screen').classList.add('active');
    loadTrack(currentIndex);
}

function loadTrack(index) {
    document.getElementById('track-title').textContent = `${artists[index]} – ${titles[index]}`;
    document.getElementById('list-title').textContent = titles[index];
    document.getElementById('list-singer').textContent = artists[index];
    document.getElementById('audio-source').src = sound_arr[index];
    audio.load();
    audio.play();
}

function goBack() {
    document.getElementById('player-screen').classList.remove('active');
    document.getElementById('list-screen').classList.add('active');
}

function playFirstTrack() {
    openPlayer(0);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    const diffBtn = document.getElementById('diff-btn');
    diffBtn.classList.toggle('active', isShuffle);
}

function nextTrack() {
    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * sound_arr.length);
        } while (randomIndex === currentIndex && sound_arr.length > 1);
        currentIndex = randomIndex;
    } else {
        currentIndex = (currentIndex + 1) % sound_arr.length;
    }
    loadTrack(currentIndex);
}

function prevTrack() {
    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * sound_arr.length);
        } while (randomIndex === currentIndex && sound_arr.length > 1);
        currentIndex = randomIndex;
    } else {
        currentIndex = (currentIndex - 1 + sound_arr.length) % sound_arr.length;
    }
    loadTrack(currentIndex);
}

function playAudio() {
    audio.play();
}

function pauseAudio() {
    audio.pause();
}

function changeVolume(value) {
    audio.volume = parseFloat(value);
}

function shufflePlaylist() {
    for (let i = sound_arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [sound_arr[i], sound_arr[j]] = [sound_arr[j], sound_arr[i]];
        [titles[i], titles[j]] = [titles[j], titles[i]];
        [artists[i], artists[j]] = [artists[j], artists[i]];
    }
    currentIndex = 0;
    loadTrack(currentIndex);
}

audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function downloadTrack() {
    const link = document.createElement('a');
    link.href = sound_arr[currentIndex];
    link.download = sound_arr[currentIndex];
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const lyrics = [
    "Life is beautiful, life is wonderful...",
    "Oh baby, baby, how was I supposed to know...",
    "Beggin', beggin' you, put your loving hand out baby...",
    "Be mine tonight, let's dance until the morning light...",
    "Am I wrong for thinking we could be something for real..."
];

function showLyrics() {
    const box = document.getElementById('lyrics-box');
    box.textContent = lyrics[currentIndex];
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}
