 // Recipe Data
 const recipes = [
    {
        id: 1,
        title: "Classic Spaghetti Carbonara",
        time: 25,
        difficulty: "easy",
        description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
        category: "pasta",
        steps: ["Boil pasta", "Cook pancetta", "Mix eggs and cheese", "Combine all ingredients"],
        ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan cheese", "Black pepper"]
    },
    {
        id: 2,
        title: "Chicken Tikka Masala",
        time: 45,
        difficulty: "medium",
        description: "Tender chicken pieces in a creamy, spiced tomato sauce.",
        category: "curry",
        steps: ["Marinate chicken", "Grill chicken", "Prepare sauce", "Combine chicken with sauce"],
        ingredients: ["Chicken", "Yogurt", "Tomatoes", "Spices", "Cream"]
    },
    {
        id: 3,
        title: "Homemade Croissants",
        time: 180,
        difficulty: "hard",
        description: "Buttery, flaky French pastries that require patience but deliver amazing results.",
        category: "baking",
        steps: ["Prepare dough", "Layer butter", "Fold dough", "Bake"],
        ingredients: ["Flour", "Butter", "Yeast", "Sugar", "Milk"]
    },
    {
        id: 4,
        title: "Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh vegetables, feta cheese, and olives tossed in olive oil and herbs.",
        category: "salad",
        steps: ["Chop vegetables", "Mix dressing", "Combine all ingredients"],
        ingredients: ["Tomatoes", "Cucumbers", "Feta cheese", "Olives", "Olive oil"]
    },
    {
        id: 5,
        title: "Beef Wellington",
        time: 120,
        difficulty: "hard",
        description: "Tender beef fillet coated with mushroom duxelles and wrapped in puff pastry.",
        category: "meat",
        steps: ["Prepare beef", "Wrap in pastry", "Bake until golden"],
        ingredients: ["Beef fillet", "Mushrooms", "Puff pastry", "Eggs", "Mustard"]
    },
    {
        id: 6,
        title: "Vegetable Stir Fry",
        time: 20,
        difficulty: "easy",
        description: "Colorful mixed vegetables cooked quickly in a savory sauce.",
        category: "vegetarian",
        steps: ["Chop vegetables", "Stir fry with sauce", "Serve hot"],
        ingredients: ["Broccoli", "Carrots", "Bell peppers", "Soy sauce", "Garlic"]
    },
    {
        id: 7,
        title: "Pad Thai",
        time: 30,
        difficulty: "medium",
        description: "Thai stir-fried rice noodles with shrimp, peanuts, and tangy tamarind sauce.",
        category: "noodles",
        steps: ["Soak noodles", "Stir-fry ingredients", "Combine noodles and sauce"],
        ingredients: ["Rice noodles", "Shrimp", "Eggs", "Peanuts", "Tamarind paste"]
    },
    {
        id: 8,
        title: "Margherita Pizza",
        time: 60,
        difficulty: "medium",
        description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil.",
        category: "pizza",
        steps: ["Prepare dough", "Add toppings", "Bake in oven"],
        ingredients: ["Pizza dough", "Tomatoes", "Mozzarella", "Basil", "Olive oil"]
    }
];

// DOM Elements
const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('#filter-buttons button');
const sortButtons = document.querySelectorAll('#sort-buttons button');

// Create HTML for a recipe card
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
            <div class="recipe-steps" id="steps-${recipe.id}" style="display:none;">
                <h4>Ingredients:</h4>
                <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
                <h4>Steps:</h4>
                <ul>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ul>
            </div>
        </div>
    `;
};

// Render recipes to DOM
const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = recipesToRender.map(createRecipeCard).join('');

    // Add click event to expand steps
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-id');
            const stepsDiv = document.getElementById(`steps-${id}`);
            stepsDiv.style.display = stepsDiv.style.display === 'none' ? 'block' : 'none';
        });
    });
};

// Filter buttons functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        if(filter === 'all') renderRecipes(recipes);
        else renderRecipes(recipes.filter(r => r.difficulty === filter));
    });
});

// Sort buttons functionality
sortButtons.forEach(button => {
    button.addEventListener('click', () => {
        const sort = button.getAttribute('data-sort');
        let sorted = [...recipes];
        if(sort === 'time') sorted.sort((a,b) => a.time - b.time);
        if(sort === 'title') sorted.sort((a,b) => a.title.localeCompare(b.title));
        renderRecipes(sorted);
    });
});
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = recipes.filter(r => 
        r.title.toLowerCase().includes(query) || 
        r.description.toLowerCase().includes(query)
    );
    renderRecipes(filtered);
});
  let currentFilter = "all";
let currentSort = "none";
const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");
const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time < maxTime);
};

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return filterByDifficulty(recipes, filterType);
        case "quick":
            return filterByTime(recipes, 30);
        default:
            return recipes;
    }
};

const sortByName = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
};

const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.time - b.time
    );
};

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        default:
            return recipes;
    }
};
const updateDisplay = () => {
    let recipesToDisplay = recipes;

    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    recipesToDisplay = applySort(recipesToDisplay, currentSort);

    renderRecipes(recipesToDisplay);

    console.log(
        `Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};
const updateDisplay = () => {
    let recipesToDisplay = recipes;

    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    recipesToDisplay = applySort(recipesToDisplay, currentSort);

    renderRecipes(recipesToDisplay);

    console.log(
        `Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};
const updateActiveButtons = () => {
    filterButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add("active");
        }
    });

    sortButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.sort === currentSort) {
            btn.classList.add("const setupEventListeners = () => {
    filterButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            currentFilter = event.target.dataset.filter;
            updateActiveButtons();
            updateDisplay();
        });
    });

    sortButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            currentSort = event.target.dataset.sort;
            updateActiveButtons();
            updateDisplay();
        });
    });
};
    });
};


const setupEventListeners = () => {
    filterButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            currentFilter = event.target.dataset.filter;
            updateActiveButtons();
            updateDisplay();
        });
    });

    sortButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            currentSort = event.target.dataset.sort;
            updateActiveButtons();
            updateDisplay();
        });
    });
};
renderRecipes(recipes);
setupEventListeners();
updateDisplay();
const RecipeApp = (() => {

  console.log("RecipeApp initializing...");

  // =========================
  // STATE
  // =========================
  let currentFilter = "all";
  let currentSort = "none";

  // =========================
  // RECIPE DATA (ADD steps + ingredients)
  // =========================
  const recipes = [
    {
      id: 1,
      title: "Pasta",
      difficulty: "easy",
      time: 25,
      ingredients: ["Pasta", "Salt", "Water", "Sauce"],
      steps: [
        "Boil water",
        "Add pasta",
        {
          text: "Prepare sauce",
          substeps: [
            "Heat pan",
            "Add oil",
            {
              text: "Make spice mix",
              substeps: ["Add chili", "Add oregano"]
            }
          ]
        },
        "Mix pasta and sauce"
      ]
    },

    {
      id: 2,
      title: "Fried Rice",
      difficulty: "medium",
      time: 35,
      ingredients: ["Rice", "Vegetables", "Soy sauce"],
      steps: [
        "Cook rice",
        "Chop vegetables",
        "Fry everything together"
      ]
    }
  ];
    const renderSteps = (steps, level = 0) => {
    let html = "<ol>";

    steps.forEach(step => {
      if (typeof step === "string") {
        html += `<li class="level-${level}">${step}</li>`;
      } else {
        html += `<li class="level-${level}">${step.text}`;
        if (step.substeps) {
          html += renderSteps(step.substeps, level + 1);
        }
        html += "</li>";
      }
    });

    html += "</ol>";
    return html;
  };
    const createRecipeCard = (recipe) => {
    return `
      <div class="recipe-card">
        <h3>${recipe.title}</h3>
        <p>Difficulty: ${recipe.difficulty}</p>
        <p>Time: ${recipe.time} mins</p>

        <button class="toggle-btn" data-id="${recipe.id}" data-type="steps">
          Show Steps
        </button>

        <button class="toggle-btn" data-id="${recipe.id}" data-type="ingredients">
          Show Ingredients
        </button>

        <div class="steps-container" id="steps-${recipe.id}">
          ${renderSteps(recipe.steps)}
        </div>

        <div class="ingredients-container" id="ingredients-${recipe.id}">
          <ul>
            ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  };

// Initialize app
renderRecipes(recipes);/ /   P a r t   1   m a r k e r   c o m m e n t   f o r   P R 
 
 