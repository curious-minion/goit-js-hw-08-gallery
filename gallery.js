import images from "./gallery-items.js";

const galleryEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.lightbox');
const closeLightboxEl = document.querySelector('[data-action="close-lightbox"]')
const lightboxImageEl = document.querySelector('.lightbox__image');
const backdropEl = document.querySelector('.lightbox__overlay');

galleryEl.insertAdjacentHTML('beforeend', createImagesList(images));

galleryEl.addEventListener('click', onGalleryItemClick);

function createImagesList(images){
  return images.map(({preview, original, description}) =>{
    return `
    <li class="gallery__item" data-index="">
    <a
    class="gallery__link"
        href="${original}"
        >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          />
      </a>
      </li>
      `;
    })
  .join('');
}

let indexOfGalleryImage = null;

function onGalleryItemClick(e) {
   e.preventDefault();

    if (!e.target.classList.contains('gallery__image')) {
        return;
    }
  const galleryPictureSource = e.target.dataset.source;
  return galleryPictureSource;

}


galleryEl.addEventListener('click', onOpenModal);
closeLightboxEl.addEventListener('click', onCloseModal);
backdropEl.addEventListener('click', onBackdropClick);

function onOpenModal(e) {
 
  window.addEventListener('keydown', onEscKeyPress);
 window.addEventListener('keydown', onArrowKeyPress);

  
  lightboxEl.classList.add('is-open');
  lightboxImageEl.src = onGalleryItemClick(e);
  
}


function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);
  
 
  lightboxEl.classList.remove('is-open');
  lightboxImageEl.src = '';
  indexOfGalleryImage = null;
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    
    onCloseModal();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

const galleryLink = document.querySelectorAll(".gallery__link");

function getElementIndex(element) {
return [...galleryLink].indexOf(element);
}

const allImages = document.querySelectorAll('.gallery__image');

function changeImage(e) {
  
  if (indexOfGalleryImage === null) {
indexOfGalleryImage = getElementIndex(e.target);
}
if (e.code === "ArrowLeft") {
  indexOfGalleryImage -= 1;
  
if (indexOfGalleryImage < 0) indexOfGalleryImage = images.length-1;
}
else {
  indexOfGalleryImage += 1;
  
if (indexOfGalleryImage > images.length -1) indexOfGalleryImage = 0;
}
  const imgDataSource = allImages[indexOfGalleryImage].dataset.source;
  lightboxImageEl.src = imgDataSource;
  
};



function onArrowKeyPress(e) {
  changeImage(e);
}


