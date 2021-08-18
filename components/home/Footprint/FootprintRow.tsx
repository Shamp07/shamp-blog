import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';

import stores from '@stores';
import TextareaAutosize from 'react-textarea-autosize';
import FootprintMenu from './FootprintMenu';
import { Props } from './FootprintMenu/FootprintNormalMenu';

const FootprintRow = ({ data }: Props) => {
  const { homeStore } = stores();
  const { modifierFootprintId, footprintInfo, footprintHandleChange } = HomeStore;
  const { modifierFootprint } = footprintInfo;

  const {
    id, userName,
    content, time, modifiedTime,
  } = data;

  const isModify = modifierFootprintId === id;

  const modifyArea = useMemo(() => (
    isModify ? (
      <TextAreaWrapper>
        <Textarea
          minRows={2}
          maxRows={50}
          onChange={footprintHandleChange}
          name="modifierFootprint"
          value={modifierFootprint}
          placeholder="블로그에 관련된 건의사항이나 의견들을 자유롭게 작성해주세요!"
        />
      </TextAreaWrapper>
    ) : content
  ), [isModify, modifierFootprint, content]);

  return (
    <li>
      <FootprintWrapper>
        <FootprintWriter>
          <span>{userName}</span>
          <RightTime>{modifiedTime || time}</RightTime>
        </FootprintWriter>
        <FootprintContent>
          {modifyArea}
        </FootprintContent>
        <FootprintMenu data={data} />
      </FootprintWrapper>
    </li>
  );
};

const FootprintWrapper = styled.div`
  position: relative;
`;

const FootprintWriter = styled.div`
  line-height: 17px;
  font-weight: 700;
  color: #1e2022;
  display: flex;
  
  & > span {
    padding: 0 10px;
  }

  & > span:first-of-type {
    display: inline-block;
    color: #fff;
    background-color: #2d79c7;
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    padding: 4px 12px;
  }
  
  & > span:last-child {
    font-size: 14px;
    color: #7b858e;
    font-weight: normal;
  }
`;

const FootprintContent = styled.pre`
  margin-top: 8px;
  padding: 0 2px;
  line-height: 20px;
  font-size: 14px;
  color: #1e2022;
  white-space: pre-wrap;
  word-wrap: break-word;
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

const RightTime = styled.span`
  margin-left: auto;
`;

const TextAreaWrapper = styled.div`
  border: 1px solid #dddfe4;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  background-color: #fff;
`;

export default observer(FootprintRow);
