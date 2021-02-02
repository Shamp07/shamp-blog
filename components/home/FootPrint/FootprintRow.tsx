import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';
import FootprintMenu from './FoontprintMenu';
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
  isTag: boolean,
}

const FootprintRow: React.FC<FootprintRowProp> = ({ data }: FootprintRowProp) => {
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
          <span>{modifiedTime || time}</span>
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

  & > span:first-child {
    padding-left: 0;
  }
  
  & > span:last-child {
    font-size: 14px;
    color: #7b858e;
    font-weight: normal;
    border-left: 1px solid #e6e6e6;
  }
`;

const FootprintContent = styled.pre`
  margin-top: 8px;
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

export default FootprintRow;
