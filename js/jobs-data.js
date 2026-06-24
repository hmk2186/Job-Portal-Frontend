// Initialize state with default data or load from LocalStorage
const DEFAULT_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Google",
    logoLetter: "G",
    logoColor: "#4285F4",
    location: "Mountain View, CA",
    type: "Full-time",
    category: "Technology",
    salary: 140000,
    experience: "5+ years",
    postedDate: "2026-06-21",
    description: "We are looking for a Senior Frontend Developer to join our core search systems engineering team. You will lead the development of highly interactive, responsive web applications, working closely with UX designers and backend engineers to build seamless user experiences. The ideal candidate has deep expertise in semantic HTML, responsive CSS, modern JavaScript architectures, and performance optimization techniques.",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Web Performance", "REST APIs"],
    benefits: ["Comprehensive Medical Insurance", "Complimentary Gourmet Meals", "401k Matching", "Work-from-Home Flexibility"]
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Microsoft",
    logoLetter: "M",
    logoColor: "#F25022",
    location: "Redmond, WA",
    type: "Full-time",
    category: "Technology",
    salary: 130000,
    experience: "3-5 years",
    postedDate: "2026-06-20",
    description: "Our Cloud Infrastructure team is looking for a versatile Full Stack Engineer to help build the administration console for Azure Services. You will design, build, and support features starting from database schemas all the way to frontend UI elements. Strong skills in object-oriented development, web APIs, and responsive design are required.",
    skills: ["C#", ".NET Core", "TypeScript", "SQL Server", "Azure", "CSS Grid"],
    benefits: ["Competitive Stock Options", "Extended Parental Leave", "Annual Wellness Stipend", "Flexible Vacation Policy"]
  },
  {
    id: 3,
    title: "UI/UX Product Designer",
    company: "Adobe",
    logoLetter: "A",
    logoColor: "#FF0000",
    location: "San Jose, CA",
    type: "Contract",
    category: "Design",
    salary: 95000,
    experience: "2-4 years",
    postedDate: "2026-06-16",
    description: "Adobe is seeking a Contract Product Designer to collaborate on our digital editing asset systems. You will create high-fidelity prototypes, conduct user research sessions, translate wireframes into beautiful mockups, and work closely with frontend developers to ensure design integrity. A strong portfolio demonstrating product design decisions is required.",
    skills: ["Figma", "Design Systems", "Prototyping", "User Research", "Wireframing"],
    benefits: ["Premium Software Licenses", "Workspace Equipment Budget", "Subsidized Transport Pass"]
  },
  {
    id: 4,
    title: "Digital Marketing Manager",
    company: "Netflix",
    logoLetter: "N",
    logoColor: "#E50914",
    location: "Los Gatos, CA",
    type: "Full-time",
    category: "Marketing",
    salary: 110000,
    experience: "5+ years",
    postedDate: "2026-06-18",
    description: "Netflix is searching for an experienced Digital Marketing Manager to lead international growth and acquisition campaigns. You will construct high-performing ad campaigns, analyze customer funnel conversion metrics, coordinate creative asset production, and manage significant performance marketing budgets.",
    skills: ["Growth Hacking", "Google Ads", "A/B Testing", "Google Analytics", "Copywriting"],
    benefits: ["Unlimited Paid Time Off", "Free Premium Subscriptions", "Subsidized Child Care", "Generous Pension Matching"]
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Meta",
    logoLetter: "M",
    logoColor: "#0668E1",
    location: "Remote",
    type: "Full-time",
    category: "Technology",
    salary: 155000,
    experience: "3-5 years",
    postedDate: "2026-06-23",
    description: "We are looking for a Data Scientist to apply advanced statistical methods and machine learning models to improve personalized recommenders. You will clean massive tabular datasets, formulate product hypotheses, run hypothesis tests, and translate analytical insights into actionable roadmap initiatives.",
    skills: ["Python", "SQL", "Pandas", "Machine Learning", "PyTorch", "A/B Testing"],
    benefits: ["Remote Work Allowance", "Internet Stipend", "Annual Training Credits", "Mental Well-being Subsidies"]
  },
  {
    id: 6,
    title: "Talent Acquisition Associate",
    company: "Airbnb",
    logoLetter: "A",
    logoColor: "#FF5A5F",
    location: "San Francisco, CA",
    type: "Part-time",
    category: "Human Resources",
    salary: 65000,
    experience: "1-2 years",
    postedDate: "2026-06-19",
    description: "Airbnb is expanding its support recruitment desk. As a Talent Acquisition Associate, you will manage initial candidate sourcing pipelines, conduct telephone pre-screens, manage ATS updates, and coordinate executive interview calendars.",
    skills: ["Applicant Tracking Systems", "Sourcing", "Interviews", "Communication"],
    benefits: ["Airbnb Travel Credits", "Dedicated Mentor Program", "Regular Team Outings"]
  },
  {
    id: 7,
    title: "Junior Financial Analyst",
    company: "Goldman Sachs",
    logoLetter: "G",
    logoColor: "#006C7E",
    location: "New York, NY",
    type: "Internship",
    category: "Finance",
    salary: 50000,
    experience: "0-1 years",
    postedDate: "2026-06-23",
    description: "This internship program offers a comprehensive introduction to corporate investment. You will research market metrics, compile valuation spreadsheets, create presentation materials for advisory calls, and shadow Senior Portfolio Directors.",
    skills: ["Excel", "Financial Modeling", "Valuation", "PowerPoint", "Corporate Finance"],
    benefits: ["Full Internship Stipend", "Mentorship pairing", "Free Gym Facility"]
  },
  {
    id: 8,
    title: "SEO Specialist",
    company: "Spotify",
    logoLetter: "S",
    logoColor: "#1DB954",
    location: "Remote",
    type: "Remote",
    category: "Marketing",
    salary: 85000,
    experience: "2-3 years",
    postedDate: "2026-06-17",
    description: "We want an SEO Specialist to optimize the organic visibility of our artist profile portals and podcast distribution pages. You will conduct technical website audits, run keyword research studies, construct backlinks, and analyze indexation data.",
    skills: ["SEO", "Technical SEO", "Ahrefs", "Google Analytics", "HTML/CSS"],
    benefits: ["Unlimited Spotify Premium", "Home Office Set Up grant", "Comprehensive Dental Care"]
  }
];

const DEFAULT_COMPANIES = [
  { name: "Google", logoLetter: "G", logoColor: "#4285F4", industry: "Technology", headquarters: "Mountain View, CA", size: "10,000+ employees", rating: "4.5★", description: "Google's mission is to organize the world's information and make it universally accessible and useful." },
  { name: "Microsoft", logoLetter: "M", logoColor: "#F25022", industry: "Technology", headquarters: "Redmond, WA", size: "10,000+ employees", rating: "4.4★", description: "Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge." },
  { name: "Adobe", logoLetter: "A", logoColor: "#FF0000", industry: "Design & Software", headquarters: "San Jose, CA", size: "5,000-10,000 employees", rating: "4.2★", description: "Adobe is the global leader in digital marketing and digital media solutions." },
  { name: "Netflix", logoLetter: "N", logoColor: "#E50914", industry: "Entertainment", headquarters: "Los Gatos, CA", size: "5,000-10,000 employees", rating: "4.3★", description: "Netflix is one of the world's leading entertainment services with millions of paid memberships." },
  { name: "Meta", logoLetter: "M", logoColor: "#0668E1", industry: "Technology", headquarters: "Menlo Park, CA", size: "10,000+ employees", rating: "4.1★", description: "Meta builds technologies that help people connect, find communities, and grow businesses." },
  { name: "Airbnb", logoLetter: "A", logoColor: "#FF5A5F", industry: "Travel & Hospitality", headquarters: "San Francisco, CA", size: "1,000-5,000 employees", rating: "4.2★", description: "Airbnb operates an online marketplace for lodging, primary homestays, and tourism experiences." },
  { name: "Goldman Sachs", logoLetter: "G", logoColor: "#006C7E", industry: "Finance", headquarters: "New York, NY", size: "10,000+ employees", rating: "4.0★", description: "The Goldman Sachs Group is a leading global financial institution." },
  { name: "Spotify", logoLetter: "S", logoColor: "#1DB954", industry: "Audio Streaming", headquarters: "Stockholm, Sweden", size: "5,000-10,000 employees", rating: "4.3★", description: "Spotify is a proprietary audio streaming and media services provider." }
];

const DEFAULT_CATEGORIES = [
  { name: "Technology", icon: "fa-solid fa-code", count: 124 },
  { name: "Design", icon: "fa-solid fa-pen-nib", count: 85 },
  { name: "Marketing", icon: "fa-solid fa-bullhorn", count: 96 },
  { name: "Finance", icon: "fa-solid fa-chart-line", count: 54 },
  { name: "Human Resources", icon: "fa-solid fa-users", count: 42 },
  { name: "Sales", icon: "fa-solid fa-handshake", count: 68 }
];

const DEFAULT_USERS = [
  { name: "Sarah Connor", email: "sarah.c@gmail.com", role: "candidate" },
  { name: "Google Recruiting", email: "recruiter@google.com", role: "employer" }
];