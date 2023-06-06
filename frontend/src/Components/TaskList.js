import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Make API call to fetch tasks and update the tasks state
    const fetchTasks = async () => {
      try {
        const headersList = {
          'Content-Type': 'application/json',
        };

        const reqOptions = {
          url: 'http://localhost:5000/api/task',
          method: 'GET',
          headers: headersList,
        };

        const response = await axios.request(reqOptions);
        const data = await response.data.data;
        const sortedData = data.sort((a, b) => {
          if (a.status > b.status) return -1;
          if (a.status < b.status) return 1;
          return 0;
        });
        setTasks(sortedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  const handleStatusUpdate = async (taskId, newStatus) => {
    // Make API call to update the status of the task
    // Update tasks state with the updated task
    try {
      const headersList = {
        'Content-Type': 'application/json',
      };

      const reqOptions = {
        url: `http://localhost:5000/api/task/${taskId}`,
        method: 'PUT',
        headers: headersList,
        data: {
          status: newStatus,
        },
      };

      const response = await axios.request(reqOptions);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  const handleDelete = async (taskId) => {
    // Make API call to deconste the task
    // Remove the task from tasks state
    try {
      const headersList = {
        'Content-Type': 'application/json',
      };

      const reqOptions = {
        url: `http://localhost:5000/api/task/${taskId}`,
        method: 'Delete',
        headers: headersList,
      };

      const response = await axios.request(reqOptions);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <Container>
      <h1>Task List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                {task.status !== 'Done' && (
                  <Button
                    variant="info"
                    onClick={() =>
                      handleStatusUpdate(
                        task._id,
                        task.status === 'To Do' ? 'In Progress' : 'Done'
                      )
                    }
                  >
                    {task.status === 'To Do' ? 'In Progress' : 'Done'}
                  </Button>
                )}{' '}
                <Button variant="danger" onClick={() => handleDelete(task._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TaskList;
