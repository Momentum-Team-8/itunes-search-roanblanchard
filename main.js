const url ='https://proxy-itunes-api.glitch.me/search?'

const form = document.querySelector("form")
const artistName = document.querySelector("#artist-search")
const songList = document.querySelector("#result-list")
// variables for tracking html elements


// this block handles rendering the songs to the screen
function getListOfSongs () {
    const search = artistName.value
    fetch (url + 'term=' + `${search}` + '&limit=12&entity=song')
    .then (resp => resp.json())
    .then(data =>  { 
        for (let x of data.results) {
            renderSongList(x)
        }
    })
    
}

function renderSongList (data) {
    const songs = document.createElement("li")
    songs.id = data.trackId
    renderSongBody(songs, data) 
    songList.appendChild(songs)
}

function renderSongBody (songs, data) {
    const title = document.createElement('p')
    const bandName = document.createElement('p')
    const albumArt = document.createElement('img')
    const preview = document.createElement('audio')
    const audioSample = document.createElement('source')
    preview.controls = true
    audioSample.src = data.previewUrl
    title.innerHTML = data.trackName
    bandName.innerHTML = data.artistName
    albumArt.src = data.artworkUrl100
    preview.appendChild(audioSample)
    songs.appendChild(title)
    songs.appendChild(bandName)
    songs.appendChild(albumArt)
    songs.appendChild(preview)
}



// listens for the submit button to be pressed
form.addEventListener ('submit', event => {
    event.preventDefault()
    getListOfSongs()
    
})


// clears the page for a new search
const clear = document.querySelector('#clear-button')
clear.addEventListener ('click', event => {
    event.preventDefault()
    location.reload()
})
