import { ITodo } from "@/types/Todo"
import TodoItem from "./TodoItem"
import { BACKENDURI } from "@/utils/constants"

async function fetchTodos() : Promise<ITodo[]> {
    const response = await fetch(BACKENDURI + '/todo', {next: {revalidate: 0}})
    const data = await response.json()
    return data.data
}
export default async function getTodos() {
    const todos: ITodo[] = await fetchTodos()
    return (
        <>
            <div className="flex flex-row gap-4 flex-wrap">
                {
                    todos.map(todo => (
                        <TodoItem todo={todo} key={todo._id || (Math.random() * 1000).toString()} />
                    ))
                }
            </div>
        </>

    )
}
