import React, { Component, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AccountInfo from './AccountInfo.jsx'


class AccountContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: [],
    };
  }

  render() {
    return (
      <div className='profileContainer'>
        <div className='nav'>
          <div className="navLink" id="profPic"><Link to='/profile'>My profile</Link><div id='picture'></div></div>
          <div className="navLink" id="newSearch"><Link to='/flights'>New search</Link></div>
          <div className="navLink" id="account"><Link to='/account'>Account info</Link></div>
          <div className="navLink" id="logOut"><Link to='/logout'>Log out</Link></div>
          <div className="logoBox">ecomotion</div>
        </div>
        <div className='gallery'>
          <h2 id="accountInfoHeader"> Account Info </h2>
          <AccountInfo />
        </div>
      </div>
    ) 
  }
}


export default AccountContainer;