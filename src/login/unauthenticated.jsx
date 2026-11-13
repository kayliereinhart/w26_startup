import React from 'react';
import { MessageDialog } from './messageDialog';

export function Unauthenticated({ userName: initialUserName = '', onLogin }) {
  const [userName, setUserName] = React.useState(initialUserName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  React.useEffect(() => {
    async function loadPoem() {
      try {
        const response = await fetch('https://poetrydb.org/random/1/author,lines');
        if (!response.ok) throw new Error('Could not load a poem');

        const [poem] = await response.json();
        if (!poem || !Array.isArray(poem.lines)) throw new Error('No poem found');

        setQuote(poem.lines.filter((line) => line.trim()).join(' '));
        setQuoteAuthor(poem.author || 'Unknown author');
      } catch {
        setQuote('A poem could not be loaded right now.');
        setQuoteAuthor('');
      }
    }

    loadPoem();
  }, []);

  return (
    <main className="container page-content d-flex flex-grow-1 align-items-center py-5">
      <div className="row g-4 g-xl-5 align-items-stretch w-100 mx-auto">
        <div className="col-lg-6 d-flex flex-column gap-4">
          <section className="hero-panel p-4 p-md-5" aria-labelledby="welcome-heading">
            <p className="text-uppercase fw-semibold small text-forest mb-2">Make time for a good story</p>
            <h1 id="welcome-heading" className="h2 fw-bold mb-3">A little reading goes a long way.</h1>
            <p className="fs-5 mb-0">Set reading goals, log your progress, and earn rewards that make reading feel even better.</p>
          </section>
          <aside className="quote-card card shadow-sm" aria-labelledby="quote-heading">
            <div className="card-body p-4 p-md-5">
              <div className="quote-accent border-start border-3 ps-3">
                <h2 id="quote-heading" className="quote-heading h6 text-uppercase fw-bold">Today's poem</h2>
                <span className="quote-mark" aria-hidden="true">&ldquo;</span>
                <blockquote className="fs-5 fst-italic mb-1">{quote}</blockquote>
                <p className="quote-attribution mb-0">&mdash; {quoteAuthor}</p>
              </div>
            </div>
          </aside>
        </div>

        <div className="col-lg-6">
          <section className="login-card login-card-fixed card shadow-sm" aria-labelledby="login-heading">
            <div className="card-body p-4 p-md-5 d-flex flex-column justify-content-center">
              <p className="text-uppercase fw-semibold small text-forest mb-2">Welcome back</p>
              <h2 id="login-heading" className="h2 fw-bold mb-2">Sign in or join us</h2>
              <form>
                <div className="mb-3">
                  <label for="email" className="form-label fw-semibold">Email</label>
                  <input className="form-control form-control-lg" id="email" name="email" type="email" placeholder="reader@example.com" autoComplete="email" required value={userName} onChange={(e) => setUserName(e.target.value)}></input>
                </div>
                <div className="mb-4">
                  <label for="password" className="form-label fw-semibold">Password</label>
                  <input className="form-control form-control-lg" id="password" name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-forest btn-lg" type="button" disabled={!userName || !password} onClick={() => loginUser()}>Sign in</button>
                  <button className="btn btn-outline-success btn-lg" type="button" disabled={!userName || !password} onClick={() => createUser()}>Create account</button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </main>
  );
}
