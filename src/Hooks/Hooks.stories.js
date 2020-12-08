import React from 'react';

import Hooks from '@/Hooks/Hooks.js';

export default {
  title: 'Learn/Hooks',
  component: Hooks,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Hooks {...args} />;

export const Demo = Template.bind({});
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
