import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6">
          <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
          <pre className="mt-4 text-sm text-gray-700">{String(this.state.error)}</pre>
          <div className="mt-4">
            <button
              onClick={() => window.location.assign("/")}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Products List
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
