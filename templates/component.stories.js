import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import Component from 'components/Component';

storiesOf('Component', module).add('Standard', () => <Component>This is your Component</Component>);
