import TicketCreationForm from '../components/TicketCreationForm'; // renamed import to match usage
import TicketList from '../components/TicketList'; // renamed import to match usage

const MyTickets = ({ tickets }) => {
  if (!tickets) return <p>Loading tickets...</p>;

  if (tickets.length === 0) {
    return <p>You have not created any tickets yet.</p>;
  }

  return (
    <div>
      <h2>My Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id} style={{ borderBottom: '1px solid #ccc', padding: '10px 0' }}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>
              <strong>Status:</strong> {ticket.status} | <strong>Priority:</strong> {ticket.priority}
            </p>
            <p><small>Created At: {new Date(ticket.createdAt).toLocaleString()}</small></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyTickets;
