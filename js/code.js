// Set year for footer
document.getElementById("thisYear").innerText = new Date().getFullYear();

// Set Functions
document.getElementById("mostPopular").addEventListener("click",()=>{mostPopular()});
document.getElementById("nowPlaying").addEventListener("click",()=>{nowPlaying()});
document.getElementById("myFavorites").addEventListener("click",()=>{myFavorites()});

