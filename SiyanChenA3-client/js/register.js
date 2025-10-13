const id = new URLSearchParams(location.search).get('id');

async function loadEvent() {
  const ev = await apiGet(`/events/${id}`);
  document.getElementById('ev').innerHTML = `
    <h3>${ev.title}</h3>
    <p>${ev.city}, ${ev.venue}</p>
    <p>${ev.start_time}</p>
  `;
}

document.getElementById('regForm').onsubmit = async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  data.tickets = Number(data.tickets);
  const res = await fetch(`${API_BASE}/events/${id}/registrations`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  });
  if (res.status === 201) {
    alert('Registration successful!');
    location.href = `event.html?id=${id}`;
  } else {
    const msg = (await res.json()).error || 'Failed';
    alert(msg);
  }
};
loadEvent();
