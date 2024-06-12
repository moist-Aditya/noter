export function getErrorMessage(error: any): string {
  if (!error) {
    return "Something went wrong"
  }

  // Check for standard Error object
  if (error instanceof Error) {
    return error.message
  }

  // Check for Axios error response
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message
  }

  // Check for error message in response object (e.g., from a server response)
  if (error.response && error.response.message) {
    return error.response.message
  }

  // Check for custom error message field
  if (error.message) {
    return error.message
  }

  // Check for error message in a nested error object
  if (error.error && error.error.message) {
    return error.error.message
  }

  // Fallback generic message
  return "Something went wrong"
}
