import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import { Home, About, Food, Photo } from './pages'  // pages 폴더명만 써도 그안의 index.js가 자동 import 된다.
import imgFail from './image/catmouse.gif';

function RouterMain(props) {
    return (
        <div>
            <Menu />
            <hr style={{ clear: 'both' }} />
            <Routes>
                {/* 특정 매핑일때 열결할 컴포넌트 */}
                <Route path='/' element={<Home />} />
                {/* <Route path='/about/:emp' element={<About />} /> */}

                <Route path={'/photo/list/:num'} element={<Photo />}>
                    {/* <Route path={':emp'} element={<Photo />} /> */}
                </Route>

                <Route path={'/about/'} element={<About />}>
                    <Route path={':emp'} element={<About />} />
                </Route>
                <Route path='/food' element={<Food />} />
                <Route path='/food/:food1/:food2' element={<Food />} />
                {/* 아래는 테스트후 주석처리 */}
                <Route path='/login/*' element={
                    <div>
                        <h2>로그인의 하위태그입니다.</h2>
                        <Menu />
                        <About />
                        <Food />
                    </div>
                } />
                {/* 그 이외의 매핑주소일경우 호출 */}
                <Route path='*' element={
                    <div>
                        <h2>잘못된 URL 주소입니다.</h2>
                        <img alt='' src={imgFail} />
                    </div>
                } />
            </Routes>
        </div>
    );
}

export default RouterMain;