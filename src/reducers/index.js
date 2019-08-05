import { combineReducers } from 'redux';

const initState = {
    tasks: JSON.parse(localStorage.getItem('zen3Tasks')) ? JSON.parse(localStorage.getItem('zen3Tasks')) : []
}

function saveLocal(data) {
    localStorage.setItem('zen3Tasks', JSON.stringify(data));
}


function reducer(state = initState, action) {
    switch (action.type) {
        case 'ADD_TASKS':
            return {
                ...state,
                tasks: action.payload
            };
        case 'ADD_TASK': {
            let tasks = [...state.tasks];
            const task = {
                ...action.payload,
                id: `TASK_${tasks.length + 1}`
            };
            tasks.push(task);
                saveLocal(tasks);
            return {
                ...state,
                tasks
            };
        }
        case 'UPDATE_TASK': {
            let tasks = [...state.tasks];
            tasks = tasks.map(d => {
                if (d.id === action.payload.id) {
                    return action.payload
                } else return d;
            });
            saveLocal(tasks);
            return {
                ...state,
                tasks
            }
        }
        case 'DELETE_TASK': {
            let tasks = [...state.tasks];
            tasks = tasks.filter(d => d.id !== action.payload);
            saveLocal(tasks);
            return {
                ...state,
                tasks
            }
        };
        default: return state
    }
}

export default combineReducers({
    reducer
});