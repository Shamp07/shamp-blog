import React, { FC } from 'react';
import styled from '@emotion/styled';
import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import FootprintMenu from './FootprintMenu';
import useStores from '../../../stores/useStores';

interface FootprintRowProp {
  data: FootprintRowInterface;
}

export interface FootprintRowInterface {
  id: number,
  userId: number,
  userName: string,
  content: string,
  time: string,
  modifiedTime: string,
}

const FootprintRow: FC<FootprintRowProp> = ({ data }: FootprintRowProp) => {
  const { HomeStore } = useStores();
  const {
    modifierFootprintId, modifierFootprintText,
    modifierFootprintHandleChange,
  } = HomeStore;

  const {
    id, userName,
    content, time, modifiedTime,
  } = data;

  return (
    <li>
      <FootprintWrapper>
        <FootprintWriter>
          <span>{userName}</span>
          <RightTime>{modifiedTime || time}</RightTime>
        </FootprintWriter>
        <FootprintContent>
          {modifierFootprintId === id ? (
            <CustomTextField
              type="text"
              multiline
              rows={3}
              onChange={modifierFootprintHandleChange}
              value={modifierFootprintText}
              placeholder="블로그에 관련된 건의사항이나 의견들을 자유롭게 작성해주세요!"
            />
          ) : content}
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

const RightTime = styled.span`
  float: right;
`;

export default observer(FootprintRow);
