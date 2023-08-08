import { useState, useEffect } from "react"

type GetResourceFunction<T> = () => Promise<T>

export const useDataSource = <T>(
  getResourceFunction: GetResourceFunction<T>,
  setResourceFunction?: React.Dispatch<React.SetStateAction<T | []>>
) => {
  const [resource, setResource] = useState<T | []>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getResourceFunction()
      setResource(result)
    }

    fetchData()
  }, [])

  // If setResourceFunction is provided, use it to update the resource state
  if (setResourceFunction) {
    useEffect(() => {
      setResourceFunction(resource)
    }, [resource, setResourceFunction])
  }

  return resource
}

export type { GetResourceFunction }
