// https://docs.google.com/spreadsheets/d/165QzM_LgYMmMhoLhg5s7kEwyabQz1OAHXs_qfa9SQko/edit#gid=238997362

// App.js
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PieChart } from 'react-d3-components';
import { updateTask, addTask, deleteTask, addTasks } from './actions/';
import EditableRow from './component/EditableRow';
import NewRow from './component/NewRow'
import './App.scss';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      render: false,
      tasks: [],
      pieData: {
        values: [{ x: 'SomethingA', y: 10 }, { x: 'SomethingB', y: 4 }, { x: 'SomethingB', y: 4 }, { x: 'SomethingB', y: 4 }, { x: 'SomethingC', y: 3 }]
      }
    }
  }

  static getDerivedStateFromProps(props) {
    let values = {};
    props.tasks.map(d => {
      if (values[d.status]) {
        values[d.status] += 1;
      } else values[d.status] = 1;
      return d;
    })
    values = Object.keys(values).map(d => ({ x: d, y: values[d] }));
    return {
      pieData: {
        values
      }
    }
  }

  deleteTask = (id) => {
    this.props.deleteTask(id);
    this.forceUpdate();
  }

  newTask = (status) => {
    this.setState({ newTask: status })
  }

  render() {
    const t = this.props.tasks;
    const { newTask, pieData } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="title">React Frontend Challenge - Zen3</h1>
        </header>
        <div className='stats'>
          {
            pieData.values.length > 0 ?
              <PieChart
                data={pieData}
                width={400}
                tooltipHtml={(x, y) => {
                  return <><p>{x}: {y}</p></>
                }}
                height={200}
                margin={{ top: 20, bottom: 20, left: 20, right: 20 }}
              /> : null
          }
        </div>
        <div className='section'>
          <button onClick={() => this.newTask(true)} className='button button-blue'>Add New Task</button>
        </div>

        <div className='container'>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Work Item</th>
                <th>Due Date</th>
                <th>No of Resources Needed</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                t.length === 0 && !newTask ? <tr><td className='noData' colSpan={6}>No Tasks Found</td></tr> : null
              }
              {
                t.map((d, i) => {
                  return <EditableRow
                    key={d.id}
                    data={d}
                    deleteTask={this.deleteTask}
                    updateTasks={() => { }}
                  />
                })
              }
              {
                newTask ?
                  <NewRow id={this.props.tasks.length + 1} addTask={this.props.addTask} newTask={this.newTask} /> : null
              }
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.reducer.tasks
});

const mapDispatchToProps = dispatch => ({
  updateTask: (data) => dispatch(updateTask(data)),
  addTask: (data) => dispatch(addTask(data)),
  addTasks: (data) => dispatch(addTasks(data)),
  deleteTask: (data) => dispatch(deleteTask(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);