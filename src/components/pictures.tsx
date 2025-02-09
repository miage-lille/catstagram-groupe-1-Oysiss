import React from 'react';
import styled from 'styled-components';
import { picturesSelector } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { Picture } from '../types/picture.type';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {
  const dispatch = useDispatch();
  const counter = useSelector(picturesSelector);
  
  return (
    <Container>
      {counter.map((picture: Picture, index: number) => (
      <Image key={index} src={picture.previewFormat} alt={`cat-${index}`} />
      ))}
    </Container>
  );


};

export default Pictures;
