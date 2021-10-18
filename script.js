
// dom manipulation
const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Variables for count and apiKey
const count = 30;
const apiKey = "Q7Oky6KhaXEEOnyAhfWC1amGzCHlRFg_WOvFqfYDtkE";
// api link from unsplash documentation
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// function for loading image to get infinite scroll
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function for setAttribute
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Function to display photos on dom
function displayPhotos() {
    imagesLoaded = 0;
    
    totalImages = photosArray.length;

    photosArray.forEach(photo => {
        // <a> for unsplash links
        const item = document.createElement("a");
        // <img> for photo
        setAttributes (item, {
            href: photo.links.html,
            target: "_blank",
        });
        const img = document.createElement("img");
        setAttributes (img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // event listener
        img.addEventListener("load", imageLoaded);
        // to place image inside anchor tag
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

// This is the main function
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // alert("You encountered an error!", error);
    }
}

// Event litener for infinite scroll
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// Running the main function
getPhotos();