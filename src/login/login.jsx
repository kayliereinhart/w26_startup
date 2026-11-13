import React from 'react';
import { AuthState } from './authState';
import { Authenticated } from './authenticated';
import { Unauthenticated } from './unauthenticated';

export function Login({ authState, userName, onAuthChange }) {
  if (authState === AuthState.Authenticated) {
    return <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />;
  }

  return <Unauthenticated
    userName={userName}
    onLogin={(name) => onAuthChange?.(name, AuthState.Authenticated)}
  />;
}
