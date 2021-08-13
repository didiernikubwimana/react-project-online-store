import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
 
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
  }
});
 
function Footer(props) {
  const { classes } = props;
 
  return (
    <footer className={classes.footer} >
      <Paper className={classes.root} elevation={1} style={{backgroundColor:"#137b82"}}>
        <Typography variant="h4" component="h2" style={{color:"#ffffff"}}>
         <center>Good, pretty, and cheap!!!</center> 
        </Typography>
        <Typography component="p" style={{color:"#ffffff"}}>
          @2021 All right reserved
        </Typography>
      </Paper>
    </footer>
  );
}
 
Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
 
export default withStyles(styles)(Footer);