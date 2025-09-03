import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { JSONContent } from "@tiptap/react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function JSONContentToString(json: JSONContent): string {
    if (!json?.content) return ""

    let result = ""

    json.content.forEach(node => {
        if (node.type === "paragraph" && node.content) {
            node.content.forEach(child => {
                if (child.type === "text" && child.text) {
                    result += child.text
                }
            })
            result += "\n"
        }
    })

    return result.trim()
}

export function stringToJSONContent(plainText: string): JSONContent {
    return {
        type: 'doc',
        content: [
            {
                type: 'paragraph',
                content: [
                    { type: 'text', text: plainText }
                ]
            }
        ]
    };
}

export const getLocalDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
