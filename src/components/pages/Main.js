import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Compose from '../Main/Compose';

import { replaceMail } from '../../store/mail-action';
import { updateMail } from '../../store/mail-action';
import Sidebar from '../Main/Sidebar';
import Sent from '../Main/Sent';
import Inbox from '../Main/Inbox';

const Main = () => {
  const state = useSelector((state) => state.show);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const firstTime = useSelector((state) => state.mail.firstTime);
  const currentMailData = useSelector((state) => state.mail.mailData);
  const dispatch = useDispatch();

  if (isLoggedIn && firstTime) {
    const loggedUserEmail = JSON.parse(localStorage.getItem('idToken')).email;
    const emailUrl = loggedUserEmail.replace('@', '').replace('.', '');
    dispatch(replaceMail(emailUrl, loggedUserEmail));
  }

  setInterval(() => {
    if (isLoggedIn) {
      const loggedUserEmail = JSON.parse(localStorage.getItem('idToken')).email;
      const emailUrl = loggedUserEmail.replace('@', '').replace('.', '');
      dispatch(updateMail(emailUrl, loggedUserEmail, currentMailData));
    }
  }, 5000);
  

  return (
    <React.Fragment>
     <Sidebar/>
      {state.compose && <Compose />}
      {state.sent && <Sent />}
      {state.received && <Inbox />}
    </React.Fragment>
  );
};

export default Main;