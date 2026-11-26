
import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
import ProtectedRoute from "./components/ProtectedRoute"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import NewSession from "./pages/NewSession"
import Dashboard from "./pages/Dashboard"
import SessionRunner from "./pages/SessionRunner"
import SessionReport from "./pages/SessionReport"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewSession />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/session/:id"
            element={
              <ProtectedRoute>
                <SessionRunner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report/:id"
            element={
              <ProtectedRoute>
                <SessionReport />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
