import { LOAD, FILTER, ERROR } from "./Reducer";

export function Load(request){
    return async dispatch => {
        try {
        const response = await fetch(request);
        const jsonData = await response.json();
        dispatch({
                type: LOAD,
                data: jsonData
            });
    
        } catch {
            dispatch({
                type: ERROR
            });
        }
        
    }}

export function Filter(input){
        return{
            type: FILTER,
            data: input
        }
}