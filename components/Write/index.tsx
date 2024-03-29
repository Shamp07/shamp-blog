import React, {
  MouseEvent, ChangeEvent, KeyboardEvent, useEffect,
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { observer, useLocalObservable } from 'mobx-react-lite';
import styled from '@emotion/styled';
import axios from 'axios';

import * as T from '@types';
import dsPalette from '@constants/ds-palette';
import WriteSection from './WriteSection';
import ViewerSection from './ViewerSection';

interface Form {
  inputs: {
    title: string;
    tag: string;
    content: string | null;
  };
  tags: string[];
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  onChangeContent(value: string): void;
  onKeyPress(event: KeyboardEvent<HTMLInputElement>): void;
  onDelete(event: MouseEvent<HTMLElement>): void;
  onLoadEditPost(article: T.EditArticle): void;
}

const Write = () => {
  const router = useRouter();

  const form = useLocalObservable<Form>(() => ({
    inputs: {
      title: '',
      tag: '',
      content: null,
    },
    tags: [],
    onChange(event) {
      this.inputs = {
        ...this.inputs,
        [event.target.name]: event.target.value,
      };
    },
    onChangeContent(value) {
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
      if (idx > -1) this.tags.splice(idx, 1);
    },
    onLoadEditPost(article) {
      const { title, content, tags } = article;
      form.inputs = {
        title,
        content,
        tag: '',
      };
      form.tags = tags;
    },
  }));

  const getEditPost = async () => {
    const { data } = await axios.get('/api/post/edit', { params: { id: router.query.id } });
    return data;
  };

  const getMutation = useMutation<T.Response<T.EditArticle>, Error, void>(getEditPost);

  useEffect(() => {
    if (router.query.id) getMutation.mutate();
  }, []);

  useEffect(() => {
    if (getMutation.isSuccess && getMutation.data.result) {
      form.onLoadEditPost(getMutation.data.result);
    } else if (!router.query.id) {
      form.onChangeContent('');
    }
  }, [getMutation.isSuccess]);

  return (
    <Root>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </Head>
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
