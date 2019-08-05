import React from 'react';

class NewRow extends React.Component {

    state = {
        workItem: '',
        dueDate: '',
        resources: '',
        status: 'In Progress'
    }

    render() {
        const { id } = this.state;
        const keys = ['workItem', 'dueDate', 'resources'];
        return (
            <tr>
                <td>{id}</td>
                {
                    keys.map(d => {
                        return (<td key={d}>{
                            <input type={d === 'dueDate' ? 'date' : d === 'resources' ? 'number' : 'text'} value={this.state[d]}
                                onChange={(e) => this.setState({ [d]: e.target.value })} />
                        }</td>)
                    })
                }
                <td>
                    {
                        <select defaultValue={this.state.status} onChange={(e) => this.setState({ status: e.target.value })}>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                            <option value="Over Due">Over Due</option>
                        </select>
                    }

                </td>
                <td>{
                    <div>
                        <button className='button button-green' onClick={() => {
                            this.props.addTask(this.state);
                            this.props.newTask(false)
                        }}>Add Task</button>
                        <button className="button button-orange" onClick={() => this.props.newTask(false)}>Cancel</button>
                    </div>
                }</td>
            </tr>
        )
    }
}
export default NewRow;