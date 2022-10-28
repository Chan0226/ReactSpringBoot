import { CameraAlt, CameraAltOutlined, CameraAltRounded, CameraAltSharp, CameraTwoTone } from '@material-ui/icons';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function FoodForm(props) {
    // 미리보기 위한 usestate
    const [foodPhoto, setFoodPhoto] = useState([]);
    const [fname, setFname] = useState('');
    const [fhp, setFhp] = useState('');
    const [bookingday, setBookingday] = useState('');
    const navi = useNavigate();


    // content는 Ref로 (입력할때마다 다시 랜더링 되는거 방지차원에서)
    const contentRef = useRef('');

    // 로컬 스토리지에서 기본 경로 가져오기
    const url = localStorage.url

    // 파일 업로드 이벤트
    const onUploadChange = (e) => {
        // 여러 사진이라서 for문 돌려야 함
        let uploadUrl = url + "/food/upload";
        console.log(e.target.files.length + "개")
        const uploadFile = new FormData();
        for (let i = 0; i < e.target.files.length; i++) {
            // 백엔드의 컨트롤러 매핑의 파라미터 이름(uploadFile)이랑 같아야한다.
            uploadFile.append("uploadFile", e.target.files[i]);
        }
        axios({
            method: 'post',
            url: uploadUrl,
            data: uploadFile,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            console.log(res.data.length + "개 들어옴.");
            setFoodPhoto(res.data);   // res.data에 업로드된 사진이름이 리턴
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();  // submit의 기본 이벤트 무효화시킴
        // 하고 싶은말
        let fcontent = contentRef.current.value;

        let insertUrl = url + "/food/insert";

        // dto의 이름과 같아야 한다
        axios.post(insertUrl, { fname, fhp, fcontent, bookingday })
            .then(res => {
                navi("/food/list");
                setFname('');
                setFhp('');
                setBookingday('');
                contentRef.current.value = '';
            });
    }

    // 이미지 경로(뒤에 파일명이 붙어서 / 붙여야함)
    let imageUrl = url + "/image/";

    return (
        <div style={{ marginLeft: '100px' }}>
            {/* 아이콘 클릭시 hidden된 input 클릭하도록 */}
            <input type={'file'} id="filephoto" multiple
                style={{ visibility: 'hidden' }} onChange={onUploadChange} />
            <h4>여러장의 사진을 등록해주세요</h4>
            <span onClick={() => {
                document.getElementById("filephoto").click();
            }}>
                <CameraAlt style={{ fontSize: '2em', cursor: 'pointer' }} />
            </span>
            <br /><br />
            <div>
                {
                    foodPhoto.map((fname, idx) => <img alt='' className='foodphoto' key={idx}
                        src={`${imageUrl}${fname}`} />)
                }
            </div>
            <h4>나머지 정보도 입력해주세요</h4>
            <form onSubmit={onSubmit}>
                <table className='table' style={{ width: '400px' }}>
                    <tbody>
                        <tr>
                            <th style={{ width: '100px' }}>예약자이름</th>
                            <td>
                                <input type={'text'} className='form-control'
                                    required onChange={(e) => setFname(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: '100px' }}>예약자 핸드폰</th>
                            <td>
                                <input type={'text'} className='form-control'
                                    required onChange={(e) => setFhp(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: '100px' }}>하고싶은말</th>
                            <td>
                                <textarea ref={contentRef} style={{ width: '300px', height: '100px' }}
                                    className='form-control'></textarea>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ width: '100px' }}>예약날짜</th>
                            <td>
                                <input type={'date'} className='form-control'
                                    required onChange={(e) => setBookingday(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align='center'>
                                <button type='submit' className='btn btn-outline-danger'>주문사항 저장</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default FoodForm;