
export const delay = async (time: number) => new Promise((resolve) => {
  setTimeout(() => { resolve() }, time)
})
