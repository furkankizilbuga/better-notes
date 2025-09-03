export type NoteChange = {
    externalId: string;
    operation: string;
    updatedAt: string;
}

export type NoteSyncRequest = {
    externalId: string;
    title: string
    content: string
    isShort: boolean;
    isDeleted: boolean;
    updatedAt: string;
}

export type NoteSyncResponse = NoteSyncRequest & {

}

export type DbOperation = 'create' | 'update' | 'delete'