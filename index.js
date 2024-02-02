const songs = [
  {
    album: 'Jupiter',
    song: 'Say_Goodbye_-_VITNE',
    performedBy: 'VITNE',
    albumPicture: 'Say_Goodbye_-_VITNE.jpg',
    index: 0,
    source: 'Say_Goodbye_-_VITNE.mp3'
  },
  {
    album: 'Jupiter',
    song: 'Masquerade_-_VITNE',
    performedBy: 'VITNE',
    albumPicture: 'Say_Goodbye_-_VITNE.jpg',
    index: 1,
    source: 'Masquerade_-_VITNE.mp3'
  },
  {
    album: 'Jupiter',
    song: 'Are_You_Real_-_VITNE',
    performedBy: 'VITNE',
    albumPicture: 'Say_Goodbye_-_VITNE.jpg',
    index: 2,
    source: 'Are_You_Real__-_VITNE.mp3'
  },
  {
    album: 'Eye Of The Storm',
    song: 'Boys,_Girls,_Toys_&(_Words_-_Modern_Pitch)',
    performedBy: 'MODERN PITCH',
    albumPicture: 'Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.jpg',
    index: 3,
    source: 'Boys,_Girls,_Toys_&_Words_-_Modern_Pitch.mp3'
  },
  {
    album: 'Higher And Higher',
    song: 'Higher_And_Higher_-_Scream_Inc',
    performedBy: 'SCREAM INC.',
    albumPicture: 'Higher_And_Higher_-_Scream_Inc.jpg',
    index: 4,
    source: 'Higher_And_Higher_-_Scream_Inc.mp3'
  },
  {
    album: 'Jupiter',
    song: 'Mirror_-_VITNE',
    performedBy: 'VITNE',
    albumPicture: 'Say_Goodbye_-_VITNE.jpg',
    index: 5,
    source: 'Mirror_-_VITNE.mp3'
  },
  {
    album: 'Not_My_Problem',
    song: 'Not_My_Problem_-_All_My_Friends_Hate_Me',
    performedBy: 'All_My_Friends_Hate_Me',
    albumPicture: 'Not_My_Problem_-_All_My_Friends_Hate_Me.jpg',
    index: 6,
    source: 'Not_My_Problem_-_All_My_Friends_Hate_Me.mp3'
  },
  {
    album: 'Apply Within',
    song: 'Old_News_-_Hot_Fiction',
    performedBy: 'Hot_Fiction',
    albumPicture: 'Old_News_-_Hot_Fiction.jpg',
    index: 7,
    source: 'Old_News_-_Hot_Fiction.mp3'
  },
  {
    album: 'Kites',
    song: 'Peyote_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Peyote_-_Kinematic.jpg',
    index: 8,
    source: 'Peyote_-_Kinematic.mp3'
  },
  {
    album: 'Kites',
    song: 'Already_Here_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Peyote_-_Kinematic.jpg',
    index: 9,
    source: 'Already_Here_-_Kinematic.mp3'
  },
  {
    album: 'Encephalon',
    song: 'Encephalon_-_VITNE.mp3',
    performedBy: 'VITNE',
    albumPicture: 'Enchaphalon-VITNE.jpg',
    index: 10,
    source: 'Encephalon_-_VITNE.mp3'
  },
  {
    album: 'Encephalon',
    song: 'Encephalon_(Instrumental)_-_VITNE.mp3',
    performedBy: 'VITNE',
    albumPicture: 'Enchaphalon-VITNE.jpg',
    index: 11,
    source: 'Encephalon_(Instrumental)_-_VITNE.mp3'
  },
  {
    album: 'Special',
    song: 'Special_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Special-Kinematic.jpg',
    index: 12,
    source: 'Special_-_Kinematic.mp3'
  },
  {
    album: 'Special',
    song: 'Glide_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Special-Kinematic.jpg',
    index: 13,
    source: 'Glide_-_Kinematic.mp3'
  },
  {
    album: 'Special',
    song: 'Dissipate_-_Kinematic',
    performedBy: 'Kinematic',
    albumPicture: 'Special-Kinematic.jpg',
    index: 14,
    source: 'Dissipate_-_Kinematic.mp3'
  }
]

localStorage.setItem('songs', JSON.stringify(songs))

const selectedIndexForAlbum = localStorage.getItem('indexForAlbum')
const selectedIndexForSong = localStorage.getItem('indexForSong')
const selectedIndexForArtist = localStorage.getItem('indexForArtist')

document.getElementById('clear').addEventListener('click', function () {
  localStorage.removeItem('indexForAlbum')
  localStorage.removeItem('indexForSong')
  localStorage.removeItem('indexForArtist')
  localStorage.removeItem('indexForAllSelectedSongs')
  window.location.reload(true)
})

var selectedSongs = []

let previousSelectionStorage = window.localStorage.getItem(
  'indexForAllSelectedSongs'
)
let previousSelectionObjects = JSON.parse(previousSelectionStorage)

function getSongs () {
  if (selectedIndexForAlbum || selectedIndexForAlbum === '') {
    /*clicked name is modified to remove _ char -> not searchable anymore*/
    const selectedAlbum = songs[selectedIndexForAlbum].album

    //get songs for album---------------------------
    getSongsForAlbum(songs, selectedAlbum)
    localStorage.removeItem('indexForAlbum')
  }
  //get songs for artist---------------------------
  if (selectedIndexForArtist || selectedIndexForArtist === '') {
    const selectedArtist = songs[selectedIndexForArtist].performedBy
    getSongsForArtist(songs, selectedArtist)
    localStorage.removeItem('indexForArtist')
  }
  //get song from tracklist---------------------------
  if (selectedIndexForSong || selectedIndexForSong === '') {
    getSongsForTracklist(songs, selectedIndexForSong)
  }
  //there were previous items in the playlist
  if (
    previousSelectionObjects !== null &&
    previousSelectionObjects.length > 0
  ) {
    for (obj of previousSelectionObjects) {
      selectedSongs.push(obj)
    }
  }

  localStorage.setItem(
    'indexForAllSelectedSongs',
    JSON.stringify(selectedSongs)
  )

  return selectedSongs
}

function getSongsForAlbum (songs, selectedAlbum) {
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
        performedBy: songs[i].performedBy.replaceAll('_', ' '),
        index: songs[i].index
      }
      selectedSongs.push(obj)
    }
  }
}

function getSongsForArtist (songs, selectedArtist) {
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
        performedBy: songs[i].performedBy.replaceAll('_', ' '),
        index: songs[i].index
      }
      selectedSongs.push(obj)
    }
  }
}

function getSongsForTracklist (songs, selectedIndexForSong) {
  let songNameWithSpace = songs[selectedIndexForSong].song.replaceAll('_', ' ')
  let correctedSongName = songNameWithSpace.substring(
    0,
    songNameWithSpace.indexOf('-')
  )

  const obj = {
    albumPicture: songs[selectedIndexForSong].albumPicture,
    songName: correctedSongName,
    performedBy: songs[selectedIndexForSong].performedBy.replaceAll('_', ' '),
    index: selectedIndexForSong
  }
  selectedSongs.push(obj)
  localStorage.removeItem('indexForSong')
}

function createSongItemAsHtml (songItem) {
  return `<div class="songDiv"><img src="assets/songlist/${songItem.albumPicture}"><div class="songInfoDiv"><span>${songItem.songName}</span><span>${songItem.performedBy}</span><span hidden>${songItem.index}</span>
</div></div>`
}

const selectedIndexForAllSongs = localStorage.getItem(
  'indexForAllSelectedSongs'
)

const songInfoArray = getSongs()

let songsAsHtml = songInfoArray.map(song => {
  return createSongItemAsHtml(song)
})

let htmlString = songsAsHtml.join('')
let songSection = document.getElementById('songSection')
songSection.innerHTML = htmlString

document
  .getElementById('songSection')
  .addEventListener('click', clickedSection => {
    let playlistIndex =
      clickedSection.target.parentElement.children[1].children[2].innerText

    let playlistAsHtml = createPlaylistHtml(playlistIndex)
    let playerSection = document.getElementById('player')
    playerSection.innerHTML = playlistAsHtml
  })

function createPlaylistHtml (playlistIndex) {
  const selectedSong = songs[playlistIndex]
  let songSource = selectedSong.source
  let pictureSource = selectedSong.albumPicture
  let songNameWithSpace = selectedSong.song.replaceAll('_', ' ')
  let correctedSongName = songNameWithSpace.substring(
    0,
    songNameWithSpace.indexOf('-')
  )
  let artist = selectedSong.performedBy.replaceAll('_', ' ')
  let albumTitle = selectedSong.album.replaceAll('_', ' ')

  return `<audio><source src='assets/songlist/${songSource}'></source></audio><img id="playerPicture" src='assets/songlist/${pictureSource}' alt=""><h2 id="title">${correctedSongName}</h2><h3 id="artist">${artist}</h3><h4 id="album">${albumTitle}</h4><input id="slider" type="range" min="1" max="100" value="0"><div id="timesDiv"><span id="elapsedTime">00:00</span><span id="timeLength">00:00</span></div><div id="buttonsDiv"><span id="goBackButton" class="material-symbols-outlined">arrow_back_ios_new</span><span id="goForwardButton" class="material-symbols-outlined">arrow_forward_ios</span><span id="pauseAndStartButton" class="pauseButton material-symbols-outlined">not_started</span><span id="loopButton" class="material-symbols-outlined">laps</span><span id="shuffleButton" class="material-symbols-outlined">shuffle</span></div><span hidden>${playlistIndex}</span> `
}

let isLopped = false
let isShuffled = false
var isSeeked = false

//********************* PLAYER FUNCTIONS****************************** */
document.getElementById('player').addEventListener('click', function (e) {
  let audio = e.target.parentElement.parentElement.children[0]

  if (e.target.classList.contains('pauseButton')) {
    startMusic(e, audio)
  } else if (e.target.classList.contains('startButton')) {
    pauseMusic(e, audio)
  } else if (e.target.id == 'goBackButton') {
    getPreviousMusic(e)
  } else if (e.target.id == 'goForwardButton') {
    getNextMusic(e, audio)
  } else if (e.target.id == 'loopButton') {
    makeLoopMusicList(e)
  } else if (e.target.id == 'shuffleButton') {
    makeShuffleMusicList(e)
  }
})

function makeLoopMusicList (e) {
  if (isLopped == true) {
    isLopped = false
    e.target.style.color = 'black'
    e.target.style.fontWeight = 'normal'
    localStorage.setItem('looping', 'notlooping')
  } else if (isLopped == false) {
    isLopped = true
    e.target.style.color = 'darkred'
    e.target.style.fontWeight = 'bold'
    localStorage.setItem('looping', 'loop')
  }
}

function makeShuffleMusicList (e) {
  if (isShuffled == true) {
    isShuffled = false
    e.target.style.color = 'black'
    e.target.style.fontWeight = 'normal'
    localStorage.setItem('shuffling', 'notshuffle')
  } else if (isShuffled == false) {
    isShuffled = true
    e.target.style.color = 'darkred'
    e.target.style.fontWeight = 'bold'
    localStorage.setItem('shuffling', 'shuffle')
  }
}

function getPrintedTime (baseTime) {
  let resultTimeMin = Math.floor(baseTime / 60)
  if (resultTimeMin < 10) resultTimeMin = '0' + resultTimeMin

  let resultTimeSec = Math.floor(baseTime % 60)
  if (resultTimeSec < 10) resultTimeSec = '0' + resultTimeSec

  return `${resultTimeMin}:${resultTimeSec}`
}

//start music function------------
function startMusic (e, audio) {
  audio.play()
  e.target.innerText = 'pause_circle'
  e.target.classList.remove('pauseButton')
  e.target.classList.add('startButton')
  resetValues(audio, e)
}

function resetValues (audio, e) {
  let startButton = e.target
  let timeLength = document.getElementById('timeLength')
  timeLength.innerText = getPrintedTime(audio.duration)
  let storagedSlider = localStorage.getItem('sliderStorage')
  let elapsedTime = document.getElementById('elapsedTime')
  const slider = document.getElementById('slider')

  if (!isSeeked) {
    elapsedTime.innerText = getPrintedTime(audio.currentTime)
  }

  /*   if (storagedSlider !== null) {
    elapsedTime.innerText = getPrintedTime(storagedSlider)
    audio.currentTime = storagedSlider
  } */

  audio.addEventListener('timeupdate', () => {
    if (!isSeeked) {
      elapsedTime.innerText = getPrintedTime(audio.currentTime)
      slider.max = audio.duration
      slider.value = audio.currentTime

      /*       if (storagedSlider !== null) {
        isSeeked = true
        elapsedTime.innerText = getPrintedTime(storagedSlider)
        audio.currentTime = storagedSlider
      } */

      if (audio.ended && isLopped == true) {
        let nextButtonTarget = startButton.parentElement.children[1]
        getLoopMusic(nextButtonTarget)
      }
      if (audio.ended && isShuffled == true) {
        let nextButtonTarget = startButton.parentElement.children[1]
        getShuffledMusicList(nextButtonTarget)
      }
    }

    if (audio.ended) {
      //setting total end of slider line:
      slider.max = '100'
      slider.value = 100
      elapsedTime.innerText = getPrintedTime(audio.duration)
      localStorage.removeItem('sliderStorage')
      e.target.classList.remove('pauseButton')
      e.target.classList.add('startButton')
    }
  })
}

//pause music function------------
function pauseMusic (e, audio) {
  audio.pause()
  e.target.innerText = 'not_started'
  e.target.classList.remove('startButton')
  e.target.classList.add('pauseButton')
}

//get previous music function------------
function getPreviousMusic (e) {
  const musicIndex = e.target.parentElement.parentElement.children[8].innerText
  let previousMusicIndex = -1

  const allMusicInPlayer =
    e.target.parentElement.parentElement.parentElement.children[3]

  for (let i = 0; i < allMusicInPlayer.children.length; i++) {
    let musicIndexInList =
      allMusicInPlayer.children[i].children[1].children[2].innerText

    if (musicIndex == musicIndexInList && i > 0) {
      previousMusicIndex =
        allMusicInPlayer.children[i - 1].children[1].children[2].innerText

      let playlistAsHtml = createPlaylistHtml(previousMusicIndex)
      let playerSection = document.getElementById('player')
      playerSection.innerHTML = playlistAsHtml
    }
  }
}

//get next music function------------
function getNextMusic (e, audio) {
  //e.target = forwardButton span
  const musicIndex = e.target.parentElement.parentElement.children[8].innerText
  let nextMusicIndex = -1

  const allMusicInPlayer =
    e.target.parentElement.parentElement.parentElement.children[3]

  for (let i = 0; i < allMusicInPlayer.children.length; i++) {
    let musicIndexInList =
      allMusicInPlayer.children[i].children[1].children[2].innerText

    if (
      musicIndex == musicIndexInList &&
      i < allMusicInPlayer.children.length - 1
    ) {
      nextMusicIndex =
        allMusicInPlayer.children[i + 1].children[1].children[2].innerText

      let playlistAsHtml = createPlaylistHtml(nextMusicIndex)
      let playerSection = document.getElementById('player')
      playerSection.innerHTML = playlistAsHtml
      if (isLopped) {
        let newSource = ''
        for (let song of songs) {
          if (song.index == nextMusicIndex) {
            newSource = `assets/songlist/${song.source}`
          }
        }
        audio.src = newSource
        audio.autoplay = true
        audio.play()
      }
    }
  }
}

function makeButtonToLoopOnload (audio) {
  let loopButton = document.getElementById('loopButton')
  loopButton.style.color = 'darkred'
  loopButton.style.fontWeight = 'bold'
  let startButton = document.getElementById('pauseAndStartButton')
  startButton.classList.remove('startButton')
  startButton.classList.add('pauseButton')
  startButton.innerText = 'pause_circle'

  /*  */
  let timeLength = document.getElementById('timeLength')
  timeLength.innerText = getPrintedTime(audio.duration)
  audio.addEventListener('timeupdate', () => {
    //timings
    let elapsedTime = document.getElementById('elapsedTime')
    elapsedTime.innerText = getPrintedTime(audio.currentTime)
    let timeLength = document.getElementById('timeLength')
    timeLength.innerText = getPrintedTime(audio.duration)
    document.getElementById('slider').max = audio.duration
    document.getElementById('slider').value = audio.currentTime
    //startbutton
    /*     let startButton = document.getElementById('pauseAndStartButton')
    startButton.classList.remove('startButton')
    startButton.classList.add('pauseButton') */

    if (audio.ended) {
      //setting total end of slider line:
      slider.max = '100'
      slider.value = 100
      elapsedTime.innerText = getPrintedTime(audio.duration)
      let startButton = document.getElementById('pauseAndStartButton')
      startButton.classList.remove('pauseButton')
      startButton.classList.add('startButton')
      startButton.innerText = 'not_started'

      localStorage.removeItem('sliderStorage')
    }
  })
}

function makeButtonToShuffleOnload (audio) {
  let shuffleButton = document.getElementById('shuffleButton')
  shuffleButton.style.color = 'darkred'
  shuffleButton.style.fontWeight = 'bold'
  let startButton = document.getElementById('pauseAndStartButton')
  startButton.classList.remove('startButton')
  startButton.classList.add('pauseButton')
  startButton.innerText = 'pause_circle'

  let timeLength = document.getElementById('timeLength')
  timeLength.innerText = getPrintedTime(audio.duration)

  audio.addEventListener('timeupdate', () => {
    //timings
    let elapsedTime = document.getElementById('elapsedTime')
    elapsedTime.innerText = getPrintedTime(audio.currentTime)
    let timeLength = document.getElementById('timeLength')
    timeLength.innerText = getPrintedTime(audio.duration)
    document.getElementById('slider').max = audio.duration
    document.getElementById('slider').value = audio.currentTime

    if (audio.ended) {
      //setting total end of slider line:
      slider.max = '100'
      slider.value = 100
      elapsedTime.innerText = getPrintedTime(audio.duration)
      let startButton = document.getElementById('pauseAndStartButton')
      startButton.classList.remove('pauseButton')
      startButton.classList.add('startButton')
      startButton.innerText = 'not_started'

      localStorage.removeItem('sliderStorage')
    }
  })
}

//get loop music list function------------
function getLoopMusic (e) {
  let startButton = document.getElementById('pauseAndStartButton')

  let audio = document.getElementsByTagName('audio')
  let looping = localStorage.getItem('looping')

  const musicIndex = e.parentElement.parentElement.children[8].innerText
  let nextMusicIndex = -1

  const allMusicInPlayer =
    e.parentElement.parentElement.parentElement.children[3]

  for (let i = 0; i < allMusicInPlayer.children.length; i++) {
    let musicIndexInList =
      allMusicInPlayer.children[i].children[1].children[2].innerText

    if (
      musicIndex == musicIndexInList &&
      i < allMusicInPlayer.children.length - 1
    ) {
      nextMusicIndex =
        allMusicInPlayer.children[i + 1].children[1].children[2].innerText

      let playlistAsHtml = createPlaylistHtml(nextMusicIndex)
      let playerSection = document.getElementById('player')
      playerSection.innerHTML = playlistAsHtml

      let newSource = ''
      for (let song of songs) {
        if (song.index == nextMusicIndex) {
          newSource = `assets/songlist/${song.source}`
        }
      }

      if (looping && looping.length > 0 && looping == 'loop') {
        audio[1].src = newSource
        audio[1].autoplay = true
        audio[1].play()

        audio[1].addEventListener('playing', function () {
          makeButtonToLoopOnload(audio[1])
        })
      }

      audio[1].addEventListener('ended', function () {
        getLoopMusic(document.getElementById('goForwardButton'))
      })
    }
    if (
      musicIndex == musicIndexInList &&
      i == allMusicInPlayer.children.length - 1
    ) {
      nextMusicIndex =
        allMusicInPlayer.children[0].children[1].children[2].innerText

      let playlistAsHtml = createPlaylistHtml(nextMusicIndex)
      let playerSection = document.getElementById('player')
      playerSection.innerHTML = playlistAsHtml

      let newSource = ''
      for (let song of songs) {
        if (song.index == nextMusicIndex) {
          newSource = `assets/songlist/${song.source}`
        }
      }

      if (looping && looping.length > 0 && looping == 'loop') {
        audio[1].src = newSource
        audio[1].autoplay = true
        audio[1].play()

        audio[1].addEventListener('playing', function () {
          makeButtonToLoopOnload(audio[1])
        })
      }
      audio[1].addEventListener('ended', function () {
        getLoopMusic(document.getElementById('goForwardButton'))
      })
    }
  }
}

//get shuffle music list function------------
function getShuffledMusicList (e) {
  let audio = document.getElementsByTagName('audio')

  const musicIndex = e.parentElement.parentElement.children[8].innerText
  let nextMusicIndex = -1

  const allMusicInPlayer =
    e.parentElement.parentElement.parentElement.children[3]

  for (let i = 0; i < allMusicInPlayer.children.length; i++) {
    let randomIndex = Math.floor(
      Math.random() * allMusicInPlayer.children.length
    )

    nextMusicIndex =
      allMusicInPlayer.children[randomIndex].children[1].children[2].innerText

    if (musicIndex == nextMusicIndex) {
      let randomIndex = Math.floor(
        Math.random() * allMusicInPlayer.children.length
      )

      nextMusicIndex =
        allMusicInPlayer.children[randomIndex].children[1].children[2].innerText
    }

    let playlistAsHtml = createPlaylistHtml(nextMusicIndex)
    let playerSection = document.getElementById('player')
    playerSection.innerHTML = playlistAsHtml

    let newSource = ''
    for (let song of songs) {
      if (song.index == nextMusicIndex) {
        newSource = `assets/songlist/${song.source}`
      }
    }

    let shuffing = localStorage.getItem('shuffling')

    if (shuffing && shuffing.length > 0 && shuffing == 'shuffle') {
      audio[1].src = newSource
      audio[1].autoplay = true
      audio[1].play()

      audio[1].addEventListener('playing', function () {
        makeButtonToShuffleOnload(audio[1])
      })
    }
    audio[1].addEventListener('ended', function () {
      getShuffledMusicList(document.getElementById('goForwardButton'))
    })
  }
}

//slider functions------------
document.getElementById('player').addEventListener('click', function (e) {
  let audio = document.getElementsByTagName('audio')
  if (e.target.id == 'slider') {
    e.target.max = audio[1].duration
    localStorage.setItem('sliderStorage', e.target.value)
  }
})

function check () {
  console.log('button')
  document.getElementById('loopButton').style.color = 'green'
  //e.target.style.color = 'darkred'
}
