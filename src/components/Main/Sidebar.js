import React from 'react';


import classes from './Sidebar.module.css';


const Sidebar = () => {
 
 

  return (
    <div className={classes.sidebar}>
      <button className={classes.compose} >
        Compose
      </button>
      
        <span>Inbox</span>
     
     
     
    </div>
  );
};

export default Sidebar;