import { useMutation } from "@tanstack/react-query"
import { useTodoList } from "./use-todo-list"
import { todoListApi } from "./api"
import { nanoid } from "nanoid"

export const TodoList = () => {

  const { error, todoItems, isLoading } = useTodoList()

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo
  })

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const text = String(formData.get('text'))

    if (!text) return
    createTodoMutation.mutate({ 
      id: nanoid(),
      text: text,
      done: false,
      userId: '1',
      
     })
        
    e.currentTarget.reset()
  }

  if (isLoading) return (<div className="text-3xl font-bold text-green-700">Loading...</div>)
  if (error) return <div>Error: {JSON.stringify(error)}</div>


  return (
    <div className="p-5 mp-10 mx-auto max-w-[1200px]">
      <h1 className="text-3xl underline mb-5 capitalize">To do list</h1>

      <form className="flex gap-2 mb-5" onSubmit={handleCreate}>
        <input
          type="text"
          name="text"
          placeholder="Add new task"
          className="border border-teal-500 p-2 rounded"
        />
        <button
          type="submit"
          className="border border-teal-500 p-2 rounded"
        >
          Create
        </button>
      </form>
      
      <div className="flex flex-col gap-4">
        {todoItems?.map((task) => (
          <div
            className="border border-gray-300 p-3 rounded"
            key={task?.id}
          >{task?.text}</div>
        ))}
      </div>

    
    </div>
  )
}