import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import PropTypes from 'prop-types';

import styles from './searchbar.module.css';

const Searchbar = ({ handleSearchFormSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleNameChange = ({ currentTarget: { value } }) => {
    setSearchName(value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      return;
    }

    handleSearchFormSubmit(searchName);
    setSearchName('');
  };

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
};

export default Searchbar;

Searchbar.propTypes = {
  handleSearchFormSubmit: PropTypes.func.isRequired,
};
