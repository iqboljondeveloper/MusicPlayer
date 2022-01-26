const container = document.getElementById(`container`)
const cover = document.getElementById(`cover`)
const title = document.getElementById(`title`)
const start = document.getElementById(`start`)
const end = document.getElementById(`end`)
const progressContainer = document.getElementById(`progress-container`)
const progress = document.querySelector(`.progress`)
const prevBtn = document.getElementById(`prev`)
const playBtn = document.getElementById(`play`)
const nextBtn = document.getElementById(`next`)
const audio  = document.getElementById(`audio`)
// music
const songs = [
    `miyagi-endshpil-listen-to-your-heart`,
    `Miyagi, Эндшпиль - Fire Man`,
    `wertus-miyagi-brooklyn`,
]
// songIndex
let songIndex = 0

loadSong(songs[songIndex])

function loadSong(song){
    title.textContent = song
    audio.src = `music/${song}.mp3`
    cover.src = `img/${song}.jpg`
}
function playSong(){
    container.classList.add(`play`)
    playBtn.innerHTML = '<i class="fas fa-pause"> </i>'
    audio.play()
}


function pauseSong(){
    container.classList.remove(`play`)
    playBtn.innerHTML = '<i class="fas fa-play"> </i>'
    audio.pause()
}

function nextMusic(){
    songIndex++
    if(songIndex > songs.length - 1){
        songIndex = 0
    }
    loadSong(songs[songIndex])
    audio.play()


}

// previous music
function prevMusic(){
    songIndex--
    if(songIndex < 0){
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    audio.play()


}
//setProgress
function progess(event) {
const duration = event.srcElement.duration
const curTime = event.srcElement.currentTime
let presenctageWidth = (curTime / duration) * 100
progress.style.width = `${presenctageWidth}%`


// end time
const endMinutes = Math.floor(duration / 60)
const endSecundes = Math.floor(duration % 60)
end.textContent = `${endMinutes == endMinutes < 10 ? '0' + endMinutes : endMinutes} : ${(endSecundes == endSecundes < 10 ? '0'  + endSecundes : endSecundes)}`

// start time
const startMinutes = Math.floor(curTime / 60)
const startSecundes = Math.floor(curTime % 60)
console.log(startMinutes, startSecundes);
start.textContent = `${startMinutes == startMinutes < 10 ? '0' + startMinutes : startMinutes} : ${(startSecundes == startSecundes < 10 ? '0'  + startSecundes : startSecundes)}`

}

function setProgress(e){
    const width = this.clientWidth
const widthX = e.offsetX
const duration = audio.duration
audio.currentTime = (widthX / width ) * duration
}



playBtn.addEventListener(`click`, function(){
    const isPlaying = container.classList.contains(`play`)
    if(isPlaying){
        pauseSong()
    }else{
        playSong()
    }
})

nextBtn.addEventListener(`click`, nextMusic)
prevBtn.addEventListener(`click`, prevMusic)
audio.addEventListener(`timeupdate`, progess)
audio.addEventListener(`ended`, nextMusic())
progressContainer.addEventListener(`click`, setProgress)