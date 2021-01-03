import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const BoardContent: React.FC = () => (
  <ArticleWrapper>
    <Article>
      <Vote>
        <div>
          <ThumbsUp icon={faThumbsUp} />
        </div>
        <div>0</div>
      </Vote>
      <ArticleContent>
        <PostTitle>
          으 장염걸림
        </PostTitle>
        <PostInfo>
          <PostInfoUl>
            <li>
              <span>
                자유
              </span>
            </li>
            <li>
              <span>33초 전</span>
            </li>
            <li>
              <span>Shamp</span>
            </li>
          </PostInfoUl>
        </PostInfo>
      </ArticleContent>
    </Article>
    <Article />
    <Article />
    <Article />
  </ArticleWrapper>
);

const ArticleWrapper = styled.section`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
`;

const Article = styled.article`
  position: relative;
  display: table;
  table-layout: fixed;
  width: 100%;
  min-height: 78px;
  box-sizing: border-box;
  border-top: 1px solid #ebeef1;
  background-color: #fff;
  padding: 8px 0;
`;

const Vote = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  color: #7b858e;
  width: 72px;
  @media (max-width: 1064px) {
    width: 48px;
  }
    
  & > div:last-child {
    margin-top: 5px;
    line-height: 17px;
    font-size: 14px;
    color: #7b858e;
  }
`;

const ArticleContent = styled.div`
  vertical-align: middle;
  display: table-cell;
`;

const PostTitle = styled.div`

`;

const PostInfo = styled.div`

`;

const PostInfoUl = styled.ul`
  list-style: none;
  margin-top: 5px;
  
  & > li { 
    display: inline-block;
    color: #98a0a7;
    padding: 0 8px;
    border-left: 1px solid #e6e6e6;
    font-size: 14px;
    
    &:first-child {
      border: none;
      padding-left: 0;
    }
  }
`;

const ThumbsUp = styled(FontAwesomeIcon)`
  height: 16px;
`;

export default BoardContent;
