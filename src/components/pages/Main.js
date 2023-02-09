import React from "react";
import  { useState, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';

import classes from './Main.module.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button } from "react-bootstrap";

const Main = () => {
  
  const emailRef = useRef();
  const titleRef = useRef();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );


  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
   
  };

  const sendMailHandler = async(event) => {
    event.preventDefault();

    try{
      const response = await fetch('https://mail-box-2eb07-default-rtdb.firebaseio.com/mails.json',{
        method: 'POST',
        body: JSON.stringify({
          to: emailRef.current.value,
          from: JSON.parse(localStorage.getItem('idToken')).email,
          title: titleRef.current.value,
          text: editorState.getCurrentContent().getPlainText(),
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json();

      if(response.ok) {
          console.log(data);
      } else {
        throw data.error
      }
    } catch(error) {
      console.log(error.message);
    }
  }

  return (
    <React.Fragment>
      <h1 className="text-center mt-4 mb-4">
        Welcome to your Mail-Box!
      </h1>
      <form className={classes.form} onSubmit={sendMailHandler}>
        <div className={classes.to}>
          <label>To : </label>
          <input type='email' ref={emailRef} required/>
        </div>
        <div className={classes.title}>
          <label>Title : </label>
          <input type='text' ref={titleRef} required/>
        </div>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName={classes['wrapper-class']}
          editorClassName={classes['editor-class']}
          toolbarClassName={classes['toolbar-class']}
        />
        <div className='d-flex justify-content-end'>
          <Button type='submit'>Send</Button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Main;