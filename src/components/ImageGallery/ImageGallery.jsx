import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from 'components/ImageGallery/Loader/Loader';

const ImageGallery = () => {
  return (
    <>
      <ul class="gallery">
        <ImageGalleryItem />
      </ul>
      <Loader />
    </>
  );
};

export default ImageGallery;
