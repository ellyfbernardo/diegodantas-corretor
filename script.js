// ⚠️ Substitua pelo número de WhatsApp do Diego (DDI + DDD + número, só dígitos). Ex.: 5584999999999
const WHATSAPP_NUMBER = "5584900000000";

const whatsappLink = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

// Links de WhatsApp
document.querySelectorAll(".js-whatsapp").forEach((el) => {
  el.href = whatsappLink(el.dataset.msg || "Olá Diego! Vim pelo site.");
  el.target = "_blank";
  el.rel = "noopener";
});

// Cabeçalho ao rolar
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
const nav = document.getElementById("nav");
const toggle = document.getElementById("navToggle");
toggle.addEventListener("click", () => {
  nav.classList.toggle("is-open");
  toggle.classList.toggle("is-open");
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle.classList.remove("is-open");
  })
);

// Filtro de imóveis
document.querySelectorAll(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    document.querySelectorAll(".property").forEach((card) => {
      card.classList.toggle("is-hidden", f !== "todos" && card.dataset.type !== f);
    });
  });
});

// Animação de entrada
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Formulário -> WhatsApp
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const msg =
    `Olá Diego! Meu nome é ${d.nome}.\n` +
    `Objetivo: ${d.objetivo}\nTipo de imóvel: ${d.tipo}\n` +
    (d.telefone ? `Telefone: ${d.telefone}\n` : "") +
    (d.mensagem ? `\n${d.mensagem}` : "");
  window.open(whatsappLink(msg), "_blank", "noopener");
});

document.getElementById("year").textContent = new Date().getFullYear();
