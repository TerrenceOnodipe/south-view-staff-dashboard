import { Link, Route, Routes } from 'react-router-dom'
import Staff from './pages/Staff'
import { GALLERY_URL, isDemo } from './data/store'
import { EventsProvider } from './events'

// The South-View staff dashboard: our Staff page on its own, so other groups' staff tools
// can be added next to it. The public gallery and photo form stay in the gallery repo.
export default function App() {
  return (
    <EventsProvider>
      <header className="site-header">
        <Link to="/" className="wordmark">
          <span className="wordmark-top">Historic</span>
          <span className="wordmark-main">South-View</span>
          <span className="wordmark-sub">Staff Dashboard</span>
        </Link>
        <a href={GALLERY_URL} className="button button-outline">Open the gallery</a>
      </header>
      <main>
        <Routes>
          <Route path="*" element={<Staff />} />
        </Routes>
      </main>
      <footer className="site-footer">
        {isDemo
          ? 'Demo mode: sample photos are from southviewpreservation.com, and changes are stored only in this browser.'
          : 'For South-View staff. Photos are shared by visitors and reviewed here before they appear in the gallery.'}
      </footer>
    </EventsProvider>
  )
}
