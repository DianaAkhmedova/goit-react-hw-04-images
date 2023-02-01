import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Button from './Button/Button';
import Loader from 'shared/components/Loader/Loader';

import styles from './imageGallery.module.css';

const ImageGallery = ({ images, error, loading, loadMore, showLargeImage }) => {
  const galleryItem = images.map(
    ({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        alt={tags}
        largeImageURL={largeImageURL}
        showLargeImage={showLargeImage}
      />
    )
  );

  return (
    <>
      {error && <p>{error}</p>}
      <ul className={styles.ImageGallery}>{galleryItem}</ul>
      {loading && <Loader />}
      {!loading && Boolean(images.length) && <Button loadMore={loadMore} />}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  error: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
  showLargeImage: PropTypes.func.isRequired,
};
