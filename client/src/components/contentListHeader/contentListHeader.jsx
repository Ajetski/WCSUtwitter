import React from 'react';
import { Popover, Icon } from 'antd';

const content = (
  <div>
    <p>Introduction</p>
    <p>Something else...</p>
  </div>
);

export default class ContentListHeader extends React.Component {
  render() {
    return (
      <div>
        <Popover placement="bottomLeft" content={content} title="someone">
          <a type="primary"><b>someone name</b></a>
          <span></span>
          <span>
            <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
          </span>
          <span> </span>
          @realDonaldTrump · 1h
        </Popover>
      </div>
    );
  }
}