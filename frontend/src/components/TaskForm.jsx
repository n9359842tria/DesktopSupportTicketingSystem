import { useState } from 'react';

const TicketCreationForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [category, setCategory] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const ticketData = {
      title,
      description,
      priority,
      category,
      assignedTo,
    };

    console.log('Submitting ticket:', ticketData);

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setCategory('');
    setAssignedTo('');
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '6px',
    marginBottom: '20px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    marginBottom: '4px',
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '10px',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const buttonStyle = {
    padding: '12px 24px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create a New Ticket</h2>

      <label style={labelStyle}>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Enter ticket title"
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Describe the issue or request"
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </label>

      <label style={labelStyle}>
        Priority:
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={inputStyle}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
      </label>

      <label style={labelStyle}>
        Category:
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="e.g. Software, Hardware"
          style={inputStyle}
        />
      </label>

      <label style={labelStyle}>
        Assign To:
        <input
          type="text"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          placeholder="Assign to staff member"
          style={inputStyle}
        />
      </label>

      <div style={{ textAlign: 'center' }}>
        <button type="submit" style={buttonStyle}>
          Create Ticket
        </button>
      </div>
    </form>
  );
};

export default TicketCreationForm;
