const playlist = [
    {
        file: 'ace-of-base-beautiful-life.mp3',
        title: 'Beautiful Life',
        artist: 'Ace of Base',
        lyrics: "Life is beautiful, life is wonderful..."
    },
    {
        file: 'britney-spears-baby-one-more-time.mp3',
        title: '...Baby One More Time',
        artist: 'Britney Spears',
        lyrics: "Oh baby, baby, how was I supposed to know..."
    },
    {
        file: 'madcon-beggin.mp3',
        title: 'Beggin',
        artist: 'Madcon',
        lyrics: "Beggin', beggin' you, put your loving hand out baby..."
    },
    {
        file: 'ofenbach-be-mine.mp3',
        title: 'Be Mine',
        artist: 'Ofenbach',
        lyrics: "Be mine tonight, let's dance until the morning light..."
    },
    {
        file: 'nico-vinz-am-i-wrong.mp3',
        title: 'Am I Wrong',
        artist: 'Nico & Vinz',
        lyrics: "Am I wrong for thinking we could be something for real..."
    },
    {
        file: 'Gravity - Hazbin Hotel  Prime Video.mp3',
        title: 'Gravity',
        artist: 'Hazbin Hotel  Prime Video',
        lyrics: "Does no one know Who they're dealing with? Think I'll let it go Forget and forgive The rage in me (yeah?) Is terminal (yeah?)There's no remedy (yeah!) But to burn 'em all (burn 'em all) I still got a job to do, my mission's incomplete Only a traitor could consider making peace The princess has to pay For what she did that day For what she took away Storm's comin', I can see the clouds No runnin's gonna save you now And hard rain is gonna fall down Like gravity, like gravity Eye for an eye says you owe me a debt Blood demands blood, gonna get my hands wet The flood's coming and now you can bet On tragedy, like gravity You think you're Hell's great savior Will you still when I return the favor? Take the one you need Make you watch 'em bleed Will you break thinkin' how you couldn't save her? Wishing you were there when they needed you The only soul who's ever completed you Maybe then you'll get a little heated too And understand why this is what I need to do Storm's comin', I can see the clouds (Sanctus Dominus) No runnin's gonna save you now And hard rain is gonna fall down Like gravity, like gravity Eye for an eye says you owe me a debt (yeah) Blood demands blood, gonna get my hands wet (get your hands wet) The flood's coming and now you can bet On tragedy, like gravity (Dominus)"
    }
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
    const track = playlist[index];
    document.getElementById('track-title').textContent = `${track.artist} – ${track.title}`;
    document.getElementById('list-title').textContent = track.title;
    document.getElementById('list-singer').textContent = track.artist;
    audio.src = track.file;
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
            randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === currentIndex && playlist.length > 1);
        currentIndex = randomIndex;
    } else {
        currentIndex = (currentIndex + 1) % playlist.length;
    }
    loadTrack(currentIndex);
}

function prevTrack() {
    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playlist.length);
        } while (randomIndex === currentIndex && playlist.length > 1);
        currentIndex = randomIndex;
    } else {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
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
    for (let i = playlist.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
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

audio.addEventListener('ended', () => {
    nextTrack();
});

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function downloadTrack() {
    const link = document.createElement('a');
    link.href = playlist[currentIndex].file;
    link.download = playlist[currentIndex].file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showLyrics() {
    const box = document.getElementById('lyrics-box');
    box.textContent = playlist[currentIndex].lyrics;
    box.style.display = box.style.display === 'none' ? 'block' : 'none';
}

function playFirstTrack() {
    if (isShuffle) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * playlist.length);
        } while (playlist.length > 1 && randomIndex === currentIndex);
        openPlayer(randomIndex);
    } else {
        openPlayer(0);
    }
}