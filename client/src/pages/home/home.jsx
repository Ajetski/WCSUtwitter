import React from 'react';
import { Redirect } from 'react-router-dom'
import './home.less';
import { Layout } from 'antd';

import PageHeader from '../../components/header/header'
import PageFooter from '../../components/footer/footer';
import PageContent from '../../components/content/content'
import memoryUtils from '../../utils/memoryUtils'

const { Header, Content, Footer } = Layout;

class Home extends React.Component {
    render() {
      const user = memoryUtils.user
      if(!user || !user.username) {
        return <Redirect to='/login'/>
      }
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