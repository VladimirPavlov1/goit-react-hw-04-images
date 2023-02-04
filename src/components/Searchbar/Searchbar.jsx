import { useState } from 'react';
import {
  Form,
  Header,
  SearchBtn,
  Label,
  Input,
  SearchIcon,
} from './Searchbar.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = e => {
    setSearchName(e.currentTarget.value.toLocaleLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      toast.warn('Введіть ваш запит', {});

      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <SearchIcon /> <Label></Label>
        </SearchBtn>
        <ToastContainer />

        <Input
          onChange={handleChange}
          type="text"
          autocomplete="off"
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
