import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

import useStores from '@stores/useStores';
import * as T from '@types';
import Button from '@atoms/Button';

const FootprintWrite = () => {
  const { HomeStore } = useStores();
  const { footprintInfo, footprintHandleChange, addFootprint } = HomeStore;
  const { footprint } = footprintInfo;

  return (
    <FootprintWriteWrapper>
      <TextareaWrapper>
        <Textarea
          type="text"
          multiline
          rows={3}
          onChange={footprintHandleChange}
          name="footprint"
          value={footprint}
          placeholder="블로그에 관련된 건의사항이나 의견들을 자유롭게 작성해주세요!"
        />
        <Footer>
          <span>
            <span>
              (
              {footprint.length}
              /1000)
            </span>
            <Button
              size={T.ButtonSize.SMALL}
              color="primary"
              variant="contained"
              onClick={addFootprint}
            >
              작성
            </Button>
          </span>
        </Footer>
      </TextareaWrapper>
    </FootprintWriteWrapper>
  );
};

const FootprintWriteWrapper = styled.div`
  position: relative;
`;

const Footer = styled.div`
  height: 36px;
  display: flex;
  margin-top: 12px;
  
  & > span {
    margin-left: auto;  
  }
  
  & > span > span {
    display: inline-block;
    line-height: 36px;
    padding-right: 10px;
    font-size: 14px;
    color: #7b858e;
  }
`;

const TextareaWrapper = styled.div`
  border: 1px solid #dddfe4;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  background-color: #fff;
`;

const Textarea = styled(TextareaAutosize)`
  display: block !important;
  width: 100%;
  resize: none;
  max-width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-family: inherit;
  border: 0;
  outline: 0;
`;

export default observer(FootprintWrite);
