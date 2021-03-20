export default function Custom404() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
      }}
    >
      <div>
        <div>
          <h1 style={{ borderBottom: '2px solid var(--text-color)', marginBottom: '1.5rem' }}>404 Error</h1>
          <p style={{ marginBottom: '1rem' }}>This page could not be found.</p>
        </div>
        <div>
          <a href='/' style={{ fontSize: '3rem' }}>
            ⟵ Go back home
          </a>
        </div>
      </div>
    </div>
  );
}
