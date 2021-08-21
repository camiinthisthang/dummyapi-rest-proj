import React from 'react';
import '../index.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const { useState, useEffect } = React;


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 700,
      marginLeft: '30%',
      marginTop: '10%',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

  const BASE_URL = 'https://dummyapi.io/data/v1';
  const APP_ID = '61156838c951788d80beb8d6';

export default function CompleteProfile(props){

    console.log("ID", props.response.id);
    console.log("props from child", props)
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const [userInfo, setUserInfo] = useState({
      dateOfBirth: '',
      phone: '',
      email: ''
    });
    const [loading, setLoading] = useState(true);
    const userIndex = props.selected;
    const USER_ID = props.response.id

    const getFullProfile = async () => {
      console.log("function is getting callsed");
      const fullProfile = await axios.get(`${BASE_URL}/user/${USER_ID}`, { headers: {'app-id': APP_ID} })
      console.log("am i trippin?", fullProfile.data.dateOfBirth);
      setUserInfo({
        dateOfBirth: fullProfile.data.dateOfBirth,
        phone: fullProfile.data.phone,
        email: fullProfile.data.email
      })
      // setUserInfo(fullProfile.data);
      //console.log("wahts in fullprofile", fullProfile.data);
      console.log("userInfo!!!!!!", userInfo);
      setLoading(false);
      console.log("whats the status of loading", loading);
      return fullProfile.data;
  }


    useEffect(() => {
      console.log("inside useeffect complete profile");
        if (props.selected !== null){
          console.log("inside useffect");
          //setLoading(true);
          getFullProfile();
        console.log("do we get it at this point?", userInfo);
        }
    }, [USER_ID]);

    // const makeRequest = () => {
    //     console.log("does the control even call this at all");
    //     if (props.selected !== null){
    //         console.log("making request");
    //     axios.get(`${BASE_URL}/user/${userID}`, { headers: {'app-id': APP_ID} })
    //     .then(({data}) => setUserInfo(data.data))
    //     .catch(console.error)
    //     .finally(() => setLoading(false));
    //     console.log("did we get the resopnse", userInfo);
    //     }
    // }


    const handleExpandClick = () => {
        setExpanded(!expanded);
      };


    return (
        <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title= {props.firstName}
          subheader={props.title}
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
              minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
              heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
              browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
              pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
              without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
              medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
              again without stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don’t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
    
}