import React, { useState } from 'react';  
import TicketCreationForm from '../components/TicketCreationForm';
//import { useAuth } from '../context/AuthContext';

const Tickets = () => {
  //const { user } = useAuth();
  const [editingTicket, setEditingTicket] = useState(null);

  return (
    <div className="container mx-auto p-6">
      <TicketCreationForm editingTicket={editingTicket} setEditingTicket={setEditingTicket} />
    </div>
  );
}rhrh

export default Tickets;