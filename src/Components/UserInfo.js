import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { OutlinedInput } from '@material-ui/core';
import CompleteProfile from './CompleteProfile';
const { useState, useEffect } = React;

//TODO: Need to set up conditional rendering so the complete profile only shows up when a user is selected via the profileFlag
//We're currenlty passing the right element in the array to represnt the clicked on user and their user id, now need to make the request at the right timecvx

const useStyles = makeStyles({
    root: {
      maxWidth: 345
    },
    media: {
      height: 140,
    },
  });

const BASE_URL = 'https://dummyapi.io/data/v1';
const APP_ID = '61156838c951788d80beb8d6';

  export default function UserInfo(){
      const classes = useStyles();
      //const [expanded, setExpanded] = React.useState(false);
      const [loading, setLoading] = useState(false);
      const [response, setResponse] = useState(null);
      const [profileFlag, setProfileFlag] = useState(false);
      const [selectedItem, setSelectedItem] = useState(null);

    const getUsers = async () => {
        console.log("function is getting callsed");
        const users = await axios.get(`${BASE_URL}/user`, { headers: {'app-id': APP_ID} })
        setResponse(users.data.data);
        console.log("response", response);
        setLoading(false);
    }

      useEffect(() => {
        console.log("inside useffect");
          setLoading(true);
        getUsers();
        console.log("response form initial call", response);
      }, []);



      //console.log(response);
      if (response === null){
        return null;
    }
    if (selectedItem !== null){
        console.log("response!!!", response);
        console.log("item at selected idnex", response[selectedItem]);
    return  <CompleteProfile response = {response[selectedItem]} selected = {selectedItem} ></CompleteProfile> 
    }
      return ( 
        <div>
             {loading && "Loading..."}
              
              {response.map((item, index) => (
                   selectedItem ? <CompleteProfile response = {item} selected = {selectedItem}></CompleteProfile> : 
                 <Card classname = {classes.root}>
                     {/* <CompleteProfile response = {item} selected = {selectedItem}></CompleteProfile> */}
                 <CardActionArea onClick = {() => setSelectedItem(response.indexOf(item), setProfileFlag(true))}>
                       <CardMedia
                      i = {index}
                      component="img"
                      alt="profile picture"
                      height="540"
                      image={item.picture}
                      title="Picture"
                      /> 
                  <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                      {item.firstName} {item.lastName}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      {item.email}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                      {response.indexOf(item)}
                      </Typography>
                  </CardContent>
                  </CardActionArea>
              </Card>
                ))}

        </div>
      )
  }