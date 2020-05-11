import { } from '../actions/types';
import { CHOOSE_FILE,FILE_CREATED,CREATE_FILE} from '../actions/types';

const initialState = {
    currentFile:[],
    isProcess:false,
}
 
export default function (state = initialState, action) {
    switch (action.type) {
        case CHOOSE_FILE:
            return{
                ...state,
                currentFile: action.payload
            }
        case CREATE_FILE:
            return{
                ...state,
                isProcess:true,
                currentFile:[],
            }
        case FILE_CREATED:
                return{
                    ...state,
                    isProcess:false
                }
        default:
            return state;
    }
}


