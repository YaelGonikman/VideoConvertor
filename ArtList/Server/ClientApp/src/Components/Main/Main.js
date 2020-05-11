
import React, { useState } from 'react';
import '../Main/Main.css'
import ChooseFile from '../ChooseFile/ChooseFile';
import CreateFile from '../CreateFile/CreateFile';
import { Card } from '@material-ui/core';


function Main(props) {
    return (
        <div className="divStyleMain">
            <Card style={{ background: 'transparent',margin:20 }}>
                <div>
                <ChooseFile />
                <CreateFile/>
                </div>
            </Card>
        </div>
    )
}


export default Main; 