const url ='https://proxy-itunes-api.glitch.me/search?'

const form = document.querySelector("form")
const artistName = document.querySelector("#artist-search")
const songList = document.querySelector("#result-list")
// variables for tracking html elements


// this block handles rendering the songs to the screen
function getListOfSongs () {
    const search = artistName.value
    // fetch ('https://proxy-itunes-api.glitch.me/search?term=jack+johnson&limit=25')
    fetch (url + 'term=' + `${search}` + '&limit=10&entity=song')
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

form.addEventListener ('submit', event => {
    event.preventDefault()
    getListOfSongs()
    
})

