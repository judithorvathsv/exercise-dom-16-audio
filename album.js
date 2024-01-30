const songs = JSON.parse(localStorage.getItem('songs'))

function getAlbums (songs) {
  var unique = []
  var distinct = []
  for (let i = 0; i < songs.length; i++) {
    if (!unique[songs[i].album]) {
      const obj = {
        albumName: songs[i].album.replaceAll('_', ' '),
        albumPicture: songs[i].albumPicture,
        performedBy: songs[i].performedBy.replaceAll('_', ' '),
        index: songs[i].index
      }
      distinct.push(obj)
      unique[songs[i].album] = 1
    }
  }
  return distinct
}

function createAlbumItemAsHtml (albumItem) {
  return `<div class="albumDiv"><img src="assets/songlist/${albumItem.albumPicture}"><div class="albumInfoDiv"><span>${albumItem.albumName}</span><span>${albumItem.performedBy}</span><span hidden>${albumItem.index}</span></div>
</div>`
}

const albumAndPictureArray = getAlbums(songs)

let albumsAsHtml = albumAndPictureArray.map(album => {
  return createAlbumItemAsHtml(album)
})

let htmlString = albumsAsHtml.join('')
let albumSection = document.getElementById('albumSection')
albumSection.innerHTML = htmlString

document
  .getElementById('albumSection')
  .addEventListener('click', clickedSection => {
    let album =
      clickedSection.target.parentElement.children[1].children[2].innerText

    localStorage.setItem('indexForAlbum', album)

    /*  localStorage.setItem('songs', JSON.stringify(songs)) */

    window.location = 'index.html'
  })
