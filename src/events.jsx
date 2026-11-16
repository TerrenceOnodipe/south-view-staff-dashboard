import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loadEvents } from './data/store'

const EventsContext = createContext(null)

// Loads the event and burial list once for the whole site, along with the kill switch
// settings. Staff changes replace them via setEvents and setSettings.
export function EventsProvider({ children }) {
  const [events, setEvents] = useState([])
  const [settings, setSettings] = useState({ galleryOnline: true, takingPhotos: true })
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    // A weak signal at an event can drop one request, so try a few times before giving up.
    const load = (attempt) =>
      loadEvents()
        .then((loaded) => {
          if (cancelled) return
          setEvents(loaded.events)
          setSettings(loaded.settings)
          setStatus('done')
        })
        .catch(() => {
          if (cancelled) return
          if (attempt < 3) setTimeout(() => load(attempt + 1), attempt * 2000)
          else setStatus('error')
        })
    load(1)
    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => {
    // Rows from before burials existed have no type, and a burial's details are optional.
    const all = events.map((e) => ({ ...e, type: e.type === 'burial' ? 'burial' : 'event', details: e.details ?? '' }))
    const active = all.filter((e) => e.active)
    return {
      events: all,
      activeEvents: active.filter((e) => e.type === 'event'),
      activeBurials: active.filter((e) => e.type === 'burial'),
      status,
      setEvents,
      settings,
      setSettings,
      entry: (id) => all.find((e) => e.id === id),
      eventName: (id) => all.find((e) => e.id === id)?.name ?? (status === 'loading' ? '' : 'Unknown event'),
    }
  }, [events, settings, status])

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export const useEvents = () => useContext(EventsContext)
