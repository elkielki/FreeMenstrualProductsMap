import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Router>
        <App /> 
      </Router>
    </React.StrictMode>

)


/*   <GoogleOAuthProvider clientId="888183686988-shudmqmpbt8cd7tfiie2leanjdccd2di.apps.googleusercontent.com">
  </GoogleOAuthProvider>*/