import React from 'react';
import ReactDOM from 'react-dom';
import './home.less';
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Input } from 'antd';

import PageHeader from '../../components/header/header'
import PageFooter from '../../components/footer/footer';
import PageContent from '../../components/content/content'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

class Home extends React.Component {
    render() {
      return (
        <Layout className="layout">
          <Header className="ant-layout-header">
            <PageHeader/>
          </Header>
          
          <Content style={{ padding: '0 50px', margin: '24px 0'}}>
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