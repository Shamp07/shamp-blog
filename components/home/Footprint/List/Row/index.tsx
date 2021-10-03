import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import TextareaAutosize from 'react-textarea-autosize';
import styled from '@emotion/styled';

import stores from '@stores';
import * as T from '@types';
import Menu from './Menu';

interface Props {
  data: T.FootPrint;
  size: number;
  modifyId: T.FootPrint['id'];
  setModifyId(id: T.FootPrint['id']): void;
}

const Row = ({
  data, size, modifyId, setModifyId,
}: Props) => {
  const { homeStore, utilStore } = stores();

  const form = useLocalObservable(() => ({
    values: {
      footprint: '',
    },
    setFootprint(value: string) {
      this.values.footprint = value;
    },
    onChange(event: ChangeEvent<HTMLTextAreaElement>) {
      if (event.target.value.length > 1000) return;
      this.values = {
        ...this.values,
        [event.target.name]: event.target.value,
      };
    },
    onValidate() {
      if (!this.values.footprint.trim()) {
        utilStore.openPopup(T.Popup.ALERT, '발자취 내용을 입력해주세요!');
        return false;
      }

      return true;
    },
  }));

  const {
    id, userName,
    content, time, modifiedTime,
  } = data;

  const isModify = modifyId === id;

  const onModify = useCallback(() => {
    if (!form.onValidate()) return;

    homeStore.modifyFootprint(id, form.values.footprint, size);
    setModifyId(0);
  }, [form.values.footprint, size]);

  const contentSection = useMemo(() => (
    isModify ? (
      <TextAreaWrapper>
        <Textarea
          minRows={2}
          maxRows={50}
          onChange={form.onChange}
          name="footprint"
          value={form.values.footprint}
          placeholder="블로그에 관련된 건의사항이나 의견들을 자유롭게 작성해주세요!"
        />
      </TextAreaWrapper>
    ) : content
  ), [isModify, form.values.footprint, content]);

  return (
    <li>
      <Inner>
        <Writer>
          <span>{userName}</span>
          <Time>{modifiedTime || time}</Time>
        </Writer>
        <Content>
          {contentSection}
        </Content>
        <Menu
          data={data}
          modifyId={modifyId}
          size={size}
          setModifyId={setModifyId}
          setFootprint={form.setFootprint}
          onModify={onModify}
        />
      </Inner>
    </li>
  );
};

const Inner = styled.div`
  position: relative;
`;

const Writer = styled.div`
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

const Content = styled.pre`
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

const Time = styled.span`
  margin-left: auto;
`;

const TextAreaWrapper = styled.div`
  border: 1px solid #dddfe4;
  border-radius: 10px;
  overflow: hidden;
  padding: 20px;
  background-color: #fff;
`;

export default observer(Row);
