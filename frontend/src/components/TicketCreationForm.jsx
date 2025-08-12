import { useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const TicketCreationForm = ({ setTickets }) => {
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTicket = {
        title,
        description,
        priority,
        category,
        assignedTo,
      };

      await axiosInstance.post('/api/tickets', newTicket, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setSuccessMsg('Ticket created successfully! You can see it in My Tickets.');

      // Reset form fields
      setTitle('');
      setDescription('');
      setPriority('Medium');
      setCategory('');
      setAssignedTo('');
    } catch (error) {
      alert('Failed to create ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto my-5 p-4 border rounded shadow-sm bg-light" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Create a New Ticket</h2>

      {successMsg && (
        <div className="alert alert-success text-center" role="alert">
          {successMsg}
        </div>
      )}

      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-semibold">
          Title:
        </label>
        <input
          id="title"
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter ticket title"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-semibold">
          Description:
        </label>
        <textarea
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Describe the issue or request"
          rows={5}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="priority" className="form-label fw-semibold">
          Priority:
        </label>
        <select
          id="priority"
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>P1 Critical</option>
          <option>P2 High</option>
          <option>P3 Moderate</option>
          <option>P4 Low</option>
          <option>P5 Informational</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label fw-semibold">
          Category:
        </label>
        <input
          id="category"
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Software, Hardware"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="assignedTo" className="form-label fw-semibold">
          Assign To:
        </label>
        <input
          id="assignedTo"
          type="text"
          className="form-control"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Assign to staff member"
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary px-4">
          Create Ticket
        </button>
      </div>
    </form>
  );
};

export default TicketCreationForm;