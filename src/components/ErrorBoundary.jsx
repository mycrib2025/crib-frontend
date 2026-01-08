import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("🔥 ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white p-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
            <p className="opacity-70">
              CRIB hit an unexpected error. Please refresh.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
