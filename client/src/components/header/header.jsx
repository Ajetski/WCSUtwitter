import React from 'react';
import { Icon, Row, Col, Input } from 'antd';

const { Search } = Input;

export default class PageHeader extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" justify="center" align="top">
          <Col span={5}><Icon type="twitter" style={{ fontSize: '32px', color: '#08c' }} /></Col>
          <Col span={8}>
            <label style={{ fontSize: '24px'}}><b>Home</b></label>
          </Col>
          <Col span={5}>
            <Search size="large" placeholder="Search" onSearch={value => console.log(value)} style={{ width: '70%' }} />
          </Col>
        </Row>
        </div>
    );
  }
}