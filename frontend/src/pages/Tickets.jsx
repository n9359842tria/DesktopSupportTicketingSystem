import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TicketCreationForm from '../components/TicketCreationForm'; // renamed import to match usage
import TicketList from '../components/TicketList'; // renamed import to match usage
import { useAuth } from '../context/AuthContext';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user || !user.token) return; // wait for user and token

      try {
        const response = await axiosInstance.get('/api/tickets', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTickets(response.data);
      } catch (error) {
        alert('Failed to fetch tickets.');
      }
    };

    fetchTickets();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <TicketCreationForm
        setTickets={setTickets}
        editingTicket={editingTicket}
        setEditingTicket={setEditingTicket}
      />
      <TicketList
        tickets={tickets}
        setTickets={setTickets}
        setEditingTicket={setEditingTicket}
      />
    </div>
  );
};

export default Tickets;
