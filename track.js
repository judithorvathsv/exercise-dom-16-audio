const songs = JSON.parse(localStorage.getItem('songs'))

function getSongs (songs) {
  var allSongs = []

  for (let i = 0; i < songs.length; i++) {
    let songNameWithSpace = songs[i].song.replaceAll('_', ' ')
    let correctedSongName = songNameWithSpace.substring(
      0,
      songNameWithSpace.indexOf('-')
    )

    const obj = {
      albumPicture: songs[i].albumPicture,
      songName: correctedSongName,
      performedBy: songs[i].performedBy.replaceAll('_', ' '),
      album: songs[i].album.replaceAll('_', ' '),
      index: songs[i].index
    }

    allSongs.push(obj)
  }

  return allSongs
}

function createSongItemAsHtml (songItem) {
  return `<div class="songDiv"><img src="assets/songlist/${songItem.albumPicture}"><div class="songInfoDiv"><span>${songItem.songName}</span><span>${songItem.performedBy}</span><span>(${songItem.album})</span>
<span hidden>${songItem.index}</span></div></div>`
}

const songInfoArray = getSongs(songs)

let songsAsHtml = songInfoArray.map(song => {
  return createSongItemAsHtml(song)
})

let htmlString = songsAsHtml.join('')
let trackSection = document.getElementById('trackSection')
trackSection.innerHTML = htmlString

document
  .getElementById('trackSection')
  .addEventListener('click', clickedSection => {
    let songIndex =
      clickedSection.target.parentElement.children[1].children[3].innerText

    localStorage.setItem('indexForSong', songIndex)

    localStorage.removeItem('indexForAlbum')
    localStorage.removeItem('indexForArtist')

    window.location = 'index.html'
  })
