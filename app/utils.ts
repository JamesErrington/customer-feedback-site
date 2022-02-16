import fs from "fs/promises";
import path from "path";
import dayjs from "dayjs";

import type { IFeedbackItem } from "../shared/types";

function getFilePath(file: string) {
  return path.resolve(__dirname, `static/${file}.json`);
}

export async function readFile(file: string) {
  const dataFilePath = getFilePath(file);
  return fs.readFile(dataFilePath, "utf-8");
}

export async function writeFile(file: string, data: any) {
  const dataFilePath = getFilePath(file);
  return fs.writeFile(dataFilePath, data);
}

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function filterComments(comments: IFeedbackItem[], id: number) {
  return comments
    .filter(comment => comment.product_id === id)
    .sort((a, b) => (dayjs(a.timestamp).isBefore(dayjs(b.timestamp)) ? 1 : -1));
}
