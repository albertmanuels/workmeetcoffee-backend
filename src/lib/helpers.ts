export const generateUniqueId = (array) => {
  let uniqueId = ""
  let isUnique = false

  while(!isUnique) {
    uniqueId = String(Math.floor(Math.random() * 1000))
    isUnique = !array.some(item => item.id === uniqueId)
  }

  return uniqueId
}

export const generateSlug = (str: string) => {
  return str?.split(" ").join("-").toLowerCase()
}