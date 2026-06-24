// =========================================================================
// Login Page Renderer
// =========================================================================
function renderLogin() {
  const app = document.getElementById("app-content");
  
  // Parse hash role if supplied
  const hashString = window.location.hash;
  let targetRole = "candidate";
  if (hashString.includes("role=employer")) targetRole = "employer";

  app.innerHTML = `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-5">
          <div class="card card-premium p-4 shadow-lg">
            <div class="text-center mb-4">
              <a class="navbar-brand d-inline-flex align-items-center mb-3" href="#/">
                <i class="fa-solid fa-briefcase text-primary fs-3 me-2"></i>
                <span class="fs-3 text-dark-theme-toggle">HireHub</span>
              </a>
              <h4 class="font-heading fw-bold text-dark-theme-toggle">Welcome Back</h4>
              <p class="text- small">Access your personalized portal workspace</p>
            </div>
            
            <form id="login-form">
              <div class="mb-3">
                <label for="login-email" class="form-label small fw-semibold text-dark-theme-toggle">Email Address</label>
                <input type="email" class="form-control" id="login-email" required placeholder="name@domain.com">
              </div>
              
              <div class="mb-3">
                <div class="d-flex justify-content-between">
                  <label for="login-password" class="form-label small fw-semibold text-dark-theme-toggle">Password</label>
                  <a href="javascript:void(0)" class="small text-decoration-none" id="forgot-password">Forgot Password?</a>
                </div>
                <input type="password" class="form-control" id="login-password" required placeholder="••••••••">
              </div>
              
              <div class="mb-4">
                <label class="form-label small fw-semibold text-dark-theme-toggle d-block">Sign in as:</label>
                <div class="d-flex gap-4">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="login-role" id="role-cand" value="candidate" ${targetRole === 'candidate' ? 'checked' : ''}>
                    <label class="form-check-label text-dark-theme-toggle" for="role-cand">Job Seeker</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="login-role" id="role-empl" value="employer" ${targetRole === 'employer' ? 'checked' : ''}>
                    <label class="form-check-label text-dark-theme-toggle" for="role-empl">Corporate Employer</label>
                  </div>
                </div>
              </div>
              
              <div class="form-check mb-4">
                <input class="form-check-input" type="checkbox" id="remember-me">
                <label class="form-check-label small text-" for="remember-me">Remember my session on this device</label>
              </div>
              
              <button type="submit" class="btn btn-primary w-100 btn-pill fw-semibold mb-3">Sign In</button>
            </form>
            
            <p class="text-center small text- mb-0">Don't have an account? <a href="register.html" class="text-decoration-none fw-semibold">Register here</a></p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind forgot password click
  document.getElementById("forgot-password").addEventListener("click", () => {
    showToast("Password reset email link sent (Simulated)", "warning");
  });

  // Bind Form Login
  const form = document.getElementById("login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const email = document.getElementById("login-email").value;
    const role = document.querySelector('input[name="login-role"]:checked').value;
    
    // Lookup registered user or format from email prefix
    const existingUser = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    let name = "";
    if (existingUser) {
      name = existingUser.name;
    } else {
      name = email.split('@')[0].split(/[._-]/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
      state.users.push({ name, email, role });
    }
    
    state.currentUser = {
      loggedIn: true,
      role,
      name,
      email
    };
    
    syncStorage();
    showToast(`Welcome back, ${name}!`, "success");
    renderNavbarUserMenu();
    
    // Route to appropriate dashboard
    window.location.href = role === "employer" ? "employer-dashboard.html" : "candidate-dashboard.html";
  });
}

// =========================================================================
// Register Page Renderer
// =========================================================================
function renderRegister() {
  const app = document.getElementById("app-content");
  
  // Parse hash role if supplied
  const hashString = window.location.hash;
  let targetTab = "candidate";
  if (hashString.includes("role=employer")) targetTab = "employer";

  app.innerHTML = `
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card card-premium p-4 shadow-lg">
            <div class="text-center mb-4">
              <a class="navbar-brand d-inline-flex align-items-center mb-3" href="#/">
                <i class="fa-solid fa-briefcase text-primary fs-3 me-2"></i>
                <span class="fs-3 text-dark-theme-toggle">HireHub</span>
              </a>
              <h4 class="font-heading fw-bold text-dark-theme-toggle">Join Our Platform</h4>
              <p class="text- small">Bridge connections with world-class employers today</p>
            </div>
            
            <!-- Custom tab headers -->
            <ul class="nav nav-tabs nav-tabs-custom justify-content-center mb-4" id="regTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link ${targetTab === 'candidate' ? 'active' : ''}" id="seeker-tab" data-bs-toggle="tab" data-bs-target="#seeker-pane" type="button" role="tab" aria-controls="seeker-pane" aria-selected="${targetTab === 'candidate'}">Job Seeker</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link ${targetTab === 'employer' ? 'active' : ''}" id="employer-tab" data-bs-toggle="tab" data-bs-target="#employer-pane" type="button" role="tab" aria-controls="employer-pane" aria-selected="${targetTab === 'employer'}">Corporate Employer</button>
              </li>
            </ul>
            
            <div class="tab-content" id="regTabContent">
              <!-- Seeker Tab -->
              <div class="tab-pane fade ${targetTab === 'candidate' ? 'show active' : ''}" id="seeker-pane" role="tabpanel" aria-labelledby="seeker-tab" tabindex="0">
                <form id="seeker-reg-form">
                  <div class="mb-3">
                    <label class="form-label small fw-semibold text-dark-theme-toggle">Full Name *</label>
                    <input type="text" class="form-control" id="seek-name" required placeholder="Sarah Connor">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-semibold text-dark-theme-toggle">Email Address *</label>
                    <input type="email" class="form-control" id="seek-email" required placeholder="sarah.c@gmail.com">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-semibold text-dark-theme-toggle">Password *</label>
                    <input type="password" class="form-control" id="seek-pass" required placeholder="Choose a password" minlength="6">
                  </div>
                  <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" id="seek-terms" required>
                    <label class="form-check-label small text-" for="seek-terms">I accept the terms of service and privacy policy guidelines.</label>
                  </div>
                  <button type="submit" class="btn btn-primary w-100 btn-pill fw-semibold">Complete Seeker Registration</button>
                </form>
              </div>
              
              <!-- Employer Tab -->
              <div class="tab-pane fade ${targetTab === 'employer' ? 'show active' : ''}" id="employer-pane" role="tabpanel" aria-labelledby="employer-tab" tabindex="0">
                <form id="employer-reg-form">
                  <div class="mb-3">
                    <label class="form-label small fw-semibold text-dark-theme-toggle">Company / Enterprise Name *</label>
                    <input type="text" class="form-control" id="emp-name" required placeholder="e.g. Adobe Recruiting">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-semibold text-dark-theme-toggle">Corporate Email Address *</label>
                    <input type="email" class="form-control" id="emp-email" required placeholder="recruiter@enterprise.com">
                  </div>
                  <div class="mb-3">
                    <label class="form-label small fw-semibold text-dark-theme-toggle">Password *</label>
                    <input type="password" class="form-control" id="emp-pass" required placeholder="Choose a password" minlength="6">
                  </div>
                  <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" id="emp-terms" required>
                    <label class="form-check-label small text-" for="emp-terms">I accept the terms of service and corporate compliance guidelines.</label>
                  </div>
                  <button type="submit" class="btn btn-primary w-100 btn-pill fw-semibold">Complete Corporate Registration</button>
                </form>
              </div>
            </div>
            
            <p class="text-center small text- mt-4 mb-0">Already have an account? <a href="login.html" class="text-decoration-none fw-semibold">Sign In here</a></p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Seeker form submit
  document.getElementById("seeker-reg-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("seek-name").value;
    const email = document.getElementById("seek-email").value;
    
    if (!state.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      state.users.push({ name, email, role: "candidate" });
    }
    
    state.currentUser = {
      loggedIn: true,
      role: "candidate",
      name,
      email
    };
    syncStorage();
    showToast(`Account registered successfully for candidate ${name}`, "success");
    renderNavbarUserMenu();
    window.location.href = "candidate-dashboard.html";
  });

  // Employer form submit
  document.getElementById("employer-reg-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("emp-name").value;
    const email = document.getElementById("emp-email").value;
    
    if (!state.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      state.users.push({ name, email, role: "employer" });
    }
    
    state.currentUser = {
      loggedIn: true,
      role: "employer",
      name,
      email
    };
    syncStorage();
    showToast(`Account registered successfully for enterprise ${name}`, "success");
    renderNavbarUserMenu();
    window.location.href = "employer-dashboard.html";
  });
}

if (window.location.pathname.includes("login")) {
    renderLogin();
}

if (window.location.pathname.includes("register")) {
    renderRegister();
}

hideLoader();