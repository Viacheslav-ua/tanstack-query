import { useInfiniteQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"
import { useCallback, useRef } from "react"

const useIntersection = (onIntersect: () => void) => {
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

export const useTodoList = () => {
  const { data: todoPage, error, isLoading,
    fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
      ...todoListApi.getTodoListInfiniteQueryOptions(),
    })

    const cursorRef = useIntersection(() => {
      fetchNextPage()
    })

    const cursor = (
      <div className="flex gap-3 mt-5" ref={cursorRef}>
        {!hasNextPage && "No more items"}
        {isFetchingNextPage && "Loading next page..."}
      </div>
    )
  
    return { error, todoPage, isLoading, cursor }
}