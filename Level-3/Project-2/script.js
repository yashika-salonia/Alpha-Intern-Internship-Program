let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('play');
let myProgressBar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('songName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Unstoppable", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "O Mahi", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Sajni", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Khol de par", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg"},,
    {songName: "Namo Namo", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "Style", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpg"},
    {songName: "Soulmate", filePath: "songs/7.mp3", coverPath: "covers/cover7.jpg"},
    {songName: "Teri Mitti", filePath: "songs/8.mp3", coverPath: "covers/cover8.jpg"},
]

play.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        play.classList.remove('bx-play-circle');
        masterPlay.classList.add('bx-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('bx-pause-circle');
        masterPlay.classList.add('bx-play-circle');
        gif.style.opacity = 0;
    }
})

audioElement.addEventListener('timeupdate', ()=>{ 
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
        element.classList.remove('bx-pause-circle');
        element.classList.add('bx-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('bx-play-circle');
        e.target.classList.add('bx-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('bx-play-circle');
        masterPlay.classList.add('bx-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bx-play-circle');
    masterPlay.classList.add('bx-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('bx-play-circle');
    masterPlay.classList.add('bx-pause-circle');
})