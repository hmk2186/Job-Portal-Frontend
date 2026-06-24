// App State
const state = {
  jobs: JSON.parse(localStorage.getItem("portal_jobs")) || DEFAULT_JOBS,
  companies: DEFAULT_COMPANIES,
  categories: DEFAULT_CATEGORIES,
  users: JSON.parse(localStorage.getItem("portal_users")) || DEFAULT_USERS,
  savedJobs: JSON.parse(localStorage.getItem("portal_saved_jobs")) || [],
  appliedJobs: JSON.parse(localStorage.getItem("portal_applied_jobs")) || [
    { jobId: 2, appliedDate: "2026-06-21", status: "In Review", candidateName: "Sarah Connor", candidateEmail: "sarah.c@gmail.com" },
    { jobId: 4, appliedDate: "2026-06-22", status: "Pending", candidateName: "Sarah Connor", candidateEmail: "sarah.c@gmail.com" }
  ],
  postedJobs: JSON.parse(localStorage.getItem("portal_posted_jobs")) || [1, 2, 5], // Job IDs posted by the mock employer account
  currentUser: JSON.parse(localStorage.getItem("portal_user")) || { loggedIn: false, role: "", name: "", email: "" },
  theme: localStorage.getItem("portal_theme") || "light"
};

// State Helper Sync Function
function syncStorage() {
  localStorage.setItem("portal_jobs", JSON.stringify(state.jobs));
  localStorage.setItem("portal_users", JSON.stringify(state.users));
  localStorage.setItem("portal_saved_jobs", JSON.stringify(state.savedJobs));
  localStorage.setItem("portal_applied_jobs", JSON.stringify(state.appliedJobs));
  localStorage.setItem("portal_posted_jobs", JSON.stringify(state.postedJobs));
  localStorage.setItem("portal_user", JSON.stringify(state.currentUser));
  localStorage.setItem("portal_theme", state.theme);
}

// =========================================================================
// Toast Notification Utility
// =========================================================================
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast-custom toast-${type}`;
  
  let iconClass = "fa-circle-check";
  if (type === "error") iconClass = "fa-circle-xmark";
  if (type === "warning") iconClass = "fa-triangle-exclamation";
  
  toast.innerHTML = `
    <div class="d-flex align-items-center gap-2">
      <i class="fa-solid ${iconClass} fs-5 ${type === 'success' ? 'text-success' : type === 'error' ? 'text-danger' : 'text-warning'}"></i>
      <span>${message}</span>
    </div>
    <button class="toast-close" aria-label="Close toast"><i class="fa-solid fa-xmark"></i></button>
  `;
  
  container.appendChild(toast);
  
  // Close handler
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.remove();
  });
  
  // Auto remove
  setTimeout(() => {
    toast.style.animation = "slideUp 0.3s ease reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// =========================================================================
// Loader Controls
// =========================================================================
function showLoader() {
  const overlay = document.getElementById("spinner-overlay");
  if (overlay) {
    overlay.style.opacity = "1";
    overlay.style.visibility = "visible";
  }
}

function hideLoader(delay = 450) {
  setTimeout(() => {
    const overlay = document.getElementById("spinner-overlay");
    if (overlay) {
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
    }
  }, delay);
}

// =========================================================================
// Navbar Auth Render
// =========================================================================
function renderNavbarUserMenu() {
  const wrapper = document.getElementById("user-menu-wrapper");
  if (!wrapper) return;
  
  if (state.currentUser.loggedIn) {
    const isEmployer = state.currentUser.role === "employer";
    const dashboardLink = isEmployer ? "employer-dashboard.html" : "candidate-dashboard.html";
    const initials = state.currentUser.name ? state.currentUser.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "US";
    
    wrapper.innerHTML = `
      <div class="dropdown">
        <button class="btn btn-link nav-link dropdown-toggle d-flex align-items-center gap-2 p-0 border-0 shadow-none" type="button" id="userMenuBtn" data-bs-toggle="dropdown" aria-expanded="false">
          <div class="company-logo-container rounded-circle d-flex align-items-center justify-content-center fw-bold bg-primary text-white border-0 shadow-sm" style="width: 34px; height: 34px; font-size: 0.85rem; flex-shrink: 0;">
            ${initials}
          </div>
          <span class="text-dark-theme-toggle fw-medium small">${state.currentUser.name}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2" aria-labelledby="userMenuBtn">
          <li><h6 class="dropdown-header small">Signed in as: <strong>${state.currentUser.role.toUpperCase()}</strong></h6></li>
          <li><a class="dropdown-item" href="${dashboardLink}"><i class="fa-solid fa-gauge me-2"></i>My Dashboard</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="javascript:void(0)" id="logout-trigger"><i class="fa-solid fa-right-from-bracket me-2"></i>Sign Out</a></li>
        </ul>
      </div>
    `;
    
    document.getElementById("logout-trigger").addEventListener("click", () => {
      state.currentUser = { loggedIn: false, role: "", name: "", email: "" };
      syncStorage();
      showToast("Logged out successfully", "success");
      renderNavbarUserMenu();
      window.location.href = "index.html";
    });
  } else {
    wrapper.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <a href="login.html" class="btn btn-outline-primary btn-pill btn-sm d-none d-sm-inline-block">Sign In</a>
        <a href="register.html" class="btn btn-primary btn-pill btn-sm">Register</a>
      </div>
    `;
  }
}

// // Highlight active Navbar link
// function updateActiveNavLink(hash) {
//   document.querySelectorAll(".nav-link-custom").forEach(link => {
//     link.classList.remove("active");
//   });
  
//   if (hash === "" || hash === "#/") {
//     document.getElementById("nav-home")?.classList.add("active");
//   } else if (hash.startsWith("#/jobs")) {
//     document.getElementById("nav-jobs")?.classList.add("active");
//   } else if (hash.startsWith("#/companies")) {
//     document.getElementById("nav-companies")?.classList.add("active");
//   } else if (hash.startsWith("#/candidate-dashboard")) {
//     document.getElementById("nav-candidate")?.classList.add("active");
//   } else if (hash.startsWith("#/employer-dashboard")) {
//     document.getElementById("nav-employer")?.classList.add("active");
//   }
// }

// Close mobile navbar on nav click
// function closeMobileNavbar() {
//   const navbarCollapse = document.getElementById("navbarNav");
//   if (navbarCollapse && navbarCollapse.classList.contains("show")) {
//     const bootstrapCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
//     if (bootstrapCollapse) bootstrapCollapse.hide();
//   }
// }

// =========================================================================
// Theme Manager (Dark/Light mode toggle)
// =========================================================================
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const htmlEl = document.documentElement;
  
  // Set initial theme
  htmlEl.setAttribute("data-theme", state.theme);
  updateThemeIcon(state.theme);
  
  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlEl.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    htmlEl.setAttribute("data-theme", newTheme);
    state.theme = newTheme;
    syncStorage();
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`, "success");
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector("#theme-toggle i");
  if (!icon) return;
  if (theme === "dark") {
    icon.className = "fa-solid fa-sun text-warning";
  } else {
    icon.className = "fa-regular fa-moon";
  }
}

// =========================================================================
// Counter Animation Engine
// =========================================================================
function animateCounters() {
  const counters = document.querySelectorAll(".counter-val");
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    let count = 0;
    const duration = 1500; // ms
    const increment = target / (duration / 16);
    
    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + (counter.getAttribute("data-suffix") || "");
      }
    };
    updateCount();
  });
}

// Bookmark Button Binder
function bindBookmarkButtons() {
  document.querySelectorAll(".btn-bookmark").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const jobId = parseInt(btn.getAttribute("data-job-id"), 10);
      
      const index = state.savedJobs.indexOf(jobId);
      if (index === -1) {
        state.savedJobs.push(jobId);
        btn.classList.add("bookmarked");
        btn.querySelector("i").className = "fa-solid fa-bookmark";
        showToast("Job added to Saved List", "success");
      } else {
        state.savedJobs.splice(index, 1);
        btn.classList.remove("bookmarked");
        btn.querySelector("i").className = "fa-regular fa-bookmark";
        showToast("Job removed from Saved List", "info");
      }
      syncStorage();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  renderNavbarUserMenu();
  hideLoader();

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  document
    .querySelectorAll(".nav-link-custom")
    .forEach(link => link.classList.remove("active"));

  const navMap = {
    "index.html": "nav-home",
    "jobs.html": "nav-jobs",
    "companies.html": "nav-companies",
    "candidate-dashboard.html": "nav-candidate",
    "employer-dashboard.html": "nav-employer"
  };

  const activeId = navMap[currentPage];

  if (activeId) {
    document.getElementById(activeId)?.classList.add("active");
  }
});