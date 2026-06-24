// =========================================================================
// Employer Dashboard Page Renderer
// =========================================================================
function renderEmployerDashboard() {
  const app = document.getElementById("app-content");

  // Force Employer Login Check
  if (!state.currentUser.loggedIn || state.currentUser.role !== "employer") {
    app.innerHTML = `
      <div class="container py-5 text-center">
        <i class="fa-solid fa-lock fs-1 text-danger mb-3"></i>
        <h3 class="font-heading fw-bold text-dark-theme-toggle">Employer Dashboard Locked</h3>
        <p class="text-">Please sign in with a verified enterprise account to access candidate matching metrics.</p>
        <a href="login.html?role=employer" class="btn btn-primary btn-pill">Go to Login</a>
      </div>
    `;
    return;
  }

  // Count active stats
  const postedJobsList = state.jobs.filter(j => state.postedJobs.includes(j.id));
  const activeJobsCount = postedJobsList.length;
  
  // Synthesize applicants from posted jobs
  const applications = [];
  // Candidate pool mock
  const mockCandidates = [
    { name: "Sarah Connor", email: "sarah.c@gmail.com", skills: "React, CSS Grid, HTML5" },
    { name: "John Connor", email: "john.c@cyberdyne.io", skills: "Python, SQL, PyTorch" },
    { name: "Elena Gilbert", email: "elena.g@salvatore.com", skills: "Figma, User Research, Wireframes" },
    { name: "Stefan Salvatore", email: "stefan@mysticfalls.org", skills: "Copywriting, Google Ads, SEO" }
  ];

  // Match application statuses
  state.appliedJobs.forEach((app, idx) => {
    const job = state.jobs.find(j => j.id === app.jobId);
    if (job && state.postedJobs.includes(job.id)) {
      const fallbackCand = mockCandidates[idx % mockCandidates.length];
      applications.push({
        candidateName: app.candidateName || fallbackCand.name,
        candidateEmail: app.candidateEmail || fallbackCand.email,
        candidateSkills: app.candidateSkills || fallbackCand.skills || "HTML5, CSS3, JavaScript",
        jobTitle: job.title,
        jobId: job.id,
        appliedDate: app.appliedDate,
        status: app.status,
        appIndex: idx // Save original index in appliedJobs array to mutate it
      });
    }
  });

  // Render applications table rows
  let appRowsHtml = "";
  if (applications.length > 0) {
    applications.forEach(app => {
      let actions = "";
      if (app.status === "Pending" || app.status === "In Review") {
        actions = `
          <button class="btn btn-sm btn-success btn-app-action mb-1 mb-md-0 me-md-1" data-action="Accepted" data-idx="${app.appIndex}">Accept</button>
          <button class="btn btn-sm btn-danger btn-app-action" data-action="Rejected" data-idx="${app.appIndex}">Reject</button>
        `;
      } else {
        actions = `<span class="text- small fw-semibold">Resolved</span>`;
      }
      
      let badgeClass = "bg-warning-subtle text-warning";
      if (app.status === "Accepted") badgeClass = "bg-success-subtle text-success";
      if (app.status === "Rejected") badgeClass = "bg-danger-subtle text-danger";
      if (app.status === "In Review") badgeClass = "bg-info-subtle text-info";

      appRowsHtml += `
        <tr>
          <td>
            <h6 class="mb-0 font-heading fw-bold text-dark-theme-toggle">${app.candidateName}</h6>
            <span class="text- small">${app.candidateEmail}</span>
          </td>
          <td>
            <h6 class="mb-0 font-heading small text-dark-theme-toggle">${app.jobTitle}</h6>
            <span class="text- small">${app.appliedDate}</span>
          </td>
          <td><span class="badge ${badgeClass}">${app.status}</span></td>
          <td>
            ${actions}
          </td>
        </tr>
      `;
    });
  } else {
    appRowsHtml = `<tr><td colspan="4" class="text-center py-4 text-">No candidate applications submitted for your listings yet.</td></tr>`;
  }

  // Render posted jobs list
  let postedHtml = "";
  if (postedJobsList.length > 0) {
    postedJobsList.forEach(job => {
      postedHtml += `
        <tr id="employer-job-row-${job.id}">
          <td>
            <h6 class="mb-0 font-heading fw-bold text-dark-theme-toggle"><a href="job-details.html?id=${job.id}" class="text-decoration-none">${job.title}</a></h6>
            <span class="text- small">${job.category} &bull; ${job.location}</span>
          </td>
          <td>$${job.salary.toLocaleString()}</td>
          <td>${job.type}</td>
          <td>
            <button class="btn btn-sm btn-outline-danger btn-delete-job btn-pill" data-job-id="${job.id}">Delete</button>
          </td>
        </tr>
      `;
    });
  } else {
    postedHtml = `<tr><td colspan="4" class="text-center py-4 text-">You have not posted any careers yet.</td></tr>`;
  }

  app.innerHTML = `
    <div class="container py-5">
      <div class="row g-4 mb-4">
        <!-- Stat Cards -->
        <div class="col-md-4">
          <div class="dashboard-stat-card">
            <div>
              <h3 class="font-heading fw-bold text-primary mb-1">${activeJobsCount}</h3>
              <span class="text- small fw-semibold">Active Jobs Posted</span>
            </div>
            <div class="dashboard-stat-icon"><i class="fa-solid fa-briefcase"></i></div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="dashboard-stat-card">
            <div>
              <h3 class="font-heading fw-bold text-primary mb-1">${applications.length}</h3>
              <span class="text- small fw-semibold">Total Job Applications</span>
            </div>
            <div class="dashboard-stat-icon"><i class="fa-solid fa-paper-plane"></i></div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="dashboard-stat-card">
            <div>
              <h3 class="font-heading fw-bold text-primary mb-1">${applications.filter(a => a.status === "Accepted").length}</h3>
              <span class="text- small fw-semibold">Shortlisted Candidates</span>
            </div>
            <div class="dashboard-stat-icon"><i class="fa-solid fa-user-check"></i></div>
          </div>
        </div>
      </div>
      
      <div class="row g-4">
        <!-- Posted Jobs & Applications -->
        <div class="col-lg-8">
          <div class="card card-premium p-4 mb-4">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-4"><i class="fa-solid fa-list-check text-primary me-2"></i>Active Career Postings</h5>
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead>
                  <tr class="text- small">
                    <th>Job Parameters</th>
                    <th>Salary</th>
                    <th>Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${postedHtml}
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="card card-premium p-4">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-4"><i class="fa-solid fa-users text-primary me-2"></i>Candidate Applications Manager</h5>
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead>
                  <tr class="text- small">
                    <th>Candidate</th>
                    <th>Applied Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${appRowsHtml}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <!-- Post New Job Form -->
        <div class="col-lg-4">
          <div class="card card-premium p-4 position-sticky" style="top: 95px;">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-4"><i class="fa-solid fa-square-plus text-primary me-2"></i>Post a New Job</h5>
            
            <form id="post-job-form">
              <div class="mb-3">
                <label for="job-title-in" class="form-label small fw-semibold text-dark-theme-toggle">Job Title *</label>
                <input type="text" class="form-control" id="job-title-in" required placeholder="e.g. Senior Frontend Architect">
              </div>
              
              <div class="mb-3">
                <label for="job-category-in" class="form-label small fw-semibold text-dark-theme-toggle">Category *</label>
                <select class="form-select" id="job-category-in" required>
                  <option value="">Select Category</option>
                  ${state.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}
                </select>
              </div>
              
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label for="job-type-in" class="form-label small fw-semibold text-dark-theme-toggle">Job Type *</label>
                  <select class="form-select" id="job-type-in" required>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div class="col-6">
                  <label for="job-exp-in" class="form-label small fw-semibold text-dark-theme-toggle">Experience *</label>
                  <select class="form-select" id="job-exp-in" required>
                    <option value="0-1 years">0-1 years</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="2-3 years">2-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5+ years">5+ years</option>
                  </select>
                </div>
              </div>
              
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <label for="job-salary-in" class="form-label small fw-semibold text-dark-theme-toggle">Salary ($/yr) *</label>
                  <input type="number" class="form-control" id="job-salary-in" required min="10000" max="300000" placeholder="e.g. 110000">
                </div>
                <div class="col-6">
                  <label for="job-location-in" class="form-label small fw-semibold text-dark-theme-toggle">Location *</label>
                  <input type="text" class="form-control" id="job-location-in" required placeholder="e.g. San Jose, CA">
                </div>
              </div>
              
              <div class="mb-3">
                <label for="job-desc-in" class="form-label small fw-semibold text-dark-theme-toggle">Job Description *</label>
                <textarea class="form-control" id="job-desc-in" rows="4" required placeholder="Describe responsibilities, timeline, culture details..."></textarea>
              </div>
              
              <div class="mb-3">
                <label for="job-skills-in" class="form-label small fw-semibold text-dark-theme-toggle">Skills Required (Comma separated)</label>
                <input type="text" class="form-control" id="job-skills-in" placeholder="e.g. React, Docker, NodeJS">
              </div>
              
              <button type="submit" class="btn btn-primary w-100 btn-pill fw-semibold mt-2">Publish Listing</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind Accept/Reject Application buttons
  document.querySelectorAll(".btn-app-action").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-idx"), 10);
      const action = btn.getAttribute("data-action"); // 'Accepted' or 'Rejected'
      
      state.appliedJobs[idx].status = action;
      syncStorage();
      showToast(`Candidate application was ${action.toLowerCase()}`, "success");
      renderEmployerDashboard(); // Re-render to show updated status
    });
  });

  // Bind Delete Job posting button
  document.querySelectorAll(".btn-delete-job").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-job-id"), 10);
      
      // Remove from global jobs database
      const jobIdx = state.jobs.findIndex(j => j.id === id);
      if (jobIdx !== -1) {
        state.jobs.splice(jobIdx, 1);
      }
      
      // Remove from employer posted association list
      const postedIdx = state.postedJobs.indexOf(id);
      if (postedIdx !== -1) {
        state.postedJobs.splice(postedIdx, 1);
      }
      
      syncStorage();
      showToast("Job listing deleted successfully", "info");
      renderEmployerDashboard();
    });
  });

  // Bind Form Submission
  const form = document.getElementById("post-job-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const title = document.getElementById("job-title-in").value;
    const category = document.getElementById("job-category-in").value;
    const type = document.getElementById("job-type-in").value;
    const exp = document.getElementById("job-exp-in").value;
    const salary = parseInt(document.getElementById("job-salary-in").value, 10);
    const location = document.getElementById("job-location-in").value;
    const desc = document.getElementById("job-desc-in").value;
    const skillsString = document.getElementById("job-skills-in").value;
    
    // Parse skills
    const skills = skillsString ? skillsString.split(",").map(s => s.trim()).filter(s => s.length > 0) : ["General"];
    
    // Create new job object
    const newId = state.jobs.length > 0 ? Math.max(...state.jobs.map(j => j.id)) + 1 : 1;
    const newJob = {
      id: newId,
      title,
      company: state.currentUser.name, // Logged in company
      logoLetter: state.currentUser.name.charAt(0).toUpperCase(),
      logoColor: "#0a66c2",
      location,
      type,
      category,
      salary,
      experience: exp,
      postedDate: new Date().toISOString().split("T")[0],
      description: desc,
      skills,
      benefits: ["Enterprise Healthcare Coverage", "Subsidized Equipment", "Professional Mentoring"]
    };
    
    state.jobs.unshift(newJob); // Add to front of global list
    state.postedJobs.push(newId);
    
    syncStorage();
    showToast("Successfully posted new career listing!", "success");
    renderEmployerDashboard();
  });
}

document.addEventListener("DOMContentLoaded", () => {
    renderEmployerDashboard();
    hideLoader();
});