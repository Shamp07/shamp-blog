import React, { FC } from 'react';
import styled from '@emotion/styled';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import useStores from '../../../stores/useStores';

const FootprintWrite = () => {
  const { HomeStore, SignStore } = useStores();
  const { footprintText, footprintHandleChange, addFootprint } = HomeStore;
  const { userData } = SignStore;
  const { id: userId } = userData;

  return (
    <FootprintWriteWrapper>
      <FootprintWriterInner>
        <CustomTextField
          type="text"
          multiline
          rows={3}
          onChange={footprintHandleChange}
          value={footprintText}
          placeholder="블로그에 관련된 건의사항이나 의견들을 자유롭게 작성해주세요!"
        />
        <FootprintWriteFooter>
          <FootprintWriteButton onClick={() => addFootprint(userId)}>
            작성
          </FootprintWriteButton>
          <span>
            (
            { footprintText.length }
            /1000)
          </span>
        </FootprintWriteFooter>
      </FootprintWriterInner>
    </FootprintWriteWrapper>
  );
};

const FootprintWriteWrapper = styled.div`
  position: relative;
  background-color: #f8f9fa;
`;

const FootprintWriterInner = styled.div`
  border: 1px solid #dddfe4;
`;

const FootprintWriteFooter = styled.div`
  height: 36px;
  background-color: #fff;
  
  & > span {
    display: inline-block;
    float: right;
    line-height: 36px;
    padding-right: 10px;
    font-size: 14px;
    color: #7b858e;
  }
`;

const FootprintWriteButton = styled.div`
  display: inline-block;
  background-color: #2d79c7;
  text-align: center;
  padding: 10px;
  width: 50px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  float: right;
  
  &:hover {
    background-color: #1e73c9;
  }
`;

const CustomTextField = styled(TextField)`
  display: block !important;
  background-color: #fff;
  
  & .MuiInputBase-multiline {
    display: block !important;
    width: 100%;
    padding-left:10px;
    padding-right: 10px;
    max-width: 100%;
  }
  
  & textarea {
    font-size: 14px;
  }
`;

export default observer(FootprintWrite);
