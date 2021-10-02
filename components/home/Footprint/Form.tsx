import React, { ChangeEvent, useCallback } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';
import TextareaAutosize from 'react-textarea-autosize';

import stores from '@stores';
import * as T from '@types';
import Button from '@atoms/Button';

interface Props {
  size: number;
}

const Form = ({ size }: Props) => {
  const { homeStore, utilStore } = stores();

  const form = useLocalObservable(() => ({
    values: {
      footprint: '',
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

  const onSubmit = useCallback(() => {
    if (!form.onValidate()) return;

    homeStore.addFootprint(form.values.footprint, size);
    form.values.footprint = '';
  }, [form.values.footprint, size]);

  return (
    <Root>
      <Wrapper>
        <Textarea
          rows={3}
          onChange={form.onChange}
          name="footprint"
          value={form.values.footprint}
          placeholder="블로그에 관련된 건의사항이나 의견들을 자유롭게 작성해주세요!"
        />
        <Footer>
          <span>
            <span>
              (
              {form.values.footprint.length}
              /1000)
            </span>
            <Button
              size={T.ButtonSize.SMALL}
              color="primary"
              variant="contained"
              onClick={onSubmit}
            >
              작성
            </Button>
          </span>
        </Footer>
      </Wrapper>
    </Root>
  );
};

const Root = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
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

export default observer(Form);
