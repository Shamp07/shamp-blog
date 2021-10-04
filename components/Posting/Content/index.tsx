import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField } from '@material-ui/core';

import stores from '@stores';
import Editor from './Editor';

const Content = () => {
  const { postStore, sidebarStore } = stores();
  const { form, formHandleChange } = postStore;
  const { categories } = sidebarStore;

  const categoryList = useMemo(() => (
    categories.map((data: { name: string, path: string }) => (
      <MenuItem key={data.path} value={data.path}>
        {data.name}
      </MenuItem>
    ))
  ), []);

  return (
    <article>
      <TitleInput
        select
        label="카테고리"
        value={categoryList}
        onChange={formHandleChange}
        name="category"
        variant="outlined"
        size="small"
      >
        {categoryList}
      </TitleInput>
      <TitleInput
        name="tags"
        value={form.tags}
        onChange={formHandleChange}
        label="태그"
        variant="outlined"
        size="small"
        inputProps={{ maxLength: 33 }}
      />
      <TitleInput
        name="title"
        value={form.title}
        onChange={formHandleChange}
        label="제목"
        variant="outlined"
        size="small"
        inputProps={{ maxLength: 100 }}
      />
      <Editor />
    </article>
  );
};

const TitleInput = styled(TextField)`
  width: 100%;
  margin-bottom: 10px !important;
  border-radius: 10px;
`;

export default Content;
