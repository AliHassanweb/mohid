        // Function to handle login form submission
        document.getElementById('login-form').addEventListener('submit', function (e) {
            e.preventDefault();  // Prevent form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Retrieve stored user data from localStorage
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');

            if (username === storedUsername && password === storedPassword) {
                alert("Login successful!");
                showRecipeFinder(); // Show recipe finder after login
            } else {
                alert("Invalid username or password. Please try again.");
            }
        });

        // Function to handle signup form submission
        document.getElementById('signup-form').addEventListener('submit', function (e) {
            e.preventDefault();  // Prevent form submission

            const username = document.getElementById('new-username').value;
            const password = document.getElementById('new-password').value;

            if (username && password) {
                // Store user data in localStorage
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);

                alert("Signup successful! You can now log in.");
                showLogin();  // Switch to login form after successful signup
            } else {
                alert("Please fill in all fields.");
            }
        });

        // Function to show the signup form and hide the login form
        function showSignup() {
            document.getElementById('login-form').classList.add('hidden');
            document.getElementById('signup-form').classList.remove('hidden');
        }

        // Function to show the login form and hide the signup form
        function showLogin() {
            document.getElementById('signup-form').classList.add('hidden');
            document.getElementById('login-form').classList.remove('hidden');
        }

        // Function to show recipe finder and hide authentication forms
        function showRecipeFinder() {
            document.getElementById('auth-section').classList.add('hidden');
            document.getElementById('recipe-finder').classList.remove('hidden');
        }

        // Functionality for recipe search
        const searchForm = document.querySelector('form');
        const searchInput = document.querySelector('#search');
        const resultsList = document.querySelector('#results');

        document.getElementById('submit').addEventListener('click', () => {
            searchRecipes();
        });

        async function searchRecipes() {
            const searchValue = searchInput.value.trim();
            if (!searchValue) return alert("Please enter ingredients.");

            const response = await fetch(https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10);
            const data = await response.json();
            displayRecipes(data.hits);
        }

        function displayRecipes(recipes) {
            let html = '';
            recipes.forEach((recipe) => {
                html += `
                <div>
                    <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                    <h3>${recipe.recipe.label}</h3>
                    <ul>
                        ${recipe.recipe.ingredientLines.map(ingredient => <li>${ingredient}</li>).join('')}
                    </ul>
                    <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
                </div>`;
            });
            resultsList.innerHTML = html;
        }