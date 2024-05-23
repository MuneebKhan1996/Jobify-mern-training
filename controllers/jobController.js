import Job from '../models/jobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customeErrors.js';

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});

  res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
  try {
    const { company, position } = req.body;
    const job = await Job.create({ company, position });
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    res.status(500).json({ msg: 'server error' });
  }
};

export const getSingleJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    throw new NotFoundError('no job found');
    return res.status(404).json({ message: 'Job not found' });
  }
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.status(StatusCodes.OK).json({ msg: 'Job modified', updatedJob });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findByIdAndDelete(id);

  if (!job) {
    return res.status(404).json({ message: `Job with ID: ${id} not found` });
  }
  res.status(StatusCodes.OK).json({ msg: 'deleted', job });
};
