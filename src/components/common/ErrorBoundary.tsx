import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackTitle?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-white border border-[#E5E8F0] rounded-xl shadow-card m-4 max-w-2xl mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#111827]">
            {this.props.fallbackTitle || 'Component Error Encountered'}
          </h2>
          <p className="text-xs text-[#6B7280]">
            {this.state.error?.message || 'An unexpected rendering error occurred. You can retry loading this view or return to the dashboard.'}
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-[#5B6FF5] hover:bg-[#4557E0] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Component</span>
            </button>
            <button
              onClick={() => {
                this.handleReset();
                window.location.href = '/dashboard';
              }}
              className="px-4 py-2 bg-white hover:bg-[#F8F9FC] border border-[#E5E8F0] text-[#111827] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-[#6B7280]" />
              <span>Executive Dashboard</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
