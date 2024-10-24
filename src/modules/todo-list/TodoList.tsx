import { useTodoList } from "./use-todo-list"

export const TodoList = () => {

  const { error, todoPage, isLoading, cursor } = useTodoList()

  if (isLoading) return (<div className="text-3xl font-bold text-green-700">Loading...</div>)
  if (error) return <div>Error: {JSON.stringify(error)}</div>


  return (
    <div className="p-5 mp-10 mx-auto max-w-[1200px]">
      <h1 className="text-3xl underline mb-5 capitalize">To do list</h1>
      
      <div className="flex flex-col gap-4">
        {todoPage?.map((task) => (
          <div
            className="border border-gray-300 p-3 rounded"
            key={task?.id}
          >{task?.text}</div>
        ))}
      </div>

      {cursor}
    </div>
  )
}