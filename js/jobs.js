// =========================================================================
// Jobs Page Renderer (Live Searching & Filtering)
// =========================================================================
function renderJobs() {
  const app = document.getElementById("app-content");
  
  // Parse hash query parameters
  // const hashString = window.location.hash;
  // const queryParams = {};
  // if (hashString.includes("?")) {
  //   const q = hashString.split("?")[1];
  //   q.split("&").forEach(param => {
  //     const parts = param.split("=");
  //     queryParams[parts[0]] = decodeURIComponent(parts[1] || "");
  //   });
  // }

  const queryParams = {};
  const urlParams = new URLSearchParams(window.location.search);

  queryParams.search = urlParams.get("search") || "";
  queryParams.location = urlParams.get("location") || "";
  queryParams.category = urlParams.get("category") || "";

  // Setup layout shell first
  app.innerHTML = `
    <div class="container py-5">
      <div class="row g-4">
        <!-- Sidebar Filters -->
        <div class="col-lg-4">
          <div class="card card-premium p-4 position-sticky" style="top: 95px;">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="font-heading fw-bold mb-0 text-dark-theme-toggle"><i class="fa-solid fa-filter text-primary me-2"></i>Filter Options</h5>
              <button class="btn btn-link btn-sm text-decoration-none shadow-none p-0" id="btn-clear-filters">Reset All</button>
            </div>
            
            <div class="mb-4">
              <label class="filter-section-title d-block">Search keywords</label>
              <div class="input-group">
                <span class="input-group-text"><i class="fa-solid fa-magnifying-glass"></i></span>
                <input type="text" class="form-control" id="filter-search" placeholder="Job title, company...">
              </div>
            </div>
            
            <div class="mb-4">
              <label class="filter-section-title d-block">Location</label>
              <select class="form-select" id="filter-location">
                <option value="">Any Location</option>
                <option value="Remote">Remote</option>
                <option value="Mountain View, CA">Mountain View, CA</option>
                <option value="Redmond, WA">Redmond, WA</option>
                <option value="San Jose, CA">San Jose, CA</option>
                <option value="Los Gatos, CA">Los Gatos, CA</option>
                <option value="San Francisco, CA">San Francisco, CA</option>
                <option value="New York, NY">New York, NY</option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="filter-section-title d-block">Job Category</label>
              <select class="form-select" id="filter-category">
                <option value="">Any Category</option>
                ${state.categories.map(c => `<option value="${c.name}">${c.name}</option>`).join("")}
              </select>
            </div>
            
            <div class="mb-4">
              <label class="filter-section-title d-block">Job Type</label>
              <div class="d-flex flex-column gap-2" id="filter-types">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="Full-time" id="type-ft">
                  <label class="form-check-label text-dark-theme-toggle" for="type-ft">Full-time</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="Contract" id="type-ct">
                  <label class="form-check-label text-dark-theme-toggle" for="type-ct">Contract</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="Part-time" id="type-pt">
                  <label class="form-check-label text-dark-theme-toggle" for="type-pt">Part-time</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="Internship" id="type-it">
                  <label class="form-check-label text-dark-theme-toggle" for="type-it">Internship</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="Remote" id="type-rt">
                  <label class="form-check-label text-dark-theme-toggle" for="type-rt">Remote Only</label>
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <div class="d-flex justify-content-between filter-section-title">
                <span>Min Annual Salary</span>
                <span class="text-primary fw-bold" id="salary-value">$40,000</span>
              </div>
              <input type="range" class="form-range" id="filter-salary" min="40000" max="180000" step="5000" value="40000">
            </div>

            <div class="mb-2">
              <label class="filter-section-title d-block">Min Experience Level</label>
              <select class="form-select" id="filter-experience">
                <option value="">Any Experience</option>
                <option value="0-1 years">Junior (0-1 yrs)</option>
                <option value="1-2 years">Associate (1-2 yrs)</option>
                <option value="2-3 years">Mid-Level (2-3 yrs)</option>
                <option value="2-4 years">Mid-Senior (2-4 yrs)</option>
                <option value="3-5 years">Senior (3-5 yrs)</option>
                <option value="5+ years">Lead (5+ yrs)</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Job Listings -->
        <div class="col-lg-8">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="font-heading fw-bold text-dark-theme-toggle mb-0" id="jobs-count-text">Showing 0 Jobs</h5>
            <div class="d-flex align-items-center gap-2">
              <span class="text- small">Sort by:</span>
              <select class="form-select form-select-sm border-0 shadow-none bg-transparent fw-semibold text-primary" id="sort-jobs">
                <option value="recent">Most Recent</option>
                <option value="salary-high">Salary (High to Low)</option>
                <option value="salary-low">Salary (Low to High)</option>
              </select>
            </div>
          </div>
          
          <div id="jobs-list-container" class="row g-3">
            <!-- Jobs injected here dynamically -->
          </div>
          
          <!-- Pagination -->
          <nav aria-label="Job page navigation" class="mt-5" id="jobs-pagination">
            <ul class="pagination justify-content-center gap-1">
              <!-- Pagination items -->
            </ul>
          </nav>
        </div>
      </div>
    </div>
  `;

  // Grab nodes
  const filterSearch = document.getElementById("filter-search");
  const filterLocation = document.getElementById("filter-location");
  const filterCategory = document.getElementById("filter-category");
  const filterSalary = document.getElementById("filter-salary");
  const filterExperience = document.getElementById("filter-experience");
  const sortJobs = document.getElementById("sort-jobs");
  
  // Set initial filters from URL parameters if they exist
  if (queryParams.search) filterSearch.value = queryParams.search;
  if (queryParams.location) filterLocation.value = queryParams.location;
  if (queryParams.category) filterCategory.value = queryParams.category;

  // React on changes
  const applyFiltersAndRender = () => {
    let filtered = [...state.jobs];
    
    // Keyword search
    const query = filterSearch.value.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query) ||
        job.skills.some(s => s.toLowerCase().includes(query))
      );
    }
    
    // Location filter
    const loc = filterLocation.value;
    if (loc) {
      if (loc === "Remote") {
        filtered = filtered.filter(job => job.location.toLowerCase().includes("remote") || job.type === "Remote");
      } else {
        filtered = filtered.filter(job => job.location === loc);
      }
    }
    
    // Category filter
    const cat = filterCategory.value;
    if (cat) {
      filtered = filtered.filter(job => job.category === cat);
    }
    
    // Job Type checkboxes
    const checkedTypes = Array.from(document.querySelectorAll("#filter-types input:checked")).map(input => input.value);
    if (checkedTypes.length > 0) {
      filtered = filtered.filter(job => checkedTypes.includes(job.type));
    }
    
    // Salary Filter
    const salary = parseInt(filterSalary.value, 10);
    filtered = filtered.filter(job => job.salary >= salary);
    document.getElementById("salary-value").innerText = `$${(salary / 1000).toFixed(0)}k+`;
    
    // Experience level
    const exp = filterExperience.value;
    if (exp) {
      filtered = filtered.filter(job => job.experience === exp);
    }
    
    // Sort
    const sortVal = sortJobs.value;
    if (sortVal === "recent") {
      filtered.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (sortVal === "salary-high") {
      filtered.sort((a, b) => b.salary - a.salary);
    } else if (sortVal === "salary-low") {
      filtered.sort((a, b) => a.salary - b.salary);
    }

    // Render matches
    document.getElementById("jobs-count-text").innerText = `Showing ${filtered.length} Job${filtered.length === 1 ? '' : 's'}`;
    
    // Paginate (4 jobs per page)
    const itemsPerPage = 4;
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    let currentPage = 1;
    
    const renderPage = (page) => {
      currentPage = page;
      const start = (page - 1) * itemsPerPage;
      const paginatedItems = filtered.slice(start, start + itemsPerPage);
      
      const listContainer = document.getElementById("jobs-list-container");
      if (paginatedItems.length === 0) {
        listContainer.innerHTML = `
          <div class="col-12 text-center py-5">
            <i class="fa-solid fa-triangle-exclamation fs-1 text- mb-3"></i>
            <h5 class="text-dark-theme-toggle">No Matching Jobs Found</h5>
            <p class="text-">Try removing some filter limits or expanding keyword parameters.</p>
          </div>
        `;
        document.getElementById("jobs-pagination").style.display = "none";
        return;
      }
      
      document.getElementById("jobs-pagination").style.display = totalPages > 1 ? "block" : "none";
      
      let html = "";
      paginatedItems.forEach(job => {
        const isSaved = state.savedJobs.includes(job.id);
        html += `
          <div class="col-12 animated-slideup">
            <div class="card card-premium job-card">
              <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3">
                <div class="d-flex gap-3 align-items-start">
                  <div class="company-logo-container" style="color: ${job.logoColor}; border-color: ${job.logoColor}40; flex-shrink: 0;">
                    ${job.logoLetter}
                  </div>
                  <div>
                    <h5 class="card-title font-heading fw-bold mb-1"><a href="job-details.html?id=${job.id}" class="text-decoration-none text-dark-theme-toggle">${job.title}</a></h5>
                    <p class="text- mb-2 small">${job.company} &bull; ${job.location} &bull; <i class="fa-regular fa-clock me-1"></i>Posted ${job.postedDate}</p>
                    <p class="text- small text-truncate-3 mb-2" style="max-height: 60px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${job.description}</p>
                    <div class="d-flex flex-wrap gap-1">
                      <span class="tag-badge">${job.type}</span>
                      <span class="tag-badge">$${(job.salary / 1000).toFixed(0)}k/year</span>
                      <span class="tag-badge">${job.experience}</span>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row flex-sm-column gap-2 align-items-center align-items-sm-end w-100 w-sm-auto justify-content-between pt-3 pt-sm-0 border-top border-sm-0 mt-2 mt-sm-0">
                  <button class="btn-bookmark ${isSaved ? 'bookmarked' : ''}" data-job-id="${job.id}" aria-label="Bookmark job">
                    <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark"></i>
                  </button>
                  <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-pill btn-sm mt-sm-3">Apply Now</a>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      listContainer.innerHTML = html;
      bindBookmarkButtons();
      
      // Render Pagination Buttons
      const pag = document.querySelector("#jobs-pagination ul");
      let pagHtml = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
          <a class="page-link shadow-none" href="javascript:void(0)" data-page="${currentPage - 1}">&laquo;</a>
        </li>
      `;
      
      for (let i = 1; i <= totalPages; i++) {
        pagHtml += `
          <li class="page-item ${currentPage === i ? 'active' : ''}">
            <a class="page-link shadow-none" href="javascript:void(0)" data-page="${i}">${i}</a>
          </li>
        `;
      }
      
      pagHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
          <a class="page-link shadow-none" href="javascript:void(0)" data-page="${currentPage + 1}">&raquo;</a>
        </li>
      `;
      pag.innerHTML = pagHtml;
      
      pag.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", () => {
          const targetPage = parseInt(a.getAttribute("data-page"), 10);
          if (targetPage >= 1 && targetPage <= totalPages) {
            renderPage(targetPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        });
      });
    };
    
    renderPage(1);
  };

  // Wire Events
  filterSearch.addEventListener("input", applyFiltersAndRender);
  filterLocation.addEventListener("change", applyFiltersAndRender);
  filterCategory.addEventListener("change", applyFiltersAndRender);
  filterSalary.addEventListener("input", applyFiltersAndRender);
  filterExperience.addEventListener("change", applyFiltersAndRender);
  sortJobs.addEventListener("change", applyFiltersAndRender);
  document.querySelectorAll("#filter-types input").forEach(input => {
    input.addEventListener("change", applyFiltersAndRender);
  });

  // Clear filters
  document.getElementById("btn-clear-filters").addEventListener("click", () => {
    filterSearch.value = "";
    filterLocation.value = "";
    filterCategory.value = "";
    filterSalary.value = "40000";
    filterExperience.value = "";
    document.querySelectorAll("#filter-types input").forEach(i => i.checked = false);
    applyFiltersAndRender();
    showToast("Filters reset", "info");
  });

  // Run first filter run
  applyFiltersAndRender();
}
document.addEventListener("DOMContentLoaded", () => {
    renderJobs();
    hideLoader();
});