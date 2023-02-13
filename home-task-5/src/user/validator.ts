import * as Joi from "joi";
import {
  ContainerTypes,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
  createValidator,
} from "express-joi-validation";
import { joiPasswordExtendCore } from "joi-password";

const validator = createValidator();
const joiPassword = Joi.extend(joiPasswordExtendCore);

const userSchema = Joi.object({
  login: Joi.string().required(),
  password: joiPassword.string().minOfLowercase(1).minOfNumeric(1).noWhiteSpaces().required(),
  age: Joi.number().min(4).max(130).required(),
});

export interface UserBodySchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    login: string;
    password: string;
    age: number;
  };
}

export const userValidator = validator.body(userSchema);
