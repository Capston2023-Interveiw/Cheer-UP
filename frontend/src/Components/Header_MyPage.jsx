import React from 'react';
import styled from 'styled-components';
import {MdLogout} from 'react-icons/md';
import {Link} from "react-router-dom";

const HeaderWrapper = styled.div`
  height: 3.5rem;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 4rem;
  border-bottom: solid 1px #828282;
  // position: fixed;
`;


const Title = styled.h1`
  font-style: normal;
  font-weight: bolder;
  font-size: 20pt;
  display: flex;
  align-items: center;
  color: #0084FE;
`;

const Nav = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const NavItem = styled.li`
  width: 6rem;
  height: 4rem;
  align-items: center;
  justify-content: center;
  display: flex;
  font-style: normal;
  font-weight: bold;
  font-size: 15pt;
  list-style: none;
  /*&:hover {
    cursor: pointer;
    background-color: black;
    border-top-left-radius: 30%;
    border-top-right-radius: 30%;
    color: white;
  }*/
`;

export default function Header_MyPage() {
  return (
    <HeaderWrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
            <Title>Cheer Up</Title>
        </Link>
      
      <Nav>
        <NavItem>내 프로필</NavItem>
        <NavItem>질문 추가</NavItem>
        <NavItem><MdLogout size='30'/></NavItem>
      </Nav>
    </HeaderWrapper>
  );
}