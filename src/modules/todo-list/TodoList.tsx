import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { todoListApi } from "./api"
import { useState } from "react"

export const TodoList = () => {

  const [page, setPage] = useState(1)

const {data: todoPage, error, isPending, isFetching, isPlaceholderData } = useQuery({
  queryKey: ['tasks', 'list', {page}],
  queryFn: (meta) => todoListApi.getTodoList({ page }, meta),
  placeholderData: keepPreviousData,
})

if (isPending) return (<div className="text-3xl font-bold text-green-700">Loading...</div>)
if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <div className={"p-5 mp-10 mx-auto max-w-[1200px]" + (isPlaceholderData ? " text-red-600" : "")}>
      <h1 className="text-3xl underline mb-5 capitalize">To do list</h1>

      <div className="flex flex-col gap-4">
        {todoPage?.data.map((task) => (
          <div 
          className="border border-gray-300 p-3 rounded"
          key={task.id}
          >{task.text}</div>
        ))}
      </div>

      <div className="flex gap-3 mt-5">
        <button 
        className="p-2 border rounded border-teal-500"
        onClick={() => setPage(1)}
      >1</button>

      <button 
        className="p-2 border rounded border-teal-500"
        onClick={() => setPage(p => Math.min(todoPage.pages, p + 1))}
      >next</button>

      <button 
        className="p-2 border rounded border-teal-500"
        onClick={() => setPage(p => Math.max(1, p - 1))}
      >prev</button>
        
      <button 
        className="p-2 border rounded border-teal-500"
        onClick={() => setPage(todoPage.last)}
      >last</button>

      <p>Page: {page}</p>
      </div>
      
      
    </div>
  )
}