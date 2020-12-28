import React from 'react';
import { useRouter } from 'next/router';

const Board: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      {router.query.board}
      &nbsp;
      게시판입니다.
    </div>
  );
};

export default Board;
