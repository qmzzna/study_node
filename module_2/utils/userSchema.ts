import Joi from 'joi'

const userSchema = Joi.object().keys({
  login: Joi.string().required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  age: Joi.number().integer().min(4).max(130),
  isDelete: Joi.boolean().required(),
})

export default userSchema