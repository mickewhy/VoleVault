import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Collections from './pages/Collections'
import Anomaluromorpha from './pages/Anomaluromorpha'
import Castorimorpha from './pages/Castorimorpha'
import Hystricomorpha from './pages/Hystricomorpha'
import Myomorpha from './pages/Myomorpha'
import Sciuromorpha from './pages/Sciuromorpha'
import ImageDetails from './pages/ImageDetails'
import Submissions from './pages/Submissions'
import Taxa from './pages/Taxa'
import NoPage from './pages/NoPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/collections' element={<Collections />} />
          <Route path='/collections/anomaluromorpha' element={<Anomaluromorpha />} />
          <Route path='/collections/castorimorpha' element={<Castorimorpha />} />
          <Route path='/collections/hystricomorpha' element={<Hystricomorpha />} />
          <Route path='/collections/myomorpha' element={<Myomorpha />} />
          <Route path='/collections/sciuromorpha' element={<Sciuromorpha />} />
          <Route path='/collections/anomaluromorpha/:rodentId' element={<ImageDetails />} />
          <Route path='/collections/castorimorpha/:rodentId' element={<ImageDetails />} />
          <Route path='/collections/hystricomorpha/:rodentId' element={<ImageDetails />} />
          <Route path='/collections/myomorpha/:rodentId' element={<ImageDetails />} />
          <Route path='/collections/sciuromorpha/:rodentId' element={<ImageDetails />} />
          <Route path='/submissions' element={<Submissions />} />
          <Route path='/taxa' element={<Taxa />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
