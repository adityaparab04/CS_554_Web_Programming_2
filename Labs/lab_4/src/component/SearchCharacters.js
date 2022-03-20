import React from "react";
import '../App.css'

const SearchCharacters = (props) => {
    const handleChange = (e) => {
        props.searchValue(e.target.value);
    };
    return(
        <form
      method='POST '
      onSubmit={(e) => {
        e.preventDefault();
      }}
      name='formName'
      className='center'
    >
      <label>
        <input
          autoComplete='off'
          type='text'
          name='searchTerm'
          onChange={handleChange}
          placeholder='Search a Character'
        />
      </label>
    </form>
    )
}

export default SearchCharacters;