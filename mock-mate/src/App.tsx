
import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./components/layout/Layout"
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
          <Route path="/new" element={<NewSession />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/session/:id" element={<SessionRunner />} />
          <Route path="/report/:id" element={<SessionReport />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
