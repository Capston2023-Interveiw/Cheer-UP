import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import { Link } from 'react-router-dom';
import Img from '../image/Wait_Background.svg';
import Loading from '../Components/Loading';
import axios from 'axios';

const Form = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
`;

const DetailBox = styled.div`

  width: 100%;
  height: 95%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  //border: 1px solid;
  
`;

const Image = styled.img`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%; 
    left:50%;
    transform: translate(-50%, -50%);
`;



const Loading_Box = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
        
`;

const Buttonmi = styled.button `
    height: 70px;
    width: 180px;
    padding: 10px;
    background-color: #E8F9FD;
    color: #0084FE;
    border: 1px solid;
    border-radius: 25px;
    border-color: Black;
    font-style: normal;
    font-weight: bolder;
    font-size: 25px;
    text-align: center;
    cursor: pointer;   
`;



export default function Wait_Analysis() {

    const [loading, setLoading] = useState(false);
    const [video_num, setVido_num] = useState();


    // const mainApi = async () => {
    //     setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
    //     //setLoading(false);
    //     axios.get('api/v1/interview/end')
    //     .then(response => {
    //         if(response.status === 200){
    //             console.log("성공");
    //             setVido_num(response.data.video_id);
    //             window.alert('분석 완료!');
    //             setLoading(false);  // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
    //         }
    //         else{
    //             console.log("실패");
    //         }
    //     })
    //     .catch(error => {

    //         console.error('Error:', error);
    //         console.log("실패 2");
    //     });
    // };

    useEffect(() => {
        setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
        //setLoading(false);
        axios.get('http://localhost:8888/interview/end')
        .then(response => {
            if(response.status === 200){
                console.log("성공");
                setVido_num(response.data.video_id);
                window.alert('분석 완료!');
                setLoading(false);  // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
            }
            else{
                console.log("실패");
            }
        })
        .catch(error => {

            console.error('Error:', error);
            console.log("실패 2");
        });
    }, []);
    return(
        <Form>
            <Header_Aft/>
            <DetailBox>
                <Image  src ={Img} />
                <Loading_Box>
                        {loading ? <Loading /> :                 
                            <Link to ='/Analysis' state={{num : video_num}}>
                                <Buttonmi >분석결과 보기</Buttonmi>
                            </Link>}
                </Loading_Box>
            </DetailBox>
        </Form>
        

    );
}

