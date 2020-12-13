import React from 'react';

import Demo from '@/Hooks/Demo.js';

export default {
  title: 'Learn/Hooks',
  component: Demo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Demo {...args} />;

export const HooksDemo = Template.bind({});
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
