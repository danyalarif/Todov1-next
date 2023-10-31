import { ITodo } from "@/types/Todo";
import mongoose, { Model, Schema } from "mongoose";

const todoSchema: Schema = new Schema<ITodo>({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    }
})
const Todo = mongoose.models.Todo || mongoose.model<ITodo>('Todo', todoSchema)
export default Todo