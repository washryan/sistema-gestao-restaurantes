import React from 'react';
import { render, screen } from '@testing-library/react';
import { withAuth } from '../withAuth';
import { AuthProvider } from '../../contexts/AuthContext';

jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('withAuth HOC', () => {
  const MockComponent = () => <div>Protected Content</div>;
  const ProtectedComponent = withAuth(MockComponent);

  it('renders protected component when authenticated', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      isAuthenticated: true,
      user: { email: 'test@example.com' },
      login: jest.fn(),
      logout: jest.fn(),
    }));

    render(
      <AuthProvider>
        <ProtectedComponent />
      </AuthProvider>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('does not render protected component when not authenticated', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      login: jest.fn(),
      logout: jest.fn(),
    }));

    render(
      <AuthProvider>
        <ProtectedComponent />
      </AuthProvider>
    );

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});

