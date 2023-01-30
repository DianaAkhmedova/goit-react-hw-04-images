import { Component } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from 'shared/services/components/Modal/Modal';

import { searchImg } from 'shared/services/gallery-api';

import styles from './app.module.css';

class App extends Component {
  state = {
    searchName: '',
    images: [],
    loading: false,
    error: '',
    page: 1,
    showModal: false,
    modalImg: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;
    if (prevState.searchName !== searchName || prevState.page !== page) {
      this.fetchGallery();
    }
  }

  async fetchGallery() {
    try {
      this.setState({ loading: true });
      const { searchName, page } = this.state;
      const { hits } = await searchImg(searchName, page);
      this.setState(({ images }) => ({ images: [...images, ...hits] }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleSearchFormSubmit = searchName => {
    this.setState({ searchName, images: [], page: 1 });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  showLargeImage = (largeImage, tags) => {
    this.setState({ showModal: true, modalImg: { largeImage, tags } });
  };

  closeModal = () => {
    this.setState({ showModal: false, modalImg: null });
  };

  render() {
    const { searchName, images, loading, error, showModal, modalImg } =
      this.state;
    const { handleSearchFormSubmit, loadMore, showLargeImage, closeModal } =
      this;

    return (
      <div className={styles.App}>
        <Searchbar handleSearchFormSubmit={handleSearchFormSubmit} />
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
  }
}

export default App;
