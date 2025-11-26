const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  setupSmoothScroll();
  setupRevealAnimations();
  initProfileOverlays();
  initModals();
  initContactForm();
  initSubscribeForm();
});

const THEME_KEY = "dasein-theme";

function applyTheme(theme) {
  const body = document.getElementById("app-body");
  if (!body) return;
  body.classList.remove("theme-dark", "theme-light");
  if (theme === "light") {
    body.classList.add("theme-light");
  } else {
    body.classList.add("theme-dark");
  }
}

function initThemeToggle() {
  const stored = localStorage.getItem(THEME_KEY);
  applyTheme(stored === "light" ? "light" : "dark");

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const body = document.getElementById("app-body");
    if (!body) return;
    const isLight = body.classList.contains("theme-light");
    const nextTheme = isLight ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

function setupSmoothScroll() {
  const handler = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  document.querySelectorAll("[data-scroll-target]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("data-scroll-target");
      if (targetId) handler(targetId);
    });
  });
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll("[data-animate]");
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const stagger = Number(el.getAttribute("data-stagger") || 0);
          if (!prefersReducedMotion && stagger) {
            el.style.transitionDelay = `${0.08 * stagger}s`;
          }
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.28 }
  );

  elements.forEach((el) => observer.observe(el));
}

function initHeroCanvas() {
  if (prefersReducedMotion) return;
  const container = document.getElementById("dasein-intro-visual");
  if (!container) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.display = "block";
  container.appendChild(canvas);

  const cols = 12;
  const rows = 12;
  const nodes = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      x: c / (cols - 1),
      y: r / (rows - 1),
      phase: Math.random() * Math.PI * 2,
    }))
  );

  const resize = () => {
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  };
  resize();
  window.addEventListener("resize", resize);

  let rafId = null;
  const draw = (time) => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    ctx.clearRect(0, 0, width, height);
    ctx.lineCap = "round";

    const baseColor = "rgba(34,199,163,0.18)";
    const nodeColor = "rgba(34,199,163,0.28)";

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const n = nodes[r][c];
        const nx = n.x * width;
        const ny = n.y * height;
        const offset = Math.sin(time * 0.001 + n.phase + n.x * 2 + n.y * 2) * 6;
        const ox = nx;
        const oy = ny + offset;

        if (c < cols - 1) {
          const right = nodes[r][c + 1];
          const rx = right.x * width;
          const ry =
            right.y * height +
            Math.sin(time * 0.001 + right.phase + right.x * 2 + right.y * 2) * 6;
          ctx.strokeStyle = baseColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(rx, ry);
          ctx.stroke();
        }
        if (r < rows - 1) {
          const down = nodes[r + 1][c];
          const dx = down.x * width;
          const dy =
            down.y * height +
            Math.sin(time * 0.001 + down.phase + down.x * 2 + down.y * 2) * 6;
          ctx.strokeStyle = baseColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ox, oy);
          ctx.lineTo(dx, dy);
          ctx.stroke();
        }
      }
    }

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const n = nodes[r][c];
        const nx = n.x * width;
        const ny = n.y * height;
        const pulse = (Math.sin(time * 0.002 + n.phase + n.x * 3 + n.y * 3) + 1) * 0.35 + 1;
        const waveOffset = Math.sin(time * 0.0008 + (n.x + n.y) * 2) * 4;
        const yPos = ny + waveOffset;
        const rSize = 1.8 * pulse;
        const grad = ctx.createRadialGradient(nx, yPos, 0, nx, yPos, rSize * 4);
        grad.addColorStop(0, nodeColor);
        grad.addColorStop(1, "rgba(17,24,39,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, yPos, rSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafId = requestAnimationFrame(draw);
  };
  rafId = requestAnimationFrame(draw);

  const cleanup = () => {
    window.removeEventListener("resize", resize);
    if (rafId) cancelAnimationFrame(rafId);
    if (container.contains(canvas)) container.removeChild(canvas);
  };

  window.addEventListener("unload", cleanup);
}

function initValuesSequence() {
  const section = document.getElementById("values");
  if (!section) return;

  const underline = section.querySelector(".values-underline");
  const pulses = section.querySelectorAll(".values-pulse");
  const cards = section.querySelectorAll(".value-card");

  const highlightCards = () => {
    if (prefersReducedMotion) {
      cards.forEach((card) => card.classList.add("highlighted"));
      underline?.classList.add("active");
      return;
    }

    pulses.forEach((pulse, idx) => {
      setTimeout(() => {
        pulse.classList.remove("play");
        void pulse.offsetWidth;
        pulse.classList.add("play");
      }, idx * 80);
    });

    underline?.classList.add("active");

    cards.forEach((card, idx) => {
      setTimeout(() => card.classList.add("highlighted"), idx < 2 ? 0 : 400);
    });
    setTimeout(() => cards.forEach((card) => card.classList.remove("highlighted")), 1200);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        highlightCards();
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  observer.observe(section);
}

function initPulseSurfaces() {
  if (prefersReducedMotion) return;
  const surfaces = document.querySelectorAll("[data-pulse-surface]");
  if (surfaces.length === 0) return;

  surfaces.forEach((surface) => {
    let intervalId = null;
    const trigger = () => {
      surface.classList.remove("pulse-active");
      void surface.offsetWidth;
      surface.classList.add("pulse-active");
      const underline = surface.parentElement?.querySelector(".services-underline");
      if (underline) {
        underline.classList.remove("active");
        void underline.offsetWidth;
        underline.classList.add("active");
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          trigger();
          intervalId = window.setInterval(trigger, 10000);
        } else if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
      },
      { threshold: 0.3, rootMargin: "-20% 0px" }
    );

    observer.observe(surface);
  });
}

function initProfileOverlays() {
  document.querySelectorAll("[data-profile-card]").forEach((card) => {
    const overlay = card.querySelector(".profile-overlay");
    const closeButtons = card.querySelectorAll(".overlay-close");

    const hideOverlay = () => overlay && overlay.classList.remove("visible");
    const showOverlay = () => overlay && overlay.classList.add("visible");

    card.addEventListener("mouseenter", showOverlay);
    card.addEventListener("mouseleave", hideOverlay);
    closeButtons.forEach((btn) =>
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        hideOverlay();
      })
    );

    card.addEventListener("click", () => {
      const modalId = card.getAttribute("data-modal-target");
      if (modalId) {
        hideOverlay();
        openModal(modalId);
      }
    });
  });
}

function initModals() {
  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const modal = el.closest(".modal");
      if (modal) closeModal(modal);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", () => {
      const modal = overlay.closest(".modal");
      if (modal) closeModal(modal);
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.open").forEach((modal) => closeModal(modal));
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(modal) {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (!document.querySelector(".modal.open")) {
    document.body.style.overflow = "";
  }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function initContactForm() {
  const submitBtn = document.getElementById("contact-submit");
  const form = document.getElementById("contact-form");
  if (!submitBtn || !form) return;

  const getValue = (name) => form.querySelector(`[name="${name}"]`)?.value.trim() || "";

  submitBtn.addEventListener("click", async () => {
    const payload = {
      name: getValue("name"),
      email: getValue("email"),
      topic: getValue("topic") || "General",
      message: getValue("message"),
    };

    if (!payload.name || !payload.email || !payload.message || !payload.topic) {
      showToast("Please fill all required fields", "warning");
      return;
    }
    if (payload.name.length < 2 || payload.name.length > 100) {
      showToast("Name must be between 2 and 100 characters.", "warning");
      return;
    }
    if (!emailRegex.test(payload.email)) {
      showToast("Invalid email address.", "warning");
      return;
    }
    if (payload.message.length < 10 || payload.message.length > 2000) {
      showToast("Message must be between 10 and 2000 characters.", "warning");
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Submission failed");
      showToast("Message received", "success");
      form.querySelectorAll("input, textarea").forEach((input) => (input.value = ""));
      form.querySelector('select[name="topic"]').value = "General";
    } catch (err) {
      showToast(err.message || "Submission failed", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

function initSubscribeForm() {
  const submitBtn = document.getElementById("subscribe-submit");
  const form = document.getElementById("subscribe-form");
  if (!submitBtn || !form) return;

  const emailInput = form.querySelector('input[name="email"]');

  submitBtn.addEventListener("click", async () => {
    const email = emailInput?.value.trim() || "";
    if (!email) {
      showToast("Email is required.", "warning");
      return;
    }
    if (!emailRegex.test(email)) {
      showToast("Invalid email address.", "warning");
      return;
    }

    submitBtn.disabled = true;
    const original = submitBtn.textContent;
    submitBtn.textContent = "Submitting...";

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      showToast(data.message || "Subscribed", "success");
      emailInput.value = "";
    } catch (err) {
      showToast(err.message || "Subscription failed", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-6px)";
    setTimeout(() => toast.remove(), 280);
  }, 3200);
}
