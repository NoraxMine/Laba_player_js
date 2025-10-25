class AudioPlayer {
    constructor(playlist, container) {
        this.playlist = playlist;
        this.container = container;
        this.currentIndex = 0;
        this.isShuffle = false;
        this.audio = new Audio();
    }

    init() {
        this.createScreens();
        this.createTrackList();
        this.createPlayerInterface();
        this.bindEvents();
    }

    createScreens() {
        this.listScreen = document.createElement('div');
        this.listScreen.className = 'screen active';
        this.listScreen.id = `list-screen-${Date.now()}`;

        this.playerScreen = document.createElement('div');
        this.playerScreen.className = 'screen';
        this.playerScreen.id = `player-screen-${Date.now()}`;

        this.container.appendChild(this.listScreen);
        this.container.appendChild(this.playerScreen);
    }

    createTrackList() {
        const textSide = document.createElement('div');
        textSide.className = 'text-side';

        const img = document.createElement('img');
        img.src = 'sound.jpg';
        img.className = 'image';

        const textBlock = document.createElement('div');
        textBlock.className = 'text-side-text';

        this.listTitle = document.createElement('h2');
        this.listTitle.textContent = 'Sound Title';
        this.listTitle.id = `list-title-${Date.now()}`;

        this.listSinger = document.createElement('h4');
        this.listSinger.textContent = 'Singer';
        this.listSinger.id = `list-singer-${Date.now()}`;

        textBlock.appendChild(this.listTitle);
        textBlock.appendChild(this.listSinger);
        textSide.appendChild(img);
        textSide.appendChild(textBlock);
        this.listScreen.appendChild(textSide);

        const buttons = document.createElement('div');
        buttons.className = 'main-buttons';

        const playBtn = document.createElement('button');
        playBtn.className = 'main-active-button';
        playBtn.textContent = 'Play';
        playBtn.onclick = () => this.playFirstTrack();

        const shuffleBtn = document.createElement('button');
        shuffleBtn.className = 'main-active-button';
        shuffleBtn.textContent = 'Mix';
        shuffleBtn.onclick = () => this.toggleShuffle();
        this.shuffleBtn = shuffleBtn;

        buttons.appendChild(playBtn);
        buttons.appendChild(shuffleBtn);
        this.listScreen.appendChild(buttons);

        const ul = document.createElement('ul');
        this.playlist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = 'track-link';
            li.textContent = `${track.artist} – ${track.title}`;
            li.onclick = () => this.openPlayer(index);
            ul.appendChild(li);
        });
        this.listScreen.appendChild(ul);
    }

    createPlayerInterface() {
        const hz = document.createElement('div');
        hz.className = 'hz';

        const backBtn = document.createElement('button');
        backBtn.textContent = 'Назад';
        backBtn.onclick = () => this.goBack();

        const img = document.createElement('img');
        img.src = 'sound.jpg';
        img.className = 'image-1';

        hz.appendChild(backBtn);
        hz.appendChild(img);
        this.playerScreen.appendChild(hz);

        this.trackTitle = document.createElement('h2');
        this.trackTitle.id = `track-title-${Date.now()}`;
        this.playerScreen.appendChild(this.trackTitle);

        this.audio.id = `audio-player-${Date.now()}`;
        this.audio.type = 'audio/mpeg';
        this.playerScreen.appendChild(this.audio);

        const timeDisplay = document.createElement('div');
        timeDisplay.className = 'time-display';

        this.currentTimeEl = document.createElement('span');
        this.currentTimeEl.textContent = '0:00';

        this.durationEl = document.createElement('span');
        this.durationEl.textContent = '0:00';

        timeDisplay.appendChild(this.currentTimeEl);
        timeDisplay.appendChild(document.createTextNode(' / '));
        timeDisplay.appendChild(this.durationEl);
        this.playerScreen.appendChild(timeDisplay);

        const controlButtons = document.createElement('div');
        controlButtons.className = 'main-buttons';

        controlButtons.innerHTML = `
            <button class="main-active-button">&#171;</button>
            <button class="main-active-button">&#9654;</button>
            <button class="main-active-button">&#9208;</button>
            <button class="main-active-button">&#187;</button>
            <button class="main-active-button">&#x2630;</button>
        `;

        const [prevBtn, playBtn, pauseBtn, nextBtn, shuffleBtn] = controlButtons.querySelectorAll('button');
        prevBtn.onclick = () => this.prevTrack();
        playBtn.onclick = () => this.playAudio();
        pauseBtn.onclick = () => this.pauseAudio();
        nextBtn.onclick = () => this.nextTrack();
        shuffleBtn.onclick = () => this.shufflePlaylist();

        this.playerScreen.appendChild(controlButtons);

        const extraButtons = document.createElement('div');
        extraButtons.className = 'main-buttons';

        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'main-active-button';
        downloadBtn.textContent = 'Скачать';
        downloadBtn.onclick = () => this.downloadTrack();

        const lyricsBtn = document.createElement('button');
        lyricsBtn.className = 'main-active-button';
        lyricsBtn.textContent = 'Текст песни';
        lyricsBtn.onclick = () => this.showLyrics();

        extraButtons.appendChild(downloadBtn);
        extraButtons.appendChild(lyricsBtn);
        this.playerScreen.appendChild(extraButtons);

        const volumeControl = document.createElement('div');
        volumeControl.className = 'main-buttons';

        const volumeLabel = document.createElement('label');
        volumeLabel.textContent = 'Громкость';

        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = 0;
        volumeSlider.max = 1;
        volumeSlider.step = 0.01;
        volumeSlider.value = 1;
        volumeSlider.oninput = () => this.changeVolume(volumeSlider.value);

        volumeControl.appendChild(volumeLabel);
        volumeControl.appendChild(volumeSlider);
        this.playerScreen.appendChild(volumeControl);

        this.lyricsBox = document.createElement('div');
        this.lyricsBox.className = 'lyrics-box';
        this.lyricsBox.style.display = 'none';
        this.playerScreen.appendChild(this.lyricsBox);
    }

    bindEvents() {
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
        this.listScreen.classList.remove('active');
        this.playerScreen.classList.add('active');
        this.loadTrack(index);
    }

    loadTrack(index) {
        const track = this.playlist[index];
        this.trackTitle.textContent = `${track.artist} – ${track.title}`;
        this.listTitle.textContent = track.title;
        this.listSinger.textContent = track.artist;
        this.audio.src = track.file;
        this.audio.load();
        this.audio.play();
    }

    goBack() {
        this.playerScreen.classList.remove('active');
        this.listScreen.classList.add('active');
    }

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
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        this.shuffleBtn.classList.toggle('active', this.isShuffle);
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

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    downloadTrack() {
        const track = this.playlist[this.currentIndex];
        const link = document.createElement('a');
        link.href = track.file;
        link.download = track.file;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    showLyrics() {
        const track = this.playlist[this.currentIndex];
        this.lyricsBox.textContent = track.lyrics;
        this.lyricsBox.style.display = this.lyricsBox.style.display === 'none' ? 'block' : 'none';
    }
}

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
        lyrics: "Does no one know Who they're dealing with? Think I'll let it go Forget and forgive..."
    }
];

document.getElementById('create-player-btn').addEventListener('click', () => {
    const wrapper = document.getElementById('player-container');
    const container = document.createElement('div');
    container.className = 'container';
    wrapper.appendChild(container);

    const player = new AudioPlayer(playlist, container);
    player.init();
});
