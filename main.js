document.addEventListener('DOMContentLoaded', function () {
    const playlist = document.getElementById('playlist');
    const audio = document.getElementById('audio');
    const fileInput = document.getElementById('fileInput');
  
    // Verificar se há músicas no localStorage
    const storedSongs = JSON.parse(localStorage.getItem('songs')) || [];
  
    // Adicionar músicas ao playlist
    storedSongs.forEach((song, index) => {
      const li = createListItem(index);
      playlist.appendChild(li);
    });
  
    function addSongs() {
      const files = fileInput.files;
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const song = { 
          name: file.name,
          url: URL.createObjectURL(file)
        };
  
        storedSongs.push(song);
        const li = createListItem(storedSongs.length - 1);
        playlist.appendChild(li);
      }
  
      localStorage.setItem('songs', JSON.stringify(storedSongs));
    }
  
    function createListItem(index) {
      const li = document.createElement('li');
      li.textContent = storedSongs[index].name;
      li.addEventListener('click', () => playSong(index));
      return li;
    }
  
    function playSong(index) {
      if (storedSongs.length > 0 && index >= 0 && index < storedSongs.length) {
        audio.src = storedSongs[index].url;
        audio.play();
      }
    }
  });  