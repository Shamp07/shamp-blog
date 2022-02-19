import { NextRequest, NextResponse } from 'next/server';

import { Page } from '@utilities/route';

const middleware = (req: NextRequest) => {
  return NextResponse.redirect(Page.HOME);
};

export default middleware;
