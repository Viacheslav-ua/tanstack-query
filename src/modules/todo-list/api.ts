import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
import { jsonApiInstance } from "../../shared/api/api-instance"

const baseUrl = 'http://localhost:3000'

type TaskDto = {
  id: string
  text: string
  done: boolean
  userId: string
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

  getTodoListQueryOptions() {
    return queryOptions({
      queryKey: ['tasks', 'list'],
      queryFn: (meta) => jsonApiInstance<TaskDto[]>(
        `/tasks`,
        { signal: meta.signal },
      ),
    })
  },

  getTodoListInfiniteQueryOptions() {
    return infiniteQueryOptions({
      queryKey: ['tasks', 'list'],
      queryFn: (meta) => jsonApiInstance<PaginatedResult<TaskDto>>(
        `/tasks?_page=${meta.pageParam}&_per_page=10`,
        { signal: meta.signal },
      ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: result => result.pages.map(page => page.data).flat(),
    })
  },

  createTodo: (data: TaskDto) => {

    return jsonApiInstance('/tasks', { 
      method: 'POST',
      json: data 
    })
  },
  updateTodo: (id: string, data: Partial<TaskDto>) => {
    return jsonApiInstance(`/tasks/${id}`, { 
      method: 'PATCH',
      json: data 
    })
  },
  deleteTodo: (id: string) => {
    return jsonApiInstance(`/tasks/${id}`, { 
      method: 'DELETE', 
    })
  },
} 