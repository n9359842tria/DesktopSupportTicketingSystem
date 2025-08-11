import React, { useState } from 'react';
import TicketCreationForm from './TicketCreationForm'; // Adjust path as needed
import MyTickets from '../pages/MyTickets'; // Adjust path as needed

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);

  // Add new ticket to the list
  const addTicket = (newTicket) => {
    // Optionally add an _id or createdAt here for demo purposes
    const ticketWithId = { ...newTicket, _id: Date.now().toString(), createdAt: new Date() };
    setTickets((prevTickets) => [ticketWithId, ...prevTickets]);
  };

  return (
    <div>
      <TicketCreationForm addTicket={addTicket} />
      <MyTickets tickets={tickets} />
    </div>
  );
};

export default TicketPage;