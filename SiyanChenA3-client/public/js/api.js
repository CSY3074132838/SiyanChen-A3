// public/js/api.js

const API_BASE = "http://localhost:3000/api"; // ✅ 统一配置API路径

const API = {
  async getHomeEvents() {
    const r = await fetch(`${API_BASE}/events`);
    return r.json();
  },
  async getCategories() {
    const r = await fetch(`${API_BASE}/categories`);
    return r.json();
  },
  async searchEvents(params) {
    const usp = new URLSearchParams(params);
    const r = await fetch(`${API_BASE}/events/search?${usp.toString()}`);
    return r.json();
  },
  async getEvent(id) {
    const r = await fetch(`${API_BASE}/events/${id}`);
    return r.json();
  },
  async registerEvent(data) {
    const r = await fetch(`${API_BASE}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return r.json();
  }
};

/** 工具函数 **/
function formatDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString();
}

function money(n, c = 'USD') {
  const val = Number(n || 0);
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: c }).format(val);
}


function renderUserInfo() {
  const el = document.getElementById('user-info');
  if (!el) return;

  const u = localStorage.getItem('user');
  if (u) {
    el.innerHTML = `👤 ${u} <a href="#" id="logout">(Logout)</a>`;
    const logout = document.getElementById('logout');
    if (logout) {
      logout.addEventListener('click', e => {
        e.preventDefault();
        localStorage.removeItem('user');
        location.reload();
      });
    }
  } else {
    el.innerHTML = `<a href="./login.html">Login</a> `;
  }
}

document.addEventListener('DOMContentLoaded', renderUserInfo);
