export function classifyError(error: unknown): { title: string; message: string } {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const lowerMessage = errorMessage.toLowerCase();

  if (lowerMessage.includes("401") || lowerMessage.includes("unauthorized") || lowerMessage.includes("invalid api key")) {
    return {
      title: "Authentication Failed",
      message: "Your API key is invalid or expired. Please check your API key in extension preferences.",
    };
  }

  if (lowerMessage.includes("403") || lowerMessage.includes("forbidden")) {
    return {
      title: "Access Denied",
      message: "Your API key doesn't have access to this model. Check your plan or try a different model.",
    };
  }

  if (lowerMessage.includes("404") || lowerMessage.includes("not found") || lowerMessage.includes("model not found")) {
    return {
      title: "Model Not Found",
      message: "The specified model was not found. Please check the model name in extension preferences.",
    };
  }

  if (lowerMessage.includes("429") || lowerMessage.includes("rate limit") || lowerMessage.includes("too many requests")) {
    return {
      title: "Rate Limited",
      message: "Too many requests. Please wait a moment and try again.",
    };
  }

  if (lowerMessage.includes("500") || lowerMessage.includes("internal server error")) {
    return {
      title: "Server Error",
      message: "The API server encountered an error. Please try again later.",
    };
  }

  if (
    lowerMessage.includes("econnrefused") ||
    lowerMessage.includes("enotfound") ||
    lowerMessage.includes("network") ||
    lowerMessage.includes("fetch failed")
  ) {
    return {
      title: "Connection Failed",
      message: "Could not connect to the API server. Please check the API base URL and your internet connection.",
    };
  }

  if (lowerMessage.includes("timeout") || lowerMessage.includes("timed out")) {
    return {
      title: "Request Timeout",
      message: "The request took too long. Please try again or use a faster model.",
    };
  }

  if (lowerMessage.includes("abort") || lowerMessage.includes("cancel")) {
    return {
      title: "Cancelled",
      message: "The translation was cancelled.",
    };
  }

  return {
    title: "Translation Error",
    message: errorMessage || "An unexpected error occurred. Please try again.",
  };
}
