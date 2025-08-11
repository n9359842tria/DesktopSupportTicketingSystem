import React from 'react';

const TicketList = ({ tickets }) => {
  if (!tickets || tickets.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>No tickets found.</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>My Tickets</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tickets.map((ticket) => (
          <li
            key={ticket._id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
            }}
          >
            <p style={{ marginBottom: '10px' }}>
              <strong>Title:</strong> <span>{ticket.title}</span>
            </p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Priority:</strong> <span>{ticket.priority}</span>
            </p>
            <p style={{ marginBottom: '10px' }}>
              <strong>Description:</strong> <span>{ticket.description}</span>
            </p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Category:</strong> <span>{ticket.category || 'N/A'}</span>
            </p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Assigned To:</strong> <span>{ticket.assignedTo || 'Unassigned'}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
