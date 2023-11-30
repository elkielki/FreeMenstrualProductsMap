import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import { BrowserRouter as Router} from 'react-router-dom'
import { UserContextProvider } from './context/userContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UserContextProvider>
        <Router>
          <App /> 
        </Router>
      </UserContextProvider>
    </React.StrictMode>

)


/*   <GoogleOAuthProvider clientId="888183686988-shudmqmpbt8cd7tfiie2leanjdccd2di.apps.googleusercontent.com">
  </GoogleOAuthProvider>*/