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

// Initialize app
renderRecipes(recipes);