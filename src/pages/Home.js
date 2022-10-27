import React from 'react';
import imgHome from '../image/tree4.gif'
function Home(props) {
    return (
        <div>
            <h2>홈페이지 방문을 환영합니다.</h2>
            <img alt='' src={imgHome} />
        </div>
    );
}

export default Home;