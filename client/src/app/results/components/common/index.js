export const getMonth = (date) => {
  const objDate = new Date(date)
  const locale = 'en-us'
  return objDate.toLocaleString(locale, { month: 'long' })
}

export const getYear = (date) => {
  const objDate = new Date(date)
  return objDate.getFullYear()
}