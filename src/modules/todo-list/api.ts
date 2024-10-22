const baseUrl = 'http://localhost:3000'

type TaskDto = {
  id: string
  text: string
  done: boolean
}

export const todoListApi = {
  getTodoList: ({signal}: {signal: AbortSignal}) => {
    return fetch(`${baseUrl}/tasks`, {
      signal
    })
      .then((response) => response.json()) as Promise<TaskDto[]>
  }
} 