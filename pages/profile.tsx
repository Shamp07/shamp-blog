import React from 'react';
import styled from '@emotion/styled';

import { MediaQuery } from '@styles';
import * as T from '@types';

const Profile = () => (
  <Wrapper>
    <h1>Shamp Profile</h1>
    <article>
      <div>
        <h2>기본 정보 📋</h2>
        <ul>
          <li>이름: 배진영</li>
          <li>나이: 23</li>
          <li>생년월일: 1999.07.17</li>
          <li>이메일: blog.shamp@gmail.com</li>
          <li>포지션: 프론트엔드 및 백엔드 개발자(프론트엔드 지향)</li>
          <li>좋아하는 것: 고양이(랜선집사 7년 차) 😺, HipHop 🤘</li>
          <li>취미: 코딩 💻, 피아노 🎹, 게임 🎮</li>
        </ul>
      </div>
      <div>
        <h2>저는 이런 사람이에요! 👋</h2>
        <ul>
          <li>개발을 사랑하며 새로운 기술을 배우는 것을 좋아하는 사람</li>
          <li>여러 사람들과의 커뮤니케이션을 즐기며 활기찬 사람</li>
          <li>안주하지 않고 본인의 분야에서 최고가 되기위해 항상 나아가는 사람</li>
          <li>일상 속에 개발이 녹아있는 사람</li>
        </ul>
      </div>
      <div>
        <h2>지금까지 이와 같은 것들을 해왔어요! 🏆</h2>
        <h3>프로젝트</h3>
        <ul>
          <li>
            개인
            <ul>
              <li>
                shamp-blog
                (
                <a href="https://github.com/Shamp07/shamp-blog">https://github.com/Shamp07/shamp-blog</a>
                )
              </li>
            </ul>
          </li>
          <li>팀</li>
        </ul>
      </div>
      <div>
        <h2>다룰 수 있는 기술스택 👨‍💻</h2>
        <h3>공통</h3>
        <ul>
          <li>
            언어 및 기술
            <ul>
              <li>JavaScript (ES6+)</li>
              <li>TypeScript</li>
              <li>Java</li>
              <li>NodeJS</li>
              <li>Git</li>
              <li>ESLint (airbnb)</li>
              <li>Babel</li>
            </ul>
          </li>
        </ul>
        <h3>프론트 엔드</h3>
        <ul>
          <li>
            언어
            <ul>
              <li>HTML, CSS</li>
            </ul>
          </li>
          <li>
            라이브러리, 프레임워크
            <ul>
              <li>React</li>
              <li>MobX</li>
              <li>NextJS</li>
              <li>Webpack</li>
              <li>Emotion, styled-components</li>
              <li>JQuery</li>
            </ul>
          </li>
        </ul>
        <h3>백 엔드</h3>
        <ul>
          <li>
            라이브러리 및 프레임워크
            <ul>
              <li>Express</li>
              <li>Spring</li>
              <li>Spring Boot</li>
            </ul>
          </li>
          <li>
            RDBMS
            <ul>
              <li>Oracle</li>
              <li>MariaDB</li>
              <li>PostgreSQL</li>
            </ul>
          </li>
          <li>
            Server
            <ul>
              <li>AWS (EC2, RDS)</li>
              <li>Linux</li>
              <li>AIX</li>
            </ul>
          </li>
        </ul>
      </div>
    </article>
  </Wrapper>
);

const Wrapper = styled.div({
  backgroundColor: '#fff',
  boxShadow: '0 1px 3px 0 rgba(0,0,0,.15)',
  borderRadius: '14px',
  wordBreak: 'break-all',

  [MediaQuery[T.Device.LARGE]]: {
    borderRadius: 0,
  },

  '& > h1': {
    padding: '24px',
    borderBottom: '1px solid #e6e6e6',
  },

  '& h2, h3': {
    marginBottom: '10px',
  },

  '& > article': {
    padding: '24px',

    '& > div': {
      marginBottom: '10px',
    },

    '& div > ul > li': {
      lineHeight: '30px',
    },

    '& li': {
      listStyleType: 'disc',
    },

    '& li li': {
      listStyleType: 'circle',
    },
  },

  '& ul': {
    marginLeft: '30px',
  },
});

export default Profile;
