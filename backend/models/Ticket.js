
const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['open', 'in progress', 'closed'], 
    default: 'open' 
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to User collection
    required: true,
  },
  // you can add more fields here as needed, e.g. assignedTo, category, etc.
});

module.exports = mongoose.model('Ticket', ticketSchema);