import React, { useState, useEffect,useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { chooseFile } from '../../actions/converter';
import '../ChooseFile/ChooseFile.css'

function ChooseFile(props) {
    const [file, setFile] = useState("");
    const inputRef = useRef();

    useEffect(() => {
        if (props.converter.currentFile.name === undefined) {
          inputRef.current.value = [];
        } 
      }, [props.converter.currentFile.name]);

    const handleChange = (file) => {
        if (file[0] != undefined) {
            setFile(file[0].name)
            props.chooseFile(file)
        }
    }

    return (
        <div>
            <div className="div">
                <label for="file-upload" class="choose-file" >
                    <i></i> Choose video file
            </label>
                <input ref={inputRef} id="file-upload" type="file" onChange={(e) => handleChange(e.target.files)} disabled={props.converter.isProcess} />
            </div>
            <label>{props.converter.currentFile.name}</label>
        </div>)
}

ChooseFile.propTypes = {
    chooseFile: PropTypes.func.isRequired,
    converter: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    converter: state.converter,
})

export default connect(mapStateToProps, { chooseFile })(withRouter(ChooseFile));