(async function initEvent() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if (!id) return alert("Invalid event ID");

  // 1️⃣ 获取活动详情
  const res = await API.getEvent(id);
  if (!res.success) return alert("Event not found.");

  const ev = res.event;

  // 2️⃣ 填充页面内容
  document.getElementById("title").textContent = ev.title;
  document.getElementById("category").textContent = ev.category_name || "Charity Event";
  document.getElementById("datetime").textContent = `${formatDateTime(ev.start_time)} — ${formatDateTime(ev.end_time)}`;
  document.getElementById("venue").textContent = `📍 ${ev.venue}, ${ev.city}`;
  document.getElementById("hero").src = ev.hero_image_url || "https://picsum.photos/seed/event/800/400";

  // 3️⃣ 注册按钮逻辑
const registerBtn = document.getElementById("register-btn");
registerBtn.addEventListener("click", () => {
  registerBtn.disabled = true;
  registerBtn.textContent = "Redirecting...";
  setTimeout(() => {
    location.href = `register.html?id=${ev.id}`;
  }, 400);
});


  // 4️⃣ 显示注册记录
  const list = document.getElementById("reg-list");
  const regs = res.registrations || [];

  if (!regs.length) {
    list.innerHTML = `<p class="muted">No registrations yet.</p>`;
  } else {
    list.innerHTML = regs.map(r => `
      <div class="reg-item">
        <i>👤</i> 
        ${r.user_name || "Anonymous"} — 
        ${r.tickets || r.ticket_count || 1} ticket(s) 
        <span>— ${formatDateTime(r.registered_at)}</span>
      </div>
    `).join('');
  }

  console.log("✅ Event details loaded:", ev);
})();
