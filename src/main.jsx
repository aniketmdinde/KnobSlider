import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WrapperComponent from './WrapperComponent.jsx'
import Video from './Video.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Video />
    <WrapperComponent />
  </React.StrictMode>,
)
