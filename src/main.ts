import "./style.css";
import {
  career,
  categoryLabel,
  projects,
  skills,
  type Category,
  type Project,
} from "./data";

const catalog = document.querySelector<HTMLDivElement>("#catalog")!;
const filtersEl = document.querySelector<HTMLDivElement>(".filters")!;
const timeline = document.querySelector<HTMLOListElement>("#timeline")!;
const skillsGrid = document.querySelector<HTMLDivElement>("#skills-grid")!;
const dialog = document.querySelector<HTMLDialogElement>("#project-dialog")!;
const dialogKicker = document.querySelector<HTMLParagraphElement>("#dialog-kicker")!;
const dialogBody = document.querySelector<HTMLDivElement>("#dialog-body")!;
const closeBtn = dialog.querySelector<HTMLButtonElement>(".close")!;

const filters: Array<"all" | Category> = ["all", "ai", "data", "platform", "web"];
let active: "all" | Category = "all";

function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.replace(/^\//, "");
  return `${base}${normalized}`;
}

function coverSvg(kind: Project["coverKind"]): string {
  const common =
    'fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"';
  if (kind === "pipeline") {
    return `<svg viewBox="0 0 240 120" ${common} aria-hidden="true">
      <rect x="12" y="38" width="48" height="28" rx="6" />
      <rect x="96" y="38" width="48" height="28" rx="6" />
      <rect x="180" y="38" width="48" height="28" rx="6" />
      <path d="M60 52h36M144 52h36" />
      <circle cx="84" cy="52" r="3" fill="currentColor" stroke="none" />
      <circle cx="168" cy="52" r="3" fill="currentColor" stroke="none" />
      <text x="36" y="96" text-anchor="middle" fill="currentColor" stroke="none" font-size="9">док</text>
      <text x="120" y="96" text-anchor="middle" fill="currentColor" stroke="none" font-size="9">текст</text>
      <text x="204" y="96" text-anchor="middle" fill="currentColor" stroke="none" font-size="9">сайт</text>
    </svg>`;
  }
  if (kind === "etl") {
    return `<svg viewBox="0 0 240 120" ${common} aria-hidden="true">
      <circle cx="36" cy="36" r="12" />
      <circle cx="36" cy="84" r="12" />
      <rect x="92" y="42" width="56" height="36" rx="6" />
      <rect x="176" y="28" width="44" height="64" rx="6" />
      <path d="M48 36h44M48 84h28c12 0 16-18 16-18" />
      <path d="M148 60h28" />
    </svg>`;
  }
  if (kind === "ask") {
    return `<svg viewBox="0 0 240 120" ${common} aria-hidden="true">
      <rect x="24" y="28" width="110" height="64" rx="10" />
      <path d="M48 50h62M48 66h40" />
      <rect x="150" y="36" width="66" height="48" rx="8" />
      <path d="M162 54h42M162 68h28" />
    </svg>`;
  }
  return `<svg viewBox="0 0 240 120" ${common} aria-hidden="true">
    <rect x="28" y="30" width="72" height="60" rx="8" />
    <path d="M116 60h28" />
    <circle cx="168" cy="60" r="22" />
    <path d="M160 60h16M168 52v16" />
  </svg>`;
}

function cover(project: Project): string {
  if (project.coverKind === "image" && project.cover) {
    return `<div class="cover"><img src="${assetUrl(project.cover)}" alt="" /></div>`;
  }
  return `<div class="cover cover-art tag-${project.category}">${coverSvg(project.coverKind)}</div>`;
}

function renderCatalog() {
  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  catalog.innerHTML = visible
    .map((project, index) => {
      const n = String(index + 1).padStart(2, "0");
      const withCover = Boolean(project.featured || project.cover);
      return `<button class="project${withCover ? " featured" : ""}" type="button" data-id="${project.id}">
        <span class="project-num">${n}</span>
        <span>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-summary">${project.summary}</p>
        </span>
        <span class="project-side">
          <span class="tag tag-${project.category}">${categoryLabel[project.category]}</span>
          <span class="year">${project.year}</span>
        </span>
        ${withCover ? cover(project) : ""}
      </button>`;
    })
    .join("");
}

function renderFilters() {
  filtersEl.innerHTML = filters
    .map(
      (key) =>
        `<button class="filter" type="button" data-filter="${key}" aria-pressed="${
          active === key
        }">${categoryLabel[key]}</button>`,
    )
    .join("");
}

function openProject(project: Project) {
  dialogKicker.textContent = `${project.client} · ${project.year} · ${project.role}`;
  const gallery = project.images?.length
    ? `<div class="gallery">${project.images
        .map(
          (img) =>
            `<figure><img src="${assetUrl(img.src)}" alt="${img.alt}" />${
              img.label ? `<figcaption>${img.label}</figcaption>` : ""
            }</figure>`,
        )
        .join("")}</div>`
    : cover(project);
  const links = project.links.length
    ? `<p class="links">${project.links
        .map((l) => `<a href="${l.href}" target="_blank" rel="noreferrer">${l.label}</a>`)
        .join("")}</p>`
    : "";

  dialogBody.innerHTML = `
    <h2 id="dialog-title">${project.title}</h2>
    <p class="dialog-meta">${project.summary}</p>
    <div class="visual">${gallery}</div>
    <div class="split">
      <div><h3>Задача</h3><p>${project.problem}</p></div>
      <div><h3>Что сделал</h3><p>${project.solution}</p></div>
    </div>
    <div class="metrics">
      ${project.results
        .map((r) => `<div class="metric"><b>${r.value}</b><span>${r.label}</span></div>`)
        .join("")}
    </div>
    <p class="stack">${project.stack.map((s) => `<span class="chip">${s}</span>`).join("")}</p>
    ${links}
  `;
  dialog.showModal();
}

filtersEl.addEventListener("click", (event) => {
  const btn = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-filter]");
  if (!btn) return;
  active = btn.dataset.filter as typeof active;
  renderFilters();
  renderCatalog();
});

catalog.addEventListener("click", (event) => {
  const btn = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-id]");
  if (!btn) return;
  const project = projects.find((p) => p.id === btn.dataset.id);
  if (project) openProject(project);
});

closeBtn.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

timeline.innerHTML = career
  .map(
    (item) => `<li>
      <div class="when">${item.period}</div>
      <h3>${item.title} <span class="org">· ${item.org}</span></h3>
      <p>${item.body}</p>
    </li>`,
  )
  .join("");

skillsGrid.innerHTML = skills
  .map(
    (group) => `<article class="skill-card">
      <h3>${group.title}</h3>
      <ul>${group.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    </article>`,
  )
  .join("");

renderFilters();
renderCatalog();
