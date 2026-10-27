import React, { useState } from 'react'


function TextUitls(props) {

    const [text, setText] = useState("Enter text here");

    const convertToUpper = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.setConvertToUpperCaseLowerCase("Converted to uppercase", "success");
    }

    const convertTolower = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.setConvertToUpperCaseLowerCase("Converted to lowercase", "success");
    }

    const onValueChange = (event) => {
        setText(event.target.value);
    }

    return (
        <>
            <div className="container mb-3 my-3">
                <label htmlFor="exampleFormControlTextarea1" className={`form-label fs-5 text-${props.mode === 'light' ? 'dark' : 'light'}`} >Enter Your Text Here</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={onValueChange} value={text}></textarea>

                <button type="button" className="btn btn-primary mx-1 my-3" onClick={convertToUpper}>Convert To Uppercase</button>
                <button type="button" className="btn btn-primary mx-1 my-3" onClick={convertTolower}>Convert To Lowercase</button>
            </div>

            <div className={`container mb-3 my-5 text-${props.mode === 'light' ? 'dark' : 'light'}`}>
                <h1>{text}</h1>
            </div>            
        </>

    )
}

export default TextUitls
