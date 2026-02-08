import { writeFile } from "node:fs/promises";

export async function writeTextFile(filePath: string, content: string, controller?: AbortController) {
    return await writeFile(filePath, content, {
        encoding: "utf-8",
        signal: controller?.signal,
    });
}
