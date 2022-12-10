export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value))
}
export const getLocalStorage = (name) => {
  return JSON.parse(localStorage.getItem(name))
}