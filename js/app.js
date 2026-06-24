// =========================================================================
// Router & Page Transitions Dispatcher
// =========================================================================
// function handleRouting() {
//   const hash = window.location.hash || "#/";
  
//   // Show spinner overlay for fake fetch transition
//   showLoader();
//   updateActiveNavLink(hash);
//   closeMobileNavbar();

//   // Scroll to top
//   window.scrollTo({ top: 0 });

//   // Evaluate routing segment matches
//   if (hash === "" || hash === "#/") {
//     renderHome();
//   } else if (hash.startsWith("#/jobs")) {
//     renderJobs();
//   } else if (hash.startsWith("#/job-details/")) {
//     const id = parseInt(hash.replace("#/job-details/", ""), 10);
//     renderJobDetails(id);
//   } else if (hash === "#/companies") {
//     renderCompanies();
//   } else if (hash === "#/candidate-dashboard") {
//     renderCandidateDashboard();
//   } else if (hash === "#/employer-dashboard") {
//     renderEmployerDashboard();
//   } else if (hash.startsWith("#/login")) {
//     renderLogin();
//   } else if (hash.startsWith("#/register")) {
//     renderRegister();
//   } else {
//     // 404 View
//     document.getElementById("app-content").innerHTML = `
//       <div class="container py-5 text-center">
//         <i class="fa-solid fa-compass-drafting fs-1 text-primary mb-3"></i>
//         <h3 class="font-heading fw-bold text-dark-theme-toggle">Oops! View Not Found</h3>
//         <p class="text">The page route segment you navigated to is invalid or deprecated.</p>
//         <a href="#/" class="btn btn-primary btn-pill">Back to Home</a>
//       </div>
//     `;
//   }
  
//   // Hide loader
//   hideLoader();
// }

// // =========================================================================
// // Initialization
// // =========================================================================
// document.addEventListener("DOMContentLoaded", () => {
//   // Setup theme toggle logic
//   initTheme();
  
//   // Initialize Navbar auth action triggers
//   renderNavbarUserMenu();
  
//   // Hook Router Events
//   window.addEventListener("hashchange", handleRouting);
  
//   // Run initial routing on startup
//   handleRouting();

//   // Bind newsletter subscription form
//   const newsletterForm = document.getElementById("newsletter-form");
//   if (newsletterForm) {
//     newsletterForm.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const input = newsletterForm.querySelector("input");
//       if (input.value) {
//         showToast(`Subscribed successfully with ${input.value}!`, "success");
//         input.value = "";
//       }
//     });
//   }
// });


document.addEventListener("DOMContentLoaded", () => {
  console.log("App JS Loaded");

  initTheme();
  renderNavbarUserMenu();

  renderHome();

  hideLoader();
});