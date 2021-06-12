import React, {useState, useEffect} from 'react'
import {useAuth0} from '@auth0/auth0-react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Avatar from '@material-ui/core/Avatar';
import { Link, useHistory, withRouter } from "react-router-dom";
import axios from 'axios';
import './Profile.css';
import { element } from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
   large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}))




function Profile(props) {
    const [state, setState] = useState({
    'users': "",
    'name':"",
    "phone":"",
    "address":"",
    'token': { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
     successMessage: null,
     loggedIn : ""
  })
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState([]);
  const { user, isAuthenticated  } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };

  const handleChangeProfile = (e) => {
      const{id, value} = e.target
      setState(prevState => ({
        ...prevState,
        [id] : value
      }))

  }

  const logout = () => {
        
        localStorage.removeItem('token');
        props.history.push('/');
  }

 

   /* fteching user details */
  const fetchUser = async () => {
        const response = await axios
            .get("http://localhost:3001/users/myprofile", {headers: state.token})
            //    .then((response) => response.data)
                .then((response) => {
                setLoading(false);
                 setData(response.data);
            })
            .catch((err) => {
               setLoading(false);
               setError('fetch failed');
            });   
    };

    useEffect(() => {
        fetchUser();
    }, []);
  

    if (loading) {
    return <p>loading..</p>;
  }

  if (error !== '') {
    return <p>ERROR: {error}</p>;
  }

  /* updating user details */

 


   const SubmitProfile = (e) => {
        e.preventDefault();
        const payload = {
          'name' : state.name,
          'phone': state.phone,
          'address': state.address,
          
      }
       axios.put("http://localhost:3001/users/myprofile", payload, {headers: state.token})
         .then(function(response){
                if(response.data){
                  console.log(response.data);
                  setState(prevState => ({
                    ...prevState,
                    'successMessage' : 'User profile Update succesfully.'

                  }))
                //   redirectToHome();
                 
                    } 
                
              })
              .catch(function (error) {
                    console.log(error);
                }); 
    
  }
       
  

 
  


    return (
         isAuthenticated &&  (
             
             <div className={classes.root}>
                   
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Profile" value="1" />
            <Tab label="Logout" value="2" />
            
          </TabList>
        </AppBar>
         
        <TabPanel value="1">
           
           
             <Avatar alt="Remy Sharp" src={data.profileimage} className={classes.large} onChange={handleChange} />
             
            <form>
                 
                 <h5>Name</h5>
          <input type="text" defaultValue={data.name} id="name" name="name" onChange={handleChangeProfile} />
          <br />
          <h5>Email</h5>
          <input type="email" defaultValue={data.email} id="email" name="email" onChange={handleChangeProfile} disabled />
          <br />
          <h5>Phone</h5>
          <input type="text" defaultValue={data.phone} id="phone" name="phone" onChange={handleChangeProfile}   />
          <br />
           <h5>Address</h5>
          <input type="text" defaultValue={data.address} id="address" name="address" onChange={handleChangeProfile}   />
          <br />
         

          <button className="success" onClick={SubmitProfile}>Update</button>
          
            </form>
           
        </TabPanel>
        
         
        <TabPanel value="2">
            <button className="btn btn-warning"  onClick={() => loginWithRedirect()}>Logout</button>
        </TabPanel>
        
      </TabContext>
     
    </div>
    

           

         )
          
        
    )
}

export default Profile;
