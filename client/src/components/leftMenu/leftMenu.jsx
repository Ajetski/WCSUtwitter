import React from 'react';
import { Icon, Menu } from 'antd';

import './leftMenu.less'

export default class LeftMenu extends React.Component {
  render() {
    return (
      
      <div className="home-content-div">
        <Menu mode="inline" className="home-content-menu">
            <Menu.Item key="1" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="home" style={{ height: '50px', fontSize:'18px' }}/>
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="fire" style={{ height: '50px', fontSize:'18px' }}/>
              <span>Explore</span>
            </Menu.Item>
            <Menu.Item key="3" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="notification" style={{ height: '50px', fontSize:'18px' }}/>
              <span>Notifications</span>
            </Menu.Item>
            <Menu.Item key="4" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="message"  style={{ height: '50px', fontSize:'18px' }}/>
              <span>Message</span>
            </Menu.Item>
            <Menu.Item key="5" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="tag"  style={{ height: '50px', fontSize:'18px' }}/>
              <span>Bookmarks</span>
            </Menu.Item>
            <Menu.Item key="6" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="unordered-list"  style={{ height: '50px', fontSize:'18px' }}/>
              <span>Lists</span>
            </Menu.Item>
            <Menu.Item key="7" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="user"  style={{ height: '50px', fontSize:'18px' }}/>
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="8" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="more"  style={{ height: '50px', fontSize:'18px' }}/>
              <span>More</span>
            </Menu.Item>
            <Menu.Item key="9" style={{ height: '50px', fontSize:'18px' }}>
              <Icon type="desktop"  style={{ height: '50px', fontSize:'18px' }}/>
              <span>WCSU Tweet</span>
            </Menu.Item>
          </Menu>  
      </div>
    );
  }
}