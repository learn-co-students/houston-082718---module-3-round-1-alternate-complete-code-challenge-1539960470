const theatreId = 1;
const URL = `https://evening-plateau-54365.herokuapp.com/theatres/${theatreId}`;

const showingCards = document.querySelector(".showings");

function fetchAndRenderShowings() {
  fetch(URL)
    .then(response => response.json())
    .then(response => {
      const showings = response;
      showings.showings.forEach(function(showing) {
        showingCards.innerHTML += `
        <div class="card">
          <div class="content">
            <div class="header">
              ${showing.film.title}
            </div>
            <div class="meta">
            ${showing.film.runtime} minutes
            </div>
            <div class="description">
              <span class="ui label">
              ${showing.showtime}
              </span>
              ${showing.capacity - showing.tickets_sold} remaining tickets
            </div>
        </div>
        <div class="extra content">
          <div data-id=${showing.id} class="ui blue button">Buy Ticket</div>
        </div>
    </div>
      `;
      });
    });
}

document.addEventListener("click", buyTicket);

function buyTicket(event) {
  id = event.target.dataset.id;

  const data = {
    showing_id: id
  };

  fetch("https://evening-plateau-54365.herokuapp.com/tickets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(response => {
      showingCards.innerHTML = "";
      fetchAndRenderShowings();
    });
}

fetchAndRenderShowings();
