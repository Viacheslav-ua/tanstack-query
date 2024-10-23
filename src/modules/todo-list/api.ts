import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"

const baseUrl = 'http://localhost:3000'

type TaskDto = {
  id: string
  text: string
  done: boolean
}

export type PaginatedResult<T> = {
  first: number,
  prev: number | null,
  next: number | null,
  last: number,
  pages: number,
  items: number,
  data: T[],
}

export const todoListApi = {
  getTodoList: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal },
  ) => {
    return fetch(`${baseUrl}/tasks?_page=${page}&_per_page=10`, {
      signal
    })
      .then((response) => response.json()) as Promise<PaginatedResult<TaskDto>>
  },

  getTodoListQueryOptions(page: { page: number }) {
    return queryOptions({
      queryKey: ['tasks', 'list', page],
      queryFn: (meta) => this.getTodoList( page , meta),
      
    })
  },

  getTodoListInfiniteQueryOptions() {
    return infiniteQueryOptions({
      queryKey: ['tasks', 'list'],
      queryFn: (meta) => this.getTodoList({ page: meta.pageParam }, meta),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: result => result.pages.map(page => page.data).flat(),
    })
  }
} 