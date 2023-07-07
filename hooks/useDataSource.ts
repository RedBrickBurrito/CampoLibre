import { useState, useEffect } from "react"

type GetResourceFunction<T> = () => Promise<T>

export const useDataSource = <T>(getResourceFunction: GetResourceFunction<T>) => {
  const [resource, setResource] = useState<T | []>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await getResourceFunction()
      setResource(result)
    }

    fetchData()
  }, [])

  return resource
}

export type { GetResourceFunction }
