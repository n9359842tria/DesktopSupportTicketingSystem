const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const { protect } = require('../middleware/authMiddleware'); // adjust path if needed

console.log('Ticket model:', Ticket);

// GET /api/tickets - get tickets created by logged-in user
router.get('/', protect, async (req, res) => {
  try {
    // req.user is the full user document without password
    const userId = req.user._id;
    console.log(userId)
    const tickets = await Ticket.find({ createdBy: userId }).sort({ createdAt: -1 });
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
    console.log(title)

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

module.exports = router;
