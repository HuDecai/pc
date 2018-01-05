import React from 'react';

class AppContainer extends React.PureComponent {
  render() {
    return (
      <div>
        {/* {this.props.children} */}
        {console.log(this.props)}
      </div>
    );
  }
}
export default AppContainer;
