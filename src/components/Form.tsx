import { useState, FC, ChangeEvent, useEffect } from 'react'
import {
  FormControl,
  Container,
  Button,
  TextField,
  Snackbar,
  Typography,
  Card,
  CardActions,
  CardContent,
} from '@mui/material'

import userService from '../services/userService'
import getBusArrivals from '../services/busService'

const defaultValues = {
  name: '',
  age: 25,
  address: '',
  description: '',
}

interface userObject {
  _id: string
  name?: string
  age?: number
  address?: string
  description?: string
}

const BUS_STOP_CODE = '12061'
const BUS_NO = '61'

const Form = () => {
  const [open, setOpen] = useState(false)
  const [formValues, setFormValues] = useState(defaultValues)

  const [users, setUsers] = useState<userObject[]>([])
  const [busInfo, setBusInfo] = useState({
    nextBus: '-',
    nextBus2: '-',
    nextBus3: '-',
  })

  useEffect(() => {
    const fetchUserData = async () => {
      return await userService.getAllUsers()
    }
    const fetchBusInfo = async () => {
      return await getBusArrivals(BUS_STOP_CODE, BUS_NO)
    }
    fetchBusInfo().then((data) => {
      setBusInfo(data)
      console.log(data)
    })
    fetchUserData().then((data) => {
      setUsers(data)
      console.log(data)
    })
  }, [])

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(true)
    const { name, age, address, description } = formValues
    const newUser = await userService.createUser(
      name,
      age,
      address,
      description
    )
    console.log(newUser)
    setUsers([...users, newUser])
  }

  const handleDelete = (id: string) => {
    userService.deleteUser(id)
    setUsers(users.filter((user) => user._id !== id))
  }

  return (
    <div>
      <Container maxWidth="sm">
        <Card sx={{
          bgcolor: '#f5f5f5',
          boxShadow: 1,
          borderRadius: 2,
          margin: '20px'
        }}>
          <CardContent>
            <Typography variant="h5" color="text.primary" gutterBottom>
              Bus {BUS_NO} @ {BUS_STOP_CODE}
            </Typography>
            <Typography variant="body2">Next bus in {busInfo.nextBus}, {busInfo.nextBus2}, {busInfo.nextBus3} minutes</Typography>
          </CardContent>
        </Card>
        <Typography variant="h5" color="inherit" noWrap>
          Create new user
        </Typography>
        <br></br>
        <form onSubmit={handleSubmit} className="add-contact">
          <FormControl fullWidth={true}>
            <TextField
              id="name-input"
              name="name"
              label="Name"
              type="text"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <br></br>
            <TextField
              id="age-input"
              name="age"
              label="Age"
              type="number"
              value={formValues.age}
              onChange={handleInputChange}
            />
            <br></br>
            <TextField
              id="address-input"
              name="address"
              label="Address"
              type="address"
              value={formValues.address}
              onChange={handleInputChange}
            />
            <br></br>
            <TextField
              id="description-input"
              name="description"
              label="description"
              type="description"
              value={formValues.description}
              onChange={handleInputChange}
            />
            <br></br>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 5 }}
              type="submit"
            >
              Add
            </Button>
          </FormControl>
        </form>
        <br></br>
        {users &&
          users.map((user, idx) => (
            <Card key={idx}>
              <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body2">Age: {user.age}</Typography>
                <Typography variant="body2">Address: {user.address}</Typography>
                <Typography variant="body2">
                  Description: {user.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="error"
                  onClick={() => {
                    handleDelete(user._id)
                  }}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        message="New user added"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      ></Snackbar>
    </div>
  )
}

export default Form
