import React from 'react';

const MyTickets = ({ tickets }) => {
  if (!tickets) return <p>Loading tickets...</p>;

  if (tickets.length === 0) {
    return <p>You have not created any tickets yet.</p>;
  }

  return (
    <div>
      <h2>My Tickets</h2>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket._id}>
            <strong>{ticket.title}</strong> - {ticket.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTickets;
