import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  TextField,
} from '@mui/material'
import { useState } from 'react'
import Form from '../components/Form'

const theme = createTheme()

export default function Album() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            sx={{ alignItems: 'right', justifyContent: 'space-around' }}
            noWrap
          >
            Simple Frontend
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
          <Container
            sx={{ py: 8, alignItems: 'right', justifyContent: 'right' }}
            maxWidth="md"
          >
            <Form></Form>
          </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}
