// getTickets
const tickets = await Ticket.find({ createdBy: req.user.id });

// addTicket
const ticket = await Ticket.create({
  createdBy: req.user.id,
  title,
  description,
  priority,
  category,
  assignedTo,
});

// updateTicket authorization
if (ticket.createdBy.toString() !== req.user.id) {
  return res.status(403).json({ message: 'Not authorized to update this ticket' });
}

// deleteTicket authorization
if (ticket.createdBy.toString() !== req.user.id) {
  return res.status(403).json({ message: 'Not authorized to delete this ticket' });
}
const Ticket = require('../models/Ticket');

// GET /api/tickets - get all tickets for logged-in user
const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user.id });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Server error fetching tickets', error: error.message });
  }
};

// POST /api/tickets - create new ticket
const addTicket = async (req, res) => {
  const { title, description, priority, category, assignedTo } = req.body;
  try {
    const ticket = await Ticket.create({
      createdBy: req.user.id,
      title,
      description,
      priority,
      category,
      assignedTo,
      status: 'Open',
      createdAt: new Date(),
      statusUpdatedAt: new Date(),
    });
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Server error creating ticket', error: error.message });
  }
};

// PATCH /api/tickets/:id - update ticket
const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    // Authorization check
    if (ticket.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this ticket' });
    }

    const { title, description, priority, category, assignedTo, status } = req.body;

    ticket.title = title ?? ticket.title;
    ticket.description = description ?? ticket.description;
    ticket.priority = priority ?? ticket.priority;
    ticket.category = category ?? ticket.category;
    ticket.assignedTo = assignedTo ?? ticket.assignedTo;
    ticket.status = status ?? ticket.status;
    ticket.statusUpdatedAt = new Date();

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ message: 'Server error updating ticket', error: error.message });
  }
};

// DELETE /api/tickets/:id - delete ticket
const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    // Authorization check: only creator can delete
    if (ticket.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this ticket' });
    }

    await ticket.remove();
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Server error deleting ticket', error: error.message });
  }
};

module.exports = { getTickets, addTicket, updateTicket, deleteTicket };
