import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const fontStyle = {
    color: '#eceff1',
    fontSize: 22
}

function Navbar (props){
        return (
            <nav className="navbar navbar-expand-lg" style={{ background: '#1a237e' }}>
                <Link className="navbar-brand" to="/" style={fontStyle}>
                    <Typography variant="overline" style={{ color: '#eceff1', fontSize: 14 }}>Welcome ArtList</Typography>
                </Link>
            </nav>
        )
    }
export default Navbar;