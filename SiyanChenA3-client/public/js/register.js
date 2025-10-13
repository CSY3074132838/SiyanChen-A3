(async function initRegister() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  if (!id) return alert("Invalid event ID.");

  // 获取活动信息
  const res = await API.getEvent(id);
  if (!res.success) return alert("Event not found.");

  const ev = res.event;
  document.getElementById("title").textContent = `Register for "${ev.title}"`;
  document.getElementById("event-info").textContent = `${formatDateTime(ev.start_time)} @ ${ev.venue}, ${ev.city}`;

  // 表单提交
  document.getElementById("reg-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = {
      event_id: id,
      user_name: form.user_name.value.trim(),
      contact: form.contact.value.trim(),
      tickets: form.tickets.value
    };

    if (!data.user_name || !data.contact) {
      return alert("Please fill out all required fields.");
    }

    try {
      // ✅ 统一使用 API_BASE
      const resp = await fetch(`${API_BASE}/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await resp.json();
      if (!result.success) throw new Error(result.message);

      document.getElementById("success").hidden = false;
      form.reset();

      setTimeout(() => {
        location.href = `event.html?id=${id}`;
      }, 1500);
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  });
})();
