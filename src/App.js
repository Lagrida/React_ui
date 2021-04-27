import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react'
import './App.css';
import Overlay from './Overlay';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import CreateIcon from '@material-ui/icons/Create';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import {colorNameVariants} from './Overlay';
import handleChange from './handleChange'

const useStyles = makeStyles(theme => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "25px"
  },
  avatar: {
    textAlign: 'center',
    background: '#008B8B',
    width: theme.spacing(7),
    height: theme.spacing(7),
  }
}));
const userInfoInit = {
  username: '',
  email: '',
  password: ''
}
const helperInit = {
  loading: true
}
function App() {
  const classes = useStyles();
  const [userInfo, setUserInfo] = useState(() => userInfoInit);
  const [helper, setHelper] = useState(() => helperInit);
  const [overlayInfo, setOverlayInfo] = useState(() => ({
    opacity: 0.3,
    variant: colorNameVariants[2]
  }));
  const handleSubmit = event => {
    event.preventDefault();
    setHelper(d => ({...d, loading:!helper.loading}));
  }
  return (
    <div>
      <Container component="main" maxWidth="md" style={{ marginTop: 20 }}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item xs={12} sm={10} md={9}>
            <Grid container style={{ marginTop: 20, marginBottom:20 }}>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Variant</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={overlayInfo.variant}
                      name="variant"
                      onChange={event => handleChange(event, setOverlayInfo)}
                      
                      label="Variant">
                      {colorNameVariants.map((color, index) => 
                        <MenuItem value={color} key={`color-${index}`}>{color}</MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10, marginBottom:10 }}>
                  <Typography gutterBottom>Opacity</Typography>
                  <Slider
                    value={overlayInfo.opacity}
                    min={0}
                    step={0.1}
                    max={1}
                    onChange={(event, newValue) => setOverlayInfo(d => ({...d, opacity:newValue}))}
                    valueLabelDisplay="auto"
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 10, marginBottom:2 }}>
                  <div style={{borderTop: '1px solid #CCC', marginTop: '6px', padding: 10, background:'#F5F2F0'}}>
                        &lt;Overlay show=&#123;true&#125; variant="{overlayInfo.variant}" opacity=&#123;{overlayInfo.opacity}&#125;&gt;<br />
                        &nbsp; &nbsp; &#123;/*your template here*/&#125;<br />
                        &lt;/Overlay&gt;
                  </div>
                </Grid>
            </Grid>
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <CreateIcon style={{ fontSize: '40px' }} />
              </Avatar>
              <Typography component="h3" variant="h4" align="center">
                Register new User
              </Typography>
              <div style={{ marginTop: 10, marginBottom:10 }}>
              <Button color="primary" variant="contained" onClick={() => setHelper(d => ({...d, loading:!helper.loading}))}>Toggle overlay</Button>
              </div>
              <Overlay show={helper.loading} variant={overlayInfo.variant} opacity={overlayInfo.opacity}>
              <Grid container>
                
                  <Grid item xs={12}>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        margin="normal"
                        fullWidth
                        label="username"
                        variant="outlined"
                        name="username"
                        value={userInfo.username}
                        onChange={event => handleChange(event, setUserInfo)}
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="email"
                        value={userInfo.email}
                        onChange={event => handleChange(event, setUserInfo)}
                      />
                      <TextField
                        margin="normal"
                        fullWidth
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={userInfo.password}
                        onChange={event => handleChange(event, setUserInfo)}
                      />
                      <Grid container spacing={3} justify="center" alignItems="center">
                        <Grid item xs={6}>
                        </Grid>
                        <Grid item xs={6}>
                          <Button variant="contained" type="submit" color="secondary" fullWidth>
                            Register
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </Grid>
              </Grid>
              </Overlay>
            </Paper>
            <div style={{ padding: 15, textAlign:'center' }}>
                LAGRIDA &copy;
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
