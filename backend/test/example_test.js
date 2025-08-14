const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');
const { getTickets, addTicket, updateTicket, deleteTicket } = require('../controllers/ticketController');
const { expect } = chai;

chai.use(chaiHttp);

describe('Ticket Controller Tests', () => {

  describe('Add Ticket', () => {
    it('should create a new ticket successfully', async () => {
      const req = {
        user: { id: new mongoose.Types.ObjectId().toString() },
        body: { title: 'Test Ticket', description: 'Desc', priority: 'P3 Moderate', category: 'General', assignedTo: 'User1' }
      };

      const createdTicket = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };
      const createStub = sinon.stub(Ticket, 'create').resolves(createdTicket);

      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await addTicket(req, res);

      expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdTicket)).to.be.true;

      createStub.restore();
    });

    it('should return 500 if error occurs', async () => {
      const req = { user: { id: new mongoose.Types.ObjectId().toString() }, body: {} };
      const createStub = sinon.stub(Ticket, 'create').throws(new Error('DB Error'));
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await addTicket(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

      createStub.restore();
    });
  });

  describe('Get Tickets', () => {
    it('should return tickets for logged-in user', async () => {
      const userId = new mongoose.Types.ObjectId().toString();
      const tickets = [{ _id: new mongoose.Types.ObjectId(), title: 'Ticket 1', userId }];

      const findStub = sinon.stub(Ticket, 'find').resolves(tickets);
      const req = { user: { id: userId } };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      await getTickets(req, res);

      expect(findStub.calledOnceWith({ userId })).to.be.true;
      expect(res.json.calledWith(tickets)).to.be.true;

      findStub.restore();
    });

    it('should return 500 on error', async () => {
      const findStub = sinon.stub(Ticket, 'find').throws(new Error('DB Error'));
      const req = { user: { id: new mongoose.Types.ObjectId().toString() } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await getTickets(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

      findStub.restore();
    });
  });

  describe('Update Ticket', () => {
    it('should update ticket successfully', async () => {
      const ticketId = new mongoose.Types.ObjectId().toString();
      const req = { 
        params: { id: ticketId }, 
        user: { id: new mongoose.Types.ObjectId().toString() }, 
        body: { title: 'Updated Title', status: 'Closed' } 
      };

      const ticket = { 
        _id: ticketId, 
        title: 'Old Title', 
        status: 'Open', 
        userId: req.user.id, 
        save: sinon.stub().resolvesThis() 
      };

      const findStub = sinon.stub(Ticket, 'findById').resolves(ticket);
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      await updateTicket(req, res);

      expect(ticket.title).to.equal('Updated Title');
      expect(ticket.status).to.equal('Closed');
      expect(res.json.calledOnce).to.be.true;

      findStub.restore();
    });

    it('should return 404 if ticket not found', async () => {
      const req = { params: { id: new mongoose.Types.ObjectId().toString() }, user: { id: '123' }, body: {} };
      const findStub = sinon.stub(Ticket, 'findById').resolves(null);
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await updateTicket(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Ticket not found' })).to.be.true;

      findStub.restore();
    });

    it('should return 500 on error', async () => {
      const req = { params: { id: new mongoose.Types.ObjectId().toString() }, user: { id: '123' }, body: {} };
      const findStub = sinon.stub(Ticket, 'findById').throws(new Error('DB Error'));
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await updateTicket(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

      findStub.restore();
    });
  });

  describe('Delete Ticket', () => {
    it('should delete ticket successfully', async () => {
      const ticketId = new mongoose.Types.ObjectId().toString();
      const req = { params: { id: ticketId }, user: { id: new mongoose.Types.ObjectId().toString() } };
      const ticket = { remove: sinon.stub().resolves() };

      const findStub = sinon.stub(Ticket, 'findById').resolves(ticket);
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await deleteTicket(req, res);

      expect(findStub.calledOnceWith(ticketId)).to.be.true;
      expect(ticket.remove.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: 'Ticket deleted' })).to.be.true;

      findStub.restore();
    });

    it('should return 404 if ticket not found', async () => {
      const ticketId = new mongoose.Types.ObjectId().toString();
      const req = { params: { id: ticketId }, user: { id: '123' } };

      const findStub = sinon.stub(Ticket, 'findById').resolves(null);
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await deleteTicket(req, res);

      expect(findStub.calledOnceWith(ticketId)).to.be.true;
      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Ticket not found' })).to.be.true;

      findStub.restore();
    });

    it('should return 500 on error', async () => {
      const ticketId = new mongoose.Types.ObjectId().toString();
      const req = { params: { id: ticketId }, user: { id: '123' } };
      const findStub = sinon.stub(Ticket, 'findById').throws(new Error('DB Error'));
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await deleteTicket(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

      findStub.restore();
    });
  });

});
