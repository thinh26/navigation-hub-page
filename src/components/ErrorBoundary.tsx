import { Component, ErrorInfo, ReactNode } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { Icon } from '@iconify/react';

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in the child component tree
 * Displays a fallback UI instead of crashing the entire application
 */
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="md" sx={{ py: 8 }}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 24px',
                borderRadius: 4,
                background: 'linear-gradient(135deg, rgba(186, 26, 26, 0.1), rgba(255, 180, 171, 0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon
                icon="material-symbols:error-outline"
                style={{ fontSize: 64, color: '#BA1A1A' }}
              />
            </Box>
            <Typography variant="h4" gutterBottom sx={{ mb: 2, fontWeight: 500 }}>
              Oops! Something went wrong
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              We encountered an unexpected error. Please try refreshing the page or return to the home page.
            </Typography>
            {this.state.error && (
              <Paper
                sx={{
                  p: 2,
                  mb: 4,
                  bgcolor: 'rgba(0, 0, 0, 0.03)',
                  borderRadius: 2,
                  textAlign: 'left',
                }}
              >
                <Typography variant="caption" component="pre" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {this.state.error.toString()}
                </Typography>
              </Paper>
            )}
            <Button
              variant="contained"
              size="large"
              onClick={this.handleReset}
              startIcon={<Icon icon="material-symbols:home-outline" />}
              sx={{ borderRadius: 3 }}
            >
              Return to Home
            </Button>
          </Paper>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
