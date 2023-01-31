import Role from "../models/role"
import User from "../models/user"
import Keystore from "../models/keystore"

const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV !== 'test'

const dbInit = () => Promise.all([
  Keystore.sync({ alter: isDev || isTest }),
  Role.sync({ alter: isDev || isTest }),
  User.sync({ alter: isDev || isTest }),
])

export default dbInit 