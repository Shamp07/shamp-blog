import React, { useMemo, useCallback, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import styled from '@emotion/styled';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';

import stores from '@stores';
import Editor from './Editor';

const Content = () => {
  const { postStore, sidebarStore } = stores();
  const { form } = postStore;
  const { categories } = sidebarStore;

  const categoryList = useMemo(() => (
    categories.map((data: { name: string, path: string }) => (
      <MenuItem key={data.path} value={data.path}>
        {data.name}
      </MenuItem>
    ))
  ), []);

  const onChange = useCallback(
    (event: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      postStore.formHandleChange(event);
    },
    [],
  );

  return (
    <article>
      <TitleInput
        select
        label="카테고리"
        value={form.category}
        onChange={onChange}
        name="category"
        variant="outlined"
        size="small"
      >
        {categoryList}
      </TitleInput>
      <TitleInput
        name="tags"
        value={form.tags}
        onChange={onChange}
        label="태그"
        variant="outlined"
        size="small"
        inputProps={{ maxLength: 33 }}
      />
      <TitleInput
        name="title"
        value={form.title}
        onChange={onChange}
        label="제목"
        variant="outlined"
        size="small"
        inputProps={{ maxLength: 100 }}
      />
      <Editor onChange={onChange} />
    </article>
  );
};

const TitleInput = styled(TextField)`
  width: 100%;
  margin-bottom: 15px !important;
  border-radius: 10px;
`;

export default observer(Content);
