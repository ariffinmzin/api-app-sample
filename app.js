document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const userSection = document.getElementById("user-section");
    const userTableBody = document.querySelector("#user-table tbody");
    const prevPageButton = document.getElementById("prev-page");
    const nextPageButton = document.getElementById("next-page");

    const api_url = 'http://my-gym.test';

    let jwt = null;
    let currentPage = 1;

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${api_url}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ "email":email, "password":password })
            });

            if (response.ok) {
                const data = await response.json();
                jwt = data.token;
                userSection.style.display = "block";
                loadUsers();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred. Please try again.");
        }
    });

    async function loadUsers() {
        try {
            const response = await fetch(`${api_url}/api/users?page=${currentPage}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                displayUsers(data.data);
                updatePagination(data.prev_page_url, data.next_page_url);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("An error occurred. Please try again.");
        }
    }

    function displayUsers(users) {
        userTableBody.innerHTML = "";
        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td>`;
            userTableBody.appendChild(row);
        });
    }

    function updatePagination(hasPrevPage, hasNextPage) {
        prevPageButton.disabled = !hasPrevPage;
        nextPageButton.disabled = !hasNextPage;
    }

    prevPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            loadUsers();
        }
    });

    nextPageButton.addEventListener("click", () => {
        currentPage++;
        loadUsers();
    });
});
