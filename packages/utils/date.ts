import { formatDate as formatDateFNS, formatRelative } from 'date-fns'

export const getAge = (dob: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // To fix people born today opening acc
  const ageInMs = today.getTime() - dob.getTime()
  const ageInYears: number = Math.floor(ageInMs / (365.25 * 24 * 60 * 60 * 1000) + 0.003) // 0.003 is added to fix people born today opening acc
  return ageInYears
}

export const formatDate = (date: Date | string | undefined, format: string = 'dd MMM yyyy') => {
  return date ? formatDateFNS(typeof date === 'string' ? new Date(date) : date, format) : ''
}

export const getRelativeDate = (date: string | Date) => {
  const relative = formatRelative(typeof date === 'string' ? new Date(date) : date, new Date())
  return relative.includes('at') ? `${relative.split('at')[0].trim()}, ` : ''
}
