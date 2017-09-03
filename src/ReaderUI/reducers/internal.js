export default (state={}, action) => {
  const { type } = action

  switch (type) {
    /*case VALIDATE:
      return {
        ...state,
        validationCounter: 1 + state.validationCounter,
      }*/

    default:
      return state
  }
}

export function getInitState() {
  return {
    validationCounter: 0,
  }
}
