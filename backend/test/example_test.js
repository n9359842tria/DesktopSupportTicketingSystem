const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const sinon = require('sinon');
const Ticket = require('../models/Ticket');
const { getTickets, addTicket, updateTicket, deleteTicket } = require('../controllers/ticketController');
const { expect } = chai;

chai.use(chaiHttp);

describe('AddTicket Function Test', () => {
  it('should create a new ticket successfully', async () => {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        title: "New Ticket",
        description: "Ticket description",
        priority: "P2 High",
        category: "IT Support",
        assignedTo: "Technician A"
      }
    };

    const createdTicket = { _id: new mongoose.Types.ObjectId(), userId: req.user.id, ...req.body };

    const createStub = sinon.stub(Ticket, 'create').resolves(createdTicket);

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await addTicket(req, res);

    expect(createStub.calledOnceWith({
      userId: req.user.id,
      ...req.body
    })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdTicket)).to.be.true;

    createStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    const createStub = sinon.stub(Ticket, 'create').throws(new Error('DB Error'));

    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        title: "New Ticket",
        description: "Ticket description",
        priority: "P2 High",
        category: "IT Support",
        assignedTo: "Technician A"
      }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await addTicket(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    createStub.restore();
  });
});

describe('UpdateTicket Function Test', () => {
  it('should update ticket successfully', async () => {
    const ticketId = new mongoose.Types.ObjectId();
    const existingTicket = {
      _id: ticketId,
      userId: new mongoose.Types.ObjectId(),
      title: "Old Ticket",
      description: "Old Description",
      priority: "P3 Moderate",
      category: "General",
      assignedTo: "Technician B",
      status: "Open",
      save: sinon.stub().resolvesThis()
    };

    const findByIdStub = sinon.stub(Ticket, 'findById').resolves(existingTicket);

    const req = {
      params: { id: ticketId },
      user: { id: existingTicket.userId.toString() },
      body: { title: "Updated Ticket", status: "In Progress" }
    };

    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

    await updateTicket(req, res);

    expect(existingTicket.title).to.equal("Updated Ticket");
    expect(existingTicket.status).to.equal("In Progress");
    expect(res.status.called).to.be.false;
    expect(res.json.calledOnce).to.be.true;

    findByIdStub.restore();
  });

  it('should return 404 if ticket is not found', async () => {
    const findByIdStub = sinon.stub(Ticket, 'findById').resolves(null);

    const req = { params: { id: new mongoose.Types.ObjectId() }, user: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await updateTicket(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Ticket not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 403 if user is not authorized', async () => {
    const ticket = {
      _id: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      save: sinon.stub().resolvesThis()
    };
    const findByIdStub = sinon.stub(Ticket, 'findById').resolves(ticket);

    const req = {
      params: { id: ticket._id },
      user: { id: new mongoose.Types.ObjectId().toString() }, // different user
      body: { title: "Hacked Ticket" }
    };

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await updateTicket(req, res);

    expect(res.status.calledWith(403)).to.be.true;
    expect(res.json.calledWith({ message: 'Not authorized to update this ticket' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(Ticket, 'findById').throws(new Error('DB Error'));

    const req = { params: { id: new mongoose.Types.ObjectId() }, user: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await updateTicket(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;

    findByIdStub.restore();
  });
});

describe('GetTickets Function Test', () => {
  it('should return tickets for the given user', async () => {
    const userId = new mongoose.Types.ObjectId();

    const tickets = [
      { _id: new mongoose.Types.ObjectId(), title: "Ticket 1", userId },
      { _id: new mongoose.Types.ObjectId(), title: "Ticket 2", userId }
    ];

    const findStub = sinon.stub(Ticket, 'find').resolves(tickets);

    const req = { user: { id: userId } };
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

    await getTickets(req, res);

    expect(findStub.calledOnceWith({ userId })).to.be.true;
    expect(res.json.calledWith(tickets)).to.be.true;
    expect(res.status.called).to.be.false;

    findStub.restore();
  });

  it('should return 500 on error', async () => {
    const findStub = sinon.stub(Ticket, 'find').throws(new Error('DB Error'));

    const req = { user: { id: new mongoose.Types.ObjectId() } };
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

    await getTickets(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    findStub.restore();
  });
});

describe('DeleteTicket Function Test', () => {
  it('should delete a ticket successfully', async () => {
    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const ticket = { remove: sinon.stub().resolves() };

    const findByIdStub = sinon.stub(Ticket, 'findById').resolves(ticket);

    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await deleteTicket(req, res);

    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(ticket.remove.calledOnce).to.be.true;
    expect(res.json.calledWith({ message: 'Ticket deleted' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 404 if ticket is not found', async () => {
    const findByIdStub = sinon.stub(Ticket, 'findById').resolves(null);

    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await deleteTicket(req, res);

    expect(findByIdStub.calledOnceWith(req.params.id)).to.be.true;
    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Ticket not found' })).to.be.true;

    findByIdStub.restore();
  });

  it('should return 500 if an error occurs', async () => {
    const findByIdStub = sinon.stub(Ticket, 'findById').throws(new Error('DB Error'));

    const req = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await deleteTicket(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    findByIdStub.restore();
  });
});