// Define global variables or constants if needed
let allPhotos = []; // To store all photos fetched from JSON

// Function to fetch and display photos from JSON
function displayPhotos() {
    // Fetch photos from JSON file using Fetch API or XMLHttpRequest
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allPhotos = data; // Store all photos in the global variable
            renderPhotos(allPhotos); // Render all photos initially
        })
        .catch(error => console.error('Error fetching photos:', error));
}

// Function to render photos
function renderPhotos(photos) {
    const photoContainer = document.getElementById('photo-container');
    photoContainer.innerHTML = ''; // Clear previous photos

    photos.forEach(photo => {
        const photoCard = createPhotoCard(photo);
        photoContainer.appendChild(photoCard);
    });
}

// Function to create HTML elements for photo card
function createPhotoCard(photo) {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = photo.imageUrl; // Assuming imageUrl is a property in the photo object
    image.alt = photo.title;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = photo.title;

    const category = document.createElement('p');
    category.classList.add('card-text');
    category.textContent = `Category: ${photo.category}`;

    const likes = document.createElement('p');
    likes.classList.add('card-text');
    likes.textContent = `Likes: ${photo.likes}`;

    cardBody.appendChild(title);
    cardBody.appendChild(category);
    cardBody.appendChild(likes);

    card.appendChild(image);
    card.appendChild(cardBody);

    return card;
}

// Function to filter photos by category
function filterByCategory(category) {
    let filteredPhotos;
    if (category === 'All') {
        filteredPhotos = allPhotos;
    } else {
        filteredPhotos = allPhotos.filter(photo => photo.category === category);
    }
    renderPhotos(filteredPhotos);
}

// Function to filter photos by tag
function filterByTag(tag) {
    const filteredPhotos = allPhotos.filter(photo => photo.tags.includes(tag));
    renderPhotos(filteredPhotos);
}

// Function to sort photos by popularity (likes)
function sortByPopularity() {
    const sortedPhotos = allPhotos.slice().sort((a, b) => b.likes - a.likes);
    renderPhotos(sortedPhotos);
}

// Function to handle search functionality
function searchPhotos(query) {
    const regex = new RegExp(query, 'i'); // Case-insensitive search
    const filteredPhotos = allPhotos.filter(photo => regex.test(photo.title) || regex.test(photo.description) || photo.tags.some(tag => regex.test(tag)));
    renderPhotos(filteredPhotos);
}

// Function to initialize the application
function init() {
    // Call the displayPhotos function to initially load and display photos
    displayPhotos();

    // Add event listeners for category filtering
    document.querySelectorAll('.category-filter').forEach(categoryButton => {
        categoryButton.addEventListener('click', () => {
            const category = categoryButton.dataset.category;
            filterByCategory(category);
        });
    });

    // Add event listener for tag filtering
    document.getElementById('tag-filter').addEventListener('change', event => {
        const selectedTag = event.target.value;
        filterByTag(selectedTag);
    });

    // Add event listener for popularity sorting
    document.getElementById('sort-popularity').addEventListener('click', () => {
        sortByPopularity();
    });

    // Add event listener for search functionality
    document.getElementById('search-form').addEventListener('submit', event => {
        event.preventDefault();
        const query = event.target.elements['search-query'].value;
        searchPhotos(query);
    });
}

// Call the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
