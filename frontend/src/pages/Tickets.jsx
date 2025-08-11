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
    if (!user || !user.token) {
      console.log('No user or token available — skipping fetch');
      return;
    }

    try {
      console.log('Fetching tickets with token:', user.token);
      const response = await axiosInstance.get('/api/tickets', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log('Tickets fetched successfully:', response.data);
      setTickets(response.data);
    } catch (error) {
      // Log full error object for better visibility
      console.error('Failed to fetch tickets:', error.response || error.message || error);
      alert('Failed to fetch tickets.');
    }
  };

    fetchTickets();
  }, [user]);

  return (
      <div className="container mx-auto p-6">
      <TicketCreationForm setTickets={setTickets} editingTicket={editingTicket} setEditingTicket={setEditingTicket} />
      <TicketList tickets={tickets} />
    </div>
  );
};

export default Tickets;
