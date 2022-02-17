import mock from "mock-fs";
import path from "path";
import type { Request, Response } from "express";

export function mockFile(file: string, data: string) {
  mock({
    [path.resolve(__dirname, `../static/${file}.json`)]: data,
  });
}

export function restoreFile() {
  mock.restore();
}

export function mockRequest(query: Record<string, any> = {}, body: Record<string, any> = {}) {
  return {
    query,
    body,
  } as unknown as Request;
}

export function mockResponse() {
  const sendMock = jest.fn();
  const statusMock = jest.fn(() => ({ send: sendMock }));
  const response = { status: statusMock } as unknown as Response;

  return {
    sendMock,
    statusMock,
    response,
  };
}
