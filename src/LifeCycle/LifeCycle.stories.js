import React from 'react';

import Counter from '@/LifeCycle/Counter.js';

export default {
  title: 'Learn/LifeCycle',
  component: Counter,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Counter {...args} />;

export const LifeCycleDemo = Template.bind({});
// Demo.args = {
//   primary: true,
//   label: 'Hooks',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
