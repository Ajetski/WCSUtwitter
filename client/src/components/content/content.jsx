import React from 'react';
import { Row, Col } from 'antd';
import LeftMenu from '../leftMenu/leftMenu'
import ContentList from '../contentList/contentList'
import Tweet from '../tweet/tweet.jsx'

export default class PageContent extends React.Component {
  render() {
    return (
      <div>
        <Row type="flex">
        <Col span={6}>
          <LeftMenu/>
        </Col>
        <Col span={10}>
          <div style={{ padding: 2, minHeight: '100%', border: '1px solid #F5F5F5' }}>
            <Tweet />
            <div style={{ clear: "both" }}>
              <ContentList />
            </div>
            
          </div>
        </Col>
        <Col span={6} style={{ paddingLeft: '24px' }}>
          <div style={{ padding: 2, minHeight: '100%', border: '1px solid #F5F5F5'}}>
            right sider
          </div>
        </Col>
        </Row>                   
      </div>
    );
  }
}