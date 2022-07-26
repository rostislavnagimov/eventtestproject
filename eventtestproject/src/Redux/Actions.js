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

export function Filter(condition){
    let arr;
    if (condition.includes(',')){
        arr = JSON.parse("[" + condition + "]");
        return{
            type: FILTER,
            data: arr
        }
    } 
    else if(typeof condition[0] == 'string'){
        arr = JSON.parse("[" + condition + "]");
        return{
            type: FILTER,
            data: arr
        }
    } else {
        return{
            type: FILTER,
            data: condition
        }
    }
    
}