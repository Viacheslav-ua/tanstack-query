import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"
import { useCallback, useRef, useState } from "react"

export const TodoList = () => {

  const [enabled, setEnabled] = useState(false)

  const { data: todoPage, error, isPending, isFetching, isLoading,
    status, fetchStatus, isPlaceholderData, fetchNextPage, hasNextPage,
    isFetchingNextPage } = useInfiniteQuery({
      ...todoListApi.getTodoListInfiniteQueryOptions(),
      // queryKey: ['tasks', 'list'],
      // queryFn: (meta) => todoListApi.getTodoList({ page: meta.pageParam }, meta),
      enabled,
      // initialPageParam: 1,
      // getNextPageParam: (result) => result.next,
      // select: result => result.pages.map(page => page.data).flat(),
    })

  const cursorRef = useIntersection(() => {
    fetchNextPage()
  })


  console.log(status, fetchStatus);


  // if (status === 'pending' && fetchStatus === 'fetching') return (<div className="text-3xl font-bold text-green-700">Loading...</div>)
  if (isLoading) return (<div className="text-3xl font-bold text-green-700">Loading...</div>)
  if (error) return <div>Error: {JSON.stringify(error)}</div>


  return (
    <div className={"p-5 mp-10 mx-auto max-w-[1200px]" + (isPlaceholderData ? " text-red-600" : "")}>
      <h1 className="text-3xl underline mb-5 capitalize">To do list</h1>
      <button onClick={() => setEnabled(e => !e)}>Toggle enabled</button>
      <div className="flex flex-col gap-4">
        {todoPage?.map((task) => (
          <div
            className="border border-gray-300 p-3 rounded"
            key={task.id}
          >{task.text}</div>
        ))}
      </div>

      <div className="flex gap-3 mt-5" ref={cursorRef}>
        {!hasNextPage && "No more items"}
        {isFetchingNextPage && "Loading next page..."}
      </div>


    </div>
  )
}


export function useIntersection(onIntersect: () => void) {
  const unsubscribe = useRef(() => { })
  return useCallback((el: HTMLDivElement | null) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((intersection) => {
        if (intersection.isIntersecting) {
          onIntersect()
        }
      })
    })

    if (el) {
      observer.observe(el)
      unsubscribe.current = () => observer.disconnect()
    } else {
      unsubscribe.current()
    }

  }, [])
}