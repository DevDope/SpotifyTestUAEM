let currentQuestion = 1;
let mood = '';
let emotion =''
let emotion2=''
let genre = '';
let params =[];
let buttons =[];
function setMood(selectedMood) {
  mood = selectedMood;
  switch (mood) {
    case 1:
      hidebuttons(['b4', 'b5', 'b8', 'b9', 'b10','b11','b12','b13','b14','b15','b17','b18']);
      break;
    case 2:
      hidebuttons(['b9', 'b10']);
      break;
    case 3:
       hidebuttons(['b3','b5','b6','b7','b9','b10','b11','b13','b15','b17']);
      break;
    case 4:
      hidebuttons(['b3', 'b5','b6','b7', 'b8', 'b9', 'b10','b11','b12','b13','b14','b15','b17','b18']);
      break;
    case 5:
      hidebuttons(['b4', 'b5','b6', 'b8', 'b9', 'b10','b11','b12','b13','b14','b15','b17','b18']);
      break;
    case 6:
      hidebuttons(['b4', 'b5', 'b6','b8', 'b9', 'b10','b12','b13','b14','b15','b17','b18']);
      break;
    case 7:
       hidebuttons(['b3', 'b6', 'b10','b11','b12','b13','b14','b15','b17','b18']);
      break;
    // case 8:
    //   hidebuttons(['b4', 'b5', 'b8', 'b9', 'b10','b11','b12','b13','b14','b15','b17','b18']);
    //   break;
    // case 9:
    //   hidebuttons(['b4', 'b5', 'b8', 'b9', 'b10','b11','b12','b13','b14','b15','b17','b18']);
    //   break;
    // case 10:
    //   hidebuttons(['b4', 'b5', 'b8', 'b9', 'b10','b11','b12','b13','b14','b15','b17','b18']);
    //   break;
  
    default:
      break;
  }
  showNextQuestion();
}

function setGenre(selectedGenre) {
  genre = selectedGenre;
  showResult();
}

function showNextQuestion() {
  document.getElementById(`question${currentQuestion}`).style.display = 'none';
  currentQuestion++;
 
  if (currentQuestion === 2) {
    document.getElementById(`question${currentQuestion}`).style.display = 'block';
  } else if (currentQuestion === 3) {
    document.getElementById(`question${currentQuestion}`).style.display = 'none'; // Ocultar la pregunta dos
    showResult();
  }
}
function hidebuttons(buttons){
  for (let i = 0; i < buttons.length; i++) {
    document.getElementsByClassName(buttons[i])[0].style.display = 'none';
  }
}
function showbuttons(buttons){
  for (let i = 0; i < buttons.length; i++) {
    document.getElementsByClassName(buttons[i])[0].style.display = 'display';
  }
}
function getParams(){
     // Tempo, Loudness,Energy,Danceability,Possitiveness, Instrumentalness
  switch (mood) {
    case 1:
       params = [0,120,-30,120,0,50,0,100,0,30,-30,120]
      emotion ='love'
      emotion2 = 'sadness'
      
      break;
    case 2:
      params = [80,150,-30,120,30,100,30,100,70,100,-30,120]
      emotion ='love'
      emotion2 = 'love'
      break;
    case 3:
      params = [90,120,-30,120,60,100,65,100,80,100,-30,120]
      emotion ='joy'
      emotion2 = 'surprise' 
      break;
    case 4:
      params = [0,100,-100,-10,-30,50,-30,80,40,80,-30,120]
      emotion ='joy'
      emotion2 = 'sadness' 
      break;
    case 5:
      params = [110,150,-10,120,70,120,-30,120,0,30,-30,120]
      emotion ='anger'
      emotion2 = 'sadness' 
      break;
    case 6:
      params = [140,180,-30,120,85,120,0,120,0,60,-30,120]
      emotion ='joy'
      emotion2 ='anger'
      break;
    case 7:
      params = [30,70,-30,120,-30,70,-30,70,0,50,-30,120]
      emotion = 'sadness' 
      emotion2 = 'sadness' 
      break;
    case 8:
      params = [30,200,-30,120,-30,120,-30,120,80,120,-30,120]
      emotion = 'love' 
      emotion2 = 'love' 
      break;
    case 9:
      params = [30,200,-30,120,-30,50,-30,120,0,50,-30,120]
      emotion = 'sadness' 
      emotion2 = 'sadness' 
      break;
    case 10:
      params = [30,200,-30,120,-30,120,-30,120,0,120,-30,120]
      emotion = 'suprise' 
      emotion2 = 'suprise'  
      break;
    case 11:
      params = [30,200,-30,120,-30,120,-30,120,0,50,-30,120]
      emotion = 'angry' 
      emotion2 = 'angry' 
      break;
    case 12:
      params = [30,200,-30,120,-30,120,-30,120,70,120,-30,120]
      emotion = 'joy' 
      emotion2 = 'joy' 
      break;
  
    default:
      params = [30,120,-30,120,-30,120,-30,120,0,120,-30,120]
      break;
  }
}
function getRandomSongs(mood, mood2, genre) {
  getParams();
  fetch('database.json')
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      const selectedSongs = [];
      const selectedArtists = new Set(); // Almacenar artistas seleccionados
      lines.forEach(line => {
        if (line.trim() === '') return; // Ignorar líneas vacías
        const item = JSON.parse(line);
        if (
          (!mood || item.emotion === mood) &&
          (!mood2 || item.emotion === mood2) &&
          (!genre || item.Genre === genre) &&
          item.Tempo > params[0] && item.Tempo < params[1] &&
          item.Loudness > params[2] && item.Loudness < params[3] &&
          item.Energy > params[4] && item.Energy < params[5] &&
          item.Danceability > params[6] && item.Danceability < params[7] &&
          item.Positiveness > params[8] && item.Positiveness < params[9] &&
          item.Instrumentalness > params[10] && item.Instrumentalness < params[11]
        ) {
          if (!selectedArtists.has(item.artist)) {
            selectedSongs.push(item);
            selectedArtists.add(item.artist);
          }
        }
      });

      // Ordenar las canciones por popularidad
      selectedSongs.sort((a, b) => b.Popularity - a.Popularity);

      // Tomar las 30 canciones con mayor popularidad
      const top30Songs = selectedSongs.slice(0, 35);

      // Obtener tres canciones aleatorias de las 30 más populares
      const randomIndices = [];
      while (randomIndices.length < 3) {
        const randomIndex = Math.floor(Math.random() * top30Songs.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      // Agregar las tres canciones aleatorias de las 30 más populares
      const songs = [
        `${top30Songs[randomIndices[0]].song} - ${top30Songs[randomIndices[0]].artist}`,
        `${top30Songs[randomIndices[1]].song} - ${top30Songs[randomIndices[1]].artist}`,
        `${top30Songs[randomIndices[2]].song} - ${top30Songs[randomIndices[2]].artist}`
      ];

      const cluster = top30Songs[randomIndices[0]]['Cluster DBSCAN'];
      const songsAfter2010 = new Set();
      const songsBefore2010 = new Set();
      selectedSongs.forEach(item => {
        const song = `${item.song} - ${item.artist}`;
        if (item['Release Date'] > 2020 && item['Cluster DBSCAN'] === cluster) {
          songsAfter2010.add(song);
        } else {
          songsBefore2010.add(song);
        }
      });

      const fillSongs = [];
      const allSongs = [...songsAfter2010, ...songsBefore2010]; // Combinar todas las canciones restantes

      for (let i = 0; i < 7; i++) {
        if (allSongs.length === 0) break; // Si no quedan canciones, salir del bucle
        const randomIndex = Math.floor(Math.random() * allSongs.length);
        const songToAdd = allSongs.splice(randomIndex, 1)[0]; // Sacar una canción aleatoria de la lista
        fillSongs.push(songToAdd);
      }
      // Agregar las canciones al azar a la lista final
      songs.push(...fillSongs);

      // Imprimir la lista de reproducción
      const resultText = `Tu playlist es 😄: ${emotion} - ${genre}`;
      document.getElementById('resultText').innerText = resultText;
      document.getElementById('resultList').innerHTML = songs.map((song, index) => {
          let newIndex = index;
          if (index === 1) newIndex = 4;
          else if (index === 4) newIndex = 1;
          else if (index === 2) newIndex = 9;
          else if (index === 9) newIndex = 2;
      
          // Detectar si el usuario está en un dispositivo móvil
          const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
          let link = '';
          if (isMobile) {
              // Si está en un dispositivo móvil, crear un enlace a la app de YouTube
              link = `youtube://www.youtube.com/results?search_query=${encodeURIComponent(songs[newIndex])}+letra+en+español`;
          } else {
              // Si está en una computadora, crear un enlace a la versión web de YouTube
              link = `https://www.youtube.com/results?search_query=${encodeURIComponent(songs[newIndex])}+letra+en+español`;
          }
      
          return `<li><a href="${link}">${songs[newIndex]}</a></li>`;
      }).join('');
document.getElementById('result').style.display = 'block';
document.querySelectorAll('.question').forEach(question => {
    question.style.display = 'none';
});
    })
    .catch(error => console.error('Error:', error));
}

function showResult() {
  getRandomSongs(emotion,emotion2, genre);
}

function resetQuiz() {
   currentQuestion = 1;
   mood = '';
   emotion =''
   emotion2=''
   genre = '';
   params =[];
   showbuttons(['b3', 'b5','b6','b7', 'b8', 'b9', 'b10','b11','b12','b13','b14','b15','b17','b18']);
  document.getElementById('result').style.display = 'none';
  document.getElementById('question1').style.display = 'block';
}
