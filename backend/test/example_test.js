const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const { addTicket, getTickets, updateTicketStatus, deleteTicket } = require('../controllers/ticketController');
const { expect } = chai;

chai.use(chaiHttp);

describe('Ticket Controller Tests', () => {

  describe('Delete Ticket Function', () => {

    it('should delete a ticket successfully', async () => {
      const ticketId = new mongoose.Types.ObjectId();
      const req = { 
        params: { ticketId: ticketId.toString() },
        user: { _id: new mongoose.Types.ObjectId() } 
      };

      // Mock ticket found
      const ticket = { deleteOne: sinon.stub().resolves(), createdBy: req.user._id };
      const findStub = sinon.stub(Ticket, 'findOne').resolves(ticket);

      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await deleteTicket(req, res);

      expect(findStub.calledOnceWith({ _id: ticketId.toString(), createdBy: req.user._id })).to.be.true;
      expect(ticket.deleteOne.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Ticket deleted successfully' })).to.be.true;

      findStub.restore();
    });

    it('should return 404 if ticket not found', async () => {
      const req = { 
        params: { ticketId: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() } 
      };

      const findStub = sinon.stub(Ticket, 'findOne').resolves(null);
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await deleteTicket(req, res);

      expect(findStub.calledOnce).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Ticket not found or not authorized' })).to.be.true;

      findStub.restore();
    });

    it('should return 500 on error', async () => {
      const req = { 
        params: { ticketId: new mongoose.Types.ObjectId().toString() },
        user: { _id: new mongoose.Types.ObjectId() } 
      };

      const findStub = sinon.stub(Ticket, 'findOne').throws(new Error('DB Error'));
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await deleteTicket(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Error deleting ticket' })).to.be.true;

      findStub.restore();
    });

  });

  // You can similarly add tests for GET tickets
  describe('Get Tickets Function', () => {
    it('should return tickets for logged-in user', async () => {
      const userId = new mongoose.Types.ObjectId();
      const tickets = [{ _id: new mongoose.Types.ObjectId(), title: 'Test Ticket', createdBy: userId }];

      const findStub = sinon.stub(Ticket, 'find').resolves(tickets);
      const req = { user: { _id: userId } };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      await getTickets(req, res);

      expect(findStub.calledOnceWith({ createdBy: userId })).to.be.true;
      expect(res.json.calledWith(tickets)).to.be.true;

      findStub.restore();
    });

    it('should return 500 on error', async () => {
      const findStub = sinon.stub(Ticket, 'find').throws(new Error('DB Error'));
      const req = { user: { _id: new mongoose.Types.ObjectId() } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await getTickets(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'Server error fetching tickets' })).to.be.true;

      findStub.restore();
    });
  });

});
