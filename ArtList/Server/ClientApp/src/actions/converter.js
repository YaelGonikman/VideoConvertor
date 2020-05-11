import axios from 'axios';
import { CHOOSE_FILE, CREATE_FILE, FILE_CREATED } from './types';

export const chooseFile = (file) => dispatch => {
  dispatch({
    type: CHOOSE_FILE,
    payload: file[0]
  });
}

export const createFile = (file, name, type) => dispatch => {
  dispatch({
    type: CREATE_FILE,
    payload: true
  });

  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("type", type);
  console.log(formData)
  axios.post('api/Video/createFile', formData, {
    headers: {
      "Content-Type": "application/json"
    }
    ,
    responseType: 'blob',
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name + '.zip');
      document.body.appendChild(link);
      link.click();


      dispatch({
        type: FILE_CREATED,
        payload: true
      });
    })
}

