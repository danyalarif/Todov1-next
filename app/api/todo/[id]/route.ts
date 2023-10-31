import Todo from "@/app/(models)/Todo"
import connectDB from "@/app/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request, {params} : {params: { [key: string]: any }}): Promise<any> {
    const _id = params.id
    try {
        await connectDB()
        const todo = await Todo.findOne({_id})
        return NextResponse.json({data: todo})
    } catch(e) {
        return NextResponse.json({error: e}, {status: 500})
    }
}
export async function PUT(req: Request, {params} : {params: { [key: string]: any }}): Promise<any> {
    const _id = params.id
    const {title, description}: {title: string, description: string} = await req.json()
    try {
        await connectDB()
        await Todo.updateOne({_id: _id}, {title: title, description: description})
        return NextResponse.json({message: 'Todo Updated!'})
    } catch(e: unknown) {
        return NextResponse.json({error: e}, {status: 500})
    }
}
export async function DELETE(req: Request, {params} : {params: { [key: string]: any }}): Promise<any> {
    const _id = params.id
    try {
        await connectDB()
        await Todo.deleteOne({_id: _id})
        return NextResponse.json({message: 'Todo Deleted!'})
    } catch(e: unknown) {
        console.log(e)
        return NextResponse.json({error: e}, {status: 500})
    }
}
// export async function PATCH(req: Request): Promise<any> {
//     const {_id, title, description}: {_id: string, title: string, description: string} = await req.json()
//     try {
//         await connectDB()
//         await Todo.updateOne({_id: _id}, {title: title, description: description})
//         return NextResponse.json({message: 'Todo Updated!'})
//     } catch(e: unknown) {
//         return NextResponse.json({error: e}, {status: 500})
//     }
// }