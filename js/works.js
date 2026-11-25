document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const images = [...carousel.querySelectorAll('.carousel-image')];
  const prevButton = carousel.querySelector('.prev');
  const nextButton = carousel.querySelector('.next');
  const dotsWrap = carousel.querySelector('.carousel-dots');
  let currentIndex = 0;

  const dots = images.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `${index + 1}枚目を表示`);
    dot.addEventListener('click', () => showImage(index));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    images.forEach((image, i) => image.classList.toggle('is-active', i === currentIndex));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentIndex));
  }

  prevButton.addEventListener('click', () => showImage(currentIndex - 1));
  nextButton.addEventListener('click', () => showImage(currentIndex + 1));
  showImage(0);
});

const lightbox = document.getElementById('lightbox');
const lightboxImage = lightbox.querySelector('.lightbox-image');
const closeButton = lightbox.querySelector('.lightbox-close');

function openLightbox(image) {
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.zoomable').forEach((image) => {
  image.addEventListener('click', () => openLightbox(image));
});

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) closeLightbox();
});
