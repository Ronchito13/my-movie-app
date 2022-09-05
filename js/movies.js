// Now Playing

function nowPlaying(){
fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=2c46288716a18fb7aadcc2a801f3fc6b&language=en-US")
.then((data) => data.json())
.then((data) => setCards(data));
}

// Most Popular

function mostPopular(){
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=2c46288716a18fb7aadcc2a801f3fc6b&language=en-US")
    .then((data) => data.json())
    .then((data) => setCards(data));
}


// My Favorites




function myFavorites(){  
    let myFav = JSON.parse(localStorage.getItem("myFavorites")); 
    if(myFav === null || myFav === undefined){
        document.getElementById("error-box").innerText = "Must add movies to Favorites";
        document.getElementById("error-box").style.right = "-5px";
        setTimeout(()=>{
            document.getElementById("error-box").innerText = "";
            document.getElementById("error-box").style.right = "-505px";
        },3000)
    } 
    let data = {
        results: JSON.parse(localStorage.getItem("myFavorites"))
    }    
    for(i = 0; i < myFav.length; i++){        
        setCards(data);    
    }    
    }


// Shorten Desc

function truncate(str, no_words) {
    return str.split(" ").splice(0,no_words).join(" ");
}

function setCards(data){

    document.getElementById("theMovies").innerHTML = "";

    for(let i = 0; i < data.results.length; i++){

    let {id,title,backdrop_path,overview} = data.results[i];   

    let cardDiv = document.createElement("div");
    cardDiv.className = "col-lg-4 col-sm-6 mb-4";

    let divPortfolioItem = document.createElement("div");
    divPortfolioItem.className = "portfolio-item";

    let aPortfolio = document.createElement("div");
    aPortfolio.className = "portfolio-link";
    aPortfolio.setAttribute("data-bs-toggle", "modal");
    aPortfolio.setAttribute("href", `#movieModal`);

    let divPortfolioHover = document.createElement("div");
    divPortfolioHover.className = "portfolio-hover";

    aPortfolio.appendChild(divPortfolioHover);

    let portfolioHoverContent = document.createElement("div");
    portfolioHoverContent.className = "portfolio-hover-content";

    divPortfolioHover.appendChild(portfolioHoverContent);

    let portfolioHoverContentIcon = document.createElement("span");
    portfolioHoverContentIcon.className = "pointer";
    portfolioHoverContentIcon.innerText = "Read More";
    portfolioHoverContentIcon.addEventListener("click",()=>{
        setModal(data.results[i]);
    })

    portfolioHoverContent.appendChild(portfolioHoverContentIcon);

    let imgFluid = document.createElement("img");
    imgFluid.className = "img-fluid";
    imgFluid.setAttribute("src", `https://image.tmdb.org/t/p/w500${backdrop_path}`);
    imgFluid.setAttribute("alt", `${title}`);

    aPortfolio.appendChild(imgFluid);

    let divPortfolioCaption = document.createElement("div");
    divPortfolioCaption.className = "portfolio-caption";

    let divPortfolioCaptionHeading = document.createElement("div");
    divPortfolioCaptionHeading.className = "portfolio-caption-heading";
    divPortfolioCaptionHeading.innerText = `${title}`;

    let divPortfolioCaptionSubheading = document.createElement("div");
    divPortfolioCaptionSubheading.className = "portfolio-caption-subheading text-muted";
    divPortfolioCaptionSubheading.innerText = `${truncate(overview, 25) + "..."}`;

    divPortfolioCaption.appendChild(divPortfolioCaptionHeading);
    divPortfolioCaption.appendChild(divPortfolioCaptionSubheading);


    divPortfolioItem.appendChild(aPortfolio);
    divPortfolioItem.appendChild(divPortfolioCaption);    
    cardDiv.appendChild(divPortfolioItem);
    document.getElementById("theMovies").appendChild(cardDiv);
}
}


function setModal(data){    
    let {original_language, overview, backdrop_path, release_date, title} = data;    
    document.getElementById("movieTitle").innerText = title;
    document.getElementById("movieSubTitle").innerText = overview;
    document.getElementById("movieImg").setAttribute("src", `https://image.tmdb.org/t/p/w500${backdrop_path}`);
    document.getElementById("movieImg").setAttribute("alt", `${title}`);
    document.getElementById("movieReleaseDate").innerText = release_date;
    document.getElementById("movieOriginalLanguage").innerText = original_language;
}



function saveToMyFavorites(){        
    let listOfMyMovies = [];
    
    if(localStorage.getItem("myFavorites") !== null){        
        let myFav = JSON.parse(localStorage.getItem("myFavorites"));
        myFav.map(x=> listOfMyMovies.push(x));
    }

    for (key of listOfMyMovies) {
        if (key.title === document.getElementById("movieTitle").innerText) {
          return false;
        } 
    }

    let title = document.getElementById("movieTitle").innerText;
    let overview = document.getElementById("movieSubTitle").innerText;
    let backdrop_path = document.getElementById("movieImg").src;    
    let release_date = document.getElementById("movieReleaseDate").innerText;
    let original_language = document.getElementById("movieOriginalLanguage").innerText;

    let setData = {title,overview,backdrop_path,release_date,original_language};
    listOfMyMovies.push(setData);    

    localStorage.setItem("myFavorites", JSON.stringify(listOfMyMovies));    
    
    document.querySelector(".like-modal").children[0].style.color = "red";
}















