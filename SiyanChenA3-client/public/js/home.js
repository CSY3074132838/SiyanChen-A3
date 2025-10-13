(async function initHome() {
  const wrap = document.getElementById('events');
  const res = await API.getHomeEvents();
  if (!res.success) {
    document.getElementById('home-error').hidden = false;
    return;
  }
  wrap.innerHTML = res.data.map(ev => `
    <article class="card">
      <img src="${ev.hero_image_url || 'https://picsum.photos/seed/ch/' + ev.id + '/400/200'}" alt="Event image">
      <div class="card-body">
        <h3>${ev.title}</h3>
        <p class="badge">${ev.category_name}</p>
        <p class="muted">${ev.city} · ${formatDateTime(ev.start_time)}</p>
        <a href="event.html?id=${ev.id}" class="btn">View Details</a>
      </div>
    </article>
  `).join('');
})();
