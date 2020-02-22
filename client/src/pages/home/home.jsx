import React from 'react';
import './home.less';
import { Layout } from 'antd';

import PageHeader from '../../components/header/header'
import PageFooter from '../../components/footer/footer';
import PageContent from '../../components/content/content'

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
    render() {
      return (
        <Layout className="layout" style={{backgroundColor: 'white'}}>
          <Header className="ant-layout-header">
            <PageHeader/>
          </Header>
          
          <Content className="ant-layout-content">
            <PageContent/>
          </Content>

          <Footer className="ant-layout-footer">
            <PageFooter/>
          </Footer>
        </Layout>
      );
    }
  }

export default Home;