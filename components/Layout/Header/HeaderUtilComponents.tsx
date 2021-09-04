import React from 'react';
import NextNprogress from 'nextjs-progressbar';

import dsPalette from '@constants/ds-palette';
import SelectPopup from './SelectPopup';

const options = {
  showSpinner: false,
};

const HeaderUtilComponents = () => (
  <>
    <SelectPopup />
    <NextNprogress
      color={dsPalette.typeWhite.toString()}
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      options={options}
    />
  </>
);

export default HeaderUtilComponents;
