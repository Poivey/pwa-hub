export const formatDateDDMMYYYY = rawDate => {
  const parsedDate = new Date(rawDate)
  const day = ('0' + parsedDate.getDate()).slice(-2)
  const month = ('0' + (Number(parsedDate.getMonth()) + 1)).slice(-2)
  const year = parsedDate.getFullYear()
  return `${day}/${month}/${year}`
}
