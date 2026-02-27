document.getElementById("lostForm").onsubmit = async function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());

  await fetch("http://localhost:8080/api/lost", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  alert("Lost item submitted!");
  this.reset();
};

document.getElementById("foundForm").onsubmit = async function (e) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(this).entries());

  await fetch("http://localhost:8080/api/found", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  alert("Found item submitted!");
  this.reset();
};

