import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import { Link } from 'react-router-dom'
import Loading from '../Components/Loading';

const Form = styled.div`
    width: 100%;
    height: 100vh;
    padding: 0px;
    background-color: #FFFF;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    position: relative;
`;

const Lci = styled.div`
    width: 1400px;
    height: 800px;
    margin: 0 auto;
    background-color: #E8F9FD;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

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

    const mainApi = async () => {
        setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
        try {
        const response = await fetch(`api url`, {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(),
        });

        const result = await response.json();
        console.log('mainData', result);
        setLoading(false); // api 호출 완료 됐을 때 false로 변경하려 로딩화면 숨김처리
        } catch (error) {
        window.alert(error);
        }
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
                
                 
                <Link to ='/Analysis'>
                <Buttonmi >분석결과 보기</Buttonmi>
                </Link>
                
                
            </Lci>
        </Form>
        

    );
}