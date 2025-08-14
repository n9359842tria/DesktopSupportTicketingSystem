const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { protect } = require('../middleware/authMiddleware');

// Helper to get SLA times in ms based on priority
const slaTimes = {
  response: {
    'P1 Critical': 15 * 60 * 1000,
    'P2 High': 60 * 60 * 1000,
    'P3 Moderate': 4 * 60 * 60 * 1000,
    'P4 Low': 24 * 60 * 60 * 1000,
    'P5 Informational': 2 * 24 * 60 * 60 * 1000,
  },
  resolution: {
    'P1 Critical': 4 * 60 * 60 * 1000,
    'P2 High': 24 * 60 * 60 * 1000,
    'P3 Moderate': 3 * 24 * 60 * 60 * 1000,
    'P4 Low': 5 * 24 * 60 * 60 * 1000,
    'P5 Informational': 10 * 24 * 60 * 60 * 1000,
  }
};

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
    console.log('Create ticket request body:', req.body);
    const { title, description, priority, category, assignedTo } = req.body;

    const ticket = new Ticket({
      title,
      description,
      priority,
      category,
      assignedTo,
      createdBy: req.user._id,
      status: 'Open',
      statusUpdatedAt: new Date(),
      responseDueAt: new Date(Date.now() + (slaTimes.response[priority] || slaTimes.response['P3 Moderate'])),
      resolutionDueAt: null,
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
    const { status: newStatus } = req.body;

    if (!newStatus) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const allowedStatuses = ['Open', 'In Progress', 'Completed', 'Closed'];
    if (!allowedStatuses.includes(newStatus)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const ticket = await Ticket.findOne({ _id: ticketId, createdBy: req.user._id });
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found or not authorized' });
    }

    const oldStatus = ticket.status;
    const now = new Date();

    if (oldStatus !== newStatus) {
      if (newStatus === 'Open') {
        ticket.responseDueAt = new Date(now.getTime() + (slaTimes.response[ticket.priority] || slaTimes.response['P3 Moderate']));
        ticket.resolutionDueAt = null;
      }

      if (oldStatus === 'Open' && newStatus === 'In Progress') {
        ticket.resolutionDueAt = new Date(now.getTime() + (slaTimes.resolution[ticket.priority] || slaTimes.resolution['P3 Moderate']));
        console.log('Setting resolutionDueAt:', ticket.resolutionDueAt);
      }

      ticket.status = newStatus;
      ticket.statusUpdatedAt = now;
    }

    const updatedTicket = await ticket.save();
    console.log('Updated Ticket:', updatedTicket);

    res.json(updatedTicket);
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ message: 'Server error updating ticket status' });
  }
});

// DELETE /api/tickets/:ticketId - delete ticket
router.delete('/:ticketId', protect, async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findOne({ _id: ticketId, createdBy: req.user._id });

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found or not authorized' });
    }

    await ticket.deleteOne();
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Error deleting ticket', error: error.message });
  }
});

module.exports = router;