import React, { useState, useRef } from 'react'

const FileUploader = () => {
    // alreadyAdded ში ჩაიწერება ამ სტრუქტურის ობიექტები
    // {
    //     link:    // <a><a/> ელემენტის შესაბამისი ატრიბუტები
    //     fileName:  // ფაილის სახელი
    // }
    const [alreadyAdded, setAlreadyAdded] = useState([])
    const fileInputRef = useRef()

    const AddImageHandler = (event) => {
        event.preventDefault();
        debugger;
        let selectedFile = fileInputRef.current.files[0]
        // შეამოწმე ვალიდურობა
        let { isValid, errorMessage } = checkValidity(selectedFile)
        if (!isValid) {
            alert(errorMessage)
            return;
        }

        // ჩაწერე ფაილი ფოლდერში 
        let blob = new Blob([selectedFile], { type: selectedFile.type });
        let downloadAddress = window.URL.createObjectURL(blob);
        // განაახლე state
        let newFile = {
            link: {
                download: selectedFile.name,
                innerHTML: `Download ${selectedFile.name}`,
                href: downloadAddress
            },
            fileName: selectedFile.name
        }
        setAlreadyAdded([...alreadyAdded, newFile])
    }

    const checkValidity = (file) => {
        let validityState = {
            isValid: true,
            errorMessage: null
        };
        // შემოწმება undefined-ზე
        if (file === undefined || file === null) {
            validityState = {
                isValid: false,
                errorMessage: "გთხოვთ აირჩიოთ ფაილი"
            }
            return validityState
        }
        // შემოწმება format-ზე
        let allowedTypes = ['tiff', 'png', 'jpeg', 'jpg', 'gif']
        allowedTypes = allowedTypes.map((extention) => "image/" + extention)

        let wrongFormat = allowedTypes.findIndex(x => x === file.type) === -1
        if (wrongFormat) {
            validityState = {
                isValid: false,
                errorMessage: "ფაილი არასწორ ფორმატშია"
            }
            return validityState
        }
        // შემოწმება დამატებულია თუ არა უკვე მსგავსი ფაილი
        alreadyAdded.forEach(item => {
            if (file.name === item.fileName) {
                validityState = {
                    isValid: false,
                    errorMessage: "ასეთი ფაილი უკვე დამატებულია"
                }
            }
        });
        return validityState
    }



    let anchors = alreadyAdded.map((item, index) => {
        return <a key={index} download={item.link.download} href={item.link.href}>{item.link.innerHTML}</a>
    })

    return (
        <div className='fileUploader'>
            <form>
                <div className="inputWrapper">
                    <label>File:</label>
                    <input
                        type="file"
                        name="imgFile"
                        ref={fileInputRef} />
                </div>
                <div className="inputWrapper centered">
                    <input
                        type="submit"
                        value="Submit"
                        className="inputBtn"
                        onClick={AddImageHandler} />
                </div>
            </form>

            <div className="links" id="LinksContainer">
                {anchors}
            </div>

        </div>
    )
}


export default FileUploader