function audio(sound) {
    var aud = new Audio(AudioSrc[sound]);
    aud.setAttribute("preload", "auto");
    aud.setAttribute("controls", "none");
    aud.style.display = "none";
    aud.play();
}