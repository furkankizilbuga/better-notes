import type { JSONContent } from "@tiptap/react";

export type Note = {
    id: number;
    title?: string;
    content: TiptapNode;
}

export type NotePayload = {
    title?: string;
    content?: TiptapNode;
}

export type NoteResponse = {
    id: number;
    title?: string;
    content: string;
}

export type TiptapNode = JSONContent & {

}