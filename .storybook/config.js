import { configure, addDecorator } from '@storybook/react';
import { withConsole } from '@storybook/addon-console';

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);

// console config
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
