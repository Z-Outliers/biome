import { BrowserRouter, Route, Routes } from 'react-router';
import LandingPage from './screens/LandingPage'
import { ThemeProvider } from './providers/ThemeProvider'
import Login from './screens/Login'
import DashboardLayout from './screens/Dashboard/layout'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/queryClient'

export default function App() {

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path='dashboard' element={<DashboardLayout />}>
              <Route index element={<div>Papers</div>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}