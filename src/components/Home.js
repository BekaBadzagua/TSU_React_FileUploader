import React from 'react'

const Home = (props) => {

    return (
        <div className='homeContainer'>
            <h1 className='centered'>Welcome to FileUploader App</h1>
            <div className='centered'>
                <button onClick={props.btnClick} id='bigButton'>Show Uploader</button>
            </div>
            <h3 className='centered'>სტუდენტი</h3>
            <p className='centered'>ბექა ბაძაღუა</p>
        </div>
    )
}


export default Home