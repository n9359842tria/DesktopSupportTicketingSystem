const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { protect } = require('../middleware/authMiddleware');

// GET /api/tickets - get tickets created by logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const tickets = await Ticket.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Server error fetching tickets' });
  }
});

// POST /api/tickets - create new ticket
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, priority, category, assignedTo } = req.body;

    const ticket = new Ticket({
      title,
      description,
      priority,
      category,
      assignedTo,
      createdBy: req.user._id,
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Server error creating ticket' });
  }
});

// PATCH /api/tickets/:ticketId/status - update ticket status
router.patch('/:ticketId/status', protect, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const allowedStatuses = ['Open', 'In Progress', 'Completed', 'Closed'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const ticket = await Ticket.findOne({ _id: ticketId, createdBy: req.user._id });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found or not authorized' });
    }

    ticket.status = status;
    const updatedTicket = await ticket.save();

    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ message: 'Server error updating ticket status' });
  }
});

module.exports = router;