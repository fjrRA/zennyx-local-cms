// src/lib/api/api-client.ts

import { buildApiUrl } from "./api-config";

import {
  ApiError,
  isAbortError,
} from "./api-error";

import {
  getResponseErrorMessage,
  parseResponseBody,
} from "./api-response";

import type {
  ApiRequestOptions,
  MethodRequestOptions,
} from "./api.types";

type BodyMethod =
  | "POST"
  | "PUT"
  | "PATCH";

function isFormDataBody(
  body: unknown,
): body is FormData {
  return body instanceof FormData;
}

function createRequestBody(
  body: unknown,
): BodyInit {
  if (isFormDataBody(body)) {
    return body;
  }

  return JSON.stringify(body);
}

async function request<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const {
    body,
    headers: customHeaders,
    ...requestOptions
  } = options;

  const headers =
    new Headers(customHeaders);

  const hasBody =
    body !== undefined;

  const usesFormData =
    isFormDataBody(body);

  if (!headers.has("Accept")) {
    headers.set(
      "Accept",
      "application/json",
    );
  }

  if (
    hasBody &&
    !usesFormData &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  const fetchOptions: RequestInit = {
    ...requestOptions,
    headers,
  };

  if (hasBody) {
    fetchOptions.body =
      createRequestBody(body);
  }

  let response: Response;

  try {
    response = await fetch(
      buildApiUrl(path),
      fetchOptions,
    );
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    const detail =
      error instanceof Error
        ? error.message
        : "Unknown network error";

    throw new ApiError(
      `Tidak dapat terhubung ke API. ${detail}`,
      0,
      null,
    );
  }

  let data: unknown;

  try {
    data =
      await parseResponseBody(
        response,
      );
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    const detail =
      error instanceof Error
        ? error.message
        : "Unknown response parsing error";

    throw new ApiError(
      `Response API tidak dapat dibaca. ${detail}`,
      response.status,
      null,
    );
  }

  if (!response.ok) {
    throw new ApiError(
      getResponseErrorMessage(
        response,
        data,
      ),
      response.status,
      data,
    );
  }

  return data as T;
}

function requestWithBody<
  TResponse,
  TBody,
>(
  method: BodyMethod,
  path: string,
  body: TBody | undefined,
  options: MethodRequestOptions,
): Promise<TResponse> {
  return request<TResponse>(
    path,
    {
      ...options,
      method,

      ...(body !== undefined
        ? { body }
        : {}),
    },
  );
}

export const apiClient = {
  get<T>(
    path: string,
    options:
      MethodRequestOptions = {},
  ): Promise<T> {
    return request<T>(
      path,
      {
        ...options,
        method: "GET",
      },
    );
  },

  post<
    TResponse,
    TBody = unknown,
  >(
    path: string,
    body?: TBody,
    options:
      MethodRequestOptions = {},
  ): Promise<TResponse> {
    return requestWithBody<
      TResponse,
      TBody
    >(
      "POST",
      path,
      body,
      options,
    );
  },

  put<
    TResponse,
    TBody = unknown,
  >(
    path: string,
    body?: TBody,
    options:
      MethodRequestOptions = {},
  ): Promise<TResponse> {
    return requestWithBody<
      TResponse,
      TBody
    >(
      "PUT",
      path,
      body,
      options,
    );
  },

  patch<
    TResponse,
    TBody = unknown,
  >(
    path: string,
    body?: TBody,
    options:
      MethodRequestOptions = {},
  ): Promise<TResponse> {
    return requestWithBody<
      TResponse,
      TBody
    >(
      "PATCH",
      path,
      body,
      options,
    );
  },

  delete<T>(
    path: string,
    options:
      MethodRequestOptions = {},
  ): Promise<T> {
    return request<T>(
      path,
      {
        ...options,
        method: "DELETE",
      },
    );
  },
};