
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createFile } from '../../actions/converter';
import '../Main/Main.css'
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width:300
    },
}));


function CreateFile(props) {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [type, setType] = useState("");


    const createNewFile = () => {
        props.createFile(props.converter.currentFile, name, type)
    }

    return (
        <div style={{ padding: 20 }}>
            <Card style={{ background: 'transparent', margin: 10,width:700 }} >
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="component-helper">Name</InputLabel>
                    <Input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        disabled={props.converter.currentFile.length <1}
                    />
                    <FormHelperText id="component-helper-text">Type name for the new file</FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="component-helper">Type</InputLabel>
                    <Select value={type} onChange={(event) => setType(event.target.value)} disabled={props.converter.currentFile.length <1}>
                        <MenuItem value={"H264"}>HD H264 File</MenuItem>
                        <MenuItem value={"Thumbnail"}>Thumbnail from the first and third second of the 4k file</MenuItem>
                        <MenuItem value={"HLS"}>Multibit rate HLS files</MenuItem>
                    </Select>
                    <FormHelperText>Select type of the new file</FormHelperText>
                </FormControl>
            </Card>
            <Button variant="outlined" onClick={createNewFile} disabled={props.converter.currentFile.length <1}>
                Convert
            </Button>
        </div>
    )
}

CreateFile.propTypes = {
    createFile: PropTypes.func.isRequired,
    converter: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    converter: state.converter,
})

export default connect(mapStateToProps, { createFile })(withRouter(CreateFile));
