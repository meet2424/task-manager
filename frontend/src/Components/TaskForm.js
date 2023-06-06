import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const headersList = {
      'Content-Type': 'application/json',
    };

    const bodyContent = JSON.stringify({
      title,
      description,
      status,
    });

    const reqOptions = {
      url: 'http://localhost:5000/api/task',
      method: 'POST',
      headers: headersList,
      data: bodyContent,
    };

    const response = await axios.request(reqOptions);
    console.log(response.data);

    // Reset form fields
    setTitle('');
    setDescription('');
    setStatus('');
    window.location.reload();
  };

  return (
    <Container>
      <h1>Add New Task</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={status}
            required
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="addTask">
          Add Task
        </Button>
      </Form>
    </Container>
  );
}

export default TaskForm;
