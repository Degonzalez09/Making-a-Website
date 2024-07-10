
'use strict'
    
const playerWrapper = document.querySelector(".player-wrapper")
const videoEl = document.querySelector("video")
const playBtn = document.querySelector(".play")
const pauseBtn = document.querySelector(".pause")
const muteBtn = document.querySelector(".mute")
const unmuteBtn = document.querySelector(".unmute")
const currentTimeBar = document.querySelector(".running")
const playBar = document.querySelector(".play-bar")
const currentTime = document.querySelector(".current-time")
const totalTime = document.querySelector(".total-time")
const volume_ = document.querySelector(".sound-volume")
const videoTitle = document.querySelector(".title")
const settingsBox = document.querySelector(".player-options-wrapper")
const playNext_ = document.querySelector(".play-next")

const videoList = [
    "https://youtu.be/i3RrjcIw4Qg?list=PLLjkHXYX42PiAgYNyZqlfCoR54YnESMRW", // path to the video source
    "Video 02",
    "Video 03",
]

const settings = {
    videoIndex: 0,
    autoplay: false,
    playspeedWrapper: null,
    fullscreen: false
}

videoEl.src = videoList[0] + ".mp4"

function handlePlay() {
    videoEl.play()
    toggleDisplay(playBtn, pauseBtn)
}

playBtn.addEventListener("click", handlePlay)

pauseBtn.onclick = function () {
    videoEl.pause()
    toggleDisplay(pauseBtn, playBtn)
}


videoEl.onplaying = function () {
    totalTime.innerHTML = videoDuration(videoEl.duration)
}

videoEl.ontimeupdate = function () {
    currentTime.innerHTML = videoDuration(videoEl.currentTime)
    currentTimeBar.style.width = (videoEl.currentTime / videoEl.duration) * 100 + "%"
}

function handleMute(m) {
    videoEl.muted = m === "m"

    if (m === "m") {
        toggleDisplay(muteBtn, unmuteBtn)
    } else {
        toggleDisplay(unmuteBtn, muteBtn)
    }
}

volume_.oninput = function () {
    videoEl.volume = volume_.value
}

function handleNext(el) {
    if (settings.videoIndex < videoList.length - 1) {
        settings.videoIndex++
        videoEl.src = videoList[settings.videoIndex] + '.mp4'
        videoTitle.innerHTML = videoList[settings.videoIndex]
        handlePlay()

        if (settings.videoIndex + 1 === videoList.length) {
            el.disabled = true
            el.classList.add('grayed-out')
        }
    }
}

videoEl.onended = function () {
    if (settings.autoplay) {
        handleNext(playNext_)
    }
}

function handleAutoplay(el) {
    el.classList.toggle("justify-end")
    let currentText = el.firstElementChild.textContent
    settings.autoplay = !settings.autoplay

    if (currentText === "pause") {
        el.firstElementChild.textContent = "play_arrow"
    } else {
        el.firstElementChild.textContent = "pause"

    }
}

function handleSubtitle(el) {
    el.classList.toggle("grayed-out")
    const subtitle_ = document.querySelector(".Subtitle-wrapper")
    subtitle_.classList.toggle("hidden")
}

function handlePlaySpeed(el) {
    settings.playspeedWrapper = el
    videoEl.playbackRate = el.value
}

function handlePictureInPicuture() {
    if (document.pictureInPictureElement) {
        document.exitPictureInPicture()
    } else if (document.pictureInPictureEnabled) {
        playerWrapper.classList.add("hidden")
        videoEl.requestPictureInPicture()
    }
}

videoEl.onleavepictureinpicture = function () {
    playerWrapper.classList.remove("hidden")
}

function handleFullScreen(f) {
    const fullscreen_exit = document.querySelector(".fullscreen_exit")
    const fullscreen = document.querySelector(".fullscreen")

    playerWrapper.classList.toggle('full-screen')
    if (f) {
        toggleDisplay(fullscreen, fullscreen_exit)
        settings.fullscreen = true
    } else {
        toggleDisplay(fullscreen_exit, fullscreen)
        settings.fullscreen = false
    }
}

function handleSkippingTime(e) {
    let x_ = e.clientX
    const barWidth = playBar.offsetWidth
    if (!settings.fullscreen) {
        x_ = x_ - 40
    }

    const c_ = x_ / barWidth
    currentTimeBar.style.width = c_ * 100 + '%'
    videoEl.currentTime = c_ * videoEl.duration
}

playBar.onclick = handleSkippingTime

function toggleDisplay(hide, display) {
    hide.classList.add("hidden")
    display.classList.remove("hidden")
}

function videoDuration(d) {
    const sec = Math.round(d % 60)
    const min = Math.round(d / 60)
    const hr = min > 59 ? Math.round(min / 60) : 0

    return hr > 0 ? hr + ' : ' + min + ' : ' + sec : min + ' : ' + sec
}

    