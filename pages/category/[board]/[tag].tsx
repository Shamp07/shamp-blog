import React from 'react';
import { useRouter } from 'next/router';
import BoardHead from './BoardHead';
import BoardContent from './BoardContent';

const BoardTag: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <BoardHead />
      <BoardContent />
    </div>
  );
};

export default BoardTag;
