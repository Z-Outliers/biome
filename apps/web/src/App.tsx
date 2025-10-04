import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { queryClient } from "./api/queryClient";
import { ThemeProvider } from "./providers/ThemeProvider";
import DashboardLayout from "./screens/Dashboard/layout";
import LandingPage from "./screens/LandingPage";
import Login from "./screens/Login";

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<div>Papers</div>} />
            </Route>
          </Routes>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
