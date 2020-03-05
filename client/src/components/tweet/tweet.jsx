import React, {Component} from 'react';
import { Avatar, Input, Button, Icon } from 'antd';

import './tweet.less'

const { TextArea } = Input;

export default class Tweet extends Component {
  render() {
    return (
      <div className="ant-tweet">
        <div className="ant-tweet-left">
          <div className="ant-tweet-left-user">
            <Avatar size={49} icon="user" />
          </div>   
        </div>
        <div className="ant-tweet-right">
          <div>
            <TextArea
              style={{ fontSize: '18px', borderColor: 'white' }} 
              placeholder="What's happening?"
              autoSize={{ minRows: 2, maxRows: 2 }}
            />
          </div>
          <div className="ant-tweet-right-bottom">
            <div className="ant-tweet-right-bottom-left">
              <Icon type="camera" theme="twoTone" twoToneColor="#52c41a" />
            </div>
            <div className="ant-tweet-right-bottom-right">
              <Button size="large" type="primary" shape="round" icon="search">
                Tweet
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}