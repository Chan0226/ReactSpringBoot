import { Alert } from '@material-ui/lab';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyPhotoWriteForm(props) {
    const [photo, setPhoto] = useState('');
    const [title, setTitle] = useState('');
    const navi = useNavigate();

    let [photolist, setPhotolist] = useState([]);
    const COMMON_URL = process.env.REACT_APP_BACK_URL;

    // 로컬스토리지에 COMMON_URL 저장
    localStorage.url = COMMON_URL;


    // 업로드할 url(백엔드 서버) => env 환경설정 사용(변수 사용)
    let uploadUrl = COMMON_URL + '/myphoto/upload'
    // 저장된 사진 경로                         + ..jpg
    let imageUrl = COMMON_URL + '/image/';


    const photoUploadEvent = (e) => {
        const uploadFile = e.target.files[0];
        const imageFile = new FormData();
        imageFile.append("uploadFile", uploadFile);

        axios({
            method: 'post',
            url: uploadUrl,
            data: imageFile,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            // 스프링에서 String으로 업로드한 파일명을 리턴했으므로 res가 곧 파일명
            setPhoto(res.data);  // photo set해주기
        })
    }

    const onSave = ({ title, photo }) => {
        let insertUrl = COMMON_URL + "/myphoto/insert";
        axios.post(insertUrl, { title, photo })
            // 저장하는 함수라 return 값 없음
            .then((res) => {
                // 저장하고 이전 화면으로 이동
                navi(-1);
            }).catch(error => {
                console.log("데이터 추가 에러:" + error);
            });
    }

    // 저장 이벤트(전달받은 onSave함수)
    const insertButtonEvent = () => {
        onSave({ title, photo })
        setPhoto('');
        setTitle('');
    }

    return (
        <div>
            {/* <Alert severity="info">
                <b style={{ fontSize: '25px' }}>axios라이브러리 공부하기 - 사진 업로드폼</b>
            </Alert> */}

            <h5>사진을 업로드하세요</h5>
            {/* file 타입은 click X -> change O */}
            <input type={'file'} className='form-control' onChange={photoUploadEvent}
                style={{ width: '300px' }} />
            <br />
            {/* 이미지 경로에서 사진 출력 */}
            <img alt='' src={imageUrl + photo} style={{ maxWidth: '300px' }}
            />
            <br />
            <div className='input-group' style={{ width: '400px' }}>
                <input type={'text'} className='form-control'
                    placeholder='사진에 대한 메시지 입력'
                    value={title} onChange={(e) => {
                        setTitle(e.target.value);
                    }} />
                <button type='button' className='btn btn-outline-danger'
                    onClick={insertButtonEvent}>DB저장</button>
            </div>
        </div>
    );
}

export default MyPhotoWriteForm;