import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import { Home, About, Food } from './pages'  // pages 폴더명만 써도 그안의 index.js가 자동 import 된다.
import imgFail from './image/catmouse.gif';
import MyPhotoList from './myphoto/MyPhotoList'
import MyPhotoWriteForm from './myphoto/MyPhotoWriteForm'
import MyPhotoDetail from './myphoto/MyPhotoDetail'
import MyPhotoUpdateForm from './myphoto/MyPhotoUpdateForm'
import FoodDetail from './food/FoodDetail';
import FoodForm from './food/FoodForm';
import FoodList from './food/FoodList';

function RouterMain(props) {
    return (
        <div>
            <Menu />
            <hr style={{ clear: 'both' }} />
            <Routes>
                {/* 특정 매핑일때 열결할 컴포넌트 */}
                <Route path='/' element={<Home />} />
                {/* <Route path='/about/:emp' element={<About />} /> */}

                {/* <Route path={'/photo/list/:num'} element={<MyPhotoList />} />
                <Route path='/photo/write' element={<MyPhotoWriteForm />} />
                <Route path='/photo/detail/:num' element={<MyPhotoDetail />} /> */}

                <Route path={'/photo/'}>
                    <Route path={'list/:num'} element={<MyPhotoList />} />
                    <Route path={'write'} element={<MyPhotoWriteForm />} />
                    <Route path={'update/:num'} element={<MyPhotoUpdateForm />} />
                    <Route path={'detail/:num'} element={<MyPhotoDetail />} />
                </Route>

                {/* Food 매핑 등록 */}
                <Route path={'/food/'}>
                    <Route path={'list/:num'} element={<FoodList />} />
                    <Route path={'addform'} element={<FoodForm />} />
                    <Route path={'detail/:num'} element={<FoodDetail />} />
                </Route>



                <Route path={'/about/'} element={<About />}>
                    <Route path={':emp'} element={<About />} />
                </Route>
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