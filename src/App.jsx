import { useEffect } from 'react'
import { NavLink, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Gallery from './pages/Gallery'
import Submit from './pages/Submit'
import Staff from './pages/Staff'
import { isDemo } from './data/store'
import { EventsProvider } from './events'

// QR Codes moved to a tab on the Staff page. Old links to #/qr still land there.
function QrRedirect() {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  params.set('tab', 'qr')
  return <Navigate to={`/staff?${params}`} replace />
}

export default function App() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <EventsProvider>
      <header className="site-header">
        <Link to="/" className="wordmark">
          <span className="wordmark-top">Historic</span>
          <span className="wordmark-main">South-View</span>
          <span className="wordmark-sub">Community Gallery</span>
        </Link>
        <nav>
          <NavLink to="/" end>Gallery</NavLink>
          <NavLink to="/staff">Staff</NavLink>
        </nav>
        <Link to="/submit" className="button">Share a Photo</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/qr" element={<QrRedirect />} />
          <Route path="*" element={<Gallery />} />
        </Routes>
      </main>
      <footer className="site-footer">
        {isDemo
          ? 'Sample photos are from southviewpreservation.com, used for a class prototype. New submissions are stored only in this browser.'
          : 'Photos are shared by visitors and reviewed by South-View staff before they appear here.'}
      </footer>
    </EventsProvider>
  )
}
