import React from 'react';
import { useNavigate } from 'react-router-dom';
import uploadMedia from './main';

const Home = () => {
    const history = useNavigate();

    const handlechange = (e) => {

        let numberOfVideos = e.target.files.length;
        for (let i = 0; i < numberOfVideos; i++) {
            let file = e.target.files[i];
            let blobURL = URL.createObjectURL(file);
           // let video = document.createElement('video');
             var video;
            if((file.name.includes(".jpg"))||(file.name.includes(".jpeg"))||(file.name.includes(".png"))||(file.name.includes(".avif"))){
                video=document.createElement("img")
            }else{
                video=document.createElement("video")
            }
            video.src = blobURL;
            video.style.width = "300px"
            video.style.height = "250px"
            video.style.padding = "10px";
            video.style.margin="10px";
            video.setAttribute("controls", "")
            const videos = document.getElementById("list");
            videos.appendChild(video);
        }
    };

    const logoutClick = () => {
        history('/');
    }
    return (
        <>
            <div >
                <nav>
                    <div>
                        <h2 className="knl">
                            <span>ViDEoUpLodER</span>
                        </h2>
                    </div>

                    <div className='logoutsec'>
                        <h4><i class="bi bi-person-circle" id="personicon"></i> &nbsp;{localStorage.getItem('email')}</h4>
                        <button onClick={logoutClick} className='logout'>Logout</button>
                    </div>
                </nav>
                <div className="container">
                    <>
                        <div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <input className='form-control mt-4 w-50 align-items-center' type="file" id="fileToUpload" onChange={handlechange} accept='video/*'/>
                                <button id="uploadbtn" onClick={uploadMedia}> upload</button>
                            </div>
                            <div id="list">

                            </div>
                        </div>
                    </>

                </div>
            </div>
        </>
    )
}
export default Home;
