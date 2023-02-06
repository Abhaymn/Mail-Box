import React, { useState, useRef } from 'react';
import { Container, Row,Col, Card, Form, Button } from 'react-bootstrap';



const Login = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const AccountHandler = () => {
    setHaveAccount((preState) => !preState);
  };

  let url;
  if (haveAccount) {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= AIzaSyBBBhCGZPdeLI-vzxNhfHg939O8zuofyZE ';
  } else {
    url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key= AIzaSyBBBhCGZPdeLI-vzxNhfHg939O8zuofyZE ';
  }

  const loginFormHandler = async (event) => {
    event.preventDefault();

    if (
      !haveAccount &&
      passwordRef.current.value !== confirmPasswordRef.current.value
    ) {
      alert('Confirmed password entered incrrect');
      return;
    }

    try {
      const respense = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await respense.json();

      if (respense.ok) {
        console.log('Login SuccessFul');
      } else {
        throw data.error;
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <Container className='mt-5 d-flex justify-content-center' >
        <Row >
            <Col xs={19}>
                <Card className='shadow-lg mt-5 p-4' >
                    {haveAccount&&<Card.Header className=' d-flex justify-content-center' >
                        <h4>LOGIN</h4>
                    </Card.Header>}
                    {!haveAccount&&<Card.Header className=' d-flex justify-content-center' >
                        <h4>Sign Up</h4>
                    </Card.Header>}
                    <Card.Body>
       
                <Form  onSubmit={loginFormHandler} >
                <Form.Control className='mb-3 ' type='email' placeholder='Email' ref={emailRef} required />
                <Form.Control className='mb-3'
                    type='password'
                    placeholder='Password'
                    ref={passwordRef} required
                />
                {!haveAccount && (
                    <Form.Control className='mb-3'
                        type='password'
                        placeholder='Confirm Password'
                        ref={confirmPasswordRef} required
                    />
                )}
                <div className='d-flex justify-content-center'>
                    <Button type='submit'>{haveAccount ? 'Login' : 'Sign Up'}</Button>
                </div>
                </Form>
                <div onClick={AccountHandler} className='mt-3 d-flex justify-content-center'>
                {haveAccount
                    ? 'Don`t have an account? Sign Up'
                    : 'Have an account? Sign In'}
                </div>
               
                </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
    </>
  );
};

export default Login;