import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; // adjust if needed

// Helper to get remaining time string like "1d 3h 5m 12s"
const getRemainingTime = (targetDate) => {
  if (!targetDate) return 'N/A';

  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return 'Time passed';

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return `${days > 0 ? days + 'd ' : ''}${hours}h ${minutes}m ${seconds}s`;
};

// CountdownTimer component declared first and used below
const CountdownTimer = ({ targetDate }) => {
  const [remaining, setRemaining] = useState(getRemainingTime(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(getRemainingTime(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const isExpired = remaining === 'Time passed';

  return (
    <span style={{ color: isExpired ? 'red' : 'green' }}>
      {remaining}
    </span>
  );
};

const TicketList = ({ tickets, onStatusChange, user, setTickets }) => {
  if (!tickets || tickets.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '40px' }}>No tickets found.</p>;
  }

  const statuses = ['Open', 'In Progress', 'Completed', 'Closed'];

  const handleDeleteTicket = async (ticketId) => {
    try {
      await axiosInstance.delete(`/api/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket._id !== ticketId)
      );
    } catch (error) {
      alert('Failed to delete ticket.');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>My Tickets</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tickets.map((ticket) => {
          const showResponseDue = ticket.status === 'Open' && ticket.responseDueAt;
          const showResolutionDue = ticket.status === 'In Progress' && ticket.resolutionDueAt;

          return (
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
              <p style={{ marginBottom: '10px' }}>
                <strong>Title:</strong> <span>{ticket.title}</span>
              </p>
              <p style={{ marginBottom: '6px' }}>
                <strong>Created:</strong>{' '}
                {ticket.createdAt
                  ? new Date(ticket.createdAt).toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
                  : 'N/A'}
              </p>
              <p style={{ marginBottom: '6px' }}>
                <strong>Priority:</strong> <span>{ticket.priority}</span>
              </p>
              <p style={{ marginBottom: '10px' }}>
                <strong>Description:</strong> <span>{ticket.description}</span>
              </p>
              <p style={{ marginBottom: '6px' }}>
                <strong>Category:</strong> <span>{ticket.category || 'N/A'}</span>
              </p>
              <p style={{ marginBottom: '6px' }}>
                <strong>Assigned To:</strong> <span>{ticket.assignedTo || 'Unassigned'}</span>
              </p>

              <p style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <strong>Status:</strong>
                <select
                  value={ticket.status || 'Open'}
                  onChange={(e) => onStatusChange(ticket._id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                {ticket.status === 'Open' && ticket.responseDueAt && (
                  <CountdownTimer targetDate={ticket.responseDueAt} />
                )}
                {ticket.status === 'In Progress' && ticket.resolutionDueAt && (
                  <CountdownTimer targetDate={ticket.resolutionDueAt} />
                )}
              </p>

              {showResponseDue && (
                <p>
                  <strong>Time until Response Due:</strong>{' '}
                  <CountdownTimer targetDate={ticket.responseDueAt} />
                </p>
              )}

              {showResolutionDue && (
                <p>
                  <strong>Time until Resolution Due:</strong>{' '}
                  <CountdownTimer targetDate={ticket.resolutionDueAt} />
                </p>
              )}

              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this ticket?')) {
                    handleDeleteTicket(ticket._id);
                  }
                }}
                style={{
                  marginTop: '10px',
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete Ticket
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TicketList;
