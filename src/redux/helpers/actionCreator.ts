export const actionCreator = (type: string, data?: { [key: string]: any }) => ({ type, ...data })
