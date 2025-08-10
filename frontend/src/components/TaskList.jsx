import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const TicketList = ({ tickets, setTickets, setEditingTicket }) => {
  const { user } = useAuth();

  const handleDelete = async (ticketId) => {
    try {
      await axiosInstance.delete(`/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
    } catch (error) {
      alert('Failed to delete ticket.');
    }
  };

  return (
    <div>
      {tickets.map((ticket) => (
        <div key={ticket._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">{ticket.title}</h2>
          <p>{ticket.description}</p>
          <p className="text-sm text-gray-600">
            Priority: <span className="font-semibold">{ticket.priority}</span> | Category: <span className="font-semibold">{ticket.category}</span>
          </p>
          <p className="text-sm text-gray-600">
            Assigned To: <span className="font-semibold">{ticket.assignedTo || 'Unassigned'}</span>
          </p>
          <p className="text-sm text-gray-500">Status: {ticket.status || 'Open'}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingTicket(ticket)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(ticket._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
