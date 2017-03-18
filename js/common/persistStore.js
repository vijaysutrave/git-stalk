/* global localStorage */
export const loadInitialData = () => {
  try {
    const getState = localStorage.getItem('repos')
    if (getState === null) {
      return undefined
    }
    return JSON.parse(getState)
  } catch (err) {
    return undefined
  }
}

export const saveState = (state) => {
  try {
    const setState = JSON.stringify(state)
    localStorage.setItem('repos', setState)
  } catch (err) {
    console.log(err)
  }
}
