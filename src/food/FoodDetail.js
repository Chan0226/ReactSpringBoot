import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function FoodDetail(props) {
    const [data, setData] = useState('');
    const navi = useNavigate();

    const { num } = useParams();
    const url = localStorage.url;

    console.log("url=" + localStorage.url)

    // num에 해당하는 dto 가져오기
    const onSelectData = () => {
        let selectUrl = url + "/food/select?num=" + num;
        axios.get(selectUrl)
            .then(res => {
                // res.data 변수에는 스프링에서 반환한 dto가 들어있다.
                setData(res.data)
            })
    }

    // 처음 시작시 스프링으로부터 dto를 얻어야 하므로 useEffect에서 호출(처음부터 호출되도록)
    useEffect(() => {
        onSelectData();
        console.log(data);
    }, []);

    const imgarray = data.fphoto;
    const imgrendering = () => {
        const result = [];
        for (let i = 0; i < imgarray.length; i++) {
            result.push(<img alt='' src={`${url}/image/${data.fphoto.split(',')[i]}`}
                style={{ maxWidth: '300px' }} />)
        }
        return result;
    }

    return (
        <div>
            {/* <img alt='' src={`${url}/image/${data.fphoto.split(',')[0]}`}
                style={{ maxWidth: '300px' }} /> */}
            {imgrendering()}
            <br />
            <h2>제목 : {data.fname}</h2>
            <br />
            <button type='button' className='btn btn-outline-secondary btn'
                onClick={() => navi('/photo/list/1')}>목록#1</button>
            &nbsp;&nbsp;
            <button type='button' className='btn btn-outline-info btn'
                onClick={() => navi('/photo/list/2')}>목록#2</button>
            &nbsp;&nbsp;
            <button type='button' className='btn btn-outline-danger btn'
                onClick={() => navi(`/photo/update/${data.num}`)}>수정</button>
        </div>
    );
}

export default FoodDetail;