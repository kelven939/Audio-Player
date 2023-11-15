document.addEventListener('DOMContentLoaded', function () {
    const playlist = document.getElementById('playlist');
    const audio = document.getElementById('audio');
  
    // Verificar se há músicas no localStorage
    const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
  
    // Adicionar músicas ao playlist
    storedSongs.forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = `Música ${index + 1}`;
      li.addEventListener('click', () => playSong(index));
      playlist.appendChild(li);
    });
  
    function playSong(index) {
      if (storedSongs.length > 0 && index >= 0 && index < storedSongs.length) {
        audio.src = storedSongs[index].url;
        audio.play();
      }
    }
  });  