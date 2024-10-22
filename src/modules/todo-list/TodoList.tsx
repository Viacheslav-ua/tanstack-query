import { useQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"

export const TodoList = () => {

const {data, error, isPending } = useQuery({
  queryKey: ['tasks', 'list'],
  queryFn: todoListApi.getTodoList

})

if (isPending) return <div>Loading...</div>
if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <div className="p-5 mp-10 mx-auto max-w-[1200px]">
      <h1 className="text-3xl underline mb-5 capitalize">To do list</h1>

      <div className="flex flex-col gap-4">
        {data?.map((task) => (
          <div 
          className="border border-gray-300 p-3 rounded"
          key={task.id}
          >{task.text}</div>
        ))}
      </div>
      
    </div>
  )
}