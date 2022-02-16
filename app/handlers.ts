import type { Request, Response } from "express";

import { delay, filterComments, readFile, writeFile } from "./utils";
import type { IFeedbackItem, IProductItem, IChartData } from "../shared/types";

export async function handleProductRequest(request: Request, response: Response) {
  try {
    const id = Number(request.query.id);
    if (isNaN(id)) {
      throw new Error("No id provided");
    }

    const file = await readFile("products");
    const products = JSON.parse(file) as IProductItem[];
    const product = products.find(item => item.id === id);
    await delay(1000);
    if (product) {
      response.status(200).send(product);
      return;
    }
    throw new Error(`No such product with id ${request.query.id}`);
  } catch (ex) {
    console.error(ex);
    response.status(500).send("Failed to fetch data");
  }
}

export async function handleCommentRequest(request: Request, response: Response) {
  try {
    const id = Number(request.query.id);
    if (isNaN(id)) {
      throw new Error("No id provided");
    }

    const file = await readFile("comments");
    const comments = JSON.parse(file) as IFeedbackItem[];
    const filtered = filterComments(comments, id);
    await delay(3000);

    response.status(200).send(filtered);
  } catch (ex) {
    console.error(ex);
    response.status(500).send("Failed to fetch data");
  }
}

export async function handleCommentPostRequest(request: Request, response: Response) {
  try {
    const file = await readFile("comments");
    const comments = JSON.parse(file) as IFeedbackItem[];

    const { id, name, rating, comment } = request.body;
    const productId = Number(id);
    comments.push({
      id: comments[comments.length - 1].id + 1,
      product_id: productId,
      timestamp: new Date().toISOString(),
      name,
      rating,
      comment,
      helpful: 0,
    });
    await writeFile("comments", JSON.stringify(comments));
    const filtered = filterComments(comments, productId);
    await delay(4000);

    response.status(200).send(filtered);
  } catch (ex) {
    console.error(ex);
    response.status(500).send("Failed to fetch data");
  }
}

export async function handleChartRequest(request: Request, response: Response) {
  try {
    const id = Number(request.query.id);
    if (isNaN(id)) {
      throw new Error("No id provided");
    }

    const file = await readFile("charts");
    const charts = JSON.parse(file) as IChartData[];
    const chart = charts.find(item => item.id === id);
    await delay(3000);
    if (chart) {
      response.status(200).send(chart);
      return;
    }
    throw new Error(`No such chart with id ${request.query.id}`);
  } catch (ex) {
    console.error(ex);
    response.status(500).send("Failed to fetch data");
  }
}
