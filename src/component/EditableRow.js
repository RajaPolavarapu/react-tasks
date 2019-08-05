import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTask, deleteTask } from '../actions/';

class EditableRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            ...props.data,
            updateTasks: props.updateTasks,
            deleteTask: props.deleteTask
        };
    }

    static getDerivedStateFromProps = (props) => {
        return {
            ...props
        };
    } 

   
    deleteTask = () => {
        const { id } = this.state;
        this.props.deleteTask(id);
    }

    updateTask = () => {
        const { id, workItem, dueDate, resources, status } = this.state;
        this.props.updateTask({
            id, workItem, dueDate, resources, status
        })
        this.setState({ edit: false })
    }

    render() {
        const { id, workItem, dueDate, resources, status } = this.state;
        const {edit} = this.state;
        return (
            <tr>
                <td>{id}</td>
                <td>
                    {
                        edit ?
                            <input type='text' value={workItem}
                                onChange={(e) => this.setState({ workItem: e.target.value })} /> :
                            <div className='workItem'>{workItem}</div>
                    }
                </td>
                <td>
                    {
                        edit ?
                            <input type='date' value={dueDate}
                                onChange={(e) => this.setState({ dueDate: e.target.value })} /> :
                            <div className='dueDate'>{dueDate}</div>
                    }
                </td>
                <td>
                    {
                        edit ?
                            <input type='number' value={resources}
                                onChange={(e) => this.setState({ resources: e.target.value })} /> :
                            <div className='resources'>{resources}</div>
                    }
                </td>
                <td>
                    {
                        edit ?
                            <select defaultValue={status} onChange={(e) => this.setState({ status: e.target.value })}>
                                <option value="In Progress">In Progress</option>
                                <option value="Done">Done</option>
                                <option value="Over Due">Over Due</option>
                            </select> :
                            <div className='status'>{status}</div>
                    }
                </td>
                <td>{
                    edit ?
                        <div class='buttons'>
                            <button className='button button-green' onClick={() => this.updateTask()}>Update</button>
                            <button className='button button-red' onClick={() => this.deleteTask()}>Delete</button>
                        </div> :
                        <div>
                            <button className='button button-green' onClick={() => this.setState({ edit: true })}>Edit</button>
                            <button className='button button-red' onClick={() => this.deleteTask()}>Delete</button>
                        </div>
                }</td>
            </tr>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    updateTask: (data) => dispatch(updateTask(data)),
    deleteTask: (data) => dispatch(deleteTask(data))
});

export default connect(null, mapDispatchToProps)(EditableRow);
