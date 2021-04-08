import React from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const Footer = () => (
  <Wrapper>
    <FileLink type="button">
      <FontAwesomeIcon icon={faLink} />
    </FileLink>
  </Wrapper>
);

const Wrapper = styled.footer`
  position: static;
  bottom: 0;
  right: 0;
  left: 0;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  z-index: 1;
  transform: translateZ(0px);
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  min-height: 54px;
  border-top: 1px solid rgb(228, 228, 229);
  background-color: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 5%) 0 2px 6px 0;
`;

const FileLink = styled.button`
  
`;

export default Footer;
