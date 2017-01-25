import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './reports/configureStore.jsx'
import Root from './reports/components/Root.jsx'

const store = configureStore();

render(
    <Root store={store}/>,
    document.getElementById('reports')
);