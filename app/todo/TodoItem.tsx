import { ITodo } from "@/types/Todo"
import Link from "next/link"
import DeleteTodo from "./DeleteTodo"

export default function TodoItem({todo} : {todo: ITodo}) {
    return (
        <div className="border rounded-lg p-2 w-[350px]">
            <div className="flex justify-between"> 
                <h1 className="text-2xl font-bold">{todo.title}</h1>
                <div className="flex">
                    <Link href={{pathname: '/todo/add', query: {search: todo._id}}}>
                        <svg className="h-8 w-8 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </Link>
                    <DeleteTodo id={todo._id!} />
                </div>
            </div>
            <div className="flex">
                <p>{todo.description}</p>
            </div>
        </div>
    )
}