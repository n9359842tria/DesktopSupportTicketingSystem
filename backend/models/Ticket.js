const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    enum: ['P1 Critical', 'P2 High', 'P3 Moderate', 'P4 Low', 'P5 Informational'],
    required: true,
    default: 'P3 Moderate',
  },
  category: {
    type: String,
    trim: true,
  },
  assignedTo: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Completed', 'Closed'],
    default: 'Open',
  },
  statusUpdatedAt: {
    type: Date,
    default: Date.now,
  },
  responseDueAt: Date,     // Target response time deadline
  resolutionDueAt: Date,   // Target resolution time deadline
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Ticket', ticketSchema);