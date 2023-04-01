// Function for Nav-bar background-color change effect

$(function () {
    $(document).scroll(function () {
        let $nav = $("#mainNavbar");
        $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
    });
})

// Function to remove previously searched elements form the mainBody

const removeShow = () => {      // function to remove div's present inside #dataBox
    const list = document.querySelectorAll('#dataBox div');     // creating list of all div's present in #dataBox
    for (item of list) {
        item.remove();      // removing every div using for-loop
    }
};

// Function to create elements, assigning values and adding to the mainBody

const showDetails = (shows) => {    // function to display results
    for (result of shows) {         //
        const mainBody = document.querySelector('#dataBox');
        const columnDiv = document.createElement('DIV');
        columnDiv.classList.add("col-xl-2", "col-md-4", "col-sm-6");        // adding classes 
        const anchorTag = document.createElement('A');
        anchorTag.target = "_blank";                    // to open link on new window
        const img = document.createElement('IMG');
        img.classList.add("img-thumbnail");             // adding class for image
        const title = document.createElement('P');
        title.classList.add("showTitle");               // adding show title

        anchorTag.href = result.url;        // adding url to open the Anime-link
        img.src = result.image;             // adding image url of the show
        title.textContent = result.title;   // adding title of the show

        anchorTag.append(img);              // putting img element inside an anchor
        columnDiv.append(anchorTag);        // putting anchor inside a div
        columnDiv.append(title);            // putting paragraph_title inside div
        mainBody.append(columnDiv);         // putting div inside mainBody(#dataBox)
    }
};

// Async function to send search query to API when form is submitted

const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
    e.preventDefault();     // to prevent page reload
    removeShow();       // function to remove previous results
    const searchVal = form.elements.query.value;        // search input text
    const searchText = document.querySelector('#searchStr');
    searchText.textContent = searchVal;         // to show what we searched
    const res = await axios.get(`https://api.consumet.org/anime/gogoanime/${searchVal}?/`);     // request searched show from API
    showDetails(res.data.results);          // function to show searched results (passing array of object's received from API)
    form.elements.query.value = '';         // clearing search input value after submitting 
});

// "Home" button to show Anime with Recent Episodes

const home = document.querySelector("#home");
home.addEventListener("click", async function (e) {
    e.preventDefault();     // to prevent page reload
    removeShow();       // function to remove previous results
    const searchText = document.querySelector('#searchStr');
    searchText.textContent = "Home";         // to show Home
    const res = await axios.get("https://api.consumet.org/anime/gogoanime/recent-episodes");     // request recent episodes from API
    showDetails(res.data.results);          // function to show searched results (passing array of object's received from API)
});

// "Trending" button to show Top Airing Anime

const trending = document.querySelector("#trending");
trending.addEventListener("click", async function (e) {
    e.preventDefault();     // to prevent page reload
    removeShow();       // function to remove previous results
    const searchText = document.querySelector('#searchStr');
    searchText.textContent = "Trending";         // to show trending
    const res = await axios.get("https://api.consumet.org/anime/gogoanime/top-airing");     // request top airing from API
    showDetails(res.data.results);          // function to show searched results (passing array of object's received from API)
});


const hamburger = document.querySelector("#hamburger");
const body = document.querySelector('#dataBox');
body.addEventListener("click", function () {
    if(hamburger.expanded == true){
        hamburger.expanded = false;
    }
});
