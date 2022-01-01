import React, {
  MouseEvent, ChangeEvent, KeyboardEvent, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';
import axios from 'axios';

import dsPalette from '@constants/ds-palette';
import * as T from '@types';
import WriteSection from './WriteSection';
import ViewerSection from './ViewerSection';

interface Form {
  inputs: {
    title: string;
    tag: string;
    content: string;
  };
  tags: string[];
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onChangeContent(value: string): void;
  onKeyPress(event: KeyboardEvent<HTMLInputElement>): void;
  onDelete(event: MouseEvent<HTMLElement>): void;
}

const Write = () => {
  const router = useRouter();

  const form = useLocalObservable<Form>(() => ({
    inputs: {
      title: '',
      tag: '',
      content: '',
    },
    tags: [],
    onChange(event) {
      this.inputs = {
        ...this.inputs,
        [event.target.name]: event.target.value,
      };
    },
    onChangeContent(value: string) {
      this.inputs.content = value;
    },
    onKeyPress(event) {
      const { tags, inputs: { tag } } = this;
      if (event.key === 'Enter' && tag) {
        if (!tags.includes(this.inputs.tag)) tags.push(tag);
        this.inputs.tag = '';
      }
    },
    onDelete(event) {
      const idx = this.tags.indexOf(event.currentTarget.innerText);
      if (idx > -1) {
        this.tags.splice(idx, 1);
      }
    },
  }));

  const getPost = async () => {
    const { data } = await axios.get('/api/post', { params: { id: router.query.id } });
    return data;
  };

  const mutation = useMutation<T.Response, Error, void>(getPost);

  useEffect(() => {
    if (router.query.id) mutation.mutate();
  }, []);

  useEffect(() => {
    if (mutation.isSuccess && mutation.data.result) {
      const { title, tags, content } = mutation.data.result;
      setTimeout(() => {
        form.inputs = {
          title,
          content,
          tag: '',
        };
        form.tags = tags;
      }, 1000);
    }
  }, [mutation.isSuccess]);

  return (
    <Root>
      <WriteSection
        title={form.inputs.title}
        tag={form.inputs.tag}
        tags={form.tags}
        content={form.inputs.content}
        onChange={form.onChange}
        onChangeContent={form.onChangeContent}
        onKeyPress={form.onKeyPress}
        onDelete={form.onDelete}
      />
      <ViewerSection
        title={form.inputs.title}
        content={form.inputs.content}
      />
    </Root>
  );
};

const Root = styled.div({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  background: dsPalette.themeWhite.toString(),
});

export default observer(Write);
