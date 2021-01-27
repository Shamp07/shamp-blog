import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/Link';

interface PaginationItemProp {
  page: number;
}

const BoardPaginationItem: React.FC<PaginationItemProp> = (props: PaginationItemProp) => {
  const { page } = props;
  const router = useRouter();

  let currentPage: string = '0';
  if (router.query.page) {
    currentPage = router.query.page as string;
  }

  let text: string = String(page);
  console.log(`Number(page): ${Number(page)}, Number(currentPage): ${Number(currentPage)}`);
  if (Number(page) === Number(currentPage)) {
    text = '<';
  } else if (Number(page) === Number(currentPage)) {
    text = '>';
  }

  console.log(router);
  return (
    <Link
      href={{
        pathname: `${router.asPath}`,
        query: { page },
      }}
    >
      <span>{text}</span>
    </Link>
  );
};

export default BoardPaginationItem;
