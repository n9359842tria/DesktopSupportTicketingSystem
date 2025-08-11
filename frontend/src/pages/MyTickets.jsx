import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TicketList from '../components/TicketList';
import { useAuth } from '../context/AuthContext';

const MyTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  //const [loading, setLoading] = useState(true);  // add loading state
  //const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user || !user.token) return;

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
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      <TicketList tickets={tickets} />
    </div>
  );
};

export default MyTickets;