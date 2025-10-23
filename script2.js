class MusicPlayer {
    constructor(playlist, audioElementId) {
        this.playlist = playlist;
        this.audio = document.getElementById(audioElementId);
        this.currentIndex = 0;
        this.isShuffle = false;

        this.currentTimeEl = document.getElementById('current-time');
        this.durationEl = document.getElementById('duration');

        this.initEvents();
    }

    initEvents() {
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

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    openPlayer(index) {
        this.currentIndex = index;
        document.getElementById('list-screen').classList.remove('active');
        document.getElementById('player-screen').classList.add('active');
        this.loadTrack(index);
    }

    loadTrack(index) {
        const track = this.playlist[index];
        document.getElementById('track-title').textContent = `${track.artist} – ${track.title}`;
        document.getElementById('list-title').textContent = track.title;
        document.getElementById('list-singer').textContent = track.artist;
        this.audio.src = track.file;
        this.audio.load();
        this.audio.play();
    }

    goBack() {
        document.getElementById('player-screen').classList.remove('active');
        document.getElementById('list-screen').classList.add('active');
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
        const diffBtn = document.getElementById('diff-btn');
        diffBtn.classList.toggle('active', this.isShuffle);
    }

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
    }

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
        const box = document.getElementById('lyrics-box');
        box.textContent = this.playlist[this.currentIndex].lyrics;
        box.style.display = box.style.display === 'none' ? 'block' : 'none';
    }
}

const player = new MusicPlayer(playlist, 'audio-player');

player.playFirstTrack();
player.toggleShuffle();
player.nextTrack();
player.showLyrics();
