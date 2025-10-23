const Player = {
    playlist: [
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
            lyrics: "Does no one know Who they're dealing with? Think I'll let it go Forget and forgive..."
        }
    ],
    currentIndex: 0,
    isShuffle: false,
    audio: document.getElementById('audio-player'),
    currentTimeEl: document.getElementById('current-time'),
    durationEl: document.getElementById('duration'),

    init() {
        this.audio.addEventListener('loadedmetadata', () => {
            this.durationEl.textContent = this.formatTime(this.audio.duration);
        });

        this.audio.addEventListener('timeupdate', () => {
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        });

        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });
    },

    openPlayer(index) {
        this.currentIndex = index;
        document.getElementById('list-screen').classList.remove('active');
        document.getElementById('player-screen').classList.add('active');
        this.loadTrack(index);
    },

    loadTrack(index) {
        const track = this.playlist[index];
        document.getElementById('track-title').textContent = `${track.artist} – ${track.title}`;
        document.getElementById('list-title').textContent = track.title;
        document.getElementById('list-singer').textContent = track.artist;
        this.audio.src = track.file;
        this.audio.load();
        this.audio.play();
    },

    goBack() {
        document.getElementById('player-screen').classList.remove('active');
        document.getElementById('list-screen').classList.add('active');
    },

    playFirstTrack() {
        if (this.isShuffle) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * this.playlist.length);
            } while (randomIndex === this.currentIndex && this.playlist.length > 1);
            this.openPlayer(randomIndex);
        } else {
            this.openPlayer(0);
        }
    },

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        const diffBtn = document.getElementById('diff-btn');
        diffBtn.classList.toggle('active', this.isShuffle);
    },

    nextTrack() {
        if (this.isShuffle) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * this.playlist.length);
            } while (randomIndex === this.currentIndex && this.playlist.length > 1);
            this.currentIndex = randomIndex;
        } else {
            this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
        }
        this.loadTrack(this.currentIndex);
    },

    prevTrack() {
        if (this.isShuffle) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * this.playlist.length);
            } while (randomIndex === this.currentIndex && this.playlist.length > 1);
            this.currentIndex = randomIndex;
        } else {
            this.currentIndex = (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        }
        this.loadTrack(this.currentIndex);
    },

    playAudio() {
        this.audio.play();
    },

    pauseAudio() {
        this.audio.pause();
    },

    changeVolume(value) {
        this.audio.volume = parseFloat(value);
    },

    shufflePlaylist() {
        for (let i = this.playlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
        }
        this.currentIndex = 0;
        this.loadTrack(this.currentIndex);
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    },

    downloadTrack() {
        const link = document.createElement('a');
        link.href = this.playlist[this.currentIndex].file;
        link.download = this.playlist[this.currentIndex].file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    showLyrics() {
        const box = document.getElementById('lyrics-box');
        box.textContent = this.playlist[this.currentIndex].lyrics;
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
};

// Глобальные вызовы для HTML
function openPlayer(index) { Player.openPlayer(index); }
function goBack() { Player.goBack(); }
function playFirstTrack() { Player.playFirstTrack(); }
function toggleShuffle() { Player.toggleShuffle(); }
function nextTrack() { Player.nextTrack(); }
function prevTrack() { Player.prevTrack(); }
function playAudio() { Player.playAudio(); }
function pauseAudio() { Player.pauseAudio(); }
function changeVolume(value) { Player.changeVolume(value); }
function shufflePlaylist() { Player.shufflePlaylist(); }
function downloadTrack() { Player.downloadTrack(); }
function showLyrics() { Player.showLyrics(); }

// Инициализация
Player.init();
