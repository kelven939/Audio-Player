document.addEventListener("DOMContentLoaded", function () {
    const musicInput = document.getElementById("musicInput");
    const playlist = document.getElementById("playlist");
    const audioPlayer = document.getElementById("audioPlayer");

    musicInput.addEventListener("change", function (event) {
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.type.startsWith("audio/")) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    const musicData = {
                        title: file.name,
                        src: e.target.result
                    };

                    // Save music data to localStorage
                    saveMusicToLocalStorage(musicData);

                    // Update playlist
                    updatePlaylist();

                    // Auto-play first track
                    if (i === 0) {
                        playMusic(0);
                    }
                };

                reader.readAsDataURL(file);
            }
        }
    });

    function saveMusicToLocalStorage(musicData) {
        let musicList = JSON.parse(localStorage.getItem("musicList")) || [];
        musicList.push(musicData);
        localStorage.setItem("musicList", JSON.stringify(musicList));
    }

    function updatePlaylist() {
        const musicList = JSON.parse(localStorage.getItem("musicList")) || [];
        playlist.innerHTML = "";

        musicList.forEach(function (music, index) {
            const listItem = document.createElement("div");
            listItem.innerHTML = `<div class="playlist-item" onclick="playMusic(${index})">${index + 1}. ${music.title}</div>`;
            playlist.appendChild(listItem);
        });
    }

    function playMusic(index) {
        const musicList = JSON.parse(localStorage.getItem("musicList")) || [];
        const musicData = musicList[index];

        audioPlayer.src = musicData.src;
        audioPlayer.play();
    }

    // Initial playlist update
    updatePlaylist();
});