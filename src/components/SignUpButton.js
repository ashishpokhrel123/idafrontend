import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

function SignUpButton() {
    const [state , setState] = useState({
        name: "",
        email : "",
        picture : "",
        successMessage: null
    })
    const { loginWithRedirect, isAuthenticated, user  } = useAuth0();

    if(user){
         const payload={
                "name": user.name,
                "email":user.email,
                "picture":user.picture,
            }
            axios.post('http://localhost:3001/users/signup', payload)
              .then(function(response){
                if(response.data){
                  console.log(response.data);
                  localStorage.setItem('token', response.data.token)
                  setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'Registration successful. Redirecting to home page..',
                   

                  }))
                }
            })
                
                   .catch(function (error) {
                    console.log(error);
                }); 
        
    }
    return (
         !isAuthenticated && (
    <button
      className="btn btn-primary btn-block"
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      Sign Up
    </button>
         )

    )
}

export default SignUpButton;
