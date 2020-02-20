import React from 'react';
import { Menu, Icon, Row, Col } from 'antd';

export default class PageContent extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="top">
        <Col span={5}>
        <Menu mode="inline">
            <Menu.Item key="1">
              <Icon type="home" />
              <span>Home</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="fire" />
              <span>Explore</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="notification" />
              <span>Notifications</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="message" />
              <span>Message</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="tag" />
              <span>Bookmarks</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="unordered-list" />
              <span>Lists</span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="user" />
              <span>Profile</span>
            </Menu.Item>
            <Menu.Item key="8">
              <Icon type="more" />
              <span>More</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="desktop" />
              <span>WCSU Tweet</span>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={8}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
        </Col>
        <Col span={5}>
          <p>right sider</p>
        </Col>
        </Row>                   
      </div>
    );
  }
}