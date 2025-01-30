import { Status } from "./status.model";

export type Todo = {
    id: string;
    title: string;
    description: string;
    status: Status;
    createdAt: string;
    updatedAt: string;
}