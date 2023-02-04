import { Img, Wrapper } from './ImageGalleryItem.styled';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';

export const ImageGalleryItem = ({
  item: { webformatURL, tags, largeImageURL },
}) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <Wrapper onClick={toggleModal}>
        <Img src={webformatURL} alt={tags} />
      </Wrapper>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="tag" />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
