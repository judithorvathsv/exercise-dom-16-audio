const songs = JSON.parse(localStorage.getItem('songs'))

function getArtist (songs) {
  var unique = []
  var distinct = []
  for (let i = 0; i < songs.length; i++) {
    let artist = songs[i].performedBy.replaceAll('_', ' ')
    if (!unique[artist]) {
      const obj = {
        albumName: songs[i].album.replaceAll('_', ' '),
        albumPicture: songs[i].albumPicture,
        performedBy: artist,
        index: songs[i].index
      }
      distinct.push(obj)
      unique[songs[i].performedBy] = 1
    }
  }
  console.log(distinct)
  return distinct
}

function createSongsForArtistAsHtml (albumItem) {
  return `<div class="artistDiv"><img src="assets/songlist/${albumItem.albumPicture}"><div class="artistInfoDiv"><span>${albumItem.performedBy}</span><span hidden>${albumItem.index}</span></div>
</div>`
}

const artistArray = getArtist(songs)

let songsAsHtml = artistArray.map(album => {
  return createSongsForArtistAsHtml(album)
})

let htmlString = songsAsHtml.join('')
let artistSection = document.getElementById('artistSection')
artistSection.innerHTML = htmlString

document
  .getElementById('artistSection')
  .addEventListener('click', clickedSection => {
    let artist =
      clickedSection.target.parentElement.children[1].children[1].innerText

    localStorage.setItem('indexForArtist', artist)
    window.location = 'index.html'
  })
