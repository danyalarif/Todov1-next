import connectDB from "@/app/lib/db";
import Todo from "@/app/(models)/Todo";
import { ITodo } from "@/types/Todo";
import { HydratedDocument } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request): Promise<any> {
    try {
        await connectDB()
        const {title, description}: {title: string, description: string} = await req.json()
        const todo: HydratedDocument<ITodo> = new Todo({title: title, description: description})
        await todo.save()
        return NextResponse.json({message: 'Todo Added!'})
    } catch(e: any) {
        console.log(e)
        return NextResponse.json({error: e.message}, {status: 500})
    }
}
export async function GET(req: Request): Promise<any> {
    let todos: ITodo[] = []
    try {
        await connectDB()
        todos = await Todo.find()
        return NextResponse.json({data: todos})
    } catch(e: any) {
        return NextResponse.json({error: e}, {status: 500})
    }
}
