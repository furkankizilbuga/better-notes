import type { JSONContent } from "@tiptap/react";
// TODO: shared kısmına taşınabilir
export type Note = {
    id?: number;
    externalId: string;
    title?: string;
    content: TiptapNode;
    isShort: boolean;
    isDeleted: boolean;
    updatedAt: string;
}

export type NotePayload = {
    title?: string;
    content: TiptapNode;
}

export type NoteResponse = {
    id?: number;
    externalId: string;
    title?: string;
    content: string;
    isShort: boolean;
    isDeleted: boolean;
    updatedAt: string;
}

export type NoteManagerResponse = {
    data: Note;
}

export type TiptapNode = JSONContent & {

}