import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TicketList from '../components/TicketList';
import { useAuth } from '../context/AuthContext';

const MyTickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.token) return;

    const fetchTickets = async () => {
      try {
        const response = await axiosInstance.get('/api/tickets', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTickets(response.data);
      } catch (error) {
        alert('Failed to fetch tickets.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await axiosInstance.patch(
        `/api/tickets/${ticketId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
        )
      );
    } catch (error) {
      alert('Failed to update ticket status.');
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Loading tickets...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Tickets</h1>
      <TicketList tickets={tickets} onStatusChange={handleStatusChange} />
    </div>
  );
};

export default MyTickets;