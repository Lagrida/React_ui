import React, {useState, useEffect, useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    backdrop1:{
        position: 'absolute',
        zIndex: 200,
        verticalAlign: 'middle',
        textAlign:'center'
    },
    backdrop2:{
        position: 'absolute',
        top: '50%',
        right: '50%',
        zIndex: 201,
        opacity: 1,
        transform: 'translate(50%,-50%)',
        color: 'white'
    }
}));
const styleInit = {
    style:{
        top: 0,
        left: 0,
        width: 0,
        height: 0
    }
}
const colorVariants = ['255,255,255', '248, 249, 250', '52, 58, 64','0, 123, 255', '108, 117, 125', '40, 167, 69', '220, 53, 69', '255, 193, 7', '23, 162, 184']
const colorVariantsHex = ['#FFFFFF', '#F8F9FA', '#343A40', '#007BFF', '#6C757D', '#28A745', '#DC3545', '#FFC107', '#17A2B8'];
export const colorNameVariants = ['white', 'light', 'dark', 'primary', 'secondary', 'success', 'danger', 'warning', 'info'];

function Overlay(props){
    const classes = useStyles();
    const node1 = useRef(null);
    const node2 = useRef(styleInit);
    const colorIndex = colorNameVariants.findIndex(el => el === props.variant);
    const color = colorVariants[colorIndex == -1 ? 2 : colorIndex];
    const opacity = props.opacity ?? 0.3;
    const styles = {
        backgroundColor: `rgba(${color},${opacity})`
    }
    const rectBound = event => {
        node2.current.style.top = node1.current.offsetTop + 'px';
        node2.current.style.left = node1.current.offsetLeft + 'px';
        node2.current.style.width = node1.current.offsetWidth + 'px';
        node2.current.style.height = node1.current.offsetHeight + 'px';
    }
    useEffect(() => {
        if(props.show){
            rectBound(null);
        }else{
            node2.current = styleInit;
        }
    }, [props.show]);
    useEffect(() => {
        window.addEventListener('resize', rectBound);
        return () => {
            window.removeEventListener('resize', rectBound);
        }
    }, []);
    return(
        <div ref={node1}>
            {props.show && 
            <div className={classes.backdrop1} style={styles} ref={node2}>
                <div className={classes.backdrop2}>
                    <CircularProgress color="secondary" />
                </div>
            </div>
            }
            {props.children}
        </div>
    );
}

export default Overlay;
