const chai = require('chai');
const sinon = require('sinon');
const Task = require('../models/Task');
const { updateTask,getTasks,addTask,deleteTask } = require('../controllers/taskController');
const { expect } = chai;

chai.use(chaiHttp);
let server;
let port;


describe('AddTask Function Test', () => {

  it('should create a new task successfully', async () => {
    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "New Task", description: "Task description", deadline: "2025-12-31" }
    };

    // Mock task that would be created
    const createdTask = { _id: new mongoose.Types.ObjectId(), ...req.body, userId: req.user.id };

    // Stub Task.create to return the createdTask
    const createStub = sinon.stub(Task, 'create').resolves(createdTask);

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addTask(req, res);

    // Assertions
    expect(createStub.calledOnceWith({ userId: req.user.id, ...req.body })).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdTask)).to.be.true;

    // Restore stubbed methods
const mongoose = require('mongoose');
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

    // Stub Task.create to throw an error
    const createStub = sinon.stub(Task, 'create').throws(new Error('DB Error'));

    // Mock request data
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: { title: "New Task", description: "Task description", deadline: "2025-12-31" }
    };

    // Mock response object
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    // Call function
    await addTask(req, res);

    // Assertions
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Restore stubbed methods
    createStub.restore();
  });

});


describe('Update Function Test', () => {

  it('should update task successfully', async () => {
    // Mock task data
    const taskId = new mongoose.Types.ObjectId();
    const existingTask = {
      _id: taskId,
      title: "Old Task",
      description: "Old Description",
      completed: false,
      deadline: new Date(),
      save: sinon.stub().resolvesThis(), // Mock save method
    };
    // Stub Task.findById to return mock task
    const findByIdStub = sinon.stub(Task, 'findById').resolves(existingTask);

    // Mock request & response
    const req = {
      params: { id: taskId },
      body: { title: "New Task", completed: true }
    };
    const res = {
      json: sinon.spy(), 
      status: sinon.stub().returnsThis()
    };

    // Call function
    await updateTask(req, res);

    // Assertions
    expect(existingTask.title).to.equal("New Task");
    expect(existingTask.completed).to.equal(true);
    expect(res.status.called).to.be.false; // No error status should be set
    expect(res.json.calledOnce).to.be.true;

    // Restore stubbed methods
    findByIdStub.restore();
  });



  it('should return 404 if task is not found', async () => {
    const findByIdStub = sinon.stub(Task, 'findById').resolves(null);

    const req = { params: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy()
    };

    await updateTask(req, res);

    expect(res.status.calledWith(404)).to.be.true;
    expect(res.json.calledWith({ message: 'Task not found' })).to.be.true;
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
const { addTicket, getTickets, updateTicket, deleteTicket } = require('../controllers/ticketController');

const { expect } = chai;

describe('Ticket Controller Tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  //
  // ADD TICKET
  //
  describe('addTicket', () => {
    it('should create a new ticket successfully', async () => {
      const req = {
        user: { id: new mongoose.Types.ObjectId() },
        body: {
          title: 'New Ticket',
          description: 'Ticket description',
          priority: 'P2 High',
          category: 'IT Support',
          assignedTo: 'Technician A'
        }
      };

      const createdTicket = { _id: new mongoose.Types.ObjectId(), createdBy: req.user.id, ...req.body };
      const createStub = sinon.stub(Ticket, 'create').resolves(createdTicket);

      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await addTicket(req, res);

      expect(createStub.calledOnceWith({ createdBy: req.user.id, ...req.body })).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(createdTicket)).to.be.true;
    });

    it('should return 500 if an error occurs', async () => {
      const createStub = sinon.stub(Ticket, 'create').throws(new Error('DB Error'));

      const req = { user: { id: new mongoose.Types.ObjectId() }, body: { title: 'Fail Ticket' } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };
    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;
  it('should return 403 if user is not authorized', async () => {
    const ticket = {
      _id: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
      save: sinon.stub().resolvesThis()
    };
    const findByIdStub = sinon.stub(Ticket, 'findById').resolves(ticket);
      await addTicket(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

      createStub.restore();
    });
  });

  //
  // GET TICKETS
  //
  describe('getTickets', () => {
    it('should return tickets for the given user', async () => {
      const userId = new mongoose.Types.ObjectId();
      const tickets = [{ title: 'Ticket 1', createdBy: userId }];

      const findStub = sinon.stub(Ticket, 'find').resolves(tickets);

      const req = { user: { id: userId } };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      await getTickets(req, res);

      expect(findStub.calledOnceWith({ createdBy: userId })).to.be.true;
      expect(res.json.calledWith(tickets)).to.be.true;
      expect(res.status.called).to.be.false;
    });

    it('should return 500 if an error occurs', async () => {
      const findStub = sinon.stub(Ticket, 'find').throws(new Error('DB Error'));

      const req = { user: { id: new mongoose.Types.ObjectId() } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await getTickets(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

    // Assertions
    expect(findStub.calledOnceWith({ userId })).to.be.true;
    expect(res.json.calledWith(tasks)).to.be.true;
    expect(res.status.called).to.be.false; // No error status should be set

    // Restore stubbed methods
  it('should return 500 on error', async () => {
    const findByIdStub = sinon.stub(Ticket, 'findById').throws(new Error('DB Error'));

    const req = { params: { id: new mongoose.Types.ObjectId() }, user: { id: new mongoose.Types.ObjectId() }, body: {} };
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

    await updateTicket(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.called).to.be.true;

    findByIdStub.restore();
      findStub.restore();
    });
  });

  //
  // UPDATE TICKET
  //
  describe('updateTicket', () => {
    it('should update ticket successfully', async () => {
      const ticketId = new mongoose.Types.ObjectId();
      const userId = new mongoose.Types.ObjectId();
      const existingTicket = {
        _id: ticketId,
        createdBy: userId,
        title: 'Old Ticket',
        status: 'Open',
        save: sinon.stub().resolvesThis()
      };

      const findByIdStub = sinon.stub(Ticket, 'findById').resolves(existingTicket);

      const req = { params: { id: ticketId }, user: { id: userId.toString() }, body: { title: 'Updated Ticket', status: 'In Progress' } };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      await updateTicket(req, res);

      expect(existingTicket.title).to.equal('Updated Ticket');
      expect(existingTicket.status).to.equal('In Progress');
      expect(res.json.calledOnce).to.be.true;

      findByIdStub.restore();
    });

    it('should return 404 if ticket not found', async () => {
      const findByIdStub = sinon.stub(Ticket, 'findById').resolves(null);

      const req = { params: { id: new mongoose.Types.ObjectId() }, user: { id: new mongoose.Types.ObjectId() }, body: {} };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await updateTicket(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Ticket not found' })).to.be.true;

      findByIdStub.restore();
    });

    it('should return 403 if user not authorized', async () => {
      const ticket = { _id: new mongoose.Types.ObjectId(), createdBy: new mongoose.Types.ObjectId(), save: sinon.stub().resolvesThis() };
      const findByIdStub = sinon.stub(Ticket, 'findById').resolves(ticket);

      const req = { params: { id: ticket._id }, user: { id: new mongoose.Types.ObjectId().toString() }, body: { title: 'Hacked Ticket' } };
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
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

      findByIdStub.restore();
    });
  });

  //
  // DELETE TICKET
  //
  describe('deleteTicket', () => {
    it('should delete a ticket successfully', async () => {
      const ticket = { remove: sinon.stub().resolves() };
      const findByIdStub = sinon.stub(Ticket, 'findById').resolves(ticket);

      const req = { params: { id: new mongoose.Types.ObjectId() } };
      const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

      await deleteTicket(req, res);

      expect(findByIdStub.calledOnce).to.be.true;
      expect(ticket.remove.calledOnce).to.be.true;
      expect(res.json.calledWith({ message: 'Ticket deleted' })).to.be.true;

      findByIdStub.restore();
    });
    // Restore stubbed methods
    const findStub = sinon.stub(Ticket, 'find').throws(new Error('DB Error'));
    it('should return 404 if ticket not found', async () => {
      const findByIdStub = sinon.stub(Ticket, 'findById').resolves(null);

      const req = { params: { id: new mongoose.Types.ObjectId() } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await deleteTicket(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ message: 'Ticket not found' })).to.be.true;

      findByIdStub.restore();
    });
    const findByIdStub = sinon.stub(Ticket, 'findById').throws(new Error('DB Error'));
=======
    it('should return 500 if an error occurs', async () => {
      const findByIdStub = sinon.stub(Ticket, 'findById').throws(new Error('DB Error'));

      const req = { params: { id: new mongoose.Types.ObjectId() } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      await deleteTicket(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;

      findByIdStub.restore();
    });
  });
});