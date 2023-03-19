import { useEffect, useState } from "react";

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

type BodyType = RequestInit["body"] | {};

type ResponseHandlers<T> = {
  [key in Status]?: ResponseHandlerFunction<T>;
} & { default: ResponseHandlerFunction<T> };

export const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [canRender, _setCanRender] = useState(false);
  const _sendRequest = async <T>(
    url: string,
    responseHandlers: ResponseHandlers<T>,
    options: RequestInit = {}
  ) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          withCredentials: "true",
          "Content-Type": "application/json",
        },
      });
      const status = response.status as Status;
      const res = await response.json();
      if (status in responseHandlers) {
        (responseHandlers[status] as ResponseHandlerFunction<T>)(res);
      } else {
        responseHandlers.default(res);
      }
    } catch (e) {
      // TODO: Interceptor
      console.log(e);
    }
    setLoading(false);
    _setCanRender(true);
  };

  const get = async <T>(
    url: string,
    responseHandlers: ResponseHandlers<T>,
    options: RequestInit = {}
  ) => {
    await _sendRequest(url, responseHandlers, {
      ...options,
    });
  };

  const del = async <T>(
    url: string,
    responseHandlers: ResponseHandlers<T>,
    body: BodyType = {},
    options: RequestInit = {}
  ) => {
    await _sendRequest(url, responseHandlers, {
      method: "DELETE",
      body: JSON.stringify(body),
      ...options,
    });
  };

  const post = async <T>(
    url: string,
    responseHandlers: ResponseHandlers<T>,
    body: BodyType = {},
    options: RequestInit = {}
  ) => {
    await _sendRequest(url, responseHandlers, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  };

  const put = async <T>(
    url: string,
    responseHandlers: ResponseHandlers<T>,
    body: BodyType = {},
    options: RequestInit = {}
  ) => {
    await _sendRequest(url, responseHandlers, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  };

  return { canRender, loading, get, del, post, put };
};
