import React from 'react';
import { useParams } from 'react-router-dom';
import img1 from '../image/santa.gif'

function Food(props) {
    // url에 food로만 호출된경우 food1, food2는 null값을 가진다.
    const { food1, food2 } = useParams();

    return (
        <div>
            <h3>Food 에 대한 DB 예제 예정</h3>
            <img alt='' src={img1}></img>
            <br />
            <h3>오늘의 식사 메뉴</h3>
            {
                food1 == null ? <h1>오늘 식사 안함</h1> :
                    <div>
                        <h1>식사중입니다.</h1>
                        <img alt='' src={require(`../image/${food1}.jpg`)} width='200' />
                        <img alt='' src={require(`../image/${food2}.jpg`)} width='200' />
                    </div>
            }
        </div>
    );
}

export default Food;