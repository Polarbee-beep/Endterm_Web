/* ===================================
   BLOCKCRAFTERS - ENDTERM JAVASCRIPT
   =================================== */

// PROJECT DATA ARRAY
const projects = [
  {
    id: 1,
    title: "The Colosseum",
    category: "Medieval",
    description: "A large arena-inspired structure with detailed architecture.",
    image: "css/images/coloseum.png"
  },
  {
    id: 2,
    title: "Wilderness Camp",
    category: "Adventure",
    description: "A natural environment with a cosy camp atmosphere.",
    image: "css/images/camp.png"
  },
  {
    id: 3,
    title: "The End",
    category: "Fantasy",
    description: "A mysterious environment inspired by the End dimension.",
    image: "css/images/end.png"
  },
  {
    id: 4,
    title: "Cherry Village",
    category: "Environment",
    description: "A village surrounded by nature and decorative details.",
    image: "css/images/village.png"
  }
];

// SERVICES DATA ARRAY
const services = [
  {
    name: "Standard Spawn",
    price: 49,
    size: "100 × 100 blocks",
    delivery: "3–5 days",
    description: "A compact spawn area with a clear layout and essential features.",
    features: ["Spawn point", "Basic decoration", "2–3 portal areas"]
  },
  {
    name: "Advanced Hub",
    price: 129,
    size: "250 × 250 blocks",
    delivery: "7–10 days",
    description: "A detailed hub with multiple areas and a stronger visual identity.",
    features: ["Multi-area design", "Custom trees and details", "6+ portal areas"]
  },
  {
    name: "Mega World Map",
    price: 299,
    size: "500 × 500+ blocks",
    delivery: "2–4 weeks",
    description: "A larger custom environment with terrain and complex structures.",
    features: ["Custom terrain", "Large structures", "Detailed environment"]
  }
];

// SAVED FAVORITES
let favorites = loadFavorites();
let favoritesOnly = false;


// ===================================
// REUSABLE FUNCTIONS
// ===================================

// Returns a formatted price.
function formatPrice(price) {
  return "$" + Number(price).toFixed(0);
}

// Creates one project card as an HTML element.
function createProjectCard(project) {
  const column = document.createElement("div");
  column.className = "col-md-6 col-lg-4";

  const isFavorite = favorites.includes(project.id);

  column.innerHTML = `
    <article class="project-card h-100">
      <img
        src="${project.image}"
        alt="${project.title} Minecraft build"
        class="project-image"
        loading="lazy"
      >
      <div class="project-content">
        <span class="project-category">${project.category}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-actions">
          <a href="contact.html" class="text-link">Request a similar build →</a>
          <button
            type="button"
            class="favorite-button ${isFavorite ? "is-favorite" : ""}"
            data-favorite-id="${project.id}"
            aria-label="Toggle favorite for ${project.title}"
            aria-pressed="${isFavorite}"
          >${isFavorite ? "♥ Saved" : "♡ Save"}</button>
        </div>
      </div>
    </article>
  `;

  return column;
}

// Displays projects in the selected container.
function displayProjects(projectList, container) {
  if (!container) return;

  container.innerHTML = "";

  for (const project of projectList) {
    container.appendChild(createProjectCard(project));
  }
}

// Returns projects matching search and category filters.
function filterProjects(searchText, category) {
  const search = searchText.toLowerCase().trim();

  return projects.filter(function(project) {
    const matchesSearch =
      project.title.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      project.category.toLowerCase().includes(search);

    const matchesCategory =
      category === "all" || project.category === category;

    const matchesFavorite =
      !favoritesOnly || favorites.includes(project.id);

    return matchesSearch && matchesCategory && matchesFavorite;
  });
}

// Loads saved favorites from local storage.
function loadFavorites() {
  try {
    const saved = JSON.parse(localStorage.getItem("blockcraftersFavorites"));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

// Saves favorites.
function saveFavorites() {
  try {
    localStorage.setItem("blockcraftersFavorites", JSON.stringify(favorites));
  } catch (error) {
    // The gallery still works if browser storage is unavailable.
  }
}

// Updates the favorites section.
function updateFavoriteList() {
  const favoriteList = document.getElementById("favoriteList");
  if (!favoriteList) return;

  favoriteList.innerHTML = "";

  const savedProjects = projects.filter(function(project) {
    return favorites.includes(project.id);
  });

  if (savedProjects.length === 0) {
    favoriteList.innerHTML =
      '<p class="muted-text mb-0">You haven\'t saved any projects yet.</p>';
    return;
  }

  savedProjects.forEach(function(project) {
    const chip = document.createElement("span");
    chip.className = "favorite-chip";

    const name = document.createElement("span");
    name.textContent = project.title;

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "×";
    removeButton.setAttribute("aria-label", "Remove " + project.title);
    removeButton.dataset.removeFavorite = project.id;

    chip.appendChild(name);
    chip.appendChild(removeButton);
    favoriteList.appendChild(chip);
  });
}

// Refreshes the gallery after a search or filter change.
function refreshGallery() {
  const searchInput = document.getElementById("projectSearch");
  const categoryInput = document.getElementById("categoryFilter");
  const gallery = document.getElementById("projectGallery");
  const emptyMessage = document.getElementById("emptyGallery");
  const count = document.getElementById("galleryCount");

  if (!gallery) return;

  const searchText = searchInput ? searchInput.value : "";
  const category = categoryInput ? categoryInput.value : "all";

  const filteredProjects = filterProjects(searchText, category);

  displayProjects(filteredProjects, gallery);

  if (count) {
    count.textContent =
      "Showing " + filteredProjects.length + " of " + projects.length + " projects";
  }

  if (emptyMessage) {
    emptyMessage.classList.toggle("d-none", filteredProjects.length !== 0);
  }

  updateFavoriteList();
}

// Displays the services from the services array.
function displayServices() {
  const container = document.getElementById("serviceCards");
  if (!container) return;

  container.innerHTML = "";

  services.forEach(function(service, index) {
    const column = document.createElement("div");
    column.className = "col-md-6 col-lg-4";

    const featureItems = service.features.map(function(feature) {
      return `<li>${feature}</li>`;
    }).join("");

    column.innerHTML = `
      <article class="service-card ${index === 1 ? "featured" : ""}">
        <span class="project-category">${index === 1 ? "POPULAR CHOICE" : "BUILD PACKAGE"}</span>
        <h3>${service.name}</h3>
        <div class="service-price">${formatPrice(service.price)}<small class="fs-6">+</small></div>
        <p>${service.description}</p>
        <ul>${featureItems}</ul>
        <p><strong>Size:</strong> ${service.size}</p>
        <p><strong>Delivery:</strong> ${service.delivery}</p>
        <a href="contact.html" class="btn btn-primary-custom w-100">Choose package →</a>
      </article>
    `;

    container.appendChild(column);
  });
}


// ===================================
// THEME SWITCHER
// ===================================

function setupThemeSwitcher() {
  const themeButton = document.getElementById("themeToggle");
  if (!themeButton) return;

  let savedTheme = "dark";

  try {
    savedTheme = localStorage.getItem("blockcraftersTheme") || "dark";
  } catch (error) {
    savedTheme = "dark";
  }

  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeButton.textContent = "☾";
  }

  themeButton.addEventListener("click", function() {
    document.body.classList.toggle("light-theme");

    const isLight = document.body.classList.contains("light-theme");
    themeButton.textContent = isLight ? "☾" : "☀";

    try {
      localStorage.setItem("blockcraftersTheme", isLight ? "light" : "dark");
    } catch (error) {
      // Theme switching still works without storage.
    }
  });
}


// ===================================
// PROJECT GALLERY AND FAVORITES
// ===================================

function setupGallery() {
  const gallery = document.getElementById("projectGallery");
  if (!gallery) return;

  const searchInput = document.getElementById("projectSearch");
  const categoryInput = document.getElementById("categoryFilter");
  const favoritesButton = document.getElementById("favoritesFilter");
  const clearButton = document.getElementById("clearFilters");

  refreshGallery();

  if (searchInput) {
    searchInput.addEventListener("input", refreshGallery);
  }

  if (categoryInput) {
    categoryInput.addEventListener("change", refreshGallery);
  }

  if (favoritesButton) {
    favoritesButton.addEventListener("click", function() {
      favoritesOnly = !favoritesOnly;

      favoritesButton.textContent = favoritesOnly
        ? "♥ Show all projects"
        : "♡ Favorites only";

      favoritesButton.classList.toggle("is-favorite", favoritesOnly);
      refreshGallery();
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", function() {
      if (searchInput) searchInput.value = "";
      if (categoryInput) categoryInput.value = "all";

      favoritesOnly = false;

      if (favoritesButton) {
        favoritesButton.textContent = "♡ Favorites only";
        favoritesButton.classList.remove("is-favorite");
      }

      refreshGallery();
    });
  }

  // Event delegation handles buttons in dynamically created cards.
  gallery.addEventListener("click", function(event) {
    const button = event.target.closest("[data-favorite-id]");
    if (!button) return;

    const projectId = Number(button.dataset.favoriteId);

    if (favorites.includes(projectId)) {
      favorites = favorites.filter(function(id) {
        return id !== projectId;
      });
    } else {
      favorites.push(projectId);
    }

    saveFavorites();
    refreshGallery();
  });

  // Remove a saved project from the favorites list.
  const favoriteList = document.getElementById("favoriteList");

  if (favoriteList) {
    favoriteList.addEventListener("click", function(event) {
      const button = event.target.closest("[data-remove-favorite]");
      if (!button) return;

      const projectId = Number(button.dataset.removeFavorite);

      favorites = favorites.filter(function(id) {
        return id !== projectId;
      });

      saveFavorites();
      refreshGallery();
    });
  }
}


// ===================================
// HOME PAGE FEATURED PROJECTS
// ===================================

function setupFeaturedProjects() {
  const container = document.getElementById("featuredProjects");
  if (!container) return;

  displayProjects(projects.slice(0, 3), container);
}


// ===================================
// PRICE ESTIMATOR
// ===================================

function setupEstimator() {
  const tierSelect = document.getElementById("estimateTier");
  const sizeSlider = document.getElementById("estimateSize");
  const priceOutput = document.getElementById("estimatePrice");
  const sizeOutput = document.getElementById("sizeValue");

  if (!tierSelect || !sizeSlider || !priceOutput || !sizeOutput) return;

  function calculateEstimate() {
    const basePrice = Number(tierSelect.value);
    const complexity = Number(sizeSlider.value);

    // Each complexity level adds 15% to the starting price.
    const estimate = basePrice * (1 + (complexity - 1) * 0.15);

    priceOutput.textContent = formatPrice(estimate);
    sizeOutput.textContent = complexity;
  }

  tierSelect.addEventListener("change", calculateEstimate);
  sizeSlider.addEventListener("input", calculateEstimate);

  calculateEstimate();
}


// ===================================
// CONTACT FORM VALIDATION
// ===================================

function setupContactForm() {
  const form = document.getElementById("commissionForm");
  if (!form) return;

  const nameInput = document.getElementById("userName");
  const emailInput = document.getElementById("userEmail");
  const discordInput = document.getElementById("discordTag");
  const tierInput = document.getElementById("buildTier");
  const typeInput = document.getElementById("projectType");
  const deadlineInput = document.getElementById("deadline");
  const detailsInput = document.getElementById("projectDetails");
  const termsInput = document.getElementById("termsCheck");
  const successMessage = document.getElementById("formSuccess");
  const characterCount = document.getElementById("characterCount");

  const fields = [
    { input: nameInput, error: "userNameError" },
    { input: emailInput, error: "userEmailError" },
    { input: discordInput, error: "discordTagError" },
    { input: tierInput, error: "buildTierError" },
    { input: typeInput, error: "projectTypeError" },
    { input: deadlineInput, error: "deadlineError" },
    { input: detailsInput, error: "projectDetailsError" },
    { input: termsInput, error: "termsCheckError" }
  ];

  // Displays an error beside a specific field.
  function showFieldError(input, message, errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) errorElement.textContent = message;

    if (input.type === "checkbox") {
      input.classList.toggle("input-invalid", message !== "");
    } else {
      input.classList.toggle("input-invalid", message !== "");
      input.classList.toggle("input-valid", message === "");
    }
  }

  // Checks every field and returns true only if the form is valid.
  function validateForm() {
    let isValid = true;

    fields.forEach(function(field) {
      showFieldError(field.input, "", field.error);
    });

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const discord = discordInput.value.trim();
    const details = detailsInput.value.trim();

    if (name.length < 3) {
      showFieldError(nameInput, "Enter at least 3 characters.", "userNameError");
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      showFieldError(emailInput, "Enter a valid email address.", "userEmailError");
      isValid = false;
    }

    if (discord.length < 2) {
      showFieldError(discordInput, "Enter your Discord username.", "discordTagError");
      isValid = false;
    }

    if (!tierInput.value) {
      showFieldError(tierInput, "Please select a build package.", "buildTierError");
      isValid = false;
    }

    if (!typeInput.value) {
      showFieldError(typeInput, "Please select a project type.", "projectTypeError");
      isValid = false;
    }

    if (deadlineInput.value) {
      const selectedDate = new Date(deadlineInput.value + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        showFieldError(deadlineInput, "Choose today or a future date.", "deadlineError");
        isValid = false;
      }
    }

    if (details.length < 20) {
      showFieldError(detailsInput, "Please provide at least 20 characters.", "projectDetailsError");
      isValid = false;
    } else if (details.length > 500) {
      showFieldError(detailsInput, "Maximum length is 500 characters.", "projectDetailsError");
      isValid = false;
    }

    if (!termsInput.checked) {
      showFieldError(termsInput, "Please confirm the information.", "termsCheckError");
      isValid = false;
    }

    return isValid;
  }

  // Update character count while typing.
  detailsInput.addEventListener("input", function() {
    characterCount.textContent = detailsInput.value.length;

    if (detailsInput.value.length > 500) {
      characterCount.style.color = "#ff8eae";
    } else {
      characterCount.style.color = "";
    }
  });

  // Validate when the user leaves a field.
  fields.forEach(function(field) {
    field.input.addEventListener("blur", function() {
      if (field.input.value.trim() !== "" || field.input.type === "checkbox") {
        validateForm();
      }
    });
  });

  // Prevent normal submission and show a success message if valid.
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    successMessage.classList.add("d-none");

    if (validateForm()) {
      successMessage.classList.remove("d-none");
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

      form.reset();
      characterCount.textContent = "0";

      fields.forEach(function(field) {
        showFieldError(field.input, "", field.error);
      });
    } else {
      const firstInvalid = form.querySelector(".input-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });
}


// ===================================
// JQUERY FEATURES
// ===================================

function setupJQueryFeatures() {
  if (typeof jQuery === "undefined") {
    return;
  }

  // jQuery event 1: FAQ click interaction.
  // closest() and find() are traversal methods.
  $(".faq-list").on("click", ".faq-question", function() {
    const currentItem = $(this).closest(".faq-item");
    const answer = currentItem.find(".faq-answer");

    // Close other answers first.
    $(".faq-list").children(".faq-item").not(currentItem)
      .find(".faq-answer").slideUp(200);

    answer.slideToggle(250);

    const symbol = $(this).find("span");
    symbol.text(symbol.text() === "+" ? "−" : "+");
  });

  // jQuery event 2: visual feedback when hovering over project cards.
  $(document).on("mouseenter", ".project-card", function() {
    $(this).find(".project-image").stop(true).fadeTo(180, 0.82);
  });

  $(document).on("mouseleave", ".project-card", function() {
    $(this).find(".project-image").stop(true).fadeTo(180, 1);
  });

  // jQuery selector examples: class selector and ID selector.
  // Fade in the project cards after they have been created.
  $(".project-card").hide().fadeIn(300);
}


// ===================================
// INITIALIZE THE WEBSITE
// ===================================

document.addEventListener("DOMContentLoaded", function() {
  setupThemeSwitcher();
  setupFeaturedProjects();
  displayServices();
  setupGallery();
  setupEstimator();
  setupContactForm();
  setupJQueryFeatures();
});