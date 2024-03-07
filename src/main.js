'use strict';

import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();

    if (searchQuery === '') {
        alert('Please enter a search query');
        return;
    }

    fetchImages(searchQuery)
        .then(images => {
            if (images.length === 0) {
                alert('No images found for the provided search query');
            } else {
                renderGallery(images);
            }
        })
        .catch(error => console.error('Error:', error));
}

function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; 
}

function addImagesToGallery(images) {
    const gallery = document.querySelector('.gallery');

    images.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;

        galleryItem.appendChild(img);
        gallery.appendChild(galleryItem);
    });
}

