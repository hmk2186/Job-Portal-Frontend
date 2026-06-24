// =========================================================================
// Candidate Dashboard Page Renderer
// =========================================================================
function renderCandidateDashboard() {
  const app = document.getElementById("app-content");

  // Force Login check
  if (!state.currentUser.loggedIn || state.currentUser.role !== "candidate") {
    app.innerHTML = `
      <div class="container py-5 text-center">
        <i class="fa-solid fa-lock fs-1 text-danger mb-3"></i>
        <h3 class="font-heading fw-bold text-dark-theme-toggle">Candidate Area Locked</h3>
        <p>Please sign in with a candidate account to access your applications portal.</p>
        <a href="login.html?role=candidate" class="btn btn-primary btn-pill">Go to Login</a>
      </div>
    `;
    return;
  }

  // Render applied jobs rows
  let appliedRowsHtml = "";
  if (state.appliedJobs.length > 0) {
    state.appliedJobs.forEach(app => {
      const job = state.jobs.find(j => j.id === app.jobId);
      if (!job) return;
      
      let badgeClass = "bg-warning-subtle text-warning";
      if (app.status === "Accepted") badgeClass = "bg-success-subtle text-success";
      if (app.status === "Rejected") badgeClass = "bg-danger-subtle text-danger";
      if (app.status === "In Review") badgeClass = "bg-info-subtle text-info";
      
      appliedRowsHtml += `
        <tr>
          <td>
            <div class="d-flex align-items-center gap-2">
              <div class="company-logo-container" style="width: 38px; height: 38px; font-size: 0.9rem; flex-shrink:0;">${job.logoLetter}</div>
              <div>
                <h6 class="mb-0 font-heading fw-bold text-dark-theme-toggle"><a href="job-details.html?id=${job.id}" class="text-decoration-none">${job.title}</a></h6>
                <span class="small">${job.company}</span>
              </div>
            </div>
          </td>
          <td>${app.appliedDate}</td>
          <td><span class="badge ${badgeClass}">${app.status}</span></td>
          <td>
            <a href="job-details.html?id=${job.id}" class="btn btn-sm btn-outline-primary btn-pill">Review Details</a>
          </td>
        </tr>
      `;
    });
  } else {
    appliedRowsHtml = `<tr><td colspan="4" class="text-center py-4">You have not applied to any job listings yet.</td></tr>`;
  }

  // Render bookmarked jobs
  let savedHtml = "";
  if (state.savedJobs.length > 0) {
    state.savedJobs.forEach(id => {
      const job = state.jobs.find(j => j.id === id);
      if (!job) return;
      
      savedHtml += `
        <div class="col-md-6" id="saved-card-${job.id}">
          <div class="card card-premium job-card">
            <div class="d-flex justify-content-between">
              <div class="d-flex gap-2">
                <div class="company-logo-container" style="width: 40px; height: 40px; font-size: 1rem;">${job.logoLetter}</div>
                <div>
                  <h6 class="font-heading fw-bold mb-0 text-dark-theme-toggle"><a href="job-details.html?id=${job.id}" class="text-decoration-none">${job.title}</a></h6>
                  <span class="small text-dark-theme-toggle">${job.company}</span>
                </div>
              </div>
              <button class="btn btn-link text-danger p-0 border-0 btn-remove-saved" data-job-id="${job.id}" title="Remove Bookmark">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
              <span class="text-primary fw-bold small">$${(job.salary / 1000).toFixed(0)}k/yr</span>
              <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-pill btn-sm">Apply Now</a>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    savedHtml = `<div class="col-12 text-center py-4 text-dark-theme-toggle">No items bookmarked in your Saved list yet.</div>`;
  }

  app.innerHTML = `
    <div class="container py-5">
      <div class="row g-4">
        <!-- Profile Column -->
        <div class="col-lg-4">
          <div class="card card-premium p-4 mb-4 text-center">
            <div class="mb-3 position-relative d-inline-block mx-auto">
              <i class="fa-solid fa-user-circle fs-1 text-primary bg-light p-3 rounded-circle border shadow-sm"></i>
            </div>
            <h5 class="font-heading fw-bold mb-1 text-dark-theme-toggle">${state.currentUser.name}</h5>
            <p class="small mb-3">Senior Software Architect</p>
            
            <div class="d-flex justify-content-center gap-2 small mb-4">
              <span><i class="fa-solid fa-location-dot me-1"></i>San Francisco, CA</span>
            </div>
            
            <div class="row g-2 border-top pt-3 text-center">
              <div class="col-6 border-end">
                <h5 class="font-heading fw-bold text-primary mb-0">${state.appliedJobs.length}</h5>
                <span class="small">Applications</span>
              </div>
              <div class="col-6">
                <h5 class="font-heading fw-bold text-primary mb-0">${state.savedJobs.length}</h5>
                <span class="small">Saved Jobs</span>
              </div>
            </div>
          </div>
          
          <!-- Resume Upload -->
          <div class="card card-premium p-4">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-3"><i class="fa-solid fa-file-arrow-up text-primary me-2"></i>Resume Management</h5>
            <p class="small">Upload your latest PDF resume. Recruiters see this document on candidate profiles.</p>
            
            <div class="border border-dashed rounded p-4 text-center cursor-pointer mb-3" id="resume-dropzone" style="background-color: var(--accent-bg); border-style: dashed !important;">
              <i class="fa-solid fa-cloud-arrow-up fs-2 text-primary mb-2"></i>
              <h6 class="small fw-semibold text-dark-theme-toggle mb-1">Click to browse or drop here</h6>
              <span class="small block">Supports PDF formats (Max 5MB)</span>
              <input type="file" id="resume-file-input" accept=".pdf" class="d-none">
            </div>
            
            <div id="resume-upload-status" class="small">
              <!-- Upload status bars injected here -->
            </div>
          </div>
        </div>
        
        <!-- Application Tables & Bookmarks -->
        <div class="col-lg-8">
          <div class="card card-premium p-4 mb-4">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-4"><i class="fa-solid fa-paper-plane text-primary me-2"></i>Job Applications Pipeline</h5>
            
            <div class="table-responsive">
              <table class="table table-hover align-middle">
                <thead>
                  <tr class="text-dark-theme-toggle small">
                    <th>Job Title & Company</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${appliedRowsHtml}
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Saved Jobs List -->
          <div class="card card-premium p-4">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-4"><i class="fa-regular fa-bookmark text-primary me-2"></i>Bookmarked Career Listings</h5>
            <div class="row g-3" id="saved-jobs-grid">
              ${savedHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind Resume Upload
  const dropzone = document.getElementById("resume-dropzone");
  const fileInput = document.getElementById("resume-file-input");
  const statusContainer = document.getElementById("resume-upload-status");
  
  dropzone.addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      
      // Check PDF
      if (file.type !== "application/pdf") {
        showToast("Invalid file type: Please upload a PDF", "error");
        return;
      }
      
      // Simulate upload loading
      statusContainer.innerHTML = `
        <div class="mt-2 text-dark-theme-toggle">Uploading: <strong>${file.name}</strong></div>
        <div class="progress mt-1" style="height: 6px;">
          <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%"></div>
        </div>
      `;
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        statusContainer.querySelector(".progress-bar").style.width = `${progress}%`;
        
        if (progress >= 100) {
          clearInterval(interval);
          statusContainer.innerHTML = `
            <div class="alert alert-success d-flex align-items-center gap-2 mt-2 p-2 small mb-0" role="alert">
              <i class="fa-solid fa-circle-check fs-5"></i>
              <div>Uploaded <strong>${file.name}</strong> successfully!</div>
            </div>
          `;
          showToast("Resume uploaded successfully", "success");
        }
      }, 200);
    }
  });

  // Bind Remove Saved Item Trigger
  document.querySelectorAll(".btn-remove-saved").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.getAttribute("data-job-id"), 10);
      const index = state.savedJobs.indexOf(id);
      if (index !== -1) {
        state.savedJobs.splice(index, 1);
        syncStorage();
        showToast("Bookmark removed", "info");
        
        // Remove card element
        const card = document.getElementById(`saved-card-${id}`);
        if (card) card.remove();
        
        // Check if empty
        if (state.savedJobs.length === 0) {
          document.getElementById("saved-jobs-grid").innerHTML = `<div class="col-12 text-center py-4">No items bookmarked in your Saved list yet.</div>`;
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCandidateDashboard();
    hideLoader();
});