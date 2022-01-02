import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { useMutation } from 'react-query';
import styled from '@emotion/styled';
import axios from 'axios';

import dsPalette from '@constants/ds-palette';
import Viewer from '@atoms/Viewer';
import stores from '@stores';
import * as T from '@types';

const Article = () => {
  const router = useRouter();

  const { postStore, signStore, utilStore } = stores();
  const { article } = postStore;
  const { userData } = signStore;
  if (!article) return null;

  const {
    id, title, content, time, modifiedTime,
    tags,
  } = article;

  const mutation = useMutation(() => axios.delete('/api/post', { params: { id } }));

  useEffect(() => {
    if (mutation.isSuccess) router.push('/');
  }, [mutation.isSuccess]);

  const onModify = () => {
    router.push(`/write?id=${id}`);
  };

  const onDelete = () => {
    utilStore.openPopup({
      type: T.PopupType.CONFIRM,
      description: '정말로 글을 삭제하겠습니까?',
      callback: () => {
        mutation.mutate();
      },
    });
  };

  const options = userData?.adminFl ? (
    <OptionWrapper>
      <Option onClick={onModify}>수정</Option>
      <Option onClick={onDelete}>삭제</Option>
    </OptionWrapper>
  ) : null;

  return (
    <Root>
      <Container>
        <div>
          <Title>{title}</Title>
          <DetailWrapper>
            <span>{modifiedTime || time}</span>
            {options}
          </DetailWrapper>
          <TagWrapper>
            {tags.map((tag) => (
              <Link href="/" passHref key={tag}>
                <Tag>{tag}</Tag>
              </Link>
            ))}
          </TagWrapper>
        </div>
        <Content>
          <Viewer content={content} />
        </Content>
      </Container>
    </Root>
  );
};

const Root = styled.div({
  background: dsPalette.themeWhite.toString(),
  width: '100%',
  height: '100vh',
});

const Container = styled.article({
  padding: '5.5rem 0',
  width: '768px',
  marginLeft: 'auto',
  marginRight: 'auto',
});

const Title = styled.h1({
  fontSize: '3rem',
  lineHeight: 1.5,
  letterSpacing: '-0.004em',
  marginTop: 0,
  fontWeight: 800,
  marginBottom: '2rem',
  wordBreak: 'keep-all',
});

const DetailWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const OptionWrapper = styled.div({
  display: 'flex',
});

const Option = styled.button({
  fontSize: 'inherit',
  marginLeft: '.5rem',
  padding: 0,
  outline: 'none',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
  color: dsPalette.typeSecond.toString(),
  '&:hover': {
    color: dsPalette.typePrimary.toString(),
  },
});

const TagWrapper = styled.div({
  marginTop: '.875rem',
  marginBottom: '-.875rem',
  minHeight: '.875rem',
});

const Tag = styled.a({
  marginBottom: '.875rem',
  background: 'rgb(241, 243, 245)',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  height: '2rem',
  borderRadius: '1rem',
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: '.875rem',
  color: dsPalette.themePrimary.toString(),
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '1rem',
});

const Content = styled.div({
  marginTop: '5rem',
});

export default observer(Article);
