import { useState } from "react";

const statuses = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  307: "Temporary Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  default: "Something went wrong",
} as const;

export type Status = keyof typeof statuses;

type ResponseHandlerFunction<T> = (response: T) => void;

type ResponseHandlers<T> = {
  [key in Status]?: ResponseHandlerFunction<T>;
} & { default: ResponseHandlerFunction<T> };

export const useFetch = <T>(responseHandlers: ResponseHandlers<T>) => {
  const [loading, setLoading] = useState(false);
  const sendRequest = async (url: string, options: RequestInit = {}) => {
    setLoading(true);
    const response = await fetch(url, options);
    setLoading(false);
    const status = response.status as Status;
    const res = await response.json();
    if (status in responseHandlers) {
      (responseHandlers[status] as ResponseHandlerFunction<T>)(res);
    } else {
      responseHandlers.default(res);
    }
  };
  return { loading, sendRequest };
};
