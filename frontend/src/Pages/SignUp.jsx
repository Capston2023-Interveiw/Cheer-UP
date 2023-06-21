import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {darken} from 'polished';
import {AiFillCaretDown} from 'react-icons/ai';
<<<<<<< HEAD
=======

>>>>>>> #57

const Form = styled.div`
  width: 65%;
  height: 100vh;
  padding: 0px;
  margin: 0 auto; 
  background-color: #E8F9FD;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const H1 = styled.h1`
  height: 100px;
  font-size: 50px;
  font: bold;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 0px;
  margin-top: 0px;
  color: #0084FE;
`;

const Sci = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Sci_2 = styled.div`
  display: flex;
  //margin-left: 75px;
  align-items: flex-start;
`;

<<<<<<< HEAD
const Text = styled.input.attrs(()=>({
  type: "text"
}))`
=======
const Text = styled.input`
>>>>>>> #57
  width: 300px;
  height: 20px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
`;

<<<<<<< HEAD
const Text_age = styled.input.attrs(()=>({
  type: "text"
}))`
=======
const Text_age = styled.input`
>>>>>>> #57
  width: 200px;
  height: 20px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
`;

<<<<<<< HEAD
const Password = styled.input.attrs(()=>({
  type: "password"
}))`
=======
const Password = styled.input`
>>>>>>> #57
  width: 300px;
  height: 20px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
`;

const Buttonmi = styled.button `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  background-color: #0084FE;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  font: bold;
`;

const StyledOptionItem = styled.li`
  display: flex; 
  align-items: center;
  border: none;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.8rem 1rem 0.8rem 1rem;
  transition: 0.3s;
  &:hover {
    background: ${darken(0.1, '#ffffff')};
  }
`;

const activeExist = ({ active = true }) => {
  return `max-height: ${active ? '300px' : '0'}`;
};

const StyledOptionList = styled.ul`
  box-sizing: border-box;
  position: absolute; 
  top: 28px;
  list-style-type: none;
  width: 100%;
  background: #ffffff;
  padding:0px;
  ${activeExist}; 
  transition: 0.2s ease-in-out;
  overflow-y: scroll;
  &::-webkit-scrollbar {

    width: 100%; 
  }
  &::-webkit-scrollbar-track {

    background: transparent;
  }
  &::-webkit-scrollbar-thumb { 
  	
    border-radius: 1rem;
    background: ${darken(0.1, 'transparent')};
  }
  &::-webkit-scrollbar-button { 
  	
    width: 0;
    height: 0;
  }
`;

const StyledSelectedLabel = styled.button`
  display: flex; 
  align-items: center;
  border: none;
  justify-content: center;
  box-sizing: border-box; 
  width: inherit;
  height: inherit;
  font-size: 1rem;
  background-color: #FFFF;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledSelectbox = styled.div`
  position: relative;
  margin-left: 18px;
  width: 82px;
  height: 42px;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  border: 1px solid #ccc;
`;

const Dropdown = ({ list }) => {
  const [acitve, setActive] = useState(false); // 리스트가 열려있는지 확인
  const [selected, setSelected] = useState(list[0]); // 선택된 값을 selected에 담아 컴포넌트 간에 공유
  return (
    <StyledSelectbox> 
      <StyledSelectedLabel value={selected} onClick={() => setActive(!acitve)}>
        {selected} <AiFillCaretDown size = '25' />
      </StyledSelectedLabel>
      <StyledOptionList active={acitve}> 
        {list
          
          .map(element => (
            <StyledOptionItem 
              key={element} // map을 쓰기 위해서는 해당 방식으로 key가 주어져야함.
              onClick={() => { // 클릭되면 active를 끄고 element로 선택된 값을 변경함.
                setActive(false);
                setSelected(element);
              }}
            > 
              {element}
            </StyledOptionItem>
          ))}
      </StyledOptionList>
    </StyledSelectbox>
  );
};

export default function SignUp(){
  const list =['남성', '여성'];

  return(
    <Form>
      <H1></H1>
      <H1>Cheer Up</H1>

      <Sci>
        <Text placeholder="아이디를 입력해주세요" 
        type="text"/>
        <Password placeholder="비밀번호를 입력해주세요" 
        type="password"/>
        <Password placeholder="비밀번호를 재입력해주세요" 
        type="password"/>
        <Text placeholder="이름을 입력해주세요" 
        type="text"/>
        <Sci_2>
          <Text_age placeholder="나이를 입력해주세요" 
          type="text"/>
          
          <Dropdown list = {list}/>

        </Sci_2>
        <Buttonmi>완료</Buttonmi>
      </Sci>
      
    </Form>

  );
 
}