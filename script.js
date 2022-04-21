const count = 30;
const apiKey = 'mEh7V7qJ30Myp312mwm0FTjzyQvQzPamqZiee-VkEhE';
const apiUrl = `https://api.unsplash.com/photos/random/?content_filter=high&count=${count}&client_id=${apiKey}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photosArray = [];

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function getDescription(photo) {
  return `title = ${photo.alt_description}
aperture = ${photo.exif.aperture}
exposure time = ${photo.exif.exposure_time}
focal length = ${photo.exif.focal_length}
iso = ${photo.exif.iso}
make = ${photo.exif.make}
model = ${photo.exif.model}`;
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      title: getDescription(photo),
      alt: photo.alt_description,
    });

    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function fetchPhotos() {
  photosArray = [];
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch {
    console.log('something went wrong getting photos');
  }
}

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    fetchPhotos();
  }
});

fetchPhotos();
