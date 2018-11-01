import React from 'react';

import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import ComponentWithClass from 'components/ComponentWithClass';

storiesOf('ComponentWithClass', module).add('Standard', () => (
	<ComponentWithClass>This is your Component</ComponentWithClass>
));
