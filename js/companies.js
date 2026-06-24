// =========================================================================
// Companies Page Renderer
// =========================================================================
function renderCompanies() {
  const app = document.getElementById("app-content");
  
  const renderList = (filterVal = "") => {
    let filtered = [...state.companies];
    if (filterVal) {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(filterVal.toLowerCase()) || c.industry.toLowerCase().includes(filterVal.toLowerCase()));
    }
    
    const container = document.getElementById("companies-grid-container");
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fa-solid fa-building-circle-exclamation fs-1 mb-3"></i>
          <h5 class="text-dark-theme-toggle">No Companies Found</h5>
          <p>Try adjusting search parameters.</p>
        </div>
      `;
      return;
    }

    let html = "";
    filtered.forEach(c => {
      // Find open job count for this company
      const count = state.jobs.filter(j => j.company.toLowerCase() === c.name.toLowerCase()).length;
      
      html += `
        <div class="col-lg-4 col-md-6 animated-slideup">
          <div class="card card-premium p-4 text-center h-100 d-flex flex-column justify-content-between">
            <div>
              <div class="company-logo-container mx-auto mb-3" style="width: 64px; height: 64px; font-size: 1.5rem;">
                ${c.logoLetter}
              </div>
              <h5 class="font-heading fw-bold mb-1 text-dark-theme-toggle">${c.name}</h5>
              <div class="tag-badge mb-2">${c.industry}</div>
              <p class="small text-truncate-3 mb-4" style="height: 60px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">${c.description}</p>
            </div>
            <div class="border-top pt-3 mt-2 d-flex justify-content-between align-items-center">
              <span class="text-primary fw-semibold small">${count} active job${count === 1 ? '' : 's'}</span>
              <a href="jobs.html?search=${encodeURIComponent(c.name)}" class="btn btn-outline-primary btn-pill btn-sm">Explore Positions</a>
            </div>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
  };

  app.innerHTML = `
    <div class="container py-5">
      <div class="text-center mb-5">
        <h2 class="font-heading fw-bold mb-2 text-dark-theme-toggle">Search Verified Employers</h2>
        <p>Learn about corporate dynamics, company statistics, and active listings.</p>
        
        <div class="row justify-content-center mt-4">
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text border-end-0 border-light-subtle shadow-sm" style="border-radius: 24px 0 0 24px;"><i class="fa-solid fa-magnifying-glass"></i></span>
              <input type="text" class="form-control border-start-0 border-light-subtle shadow-sm" id="search-company-input" placeholder="Search company name or industry..." style="border-radius: 0 24px 24px 0; height: 48px;">
            </div>
          </div>
        </div>
      </div>
      
      <div class="row g-4" id="companies-grid-container">
        <!-- Companies injected here -->
      </div>
    </div>
  `;

  const input = document.getElementById("search-company-input");
  input.addEventListener("input", () => {
    renderList(input.value.trim());
  });

  renderList();
}

document.addEventListener("DOMContentLoaded", () => {
    renderCompanies();
    hideLoader();
});