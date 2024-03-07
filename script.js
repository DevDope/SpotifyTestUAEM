const emotionSelect = document.getElementById("emotion-select");
const sliderContainer = document.getElementById("slider-container");
const genreContainer = document.getElementById("genre-container");
const createPlaylistButton = document.getElementById("create-playlist-button");
const playlistDiv = document.getElementById("playlist");
const slider = document.getElementById("emotion-slider");
const sliderValue = document.getElementById("slider-value");
slider.addEventListener("input", function() {
    sliderValue.textContent = this.value;
});
emotionSelect.addEventListener("change", function() {
    if (this.value !== "") {
        sliderContainer.style.display = "block";
        sliderDescription.textContent = getDescription(this.value);
    } else {
        sliderContainer.style.display = "none";
    }
});

document.getElementById("emotion-slider").addEventListener("change", function() {
    genreContainer.style.display = "block";
});

document.getElementById("genre-select").addEventListener("change", function() {
    createPlaylistButton.style.display = "block";
});

function getDescription(emotion) {
    switch (emotion) {
        case "joy":
            return "Entre más alta la emoción, más positiva tiende a ser la letra de la canción.";
        case "anger":
            return "Entre más bajo el valor, la canción tiende a ser más negativa con respecto a la emoción.";
        case "sadness":
            return "Descripción para la emoción de sadness.";
        case "fear":
            return "Descripción para la emoción de fear.";
        case "love":
            return "Descripción para la emoción de love.";
        case "surprise":
            return "Descripción para la emoción de surprise.";
        default:
            return "";
    }
};

createPlaylistButton.addEventListener("click", function() {
    const selectedEmotion = document.getElementById("emotion-select").value;
    const selectedGenre = document.getElementById("genre-select").value;
    const selectedPolarity = parseFloat(document.getElementById("emotion-slider").value);

    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        let filteredSongs = data.filter(song => 
            song.Emocion === selectedEmotion && 
            song.Genero === selectedGenre && 
            (song.Polaridad >= selectedPolarity - 0.3 && song.Polaridad <= selectedPolarity + 0.3) &&
            song.Artista !== "David Allan Coe" &&
            song.Artista !== "Horrible Histories"
        
        );

        const uniqueArtists = new Set();
        const playlist = [];

        while (playlist.length < 10 && filteredSongs.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredSongs.length);
            const song = filteredSongs[randomIndex];
            if (!uniqueArtists.has(song.Artista)) {
                playlist.push(song);
                uniqueArtists.add(song.Artista);
            }
            filteredSongs.splice(randomIndex, 1);
        }

        if (playlist.length === 0) {
            playlistDiv.innerHTML = "<p>Lo siento, no encontré canciones que coincidan con esos criterios. ¿Por qué no pruebas con otra intensidad de emoción?</p>";
        } else {
            playlistDiv.innerHTML = "";
            playlist.forEach(song => {
                const songElement = document.createElement("p");
                const songLink = document.createElement("a");
                songLink.textContent = `${song.Cancion} - ${song.Artista}`;
                songLink.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.Cancion} ${song.Artista}`)}`;
                songLink.target = "_blank";
                songElement.appendChild(songLink);
                playlistDiv.appendChild(songElement);
            });

            const rateButton = document.createElement("button");
            rateButton.textContent = "Puntuar la Playlist";
            rateButton.style.display = "block";
            rateButton.style.marginTop = "20px";
            rateButton.style.padding = "10px 20px";
            rateButton.style.backgroundColor = "#3498db";
            rateButton.style.color = "white";
            rateButton.style.border = "none";
            rateButton.style.borderRadius = "5px";
            rateButton.style.cursor = "pointer";
            rateButton.style.transition = "background-color 0.3s ease";

            rateButton.addEventListener("click", function() {
                window.open("https://forms.gle/rAJNNPiTAcqcreug8", "_blank");
            });

            playlistDiv.appendChild(rateButton);
        }

        playlistDiv.style.display = "block"; // Mostrar el div de la playlist después de crear la lista
    });
});

function getRandomElements(arr, n) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}