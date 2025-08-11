import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import { useAuth } from '../context/AuthContext';

const ALL_COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'priority', label: 'Priority' },
  { key: 'category', label: 'Category' },
  { key: 'assignedTo', label: 'Assigned To' },
];

const SearchResults = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);

  // State to track which columns are visible
  const [visibleColumns, setVisibleColumns] = useState(
    ALL_COLUMNS.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
  );

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
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.priority && ticket.priority.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.category && ticket.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ticket.assignedTo && ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredTickets(filtered);
  }, [searchTerm, tickets]);

  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Service Ticket Search</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search tickets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-4 p-2 border rounded w-full max-w-lg"
      />

      {/* Column filter checkboxes */}
      <div className="mb-4 flex flex-wrap gap-4">
        {ALL_COLUMNS.map(({ key, label }) => (
          <label key={key} className="inline-flex items-center space-x-2">
            <input
              type="checkbox"
              checked={visibleColumns[key]}
              onChange={() => toggleColumn(key)}
              className="form-checkbox"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* Tickets table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {ALL_COLUMNS.map(({ key, label }) =>
              visibleColumns[key] ? (
                <th key={key} className="border border-gray-300 px-4 py-2">{label}</th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {filteredTickets.length === 0 ? (
            <tr>
              <td colSpan={ALL_COLUMNS.filter(col => visibleColumns[col.key]).length} className="text-center p-4">
                No tickets found.
              </td>
            </tr>
          ) : (
            filteredTickets.map((ticket) => (
              <tr key={ticket._id} className="hover:bg-gray-100">
                {ALL_COLUMNS.map(({ key }) =>
                  visibleColumns[key] ? (
                    <td key={key} className="border border-gray-300 px-4 py-2">
                      {ticket[key] || (key === 'assignedTo' ? 'Unassigned' : 'N/A')}
                    </td>
                  ) : null
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;