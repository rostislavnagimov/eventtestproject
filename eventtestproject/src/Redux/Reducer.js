export const LOAD = 'LOAD';
export const FILTER = 'FILTER';
export const ERROR = 'ERROR';



const initialState = {
    response: [],
    filter: [],
    error: null
}

export const Reducer = (state = initialState, action) => {
    switch(action.type){
    
    case LOAD:
        return{
            ...state,
            response: action.data
        }
    
    case FILTER:
        return{
            ...state,
            filter: [action.data]
        }

    case ERROR:
        return{
            ...state,
            error: true
        }
    
    default:
        return state;
    }
}