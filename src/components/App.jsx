import { useState, useEffect } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from 'shared/components/Loader/Loader';
import Modal from 'shared/components/Modal/Modal';

import { searchImg } from 'shared/services/gallery-api';

import styles from './app.module.css';

const App = () => {
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImg, setModalImg] = useState(null);

  useEffect(() => {
    if (!searchName) {
      return;
    }
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const { hits } = await searchImg(searchName, page);
        setImages(prevImages => [...prevImages, ...hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [searchName, page]);

  const handleSearchFormSubmit = searchName => {
    setSearchName(searchName);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showLargeImage = (largeImage, tags) => {
    setShowModal(true);
    setModalImg({ largeImage, tags });
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImg(null);
  };

  return (
    <div className={styles.App}>
      <Searchbar handleSearchFormSubmit={handleSearchFormSubmit} />
      {!Boolean(images.length) && loading && <Loader />}

      {Boolean(images.length) && (
        <ImageGallery
          searchName={searchName}
          images={images}
          error={error}
          loading={loading}
          loadMore={loadMore}
          showLargeImage={showLargeImage}
        />
      )}
      {showModal && (
        <Modal close={closeModal}>
          <img
            src={modalImg.largeImage}
            alt={modalImg.tags}
            width="800"
            height="600"
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
