export default function UnauthenticatedApp() {
  return (
    <div>
      <h1 style={{ color: "red" }}>this is unauthenticated app yo</h1>
      <a href="/auth/google">login with google</a>
    </div>
  );
}
