import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

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
            <h3 style={{ marginBottom: '10px' }}>{ticket.title}</h3>
            <p style={{ marginBottom: '10px' }}>{ticket.description}</p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Priority:</strong> {ticket.priority}
            </p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Category:</strong> {ticket.category || 'N/A'}
            </p>
            <p style={{ marginBottom: '6px' }}>
              <strong>Assigned To:</strong> {ticket.assignedTo || 'Unassigned'}
            </p>
            <p style={{ fontSize: '0.9em', color: '#666' }}>
              Created at: {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;