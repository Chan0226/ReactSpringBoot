import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImageList } from '@material-ui/core';
import ImageListItem from '@material-ui/core/ImageListItem';
import { DeleteForeverOutlined, CloseOutlined } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

function FoodList(props) {
    const navi = useNavigate();
    const { num } = useParams();
    console.log({ num });

    const url = localStorage.url;

    let [foodlist, setFoodlist] = useState([]);

    // 전체 목록 출력하는 함수 (db에서)
    const list = () => {
        console.log("list 호출");

        // let listUrl = "http://localhost:9003/food/list";
        let listUrl = url + "/food/list";
        axios.get(listUrl)
            .then(res => {
                setFoodlist(res.data);
                // 비동기처리라 (photolist.length)라 하면 개수만큼 안나온다.
                console.log(res.data.length + "개 목록");
            })
    }
    useEffect(() => {
        list();
    }, []);

    let imageUrl = url + "/image/";

    return (
        <div>
            <button type='button' className='btn btn-outline-danger'
                onClick={() => navi("/food/addform")}>Food등록</button>
            <div>
                {
                    Number(num) === 1 ?

                        <table className='table' style={{ width: '600px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '50px' }}>번호</th>
                                    <th style={{ width: '150px' }}>사진</th>
                                    <th style={{ width: '150px' }}>제목</th>
                                    <th style={{ width: '150px' }}>등록일</th>
                                    <th style={{ width: '150px' }}>삭제</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    foodlist.map((item, idx) =>
                                        // var word1 = str.substring(0, str.indexOf(','))
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <img src={imageUrl + item.fphoto.split(',')[0]} height={120}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => navi(`/food/detail/${item.num}`)} />
                                            </td>
                                            <td>{item.fname}</td>
                                            <td>{item.fhp}</td>
                                            <td>
                                                <span style={{ color: 'red', cursor: 'pointer' }}>
                                                    <DeleteForeverOutlined />
                                                </span>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        :
                        <ImageList rowHeight={400} className={list.photolist} cols={4}>
                            {foodlist.map((item, i) => (
                                <ImageListItem key={item.img} cols={item.cols || 1}>
                                    <div>
                                        <img
                                            src={imageUrl + item.photo}
                                            alt={item.title}
                                            style={{ height: 200, width: 200, cursor: 'pointer' }}
                                            onClick={() => navi(`/photo/detail/${item.num}`)}
                                        />
                                        <span style={{ color: 'gray', cursor: 'pointer' }}>
                                            <CloseOutlined />
                                        </span>
                                        <br />
                                        <span>{item.title}</span>
                                        <br />
                                        <span>{item.writeday}</span>
                                    </div>
                                </ImageListItem>
                            ))}
                        </ImageList>
                }
            </div >
        </div>
    );
}

export default FoodList;