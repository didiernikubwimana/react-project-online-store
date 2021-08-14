import React from 'react';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';

import randomImages from "../constants/Images";
import {Image} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexGrow: 1,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        width:200,
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList className={classes.imageList} cols={4}>
                <ImageListItem>
                    <img src="https://source.unsplash.com/400x400/?computers,technology"/>
                </ImageListItem>
                <ImageListItem>
                    <img src="https://source.unsplash.com/400x400/?shoes,sports"/>
                </ImageListItem>
                <ImageListItem>
                    <img src="https://source.unsplash.com/400x400/?clothing,fashion"/>
                </ImageListItem>
                <ImageListItem>
                    <img src="https://source.unsplash.com/400x400/?food, healthy"/>
                </ImageListItem>
            </ImageList>
        </div>
    );
}
