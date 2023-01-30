import { Component } from 'react';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

class Searchbar extends Component {
  state = {
    searchName: '',
  };

  handleNameChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    const { searchName } = this.state;
    const { handleSearchFormSubmit } = this.props;
    event.preventDefault();

    if (searchName.trim() === '') {
      return;
    }

    handleSearchFormSubmit(searchName);
    this.setState({ searchName: '' });
  };

  render() {
    const { searchName } = this.state;
    const { handleNameChange, handleSubmit } = this;

    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>Search</span>
            <SearchIcon />
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            name="searchName"
            value={searchName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleNameChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  handleSearchFormSubmit: PropTypes.func.isRequired,
};
