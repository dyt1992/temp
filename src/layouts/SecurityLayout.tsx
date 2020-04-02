import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';

interface SecurityLayoutProps {
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props;
    if (loading || !isReady) {
      return <PageLoading />;
    }
    return children;
  }
}

export default SecurityLayout
