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
        lyrics: "Does no one know Who they're dealing with?"
    }
];

class AudioPlayer {
    constructor(config) {
        this.playlist = config.playlist;
        this.currentIndex = 0;
        this.isShuffle = false;

        this.ids = config.ids;
        this.audio = document.getElementById(this.ids.audio);
        this.listTitleEl = document.getElementById(this.ids.listTitle);
        this.listSingerEl = document.getElementById(this.ids.listSinger);
        this.trackTitleEl = document.getElementById(this.ids.trackTitle);
        this.currentTimeEl = document.getElementById(this.ids.currentTime);
        this.durationEl = document.getElementById(this.ids.duration);
        this.lyricsBox = document.getElementById(this.ids.lyricsBox);

        this.audio.addEventListener('loadedmetadata', () => {
            this.durationEl.textContent = this.formatTime(this.audio.duration);
        });

        this.audio.addEventListener('timeupdate', () => {
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        });

        this.audio.addEventListener('ended', () => {
            this.nextTrack();
        });
    }

    openPlayer(index) {
        this.currentIndex = index;
        document.getElementById(this.ids.listScreen).classList.remove('active');
        document.getElementById(this.ids.playerScreen).classList.add('active');
        this.loadTrack(index);
    }

    loadTrack(index) {
        const track = this.playlist[index];
        this.trackTitleEl.textContent = `${track.artist} – ${track.title}`;
        this.listTitleEl.textContent = track.title;
        this.listSingerEl.textContent = track.artist;
        this.audio.src = track.file;
        this.audio.load();
        this.audio.play();
        this.lyricsBox.style.display = 'none';
    }

    goBack() {
        document.getElementById(this.ids.playerScreen).classList.remove('active');
        document.getElementById(this.ids.listScreen).classList.add('active');
    }

    playFirstTrack() {
        if (this.isShuffle) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * this.playlist.length);
            } while (this.playlist.length > 1 && randomIndex === this.currentIndex);
            this.openPlayer(randomIndex);
        } else {
            this.openPlayer(0);
        }
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        const diffBtn = document.getElementById(this.ids.shuffleBtn);
        diffBtn.classList.toggle('active', this.isShuffle);
    }

    nextTrack() {
        this.currentIndex = this.isShuffle
            ? this.getRandomIndex()
            : (this.currentIndex + 1) % this.playlist.length;
        this.loadTrack(this.currentIndex);
    }

    prevTrack() {
        this.currentIndex = this.isShuffle
            ? this.getRandomIndex()
            : (this.currentIndex - 1 + this.playlist.length) % this.playlist.length;
        this.loadTrack(this.currentIndex);
    }

    getRandomIndex() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * this.playlist.length);
        } while (randomIndex === this.currentIndex && this.playlist.length > 1);
        return randomIndex;
    }

    playAudio() {
        this.audio.play();
    }

    pauseAudio() {
        this.audio.pause();
    }

    changeVolume(value) {
        this.audio.volume = parseFloat(value);
    }

    shufflePlaylist() {
        for (let i = this.playlist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.playlist[i], this.playlist[j]] = [this.playlist[j], this.playlist[i]];
        }
        this.currentIndex = 0;
        this.loadTrack(this.currentIndex);
    }

    downloadTrack() {
        const link = document.createElement('a');
        link.href = this.playlist[this.currentIndex].file;
        link.download = this.playlist[this.currentIndex].file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    showLyrics() {
        this.lyricsBox.textContent = this.playlist[this.currentIndex].lyrics;
        this.lyricsBox.style.display = this.lyricsBox.style.display === 'none' ? 'block' : 'none';
    }

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
}

const player1 = new AudioPlayer({
    playlist,
    ids: {
        listScreen: 'list-screen-1',
        playerScreen: 'player-screen-1',
        listTitle: 'list-title-1',
        listSinger: 'list-singer-1',
        trackTitle: 'track-title-1',
        audio: 'audio-player-1',
        currentTime: 'current-time-1',
        duration: 'duration-1',
        lyricsBox: 'lyrics-box-1',
        shuffleBtn: 'diff-btn-1'
    }
});

const player2 = new AudioPlayer({
    playlist,
    ids: {
        listScreen: 'list-screen-2',
        playerScreen: 'player-screen-2',
        listTitle: 'list-title-2',
        listSinger: 'list-singer-2',
        trackTitle: 'track-title-2',
        audio: 'audio-player-2',
        currentTime: 'current-time-2',
        duration: 'duration-2',
        lyricsBox: 'lyrics-box-2',
        shuffleBtn: 'diff-btn-2'
    }
});
