import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { IconButton, Typography } from '@material-ui/core';

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

Navbar.propTypes = {
    
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps)(withRouter(Navbar));