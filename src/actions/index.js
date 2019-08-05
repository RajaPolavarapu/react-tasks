export function updateTask(data) {
    return {
        type: 'UPDATE_TASK',
        payload: data
    }
}

export function addTasks(data) {
    return {
        type: 'ADD_TASKS',
        payload: data
    }
}

export function addTask(data) {
    return {
        type: 'ADD_TASK',
        payload: data
    }
}

export function deleteTask(data) {
    return {
        type: 'DELETE_TASK',
        payload: data
    }
}