import React from 'react';
import { Spin } from 'antd';
const Loading = (isLoading) => (Target) => {
  return class Loading extends React.PureComponent {
    render() {
      return (
        <Spin style={{ height: '100%'}} spinning={isLoading(this.props)} size="large">
          <Target { ...this.props } style={{ height: '100%'}} />
        </Spin>
      )
    }
  }
};
export default Loading;
