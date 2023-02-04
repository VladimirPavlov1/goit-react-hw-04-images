import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Container } from './App.styled';
import { Button } from './Button/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchName === '') {
      return;
    }
    setIsLoading(true);

    axios({
      url: `https://pixabay.com/api/?`,
      params: {
        q: searchName,
        page: page,
        key: '31785434-56897078df27680e7b71d8ebf',
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    })
      .then(response => {
        return response.data;
      })
      .then(({ hits, totalHits }) => {
        if (hits.length > 0) {
          setItems(prevItems => [...prevItems, ...hits]);
          setTotalHits(totalHits);

          return;
        }
        toast('За вашим запитом нічого не знайдено', { autoClose: 3000 });
      })
      .catch(({ message }) => {
        message = toast('Щось пішло не так, спробуйте ще раз');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchName, page]);

  const handleSubmit = searchName => {
    setSearchName(searchName);
    setPage(1);
    setItems([]);
  };

  const handleClick = () => {
    setPage(page => page + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery items={items} />

      {items.length > 0 && items.length < totalHits && (
        <Button onClick={handleClick} />
      )}

      <ToastContainer />
    </Container>
  );
};
