const songs = [
  {
    album: 'Jupiter',
    song: 'Say_Goodbye_-_VITNE',
    performedBy: 'VITNE',
    albumPicture: 'Say_Goodbye_-_VITNE.jpg',
    index: 0
  },
  {
    album: 'Jupiter',
    song: 'Masquerade_-_VITNE',
    performedBy: 'VITNE',
    albumPicture: 'Say_Goodbye_-_VITNE.jpg',
    index: 1
  },
  {
    album: 'Jupiter',
    song: 'Are_You_Real_-_VITNE',
    performedBy: 'VITNE',
    albumPicture: 'Say_Goodbye_-_VITNE.jpg',
    index: 2
  },
  {
    album: 'Eye Of The Storm',
    song: 'Boys,_Girls,_Toys_&(_Words_-_Modern_Pitch)',
    performedBy: 'MODERN PITCH',
    albumPicture: 'Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg',
    index: 3
  },
  {
    album: 'Higher And Higher',
    song: 'Higher_And_Higher_-_Scream_Inc',
    performedBy: 'SCREAM INC.',
    albumPicture: 'Higher_And_Higher_-_Scream_Inc.jpg',
    index: 4
  },
  {
    album: 'Jupiter',
    song: 'Mirror_-_VITNE',
    performedBy: 'VITNE',
    albumPicture: 'Say_Goodbye_-_VITNE.jpg',
    index: 5
  },
  {
    album: 'Not_My_Problem',
    song: 'Not_My_Problem_-_All_My_Friends_Hate_Me',
    performedBy: 'All_My_Friends_Hate_Me',
    albumPicture: 'Not_My_Problem_-_All_My_Friends_Hate_Me.jpg',
    index: 6
  },
  {
    album: 'Apply Within',
    song: 'Old_News_-_Hot_Fiction',
    performedBy: 'Hot_Fiction',
    albumPicture: 'Old_News_-_Hot_Fiction.jpg',
    index: 7
  },
  {
    album: 'Kites',
    song: 'Peyote_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Peyote_-_Kinematic.jpg',
    index: 8
  },
  {
    album: 'Kites',
    song: 'Already_Here_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Peyote_-_Kinematic.jpg',
    index: 9
  },
  {
    album: 'Encephalon',
    song: 'Encephalon_-_VITNE.mp3',
    performedBy: 'VITNE',
    albumPicture: 'Enchaphalon-VITNE.jpg',
    index: 10
  },
  {
    album: 'Encephalon',
    song: 'Encephalon_(Instrumental)_-_VITNE.mp3',
    performedBy: 'VITNE',
    albumPicture: 'Enchaphalon-VITNE.jpg',
    index: 11
  },
  {
    album: 'Special',
    song: 'Special_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Special-Kinematic.jpg',
    index: 12
  },
  {
    album: 'Special',
    song: 'Glide_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Special-Kinematic.jpg',
    index: 13
  },
  {
    album: 'Special',
    song: 'Dissipate_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Special-Kinematic.jpg',
    index: 14
  }
]

localStorage.setItem('songs', JSON.stringify(songs))

const selectedIndexForAlbum = localStorage.getItem('indexForAlbum')
const selectedIndexForSong = localStorage.getItem('indexForSong')
const selectedIndexForArtist = localStorage.getItem('indexForArtist')

function getSongs () {
  var selectedSongs = []

  if (selectedIndexForAlbum || selectedIndexForAlbum === '') {
    /*clicked name is modified to remove _ char -> not searchable anymore*/
    const selectedAlbum = songs[selectedIndexForAlbum].album

    for (let i = 0; i < songs.length; i++) {
      if (songs[i].album == selectedAlbum) {
        let songNameWithSpace = songs[i].song.replaceAll('_', ' ')
        let correctedSongName = songNameWithSpace.substring(
          0,
          songNameWithSpace.indexOf('-')
        )

        const obj = {
          albumPicture: songs[i].albumPicture,
          songName: correctedSongName,
          performedBy: songs[i].performedBy.replaceAll('_', ' ')
        }
        selectedSongs.push(obj)
      }
    }
  }
  if (selectedIndexForArtist || selectedIndexForArtist === '') {
    const selectedArtist = songs[selectedIndexForArtist].performedBy

    for (let i = 0; i < songs.length; i++) {
      if (songs[i].performedBy == selectedArtist) {
        let songNameWithSpace = songs[i].song.replaceAll('_', ' ')
        let correctedSongName = songNameWithSpace.substring(
          0,
          songNameWithSpace.indexOf('-')
        )

        const obj = {
          albumPicture: songs[i].albumPicture,
          songName: correctedSongName,
          performedBy: songs[i].performedBy.replaceAll('_', ' ')
        }
        selectedSongs.push(obj)
      }
    }
  } else if (selectedIndexForSong || selectedIndexForSong === '') {
    let songNameWithSpace = songs[selectedIndexForSong].song.replaceAll(
      '_',
      ' '
    )
    let correctedSongName = songNameWithSpace.substring(
      0,
      songNameWithSpace.indexOf('-')
    )

    const obj = {
      albumPicture: songs[selectedIndexForSong].albumPicture,
      songName: correctedSongName,
      performedBy: songs[selectedIndexForSong].performedBy.replaceAll('_', ' ')
    }
    selectedSongs.push(obj)
  }

  return selectedSongs
}

function createSongItemAsHtml (songItem) {
  return `<div class="songDiv"><img src="assets/songlist/${songItem.albumPicture}"><div class="songInfoDiv"><span>${songItem.songName}</span><span>${songItem.performedBy}</span></div>
</div>`
}

const songInfoArray = getSongs()

let songsAsHtml = songInfoArray.map(song => {
  return createSongItemAsHtml(song)
})

let htmlString = songsAsHtml.join('')
let songSection = document.getElementById('songSection')
songSection.innerHTML = htmlString
