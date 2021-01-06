import React, { Component } from 'react';
import SubCounter from '@/LifeCycle/SubCounter';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log('Counter constructor--');
  }
  
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Counter getDerivedStateFromProps--');
    return null;
  }
  // 无论shouldComponentUpdate返回true/false state一定会变
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Counter shouldComponentUpdate--');
    console.log(nextState);
    setTimeout(() => {
      console.log(this.state);
    });
    return nextState.count % 2 === 0;
  }
  componentDidMount() {
    console.log('Counter componentDidMount--');
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Counter getSnapshotBeforeUpdate--');
    // console.log(prevProps);
    // console.log(prevState);
    return null;
  }
  componentWillUnmount() {
    console.log('Counter componentWillUnmount--');
  }
  componentDidUpdate() {
    console.log('Counter componentDidUpdate--');
  }
  render() {
    console.log('Counter render--');
    const { count } = this.state;
    return (
      <div>
        {count}
        {count !== 4 && <SubCounter count={count} />}
        <button onClick={this.increase}>+</button>
      </div>
    )
  }
  increase = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }));
  };
}