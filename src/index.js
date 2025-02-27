import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from './app/store';
import './index.css'
import App from './App';
import {ContextProvider} from './contexts/ContextProvider';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ContextProvider>
                <App/>
            </ContextProvider>,
        </Provider>,
    </React.StrictMode>,
    document.getElementById('root')
);