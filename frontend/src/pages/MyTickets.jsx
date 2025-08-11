const MyTickets = ({ tickets }) => {
  if (!tickets) return <p>Loading tickets...</p>;

  if (tickets.length === 0) {
    return <p>You have not created any tickets yet.</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h2>My Tickets</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tickets.map((ticket) => (
          <li
            key={ticket._id}
            style={{
              borderBottom: '1px solid #ccc',
              padding: '15px 0',
            }}
          >
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>
              <strong>Status:</strong> {ticket.status || 'Open'} |{' '}
              <strong>Priority:</strong> {ticket.priority || 'Normal'}
            </p>
            <p>
              <small>Created At: {new Date(ticket.createdAt).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTickets;
