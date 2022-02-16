import { Component } from "react";
import { Message } from "semantic-ui-react";

interface ErrorBoundaryProps {
  label: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Message negative={true} className="error-message">
          <Message.Header>{this.props.label}</Message.Header>
        </Message>
      );
    }

    return this.props.children;
  }
}
