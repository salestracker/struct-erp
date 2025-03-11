import React, { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication process
    console.log('Attempting login with:', email, password);
    onLogin();
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '0.5rem' }} 
            required 
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '0.5rem' }} 
            required 
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
      </form>
    </div>
  );
}
