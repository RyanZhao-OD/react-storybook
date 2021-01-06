import React, { Component } from 'react';

export default class SubCounter extends Component {
  constructor(props) {
    super(props);
    console.log('SubCounter constructor--');
    this.state = {
      count: props.count,
    }
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('SubCounter getDerivedStateFromProps--');
    return {
      count: nextProps.count * 2,
    };
  }
  // 无论shouldComponentUpdate返回true/false state一定会变
  shouldComponentUpdate(nextProps, nextState) {
    console.log('SubCounter shouldComponentUpdate--');
    // console.log(nextState);
    // setTimeout(() => {
    //   console.log(this.state);
    // });
    return true;
  }
  componentDidMount() {
    console.log('SubCounter componentDidMount--');
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('SubCounter getSnapshotBeforeUpdate--');
    // console.log(prevProps);
    // console.log(prevState);
    return null;
  }
  componentWillUnmount() {
    console.log('SubCounter componentWillUnmount--');
  }
  componentDidUpdate() {
    console.log('SubCounter componentDidUpdate--');
  }
  render() {
    console.log('SubCounter render--');
    return (
      <div>
        {this.state.count}
      </div>
    )
  }
}