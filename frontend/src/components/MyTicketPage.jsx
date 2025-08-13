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
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>{ticket.title}</p>
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>{ticket.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
What’s changed:
Removed all fields except title and description.

Made both title and description bold using inline style fontWeight: 'bold'.

Kept spacing with marginBottom.

Let me know if you want the labels ("Title:" / "Description:") included or styled differently!








You said:
i also want priority, description and assigned to as well


ChatGPT said:
Sure! Here’s the updated TicketList.jsx that shows title, priority, description, and assigned to, all with labels and the title and description bolded for emphasis:

jsx
Copy
Edit
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
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>{ticket.title}</p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Priority:</strong> {ticket.priority}
            </p>
            <p style={{ marginBottom: '10px', fontWeight: 'bold' }}>{ticket.description}</p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Assigned To:</strong> {ticket.assignedTo || 'Unassigned'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;