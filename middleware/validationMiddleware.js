import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import mongoose from 'mongoose';
import jobModel from '../models/jobModel.js';
import UserModel from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        if (errorMessages[0].toLowerCase().startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body('company').notEmpty().withMessage('Company is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('jobLocation').notEmpty().withMessage('Job Location is required'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid Status'),
  body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('Invalid Job Type'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new BadRequestError('invalid MongoDB id');

    const isJob = await jobModel.findById(value);
    if (!isJob) throw new NotFoundError(`no Job with id ${value}`);
  }),
]);

export const validateResgisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('Please enter a Name'),
  body('email')
    .notEmpty()
    .withMessage('Please enter email')
    .isEmail()
    .withMessage('Invalid Email')
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) throw new BadRequestError('Email exists already');
    }),
  body('password')
    .notEmpty()
    .withMessage('Please enter password')
    .isLength({ min: 8 })
    .withMessage('Password must be atleast 8 characters long'),
  body('location').notEmpty().withMessage('Please enter location'),
  body('lastName').notEmpty().withMessage('Please enter lastName'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('Please enter email')
    .isEmail()
    .withMessage('Invalid Email'),
  body('password').notEmpty().withMessage('Please enter password'),
]);