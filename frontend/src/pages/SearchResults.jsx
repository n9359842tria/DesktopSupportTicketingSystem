import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const SearchResults = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user || !user.token) return;

      try {
        const response = await axiosInstance.get('/api/tickets', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTickets(response.data);
        setFilteredTickets(response.data);
      } catch (error) {
        alert('Failed to fetch tickets.');
      }
    };

    fetchTickets();
  }, [user]);

  useEffect(() => {
    const filtered = tickets.filter((ticket) =>
      // filter by any field you want, here by title or description (case-insensitive)
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.priority && ticket.priority.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.category && ticket.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.assignedTo && ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredTickets(filtered);
  }, [searchTerm, tickets]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Service Ticket Search</h1>
      <input
        type="text"
        placeholder="Search tickets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-4 p-2 border rounded w-full max-w-lg"
      />

      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Priority</th>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {filteredTickets.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No tickets found.
              </td>
            </tr>
          ) : (
            filteredTickets.map((ticket) => (
              <tr key={ticket._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{ticket.title}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.description}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.priority}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.category || 'N/A'}</td>
                <td className="border border-gray-300 px-4 py-2">{ticket.assignedTo || 'Unassigned'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;