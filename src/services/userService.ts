import axios from 'axios'
import { ENDPOINT } from '../settings'

const USER_ENDPOINT = ENDPOINT + 'users/'

const createUser = async (
  name: string,
  age: number,
  address: string,
  description: string
) => {
  const resp = await axios.post(USER_ENDPOINT, {
    name,
    age,
    address,
    description,
  })
  return resp.data;
}

const updateUser = async () => {}

const getUser = async (userId: string) => {
  const resp = await axios.get(USER_ENDPOINT + userId);
  return resp.data;
}

const getAllUsers = async () => {
  const resp = await axios.get(USER_ENDPOINT);
  return resp.data;
}

const deleteUser = async (userId: string) => {
  const resp = await axios.delete(USER_ENDPOINT + userId);
  return resp.data;
}

const UserService = {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
}

export { UserService as default }
