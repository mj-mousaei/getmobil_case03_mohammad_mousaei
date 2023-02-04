import Register from "./pages/Register";
import Login from "./pages/Login";
import Board from "./pages/Board";
import AuthLayout from "./layout/AuthLayout";
import CssBaseLine from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { BrowserRouter, Route, Routes } from 'react-router-dom'




function App() {
  const theme = createTheme({
    palette: { mode: 'light' }
  })

  return (
<ThemeProvider theme={theme}>
      <CssBaseLine />
      <BrowserRouter>
        <Routes path='/'>
          <Route path='/' element={<AuthLayout />}>
            <Route path='register' element={<Register />} />
            <Route path='/' element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='board' element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
