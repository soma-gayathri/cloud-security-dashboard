import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Cloud Security Dashboard</h1>
        <p>Login to manage security alerts</p>

        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" />
          </div>

          <button type="submit">Login</button>
        </form>

        <div className="demo-login">
          <p>Demo Login:</p>
          <span>Email: fresher@cisco-demo.com</span>
          <span>Password: password123</span>
        </div>
      </div>
    </div>
  );
}

export default Login;