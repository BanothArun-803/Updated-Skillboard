async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    // redirect based on role
    if (data.role === "admin") window.location.href = "dashboard.html?role=admin";
    else if (data.role === "employee") window.location.href = "dashboard.html?role=employee";
    else window.location.href = "dashboard.html?role=client";
  } else {
    document.getElementById("error").innerText = data.message;
  }
}
