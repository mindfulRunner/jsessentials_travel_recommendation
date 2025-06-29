const homeLink = document.getElementById("homeLink");
const aboutUsLink = document.getElementById("aboutUsLink");
const contactUsLink = document.getElementById("contactUsLink");
const searchText = document.getElementById("searchText");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");

const home = document.getElementById("home");
const aboutUs = document.getElementById("aboutUs");
const contactUs = document.getElementById("contactUs");
const searchResult = document.getElementById("searchResult");
const searchResultContent = document.getElementById("searchResultContent");

const contactUsForm = document.getElementById("contactUsForm");
const contactUsName = document.getElementById("name");
const contactUsSubmit = document.getElementById("contactUsSubmit");

const apiUrl = "./travel_recommendation_api.json";

window.onload = registerEvent;

function registerEvent() {
    homeLink.addEventListener("click", showHome);
    aboutUsLink.addEventListener("click", showAboutUs);
    contactUsLink.addEventListener("click", showContactUs);
    searchButton.addEventListener("click", showSearchResult);
    resetButton.addEventListener("click", clearSearch);
    contactUsSubmit.addEventListener("click", submitContactUs);
    hideAll();
    clearSearch();
    displayHome();
}

function displayHome() {
    hideAll();
    home.style.display = 'block';
}

function showHome(event) {
    // prevent default behavior for anchor, which causes a page reload
    event.preventDefault();
    hideAll();
    home.style.display = 'block';
}

function showAboutUs(event) {
    // prevent default behavior for anchor, which causes a page reload
    event.preventDefault();
    hideAll();
    aboutUs.style.display = 'block';
}

function showContactUs(event) {
    // prevent default behavior for anchor, which causes a page reload
    event.preventDefault();
    hideAll();
    contactUs.style.display = 'block';
}

function showSearchResult(event) {
    // prevent default behavior for anchor, which causes a page reload
    event.preventDefault();
    hideAll();
    search();
    searchResult.style.display = 'block';
}

function hideAll() {
    home.style.display = 'none';
    aboutUs.style.display = 'none';
    contactUs.style.display = 'none';
    searchResult.style.display = 'none';
}

function clearSearch() {
    searchText.value = "";
    searchResultContent.innerHTML = "";
}

function submitContactUs(event) {
    // prevent default behavior for form submit, which causes a page reload
    event.preventDefault();
    alert("Thanks " + contactUsName.value + " for contact us.  Your message has been well received.");
    contactUsForm.reset();
}

function search() {
    //
    // call service to get travel info
    //
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // debugger
            processSearchResult(data, searchText, searchResultContent);
        })
        .catch(error => {
            // debugger
            console.error("An error occurred: " + error);
        });
}


function processSearchResult(result, searchText, searchResultContent) {
    const cities = filterCitiesBySearchText(result, searchText);
    clearSearch();

    cities.forEach(city => {
        const cityNode= createCityNode(city);
        searchResultContent.appendChild(cityNode);
        const hr = document.createElement("hr");
        searchResultContent.appendChild(hr);
    });

    searchResultContent.style.setProperty("background-color", "#000066");
}

function filterCitiesBySearchText(result, searchText) {
    const countryQueryItems = ["country", "countries"];
    const templeQueryItems = ["temple", "temples"];
    const beachQueryItems = ["beach", "beaches"];

    const queryItem = searchText.value.toLowerCase();

    let cities = null;

    if (countryQueryItems.includes(queryItem)) {
        cities = result.countries.reduce((accum, country) => accum.concat(country.cities), []);
    } else if (templeQueryItems.includes(queryItem)) {
        cities = result.temples;
    } else if (beachQueryItems.includes(queryItem)) {
        cities = result.beaches;
    }

    return cities;
}

function addSearchResult(cities) {
    cities.forEach(city => {
        const cityNode= createCityNode(city);
        searchResultContent.appendChild(cityNode);
    });
}

function createCityNode(city) {
    const ul = document.createElement("ul");
    const li1 = document.createElement("li");
    li1.classList.add("name");
    li1.textContent = city.name;
    ul.appendChild(li1);
    const li2 = document.createElement("li");
    li2.classList.add("description");
    li2.textContent = city.description;
    ul.appendChild(li2);
    const li3 = document.createElement("li");
    const img = document.createElement("img");
    img.src = "img/" + city.imageUrl;
    img.style.width = "460px";
    img.style.height = "300px";
    img.style.borderRadius = "5px";
    li3.appendChild(img);
    ul.appendChild(li3);
    return ul;
}