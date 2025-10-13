const id = new URLSearchParams(location.search).get('id');

async function loadEvent() {
  const ev = await apiGet(`/events/${id}`);
  document.getElementById('event-title').textContent = ev.title;
  document.getElementById('event-info').innerHTML = `
    <img src="${ev.hero_image_url}" width="300"><br>
    <b>${ev.city}</b> · ${ev.venue}<br>
    ${ev.start_time} ~ ${ev.end_time}
  `;
  document.getElementById('reg-list').innerHTML = ev.registrations.map(r =>
    `<li>${r.full_name} - ${r.tickets} tickets (${r.registered_at})</li>`
  ).join('') || '<li>No registrations yet</li>';
}

document.getElementById('btn-register').onclick = () => {
  location.href = `register.html?id=${id}`;
};

loadEvent();
