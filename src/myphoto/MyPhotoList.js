import { Alert } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ImageList } from '@material-ui/core';
import ImageListItem from '@material-ui/core/ImageListItem';
import { DeleteForeverOutlined, CloseOutlined } from '@material-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

function MyPhotoList(props) {

    const navi = useNavigate();
    const { num } = useParams();
    console.log({ num });

    const COMMON_URL = process.env.REACT_APP_BACK_URL;

    // 배열 타입으로 선언(여러개 받는다.)
    let [photolist, setPhotolist] = useState([]);

    // 전체 목록 출력하는 함수 (db에서)
    const list = () => {
        console.log("list 호출");

        // let listUrl = "http://localhost:9003/myphoto/list";
        let listUrl = COMMON_URL + "/myphoto/list";
        axios.get(listUrl)
            .then(res => {
                setPhotolist(res.data);
                // 비동기처리라 (photolist.length)라 하면 개수만큼 안나온다.
                console.log(res.data.length + "개 목록");
            })
    }

    // 처음 시작시 list() 함수 호출
    useEffect(() => {
        list()
    }, []);  // 처음 시작시 딱 한번 호출

    // 저장 함수 (title과 photo 변수)
    const onSave = ({ title, photo }) => {
        // let insertUrl = "http://localhost:9003/myphoto/insert"
        let insertUrl = COMMON_URL + "/myphoto/insert";
        axios.post(insertUrl, { title, photo })
            // 저장하는 함수라 return 값 없음
            .then((res) => {
                list(); // insert하고 목록 다시 출력
            }).catch(error => {
                console.log("데이터 추가 에러:" + error);
            });
    }

    // 삭제 함수
    const deletePhoto = (num) => {
        console.log(num);
        // 쿼리스트링으로 url 자체에 num 넘기기
        // let deleteUrl = "http://localhost:9003/myphoto/delete?num=" + num;
        let deleteUrl = COMMON_URL + "/myphoto/delete?num=" + num;
        axios.delete(deleteUrl)
            .then(res => {
                list(); // 삭제후 목록 다시 가져와 출력하기
            })
    }


    // let imageUrl = "http://localhost:9003/image/";
    let imageUrl = COMMON_URL + "/image/";


    return (
        <div>
            <button type='button' className='btn btn-success'
                onClick={() => navi("/photo/write")}>사진등록</button>
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
                                photolist.map((item, idx) =>
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <img src={imageUrl + item.photo} height={120}
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => navi(`/photo/detail/${item.num}`)} />
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.writeday}</td>
                                        <td>
                                            <span style={{ color: 'red', cursor: 'pointer' }}
                                                onClick={() => {
                                                    deletePhoto(item.num);
                                                }}>
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
                        {photolist.map((item, i) => (
                            <ImageListItem key={item.img} cols={item.cols || 1}>
                                <div>
                                    <img
                                        src={imageUrl + item.photo}
                                        alt={item.title}
                                        style={{ height: 200, width: 200, cursor: 'pointer' }}
                                        onClick={() => navi(`/photo/detail/${item.num}`)}
                                    />
                                    <span style={{ color: 'gray', cursor: 'pointer' }}
                                        onClick={() => {
                                            deletePhoto(item.num);
                                        }}>
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

    );
}

export default MyPhotoList;