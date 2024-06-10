import { Note } from "@prisma/client";

export interface ApiResponse {
    success: boolean;
    message: string;
    notes?: Array<Note>;
}