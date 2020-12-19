import React, {useState} from 'react'
import Home from './components/Home'
import FileUploader from './components/FileUploader'
import './App.css';

function App() {
  const [showUploader, setShowUploader] = useState(false)
  const showUploaderHandler = () => {
    // განვაახლოთ ღილაკის ტექსტი
    let el = document.getElementById('bigButton')
    showUploader ? el.innerHTML= "Show Uploader" : el.innerHTML= "Hide Uploader"
    // განვაახლოთ state
    setShowUploader(!showUploader)
  }

  return (
    <div className="App">
      <Home btnClick = {showUploaderHandler}/>
      {showUploader ? <FileUploader /> : null}
    </div>
  );
}

export default App;
