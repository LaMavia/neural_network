export const getDimensions = <T = any>(arr: Array2D<T> | T[]) => 
  [
    arr.length, 
    arr.length === 0 ? 1 : (Array.isArray(arr[0]) ? (arr[0] as T[]).length : 1)
  ]