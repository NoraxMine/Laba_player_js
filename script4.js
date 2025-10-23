document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.createElement('button');
    addBtn.textContent = 'Добавить трек';
    addBtn.className = 'main-active-button';
    document.querySelector('.container').appendChild(addBtn);

    addBtn.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="background:#fff;padding:20px;border-radius:8px;box-shadow:0 0 10px #000;">
                <input type="text" id="newFile" placeholder="Файл.mp3"><br><br>
                <input type="text" id="newTitle" placeholder="Название"><br><br>
                <input type="text" id="newArtist" placeholder="Исполнитель"><br><br>
                <button id="confirmAdd">Добавить</button>
            </div>
        `;
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.zIndex = '1000';
        document.body.appendChild(modal);

        document.getElementById('confirmAdd').onclick = () => {
            const file = document.getElementById('newFile').value;
            const title = document.getElementById('newTitle').value;
            const artist = document.getElementById('newArtist').value;

            playlist.push({ file, title, artist, lyrics: '' });

            const li = document.createElement('li');
            li.className = 'track-link';
            li.textContent = `${artist} – ${title}`;
            li.onclick = () => openPlayer(playlist.length - 1);
            document.querySelector('ul').appendChild(li);

            document.body.removeChild(modal);
        };
    });
});
