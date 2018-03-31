import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { AddOrder } from '../visuals/AddOrder';

const alertArgs = args => window.alert(`Returned args: ${JSON.stringify(args)}`)

storiesOf('AddOrder', module)
  .addDecorator(story => <MuiThemeProvider>{story()}</MuiThemeProvider>)
  .add('Default', () => <AddOrder onSubmit={alertArgs} />)
