// =========================================================================
// Home Page Renderer
// =========================================================================
function renderHome() {
  const app = document.getElementById("app-content");
  
  // Get recent 4 jobs
  const featuredJobs = state.jobs.slice(0, 4);
  
  // Get top 4 companies
  const featuredCompanies = state.companies.slice(0, 4);

  let featuredJobsHtml = "";
  featuredJobs.forEach(job => {
    const isSaved = state.savedJobs.includes(job.id);
    featuredJobsHtml += `
      <div class="col-md-6 animated-slideup">
        <div class="card card-premium job-card">
          <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex gap-3">
              <div class="company-logo-container" style="color: ${job.logoColor}; border-color: ${job.logoColor}40">
                ${job.logoLetter}
              </div>
              <div>
                <h5 class="card-title font-heading fw-bold mb-1"><a href="job-details.html?id=${job.id}" class="text-decoration-none text-dark-theme-toggle">${job.title}</a></h5>
                <p class="text- mb-0 small">${job.company} &bull; ${job.location}</p>
              </div>
            </div>
            <button class="btn-bookmark ${isSaved ? 'bookmarked' : ''}" data-job-id="${job.id}" aria-label="Bookmark job">
              <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
            </button>
          </div>
          <div class="mt-3">
            <span class="tag-badge me-2 mb-2">${job.type}</span>
            <span class="tag-badge me-2 mb-2">${job.category}</span>
            <span class="tag-badge me-2 mb-2">$${(job.salary / 1000).toFixed(0)}k/year</span>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-light-subtle">
            <span class="text- small"><i class="fa-regular fa-clock me-1"></i>Posted ${job.postedDate}</span>
            <a href="job-details.html?id=${job.id}" class="btn btn-outline-primary btn-pill btn-sm font-heading">Details</a>
          </div>
        </div>
      </div>
    `;
  });

  let categoriesHtml = "";
  state.categories.forEach(cat => {
    categoriesHtml += `
      <div class="col-lg-2 col-md-4 col-sm-6">
        <a href="jobs.html?category=${encodeURIComponent(cat.name)}" class="text-decoration-none">
          <div class="card card-premium text-center p-4">
            <div class="fs-2 mb-3 text-primary"><i class="${cat.icon}"></i></div>
            <h6 class="font-heading fw-bold text-dark-theme-toggle mb-1">${cat.name}</h6>
            <span class="text- small">${cat.count} Open Positions</span>
          </div>
        </a>
      </div>
    `;
  });

  let companiesHtml = "";
  featuredCompanies.forEach(comp => {
    companiesHtml += `
      <div class="col-lg-3 col-md-6">
        <div class="card card-premium text-center p-4">
          <div class="company-logo-container mx-auto mb-3" style="color: ${comp.logoColor}; font-size: 1.5rem; width: 64px; height: 64px; border-color: ${comp.logoColor}40">
            ${comp.logoLetter}
          </div>
          <h5 class="font-heading fw-bold mb-1 text-dark-theme-toggle">${comp.name}</h5>
          <div class="text-warning mb-2 small">${comp.rating} <i class="fa-solid fa-star"></i></div>
          <p class="text- small text-truncate-2 mb-3" style="height: 40px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${comp.description}</p>
          <a href="companies.html" class="btn btn-outline-primary btn-pill btn-sm">View Profile</a>
        </div>
      </div>
    `;
  });

  app.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-7">
            <h1 class="hero-title font-heading mb-4 animated-slideup">Find Your Dream Job Today</h1>
            <p class="hero-subtitle mb-4 opacity-90 animated-slideup" style="animation-delay: 0.1s">Discover top tech career openings, dynamic startups, and remote work roles with direct applications.</p>
            <div class="d-flex gap-3 animated-slideup" style="animation-delay: 0.2s">
              <div class="d-flex align-items-center gap-2"><i class="fa-solid fa-circle-check text-secondary text-success"></i> Verified Companies</div>
              <div class="d-flex align-items-center gap-2"><i class="fa-solid fa-circle-check text-secondary text-success"></i> Direct Job Sourcing</div>
            </div>
          </div>
          <div class="col-lg-5 d-none d-lg-block animated-slideup" style="animation-delay: 0.2s">
            <div class="p-4 bg-white bg-opacity-10 rounded-4 backdrop-blur shadow-lg">
              <h5 class="font-heading fw-bold mb-3 text-white">Popular Job Keywords</h5>
              <div class="d-flex flex-wrap gap-2">
                <a href="jobs.html?search=Frontend" class="btn btn-outline-light btn-sm btn-pill">Frontend</a>
                <a href="jobs.html?search=Data" class="btn btn-outline-light btn-sm btn-pill">Data Science</a>
                <a href="jobs.html?search=SEO" class="btn btn-outline-light btn-sm btn-pill">SEO</a>
                <a href="jobs.html?search=Product" class="btn btn-outline-light btn-sm btn-pill">Product Design</a>
                <a href="jobs.html?search=Analyst" class="btn btn-outline-light btn-sm btn-pill">Analyst</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Form Overlay Container -->
    <div class="container">
      <div class="search-container animated-slideup">
        <form id="hero-search-form" class="row g-3 align-items-center">
          <div class="col-lg-4 col-md-6">
            <div class="search-input-group">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" class="form-control" id="search-title" placeholder="Job Title, Skills, or Keywords">
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="search-input-group">
              <i class="fa-solid fa-location-dot"></i>
              <input type="text" class="form-control" id="search-location" placeholder="City, State, or 'Remote'">
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="search-input-group">
              <i class="fa-solid fa-briefcase"></i>
              <select class="form-select" id="search-category">
                <option value="">Choose Job Category</option>
                ${state.categories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join("")}
              </select>
            </div>
          </div>
          <div class="col-lg-2 col-md-6">
            <button type="submit" class="btn btn-primary w-100 search-btn btn-pill">
              <i class="fa-solid fa-magnifying-glass me-2"></i>Find Jobs
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Statistics Section -->
    <section class="py-5 mt-5">
      <div class="container">
        <div class="row g-4 text-center">
          <div class="col-md-3 col-6">
            <div class="card-premium p-4">
              <h2 class="font-heading fw-bold text-primary counter-val mb-2" data-target="1250" data-suffix="+">0</h2>
              <p class="text- mb-0 small fw-semibold">Live Job Listings</p>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="card-premium p-4">
              <h2 class="font-heading fw-bold text-primary counter-val mb-2" data-target="480" data-suffix="+">0</h2>
              <p class="text- mb-0 small fw-semibold">Active Corporate Employers</p>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="card-premium p-4">
              <h2 class="font-heading fw-bold text-primary counter-val mb-2" data-target="98" data-suffix="%">0</h2>
              <p class="text- mb-0 small fw-semibold">Success Placement Ratio</p>
            </div>
          </div>
          <div class="col-md-3 col-6">
            <div class="card-premium p-4">
              <h2 class="font-heading fw-bold text-primary counter-val mb-2" data-target="15" data-suffix="k+">0</h2>
              <p class="text- mb-0 small fw-semibold">Registered Candidates</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Job Categories Section -->
    <section class="py-5 bg-light-section-toggle">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="font-heading fw-bold mb-2 text-dark-theme-toggle">Browse Jobs by Category</h2>
          <p class="text-">Choose your domain of interest and discover active positions instantly.</p>
        </div>
        <div class="row g-4">
          ${categoriesHtml}
        </div>
      </div>
    </section>

    <!-- Featured Jobs Section -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 class="font-heading fw-bold mb-2 text-dark-theme-toggle">Featured Career Opportunities</h2>
            <p class="text- mb-0">Handpicked roles from verified companies recruiting currently.</p>
          </div>
          <a href="jobs.html" class="btn btn-outline-primary btn-pill d-none d-sm-inline-block">Explore All Jobs</a>
        </div>
        <div class="row g-4">
          ${featuredJobsHtml}
        </div>
        <div class="text-center mt-5 d-sm-none">
          <a href="jobs.html" class="btn btn-outline-primary btn-pill">Explore All Jobs</a>
        </div>
      </div>
    </section>

    <!-- Top Companies Section -->
    <section class="py-5 bg-light-section-toggle">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="font-heading fw-bold mb-2 text-dark-theme-toggle">Top Hiring Companies</h2>
          <p class="text-">Work for world-class platforms reshaping digital frameworks globally.</p>
        </div>
        <div class="row g-4">
          ${companiesHtml}
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-5">
      <div class="container">
        <div class="text-center mb-5">
          <h2 class="font-heading fw-bold mb-2 text-dark-theme-toggle">What Our Users Say</h2>
          <p class="text-">Hear success stories from verified recruiters and successfully placed professionals.</p>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="testimonial-card">
              <div class="text-warning mb-3 fs-5"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
              <p class="text-dark-theme-toggle mb-4 italic">"JobSphere transformed our tech sourcing process. Within one week of posting, we filled our Senior Lead Developer role with an exceptional candidate."</p>
              <div class="d-flex align-items-center gap-3">
                <div class="company-logo-container" style="color: #4285F4; border-color: #4285F440; width: 48px; height: 48px;">G</div>
                <div>
                  <h6 class="font-heading fw-bold mb-0 text-dark-theme-toggle">Clara Jenkins</h6>
                  <span class="text- small">Lead HR Director, Google</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="testimonial-card">
              <div class="text-warning mb-3 fs-5"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
              <p class="text-dark-theme-toggle mb-4 italic">"As a remote engineer, sorting through job boards was exhausting. JobSphere's unified filtering and direct application workflow landed me a contract in days!"</p>
              <div class="d-flex align-items-center gap-3">
                <i class="fa-solid fa-user-tie fs-2 text-primary bg-light p-2 rounded-circle border"></i>
                <div>
                  <h6 class="font-heading fw-bold mb-0 text-dark-theme-toggle">Marcus Vance</h6>
                  <span class="text- small">Full Stack Engineer</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="testimonial-card">
              <div class="text-warning mb-3 fs-5"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i></div>
              <p class="text-dark-theme-toggle mb-4 italic">"The employer dashboard analytics are simple yet highly detailed. Reviewing applications and communicating with developers is exceptionally fluid."</p>
              <div class="d-flex align-items-center gap-3">
                <div class="company-logo-container" style="color: #FF0000; border-color: #FF000040; width: 48px; height: 48px;">A</div>
                <div>
                  <h6 class="font-heading fw-bold mb-0 text-dark-theme-toggle">Jane Zhao</h6>
                  <span class="text- small">Talent Coordinator, Adobe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="py-5">
      <div class="container">
        <div class="cta-section text-center shadow-lg">
          <h2 class="font-heading fw-bold mb-3">Ready to Accelerate Your Career Path?</h2>
          <p class="lead mb-4 opacity-90 mx-auto" style="max-width: 600px;">Create a candidate profile, upload your resume, bookmark matching jobs, and submit applications directly.</p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a href="register.html" class="btn btn-light btn-pill font-heading fw-semibold">Join as Job Seeker</a>
            <a href="register.html?role=employer" class="btn btn-outline-light btn-pill font-heading fw-semibold">Hire Talents</a>
          </div>
        </div>
      </div>
    </section>
  `;

  // Bind Home Search Form
  document.getElementById("hero-search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("search-title").value;
    const location = document.getElementById("search-location").value;
    const category = document.getElementById("search-category").value;
    
    // Direct redirect to jobs with query arguments
    const params = [];
    if (title) params.push(`search=${encodeURIComponent(title)}`);
    if (location) params.push(`location=${encodeURIComponent(location)}`);
    if (category) params.push(`category=${encodeURIComponent(category)}`);
    
    window.location.href = "jobs.html?" + params.join("&");
  });

  // Bind Bookmarks
  bindBookmarkButtons();
  
  // Trigger counters
  animateCounters();
}
document.addEventListener("DOMContentLoaded", () => {
    renderHome();
});