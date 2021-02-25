import React from 'react';
import styled from '@emotion/styled';

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
        <ul>
        </ul>
      </div>
      <div>
        <h2>다룰 수 있는 기술스택 👨‍💻</h2>
        <ul>
        </ul>
      </div>
    </article>
  </Wrapper>
);

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.15);
  border-radius: 4px;
  
  & > h1 {
    padding: 20px;
    border-bottom: 1px solid #e6e6e6;
  }
  
  & h2 {
    margin-bottom: 10px;
  }
  
  & > article {
    padding: 20px;
    & > div {
      margin-bottom: 10px;
    }
  }
  
  & ul {
    margin-left: 20px;
  }

  & ul > li {
    line-height: 30px;
  }
  
  & ul > li:before {
    list-style: disc;
    display: inline-block;
    vertical-align: middle;
    padding: 0px 5px 15px 0px;
  }
`;

export default Profile;
