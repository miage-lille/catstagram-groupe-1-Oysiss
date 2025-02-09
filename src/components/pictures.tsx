import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { picturesSelector, selectedPictureSelector } from '../reducer';
import { Picture } from '../types/picture.type';
import ModalPortal from './modal';
import { isSome } from 'fp-ts/Option';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: cover;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;

const Pictures = () => {
  const dispatch = useDispatch();
  const pictures = useSelector(picturesSelector);
  const pictureSelected = useSelector(selectedPictureSelector);

  const handlePictureClick = (picture: Picture) => {
    console.log('handlePictureClick:', picture);
    dispatch({ type: 'SELECT_PICTURE', picture: picture });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return (
    <Container>
      {pictures.status === 'success' && pictures.data.map((picture: Picture, index: number) => (
      <Image 
        key={index} 
        src={picture.previewFormat} 
        alt={`cat-${index}`} 
        onClick={() => handlePictureClick(picture)} 
      />
      ))}
      {isSome(pictureSelected) && pictureSelected.value && (
      <ModalPortal 
        largeFormat={pictureSelected.value.largeFormat} 
        close={handleCloseModal} 
      />
      )}
    </Container>
  );
};

export default Pictures;