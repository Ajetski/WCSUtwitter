import React from 'react';
import { Icon, Row, Col, Input } from 'antd';

const { Search } = Input;

export default class PageHeader extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex" align="top">
          <Col span={6}><Icon type="twitter" style={{ fontSize: '48px', color: '#08c', paddingLeft: '25%' }} /></Col>
          <Col span={10} style={{ border: '1px solid #F5F5F5', borderTop: '0px', paddingLeft: '5px', shadow:'1px' }}>
            <label style={{ fontSize: '24px'}}><b>Home</b></label>
          </Col>
          <Col span={6} style={{ paddingLeft: '24px' }}>
            <Search size="large" placeholder="Search" onSearch={value => console.log(value)} style={{ width: '70%' }} />
          </Col>
        </Row>
        </div>
    );
  }
}