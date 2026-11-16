import * as local from './localStore'
import * as sheet from './sheetStore'

// With VITE_APPS_SCRIPT_URL set, data lives in the Google Sheet and Drive folder
// (see apps-script/). Without it, the app runs as the in-browser demo.
export const isDemo = !import.meta.env.VITE_APPS_SCRIPT_URL

// The public gallery, where visitors share photos. QR codes point at its photo form.
export const GALLERY_URL = import.meta.env.VITE_GALLERY_URL || 'https://svc-handoff.github.io/south-view-events-gallery/'

export const {
  listGallery,
  listAll,
  addSubmission,
  setStatus,
  listEvents,
  loadEvents,
  setSetting,
  addEvent,
  deleteEvent,
  unlockStaff,
  isStaffUnlocked,
  lockStaff,
} = isDemo ? local : sheet

// Live Apps Script only. Demo has no Gemini backend.
export const checkAI = isDemo ? async () => null : sheet.checkAI

export const resetDemo = local.resetDemo
