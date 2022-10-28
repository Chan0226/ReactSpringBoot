import React from 'react';
import { useNavigate } from 'react-router-dom';
import imgHome from '../image/tree4.gif'
function Home(props) {
    const navi = useNavigate();
    return (
        <div>
            <h2>홈페이지 방문을 환영합니다.</h2>
            <img alt='' src={imgHome} />
            <h4>useNavigate를 이용한 페이지 이동</h4>
            <button type='button' className='btn btn-outline-danger'
                onClick={() => navi("/photo/list/1")}>포토게시판#1</button>
            <br />
            <button type='button' className='btn btn-outline-danger'
                onClick={() => navi("/photo/list/2")}>포토게시판#2</button>
            <br />
            <button type='button' className='btn btn-outline-danger'
                onClick={() => navi("/food")}>Food게시판</button>
            <br />
            <button type='button' className='btn btn-outline-danger'
                onClick={() => navi("/about/Kakao")}>About이동</button>
            <br />
            <button type='button' className='btn btn-outline-danger'
                onClick={() => navi(-1)}>이전페이지</button>
        </div>
    );
}

export default Home;