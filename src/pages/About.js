import React from 'react';
import { useParams } from 'react-router-dom';

function About(props) {
    const { emp } = useParams();
    console.log({ emp });      // {emp: 'bitcamp'}
    console.log({ emp }.emp);  // bitcamp
    return (
        <div>
            {
                emp == null ? <h1>회사 퇴직</h1> :
                    <div>
                        <h2>저희 회사 <b style={{ color: 'red' }}>{emp}</b>를 소개합니다.</h2>
                        <br />
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4243114056453!2d127.0253890155517!3d37.497909435812794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598eb29951%3A0x45157884496be0de!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOyXreyCrOqxsOumrA!5e0!3m2!1sko!2skr!4v1666847550809!5m2!1sko!2skr" width="600" height="450" style={{ 'border': 0 }} allowfullscreen=""
                            loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
            }
        </div>
    );
}

export default About;