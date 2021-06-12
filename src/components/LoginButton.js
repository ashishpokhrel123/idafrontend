import React from 'react'
import { Link, useHistory, withRouter } from "react-router-dom";

import {useAuth0} from '@auth0/auth0-react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label
} from 'reactstrap';
const LoginButton = (props) => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    
    return (
         <div className="login">
              <h2>Sign In</h2>
        <Form className="form">
          <FormGroup>
            <Button
              className="btn btn-primary btn-block"
              onClick={() => loginWithRedirect()}
          >
             Login with AUTH0z
        </Button>
            
          </FormGroup>
         
         
      </Form>
            
            
        
       
         

      </div>
     

 
        
    )
}

export default LoginButton
