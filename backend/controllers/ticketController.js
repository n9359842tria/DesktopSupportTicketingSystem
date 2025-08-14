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
