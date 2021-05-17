import images from "/gallery-items.js";

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
//   window.addEventListener('keydown', onArrowRightKeyPress);
  
  lightboxEl.classList.add('is-open');
  lightboxImageEl.src = onGalleryItemClick(e);
  
}


function onCloseModal() {
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);
  // window.removeEventListener('keydown', onArrowRightKeyPress);
 
  lightboxEl.classList.remove('is-open');
  lightboxImageEl.scr = '';
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
};

function getElementIndex(element) {
  return Array.from(element.parentNode.children).indexOf(element);
}


function changeImage(index) {
  const galleryItemEl = document.querySelector('.gallery__item');
  let indexOfGalleryImage = getElementIndex(galleryItemEl);
  
  if (index === 0) {
    indexOfGalleryImage += index;
  }
  
  else if (index === -1) {

    indexOfGalleryImage -= index;
    
  } else if (index === galleryEl.length -1) {
   
    indexOfGalleryImage = index;
  }
  
  console.log(indexOfGalleryImage);
  
  const allImages = document.querySelectorAll('.gallery__image');
  console.log(allImages);
  
  
  const imgDataSource = allImages[indexOfGalleryImage].dataset.source;
  console.log(imgDataSource);
 
  lightboxImageEl.src = imgDataSource;
  console.log(lightboxImageEl.src);

};



function onArrowKeyPress(e) {
  
  if (e.code === 'ArrowLeft') {
    changeImage(-1); //left <- show Prev image
  } else if (e.code === 'ArrowRight') {// right -> show next image
    changeImage();
  }
}


