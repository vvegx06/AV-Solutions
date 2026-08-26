// ---- scrollspy for sidebar nav ----
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const setActive = (id) => {
  links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
sections.forEach(sec => observer.observe(sec));
