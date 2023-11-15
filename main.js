document.addEventListener("DOMContentLoaded", function () {
    const musicInput = document.getElementById("musicInput");
    const playlist = document.getElementById("playlist");
    const audioPlayer = document.getElementById("audioPlayer");
    const artistImage = document.getElementById("artistImage");
    const songTitle = document.getElementById("songTitle");
    const artistName = document.getElementById("artistName");

    musicInput.addEventListener("change", function (event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith("audio/")) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const musicData = {
                        title: file.name,
                        artist: "Unknown Artist", // Modify this line with actual artist name
                        image: "path/to/default-image.jpg", // Modify this line with default image path
                        src: e.target.result
                    };
                    // Save music data to localStorage
                    saveMusicToLocalStorage(musicData);
                    // Update playlist
                    updatePlaylist();
                    // Auto-play first track
                    if (i === 0) {
                        playMusic(musicData);
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
            listItem.innerHTML = `<div>${index + 1}. ${music.title}</div>`;
            listItem.addEventListener("click", function () {
                playMusic(music);
            });
            playlist.appendChild(listItem);
        });
    }
    function playMusic(musicData) {
        audioPlayer.src = musicData.src;
        // Display music details
        artistImage.src = musicData.image;
        songTitle.textContent = musicData.title;
        artistName.textContent = musicData.artist;

        audioPlayer.play();
    }
    // Initial playlist update
    updatePlaylist();
});