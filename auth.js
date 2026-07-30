

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {

    signupBtn.addEventListener("click", function () {

        const username =
            document.getElementById("signupUsername").value;

        const password =
            document.getElementById("signupPassword").value;

        if (username === "" || password === "") {
            alert("Please fill all fields");
            return;
        }

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.some(function (user) {
            return user.username === username;
        });

        if (userExists) {
            alert("Username already exists");
            return;
        }

        const newUser = {
            username: username,
            password: password
        };

        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Account created successfully!");

        window.location.href = "login.html";

    });

}

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", function () {

        const username =
            document.getElementById("loginUsername").value;

        const password =
            document.getElementById("loginPassword").value;

        let users =
            JSON.parse(localStorage.getItem("users")) || [];

        const validUser = users.find(function (user) {

            return (
                user.username === username &&
                user.password === password
            );

        });

        if (validUser) {

            localStorage.setItem(
                "currentUser",
                username
            );

            alert("Login successful!");

            window.location.href = "index.html";

        } else {

            alert("Invalid username or password");

        }

    });

}
//---------------------------------------------------//
// forgot-password auth
const resetBtn = document.getElementById("resetBtn");

if (resetBtn) {

    resetBtn.addEventListener("click", function () {

        const username =
            document.getElementById("resetUsername").value.trim();

        const newPassword =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("resetMessage");


        // Check if all fields are filled
        if (
            username === "" ||
            newPassword === "" ||
            confirmPassword === ""
        ) {
            message.innerText = "Please fill all fields";
            return;
        }


        // Check if passwords match
        if (newPassword !== confirmPassword) {
            message.innerText = "Passwords do not match";
            return;
        }


        // Get users from localStorage
        let users =
            JSON.parse(localStorage.getItem("users")) || [];


        // Find the user
        const user = users.find(function (user) {
            return user.username === username;
        });


        // Check if user exists
        if (!user) {
            message.innerText = "Username not found";
            return;
        }


        // Update password
        user.password = newPassword;


        // Save updated users
        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        message.innerText =
            "Password reset successfully! Redirecting to login...";


        // Redirect after 2 seconds
        setTimeout(function () {

            window.location.href = "login.html";

        }, 2000);

    });

}