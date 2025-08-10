const Ticket = require('../models/Ticket');

const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.id });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTicket = async (req, res) => {
  const { title, description, priority, category, assignedTo } = req.body;
  try {
    const ticket = await Ticket.create({
      userId: req.user.id,
      title,
      description,
      priority,
      category,
      assignedTo,
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  const { title, description, priority, category, assignedTo, status } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.priority = priority || ticket.priority;
    ticket.category = category || ticket.category;
    ticket.assignedTo = assignedTo || ticket.assignedTo;
    ticket.status = status || ticket.status; // e.g. 'open', 'in progress', 'closed'

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    await ticket.remove();
    res.json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTickets, addTicket, updateTicket, deleteTicket };
