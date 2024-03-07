'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function renderGallery(images) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    const loader = document.querySelector('.loader');
    loader.style.display = 'block';

    const limitedImages = images.slice(0, 9);

    gallery.innerHTML = '';

    Promise.all(limitedImages.map(image => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve({ image, loaded: true });
            img.onerror = () => resolve({ image, loaded: false });
            img.src = image.webformatURL;
        });
    }))
    .then(results => {
        loader.style.display = 'none';
        results.forEach(({ image, loaded }) => {
            if (loaded) {
                const galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');

                const link = document.createElement('a');
                link.href = image.largeImageURL;

                const img = document.createElement('img');
                img.src = image.webformatURL;
                img.alt = image.tags;
                img.classList.add('gallery-item-img');

                const detailsContainer = document.createElement('div');
                detailsContainer.classList.add('details-container');

                const detailWrapper1 = document.createElement('div');
                detailWrapper1.classList.add('detail-wrapper');

                const likesLabel = document.createElement('p');
                likesLabel.classList.add('detail-label');
                likesLabel.textContent = 'Likes';

                const likesValue = document.createElement('p');
                likesValue.classList.add('detail-value');
                likesValue.textContent = image.likes;

                detailWrapper1.appendChild(likesLabel);
                detailWrapper1.appendChild(likesValue);

                const detailWrapper2 = document.createElement('div');
                detailWrapper2.classList.add('detail-wrapper');

                const viewsLabel = document.createElement('p');
                viewsLabel.classList.add('detail-label');
                viewsLabel.textContent = 'Views';

                const viewsValue = document.createElement('p');
                viewsValue.classList.add('detail-value');
                viewsValue.textContent = image.views;

                detailWrapper2.appendChild(viewsLabel);
                detailWrapper2.appendChild(viewsValue);

                const detailWrapper3 = document.createElement('div');
                detailWrapper3.classList.add('detail-wrapper');

                const commentsLabel = document.createElement('p');
                commentsLabel.classList.add('detail-label');
                commentsLabel.textContent = 'Comments';

                const commentsValue = document.createElement('p');
                commentsValue.classList.add('detail-value');
                commentsValue.textContent = image.comments;

                detailWrapper3.appendChild(commentsLabel);
                detailWrapper3.appendChild(commentsValue);

                const detailWrapper4 = document.createElement('div');
                detailWrapper4.classList.add('detail-wrapper');

                const downloadsLabel = document.createElement('p');
                downloadsLabel.classList.add('detail-label');
                downloadsLabel.textContent = 'Downloads';

                const downloadsValue = document.createElement('p');
                downloadsValue.classList.add('detail-value');
                downloadsValue.textContent = image.downloads;

                detailWrapper4.appendChild(downloadsLabel);
                detailWrapper4.appendChild(downloadsValue);

                detailsContainer.appendChild(detailWrapper1);
                detailsContainer.appendChild(detailWrapper2);
                detailsContainer.appendChild(detailWrapper3);
                detailsContainer.appendChild(detailWrapper4);

                link.appendChild(img);
                galleryItem.appendChild(link);
                galleryItem.appendChild(detailsContainer);

                gallery.appendChild(galleryItem);
            }
        });

        const lightbox = new SimpleLightbox('.gallery-item a', { /* options */ });
        lightbox.on('show.simplelightbox', function (e) {
            console.log('Image shown');
        });
        lightbox.on('close.simplelightbox', function () {
            console.log('Lightbox closed');
        });
    })
    .catch(error => {
        console.error('Error loading images:', error);
        loader.style.display = 'none';
    });
}

export { renderGallery };
