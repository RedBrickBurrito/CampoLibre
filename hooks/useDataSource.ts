import { useState, useEffect } from "react"

//Type representing a function that fetches a resource asynchronously.
type GetResourceFunction<T> = () => Promise<T>

/**
 * Custom hook for fetching and managing a data resource.
 * It fetches the resource using the provided `getResourceFunction` and returns the fetched data.
 * @param {GetResourceFunction} getResourceFunction - The function that fetches the data resource.
 * @returns {T | []} The fetched data resource or an empty array.
 */
export const useDataSource = <T>(getResourceFunction: GetResourceFunction<T>) => {
  const [resource, setResource] = useState<T | []>([])

  useEffect(() => {
    /**
     * Fetches the data resource using the `getResourceFunction` and sets the fetched data in the state.
     * It runs only once during the component's initial mount.
     */
    const fetchData = async () => {
      const result = await getResourceFunction()
      setResource(result)
    }

    fetchData()
  }, [])

  return resource
}

export type { GetResourceFunction }
