import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import { Link } from 'react-router-dom'
import Loading from '../Components/Loading';
import axios from 'axios';

const Form = styled.div`
    width: 100%;
    height: 100vh;
    padding: 0px;
    background-color: #FFFF;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    position: relative;
`;

const Lci = styled.div`
    width: 70vw;
    height: 70vh;
    margin: 0 auto;
    background-color: #E8F9FD;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);

`;

const Loading_Box = styled.div`
    position: absolute;

    
`;

const Buttonmi = styled.button `
    height: 50px;
    width: 150px;
    padding: 10px;
    background-color: #E8F9FD;
    color: #0084FE;
    border: 1px solid;
    border-radius: 25px;
    border-color: Black;
    font-style: normal;
    font-weight: bolder;
    font-size: 20px;
    text-align: center;
    position: absolute;
    left: 73.2%;
    top: 66%;
`;


export default function Wait_Analysis() {

    const [loading, setLoading] = useState(true);
    const [video_num, setVido_num] = useState('');


    const mainApi = async () => {
        setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기

        axios.get('api/v1/interview/end')
        .then(response => {
            if(response.data.code === 200){
                console.log("성공");
                setVido_num(response.data);
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
    };

    useEffect(() => {
        mainApi();
    }, []);
    return(
        <Form>
            <Header_Aft/>
            <Lci>
                <Loading_Box>
                    {loading ? <Loading /> : null}
                </Loading_Box>
                <Link to ='/Analysis' state={{num : video_num}}>
                <Buttonmi >분석결과 보기</Buttonmi>
                </Link>
            </Lci>
        </Form>
        

    );
}