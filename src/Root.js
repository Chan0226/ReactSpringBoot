import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterMain from './RouterMain';
import './App.css';

function Root(props) {
    return (
        <div>
            <BrowserRouter>
                <RouterMain />
            </BrowserRouter>
        </div>
    );
}

export default Root;