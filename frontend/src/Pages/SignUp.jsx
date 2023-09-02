import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';
import {darken} from 'polished';
import {AiFillCaretDown} from 'react-icons/ai';

const Form = styled.div`
  position: relative;
  width:90vw;
  height:99vh;
`;

const MainBox = styled.div`
  width: 65%;
  max-width: 800px;
  min-width: 480px;
  height: 100vh;
  max-height: 900px;
  min-height: 380px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0px;
  background-color: rgba( 232, 249, 253, 0.5 );
  border-radius: 7%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px grey;
`;

const H1 = styled.h1`

  height: 100px;
  font-size: 70px;
  font: bold;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 0px;
  margin-top: 2vh;
  color: #0084FE;
`;

const Sci = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
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



const Text = styled.input`

  width: 400px;
  height: 30px;
  padding: 10px;
  margin-bottom: 2vh;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 17px;
`;

const Text_age = styled.input`

  width: 300px;
  height: 30px;
  padding: 10px;
  margin-bottom: 2vh;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 17px;
`;


const Password = styled.input`
  width: 400px;
  height: 30px;
  padding: 10px;
  margin-bottom: 2vh;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 17px;
`;

const Buttonmi = styled.button `

  width: 250px;
  padding: 15px;
  margin-top: 2vh;
  background-color: #0084FE;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  font-size: 17px;
  font: bold;
  font-weight: bold;

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
  top: 38px;
  left: 4px;
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
  width: 70px;
  height: inherit;
  font-size: 1rem;
  background-color: #FFFF;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledSelectbox = styled.div`
  position: relative;
  margin-left: 11px;
  width: 65px;
  height: 30px;
  padding: 10px;
  border-radius: 15px;
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
  const list =['남자', '여자'];

  return(
    <Form>
      <MainBox>
        <H1>Sign Up</H1>
        <Sci>
          <Text placeholder="아이디를 입력해주세요" 
          type="text"/>
          <Text placeholder="이메일을 입력해주세요" 
          type="text"/>
          <Password placeholder="비밀번호를 입력해주세요" 
          type="password"/>
          <Password placeholder="비밀번호를 재입력해주세요" 
          type="password"/>
          <Text placeholder="이름을 입력해주세요" 
          type="text"/>
          <Sci_2>
            <Text_age placeholder="나이를 입력해주세요 예)2000/00/00" 
            type="text"/>
            
            <Dropdown list = {list}/>

          </Sci_2>
          <Buttonmi>완료</Buttonmi>
        </Sci>
      </MainBox>
    </Form>

  );
 
}