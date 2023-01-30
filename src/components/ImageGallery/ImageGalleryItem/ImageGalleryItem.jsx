import PropTypes from 'prop-types';

import styles from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ src, largeImageURL, alt, showLargeImage }) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => showLargeImage(largeImageURL, alt)}
    >
      <img src={src} alt={alt} className={styles.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  showLargeImage: PropTypes.func.isRequired,
};
