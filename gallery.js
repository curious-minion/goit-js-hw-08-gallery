import images from "/gallery-items.js";

const galleryEl = document.querySelector('.js-gallery');
const lightBoxEl = document.querySelector('.lightbox');
const closeLightboxEl = document.querySelector('[data-action="close--lightbox"]')
const galleryLinkEl = document.querySelector('.gallery__link');

galleryEl.insertAdjacentHTML('beforeend', createImagesList(images));

console.log(galleryEl);
galleryEl.addEventListener('click', onGalleryElClick);

function createImagesList(images){
  return images.map(({preview, original, description}) =>{
    return `
    <li class="gallery__item">
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



// const refs = {
//   openBigPicture: galleryLinkEl,
//   closeModalBtn: closeLightboxEl,
//   backdrop: lightBoxEl,
// };

// refs.openBigPicture.addEventListener('click', onOpenModal);
// refs.closeModalBtn.addEventListener('click', onCloseModal);
// refs.backdrop.addEventListener('click', onBackdropClick);

// function onOpenModal() {
//   window.addEventListener('keydown', onEscKeyPress);
//   document.body.classList.add('is-open');
// }

// function onCloseModal() {
//   window.removeEventListener('keydown', onEscKeyPress);
//   document.body.classList.remove('is-open');
// }

// function onBackdropClick(event) {
//   if (event.currentTarget === event.target) {
    
//     onCloseModal();
//   }
// }

// function onEscKeyPress(event) {
//   const ESC_KEY_CODE = 'Escape';
//   const isEscKey = event.code === ESC_KEY_CODE;

//   if (isEscKey) {
//     onCloseModal();
//   }
// }
