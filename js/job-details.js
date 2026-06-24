// =========================================================================
// Job Details Page Renderer
// =========================================================================
function renderJobDetails(id) {
  const app = document.getElementById("job-details-container");
  
  const job = state.jobs.find(j => j.id === id);
  if (!job) {
    app.innerHTML = `
      <div class="container py-5 text-center">
        <i class="fa-solid fa-circle-exclamation fs-1 text-danger mb-3"></i>
        <h3 class="font-heading fw-bold">Job Profile Not Found</h3>
        <p class="text-">The listing you are searching for might have expired or been removed.</p>
        <a href="jobs.html" class="btn btn-primary btn-pill">Back to Jobs</a>
      </div>
    `;
    return;
  }

  const companyDetails = state.companies.find(c => c.name.toLowerCase() === job.company.toLowerCase()) || {
    headquarters: "Not available",
    size: "Unknown",
    rating: "3.5★",
    description: "Enterprise operating globally in multiple regions."
  };

  const isSaved = state.savedJobs.includes(job.id);
  const isApplied = state.appliedJobs.some(a => a.jobId === job.id);
  
  // Find related jobs (same category, different ID)
  const relatedJobs = state.jobs.filter(j => j.category === job.category && j.id !== job.id).slice(0, 3);
  let relatedJobsHtml = "";
  if (relatedJobs.length > 0) {
    relatedJobs.forEach(rj => {
      relatedJobsHtml += `
        <a href="job-details.html?id=${rj.id}" class="list-group-item list-group-item-action border-0 px-0 py-3 border-bottom">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="font-heading fw-bold mb-1 text-dark-theme-toggle">${rj.title}</h6>
              <span class="text- small">${rj.company} &bull; ${rj.location}</span>
            </div>
            <span class="badge text-primary border rounded-pill">$${(rj.salary / 1000).toFixed(0)}k/yr</span>
          </div>
        </a>
      `;
    });
  } else {
    relatedJobsHtml = `<p class="text- small py-3 mb-0">No matching related positions in ${job.category} at this time.</p>`;
  }

  app.innerHTML = `
    <div class="container py-5">
      <div class="row g-4">
        <!-- Main Job Info Column -->
        <div class="col-lg-8">
          <div class="card card-premium mb-4 p-0">
            <!-- Header Banner Graphic -->
            <div class="company-banner">
              <div class="company-banner-logo" style="color: ${job.logoColor}; border-color: ${job.logoColor}20">
                ${job.logoLetter}
              </div>
            </div>
            
            <div class="p-4 pt-5 mt-2">
              <div class="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                <div>
                  <h3 class="font-heading fw-bold text-dark-theme-toggle mb-1">${job.title}</h3>
                  <h5 class="text-primary font-heading mb-0">${job.company}</h5>
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-outline-secondary btn-pill d-flex align-items-center justify-content-center btn-bookmark ${isSaved ? 'bookmarked' : ''}" data-job-id="${job.id}" style="width: 42px; height: 42px; padding: 0;">
                    <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                  </button>
                  <button class="btn btn-primary btn-pill fw-semibold" id="btn-apply-job" ${isApplied ? 'disabled' : ''}>
                    ${isApplied ? '<i class="fa-solid fa-circle-check me-2"></i>Applied' : 'Apply For Job'}
                  </button>
                </div>
              </div>
              
              <div class="d-flex flex-wrap gap-3 mb-4 text- small py-2 border-top border-bottom">
                <span><i class="fa-solid fa-location-dot text-primary me-1"></i>${job.location}</span>
                <span><i class="fa-solid fa-money-bill-wave text-primary me-1"></i>$${job.salary.toLocaleString()}/year</span>
                <span><i class="fa-solid fa-briefcase text-primary me-1"></i>${job.type}</span>
                <span><i class="fa-solid fa-calendar-day text-primary me-1"></i>Posted ${job.postedDate}</span>
              </div>
              
              <h5 class="font-heading fw-bold text-dark-theme-toggle mb-3">Job Description</h5>
              <p class="text- leading-relaxed mb-4">${job.description}</p>
              
              <h5 class="font-heading fw-bold text-dark-theme-toggle mb-3">Required Technical Skills</h5>
              <div class="d-flex flex-wrap gap-2 mb-4">
                ${job.skills.map(skill => `<span class="tag-badge">${skill}</span>`).join("")}
              </div>
              
              <h5 class="font-heading fw-bold text-dark-theme-toggle mb-3">Company Benefits</h5>
              <div class="row g-3">
                ${job.benefits.map(b => `
                  <div class="col-md-6 d-flex align-items-center gap-2">
                    <i class="fa-solid fa-circle-check text-success"></i>
                    <span class="text- small">${b}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Sidebar Company Profile -->
        <div class="col-lg-4">
          <div class="card card-premium p-4 mb-4">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-3">Company Overview</h5>
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="company-logo-container" style="color: ${job.logoColor}; border-color: ${job.logoColor}40">
                ${job.logoLetter}
              </div>
              <div>
                <h6 class="font-heading fw-bold mb-0 text-dark-theme-toggle">${job.company}</h6>
                <div class="text-warning small">${companyDetails.rating} <i class="fa-solid fa-star"></i></div>
              </div>
            </div>
            
            <p class="text- small leading-relaxed mb-4">${companyDetails.description}</p>
            
            <div class="d-flex flex-column gap-2 small border-top pt-3 text-">
              <div class="d-flex justify-content-between"><strong>Industry:</strong> <span>${companyDetails.industry}</span></div>
              <div class="d-flex justify-content-between"><strong>Headquarters:</strong> <span>${companyDetails.headquarters}</span></div>
              <div class="d-flex justify-content-between"><strong>Staff size:</strong> <span>${companyDetails.size}</span></div>
            </div>
          </div>
          
          <div class="card card-premium p-4">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-2">Similar Opportunities</h5>
            <div class="list-group list-group-flush">
              ${relatedJobsHtml}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind Bookmark inside details page
  bindBookmarkButtons();

  // Bind Apply Button
  const applyBtn = document.getElementById("btn-apply-job");
  applyBtn.addEventListener("click", () => {
    // If not logged in, redirect to login page with toast
    if (!state.currentUser.loggedIn) {
      showToast("Please sign in to submit applications", "warning");
      window.location.href = "login.html";
      return;
    }
    
    // If applicant is an employer, block application
    if (state.currentUser.role === "employer") {
      showToast("Employer profiles cannot submit candidate applications", "error");
      return;
    }

    // Apply logic
    state.appliedJobs.push({
      jobId: job.id,
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      candidateName: state.currentUser.name,
      candidateEmail: state.currentUser.email
    });
    syncStorage();
    
    applyBtn.disabled = true;
    applyBtn.innerHTML = '<i class="fa-solid fa-circle-check me-2"></i>Applied';
    showToast(`Application submitted successfully for ${job.title}!`, "success");
  });
}

const params = new URLSearchParams(window.location.search);
const jobId = parseInt(params.get("id"));

if (jobId) {
  renderJobDetails(jobId);
}
hideLoader();