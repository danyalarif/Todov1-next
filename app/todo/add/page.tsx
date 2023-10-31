'use client'

import { BACKENDURI } from "@/utils/constants"
import { useRouter, useSearchParams } from "next/navigation"
import { FormEvent, FormEventHandler, useState, Suspense, useEffect } from "react"
import Loading from "./loading"
import { ITodo } from "@/types/Todo"



export default function AddTodo() {
    const search = useSearchParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()
    async function submitTodo(e: FormEvent) {
        e.preventDefault()
        try {
            let response
            if (search.get('search')) {
                response = await fetch(BACKENDURI + '/todo/' + search.get('search'), {
                    method: 'PUT',
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({title, description})
                })
            } else {
                response = await fetch(BACKENDURI + '/todo', {
                    method: 'POST',
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({title, description})
                })
            }
            if (response.ok)
                router.replace('/todo')
            else 
                throw new Error((await response.json()).error)
            setTitle('')
            setDescription('')
        } catch(e) {
            console.log(e)
        }
        //router.refresh()
    }
    async function getTodo(id: string) : Promise<ITodo> {
        const response = await fetch(`${BACKENDURI}/todo/${id}`, {next: {revalidate: 0}})
        const data = await response.json()
        return {_id: data?.data?._id, title: data?.data?.title, description: data?.data?.description}
    }
    useEffect(() => {
      async function setTodo() {
        console.log(search.get('search'))
        try {
            let todo: ITodo
            if (search.get('search') !== null) {
                todo = await getTodo(search.get('search')!)
                console.log(todo)
                setTitle(todo.title)
                setDescription(todo.description)
            }
        } catch(e) {
            console.log(e)
        }
      }
      setTodo()
    }, [search])
    
    return (
        <Suspense fallback={<Loading />}>
        <div className="flex flex-row justify-center mt-2" onSubmit={submitTodo}>
            <form>
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-2xl">Add Todo</h1>
                    <div>
                        <label className="block text-xl mb-1 italic" htmlFor="title">Title</label>
                        <input id='title' type="text" className="bg-transparent border rounded-lg p-2" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="w-full">
                        <label className="block text-xl mb-1 italic" htmlFor="description">Description</label>
                        <textarea id='description' className="bg-transparent border rounded-lg p-2 w-full h-36" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}  />
                    </div>
                    <button type="submit" className='border rounded-lg p-2 bg-purple-950 hover:bg-purple-800 italic'>{`${search.get('search') ? 'Update' : 'Add'}`} Item</button>
                </div>
            </form>
        </div>
        </Suspense>
    )
}