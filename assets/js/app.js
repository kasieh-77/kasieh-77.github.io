/* ============================================================
   IV Aniversario EPCO 2026 — Escuela Profesional de Contabilidad
   UNAM Filial Ilo
   Interacciones: cuentas regresivas, agenda filtrable, calendario
   .ics, galería, animaciones y navegación.
   ============================================================ */

(() => {
  "use strict";

  /* ------------------------------------------------------------
     CONFIGURACIÓN RÁPIDA
     Cambia aquí el número de WhatsApp y el correo. Se actualizan
     automáticamente todos los enlaces de la página.
     ------------------------------------------------------------ */
  const CONFIG = {
    whatsapp: document.body.dataset.whatsapp || "51949319840", // formato internacional, sin + ni espacios
    email: document.body.dataset.email || "2024230003@unam.edu.pe",
    siteName: "IV Aniversario EPCO 2026",
    siteUrl: window.location.href.split("#")[0],
    tzOffset: "-05:00" // Perú (UTC-5)
  };

  /* ------------------------------------------------------------
     DATOS DEL PROGRAMA
     ------------------------------------------------------------ */
  const EVENTS = [
    {
      id: "crimen-contable",
      cat: "academico",
      catLabel: "Académico",
      start: "2026-10-29T15:30:00-05:00",
      end: "2026-10-29T18:00:00-05:00",
      day: "29",
      month: "OCT",
      title: "Seminario: II Encuentro en Crimen Contable",
      place: "Auditorio EP Ingeniería Ambiental",
      address: "UNAM Filial Ilo, Ilo, Moquegua",
      time: "15:30 h",
      desc: "Espacio académico especializado para analizar las nuevas modalidades de fraudes financieros, peritaje contable y los mecanismos de prevención y control corporativo vigentes.",
      img: "assets/img/act-crimen.jpg",
      alt: "Documentos y análisis financiero sobre un escritorio",
      wa: "Hola, deseo participar en el Seminario II Encuentro en Crimen Contable del Aniversario EPCO.",
      featured: true
    },
    {
      id: "miss-mister",
      cat: "cultural",
      catLabel: "Cultural",
      start: "2026-11-06T20:00:00-05:00",
      end: "2026-11-06T23:00:00-05:00",
      day: "06",
      month: "NOV",
      title: "Certamen: Miss & Mister Monkey Beach",
      place: "Anfiteatro Playa Puerto Inglés · Monkey Beach",
      address: "Puerto Inglés, Ilo, Moquegua",
      time: "20:00 h",
      desc: "Gran tarde cultural y de talentos al aire libre en el anfiteatro de la playa, con presentación de talentos, pasarela y feria de emprendimientos locales en la zona superior.",
      img: "assets/img/act-miss-mister.jpg",
      alt: "Playa con mar turquesa y arena",
      wa: "Hola, deseo inscribirme o asistir al Miss y Mister Monkey Beach del Aniversario EPCO.",
      featured: true
    },
    {
      id: "conta-talento",
      cat: "cultural",
      catLabel: "Cultural",
      start: "2026-11-10T14:30:00-05:00",
      end: "2026-11-10T17:30:00-05:00",
      day: "10",
      month: "NOV",
      title: "Conta Tiene Talento",
      place: "Auditorio EP Ingeniería Ambiental",
      address: "UNAM Filial Ilo, Ilo, Moquegua",
      time: "14:30 h",
      desc: "Demostración artística y cultural donde los estudiantes de todos los ciclos demuestran sus destrezas en canto, baile, música y expresión escénica.",
      img: "assets/img/act-talento.jpg",
      alt: "Público y luces en un espectáculo musical",
      wa: "Hola, quiero participar en el concurso Conta Tiene Talento del Aniversario EPCO.",
      featured: true
    },
    {
      id: "simposio",
      cat: "academico",
      catLabel: "Académico",
      start: "2026-11-12T16:00:00-05:00",
      end: "2026-11-12T18:30:00-05:00",
      day: "12",
      month: "NOV",
      title: "Simposio Académico: ¿Qué pagamos y por qué?",
      place: "Auditorio EP Ingeniería Ambiental",
      address: "UNAM Filial Ilo, Ilo, Moquegua",
      time: "16:00 h",
      desc: "Análisis de la carga tributaria real que asume el ciudadano y la empresa en el Perú: qué impuestos pagamos, quién los recauda y cómo se redistribuyen. A cargo de especialistas en tributación y política fiscal.",
      img: "assets/img/act-simposio.svg",
      alt: "Afiche del Simposio Académico ¿Qué pagamos y por qué?",
      wa: "Hola, deseo participar en el Simposio Académico ¿Qué pagamos y por qué? del Aniversario EPCO.",
      featured: true
    },
    {
      id: "cadecis",
      cat: "deportivo",
      catLabel: "Deportivo",
      start: "2026-11-13T08:00:00-05:00",
      end: "2026-11-13T17:00:00-05:00",
      day: "13",
      month: "NOV",
      title: "Campeonato Deportivo · II CADECIS",
      place: "Cancha Deportiva UNAM Filial Ilo",
      address: "UNAM Filial Ilo, Ilo, Moquegua",
      time: "08:00 h",
      desc: "Encuentro deportivo inter-ciclos en disciplinas de fulbito y vóley, fomentando la confraternidad, el deporte y la salud física de toda la comunidad contable.",
      img: "assets/img/act-cadecis.jpg",
      alt: "Jugadores de fútbol en una cancha deportiva",
      wa: "Hola, deseo inscribir a mi equipo para el II CADECIS del Aniversario EPCO.",
      featured: true
    },
    {
      id: "saber-contable",
      cat: "academico",
      catLabel: "Académico",
      start: "2026-11-18T15:00:00-05:00",
      end: "2026-11-18T18:00:00-05:00",
      day: "18",
      month: "NOV",
      title: "Saber Contable",
      place: "Auditorio EP Ingeniería Ambiental",
      address: "UNAM Filial Ilo, Ilo, Moquegua",
      time: "15:00 h",
      desc: "Concurso de conocimientos técnicos, normatividad tributaria, NIIF y finanzas corporativas para medir el nivel académico y la agilidad mental de los estudiantes.",
      img: "assets/img/act-saber.jpg",
      alt: "Estudiante tomando apuntes durante una clase",
      wa: "Hola, quiero participar en el concurso Saber Contable del Aniversario EPCO.",
      featured: true
    },
    {
      id: "feria",
      cat: "social",
      catLabel: "Social",
      start: "2026-11-27T07:30:00-05:00",
      end: "2026-11-27T15:00:00-05:00",
      day: "27",
      month: "NOV",
      title: "Feria de Emprendimiento & Responsabilidad Social",
      place: "Campo Ferial · Pampa Inalámbrica",
      address: "Pampa Inalámbrica, Ilo, Moquegua",
      time: "07:30 h",
      desc: "Exhibición de proyectos de negocio, asesoría contable básica a la comunidad por parte del NAF y exposición de iniciativas emprendedoras de los estudiantes.",
      img: "assets/img/act-feria.jpg",
      alt: "Equipo de trabajo en una reunión de emprendimiento",
      wa: "Hola, deseo separar un espacio para la Feria de Emprendimiento del Aniversario EPCO.",
      featured: true
    },
    {
      id: "dia-central",
      cat: "institucional",
      catLabel: "Institucional",
      start: "2026-11-29T08:00:00-05:00",
      end: "2026-11-29T13:00:00-05:00",
      day: "29",
      month: "NOV",
      title: "Día Central, Desfile y Ceremonia",
      place: "Plaza de Armas de Ilo y Auditorio UNAM",
      address: "Plaza de Armas, Ilo, Moquegua",
      time: "08:00 h",
      desc: "Jornada apoteósica de aniversario que inicia con el desfile institucional en la Plaza de Armas de Ilo y culmina con la solemne Sesión Solemne y entrega de reconocimientos.",
      img: "assets/img/act-dia-central.jpg",
      alt: "Ceremonia institucional con banderas",
      wa: "Hola, deseo más información sobre el Día Central del IV Aniversario EPCO.",
      featured: true
    }
  ];

  /* ------------------------------------------------------------
     UTILIDADES
     ------------------------------------------------------------ */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pad = (n) => String(Math.max(0, n)).padStart(2, "0");
  const waLink = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

  const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
    "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

  // Las fechas se muestran siempre en hora de Perú, sin importar la zona del visitante.
  const TZ = { timeZone: "America/Lima" };
  const longFmt = new Intl.DateTimeFormat("es-PE", { ...TZ, weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const partsFmt = new Intl.DateTimeFormat("es-PE", { ...TZ, day: "numeric", month: "numeric", hour: "numeric", minute: "numeric", hour12: false });

  const longDate = (d) => longFmt.format(new Date(d));
  const shortDate = (d) => {
    const p = {};
    partsFmt.formatToParts(new Date(d)).forEach((part) => { p[part.type] = part.value; });
    return `${pad(p.day)} ${MONTHS[Number(p.month) - 1].slice(0, 3).toUpperCase()} · ${pad(p.hour)}:${pad(p.minute)} h`;
  };

  const now = () => Date.now();

  const sorted = [...EVENTS].sort((a, b) => new Date(a.start) - new Date(b.start));

  function nextEvent() {
    return sorted.find((ev) => new Date(ev.start).getTime() > now() - 60 * 60 * 1000) || sorted[sorted.length - 1];
  }

  function statusOf(ev) {
    const start = new Date(ev.start).getTime();
    const end = new Date(ev.end).getTime();
    const t = now();
    if (t > end) return "past";
    if (t >= start) return "live";
    return "next";
  }

  /* ------------------------------------------------------------
     1. Enlaces de contacto
     ------------------------------------------------------------ */
  function initContactLinks() {
    const main = $("#waMain");
    if (main) main.href = waLink("Hola, deseo inscribirme en las actividades del IV Aniversario de la Escuela Profesional de Contabilidad (UNAM Filial Ilo).");

    const waText = $("#waText");
    if (waText) {
      waText.textContent = `+${CONFIG.whatsapp.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, "$1 $2 $3 $4")}`;
      waText.href = waLink("Hola, deseo información sobre el Aniversario EPCO.");
    }

    const mail = `mailto:${CONFIG.email}?subject=${encodeURIComponent("IV Aniversario EPCO 2026 — Consulta")}`;
    const mailLink = $("#mailLink");
    if (mailLink) mailLink.href = mail;
    const mailText = $("#mailText");
    if (mailText) {
      mailText.textContent = CONFIG.email;
      mailText.href = mail;
    }
  }

  /* ------------------------------------------------------------
     2. Cuentas regresivas
     ------------------------------------------------------------ */
  const countdowns = [];

  function registerCountdown(el) {
    if (!el) return;
    const target = el.dataset.countdown;
    if (!target) return;
    if (countdowns.some((c) => c.el === el)) return;
    countdowns.push({
      el,
      target: new Date(target).getTime(),
      units: {
        d: $('[data-unit="d"]', el),
        h: $('[data-unit="h"]', el),
        m: $('[data-unit="m"]', el),
        s: $('[data-unit="s"]', el)
      },
      last: {}
    });
  }

  function paintCountdown(c) {
    const diff = c.target - now();
    const done = diff <= 0;
    const totalSec = Math.max(0, Math.floor(diff / 1000));
    const values = {
      d: Math.floor(totalSec / 86400),
      h: Math.floor((totalSec % 86400) / 3600),
      m: Math.floor((totalSec % 3600) / 60),
      s: totalSec % 60
    };

    Object.entries(values).forEach(([key, val]) => {
      const node = c.units[key];
      if (!node) return;
      const text = key === "d" && val > 99 ? String(val) : pad(val);
      if (node.textContent !== text) {
        node.textContent = text;
        if (!reduceMotion && c.last[key] !== undefined) {
          node.classList.remove("tick");
          void node.offsetWidth;
          node.classList.add("tick");
        }
        c.last[key] = text;
      }
    });

    c.el.classList.toggle("is-done", done);
  }

  function startCountdowns() {
    countdowns.forEach(paintCountdown);
    setInterval(() => countdowns.forEach(paintCountdown), 1000);
  }

  /* ------------------------------------------------------------
     3. Programa: lista + detalle
     ------------------------------------------------------------ */
  let activeEventId = null;

  function renderList(filter = "all") {
    const list = $("#eventList");
    if (!list) return;

    const visible = sorted.filter((ev) => filter === "all" || ev.cat === filter);
    if (!visible.length) return;

    if (!visible.some((ev) => ev.id === activeEventId)) {
      const fallback = nextEvent();
      activeEventId = visible.some((ev) => ev.id === fallback.id) ? fallback.id : visible[0].id;
    }

    list.innerHTML = "";

    visible.forEach((ev, i) => {
      const status = statusOf(ev);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "event-item";
      btn.dataset.id = ev.id;
      btn.style.animationDelay = reduceMotion ? "0s" : `${i * 45}ms`;
      btn.setAttribute("aria-label", `${ev.title}, ${ev.day} de ${ev.month}, ${ev.time}`);
      if (status === "past") btn.classList.add("is-past");
      if (ev.id === activeEventId) btn.classList.add("is-active");

      btn.innerHTML = `
        <span class="ev-date"><b>${ev.day}</b><span>${ev.month}</span></span>
        <span class="ev-body">
          <span class="ev-cat">${ev.catLabel}${status === "past" ? " · Finalizada" : ""}${status === "live" ? " · En curso" : ""}</span>
          <h3>${ev.title}</h3>
          <span class="ev-time">${ev.time} · ${ev.place}</span>
        </span>
        <svg class="ev-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
      `;

      btn.addEventListener("click", () => selectEvent(ev.id));
      list.appendChild(btn);
    });

    selectEvent(activeEventId);
  }

  function detailTemplate(ev) {
    const status = statusOf(ev);
    const statusLabel = status === "past" ? "Finalizada" : status === "live" ? "En curso" : "Próximamente";
    const isPast = status === "past";
    const mapQuery = encodeURIComponent(`${ev.place}, ${ev.address}`);
    return `
      <div class="detail-media">
        <img src="${ev.img}" alt="${ev.alt}" loading="lazy" />
        <div class="detail-media-top">
          <span class="tag">${ev.catLabel}</span>
          <span class="status ${status === "past" ? "is-past" : status === "next" ? "is-next" : ""}">
            ${status === "past" ? "" : '<span class="dot"></span>'} ${statusLabel}
          </span>
        </div>
        <div class="detail-media-caption">
          <span class="detail-date">${longDate(ev.start)}</span>
          <h3>${ev.title}</h3>
        </div>
      </div>

      <div class="detail-body">
        <ul class="detail-meta">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            ${ev.time}
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
            ${ev.place}
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/></svg>
            ${ev.day} ${ev.month} 2026
          </li>
        </ul>

        <p class="detail-desc">${ev.desc}</p>

        <p class="detail-cd" data-detail-countdown="${ev.start}" data-detail-end="${ev.end}">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
          <span>Calculando…</span>
        </p>

        <div class="detail-actions">
          ${isPast ? `
          <a class="btn btn-gold" href="#galeria" data-gallery-for="${ev.id}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M4 18l5-5 4 4 3-3 4 4"/></svg>
            <span>Ver galería de esta actividad</span>
          </a>
          <a class="btn btn-line" href="${nextEditionMail(ev)}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            <span>Quiero la próxima edición</span>
          </a>` : `
          <a class="btn btn-wa" href="${waLink(ev.wa)}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true" style="fill:currentColor;stroke:none"><path d="M20.5 3.5A11 11 0 0 0 3.4 17L2 22l5.2-1.4A11 11 0 0 0 20.5 3.5z"/></svg>
            <span>Inscribirme</span>
          </a>
          <button class="btn btn-line" type="button" data-ics="${ev.id}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18M12 15v4M10 17h4"/></svg>
            <span>Añadir al calendario</span>
          </button>
          <a class="btn btn-line" href="https://www.google.com/maps/search/?api=1&query=${mapQuery}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
            <span>Ubicación</span>
          </a>`}
        </div>
      </div>
    `;
  }

  function selectEvent(id, opts = {}) {
    const ev = EVENTS.find((e) => e.id === id);
    if (!ev) return;
    activeEventId = id;

    $$(".event-item").forEach((btn) => {
      const active = btn.dataset.id === id;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-current", active ? "true" : "false");
    });

    const detail = $("#eventDetail");
    if (!detail) return;

    const apply = () => {
      detail.innerHTML = detailTemplate(ev);
      detail.classList.remove("is-swapping");

      const img = $(".detail-media img", detail);
      if (img) {
        const markLoaded = () => img.classList.add("is-loaded");
        if (img.complete && img.naturalWidth) markLoaded();
        else {
          img.addEventListener("load", markLoaded, { once: true });
          img.addEventListener("error", () => { img.style.opacity = "0"; }, { once: true });
        }
      }

      const icsBtn = $("[data-ics]", detail);
      if (icsBtn) icsBtn.addEventListener("click", () => downloadICS(ev));

      updateDetailCountdown();
    };

    const firstPaint = detail.childElementCount === 0;
    detail.classList.add("is-swapping");
    if (reduceMotion || firstPaint) apply();
    else setTimeout(apply, 160);

    if (opts.scroll) {
      const target = $("#programa");
      if (target) target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }
  }

  function updateDetailCountdown() {
    const el = $("[data-detail-countdown]");
    if (!el) return;
    const start = new Date(el.dataset.detailCountdown).getTime();
    const end = new Date(el.dataset.detailEnd).getTime();
    const t = now();
    const label = $("span", el);

    if (t > end) {
      el.classList.add("is-past");
      label.innerHTML = "Esta actividad ya se realizó. Revisa las próximas fechas del programa.";
      return;
    }
    el.classList.remove("is-past");
    if (t >= start) {
      label.innerHTML = "<b>¡La actividad está en curso!</b>";
      return;
    }
    const s = Math.floor((start - t) / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    label.innerHTML = `Faltan <b>${d}d ${pad(h)}h ${pad(m)}m ${pad(sec)}s</b> para esta actividad`;
  }

  /* ------------------------------------------------------------
     4. Calendario (.ics)
     ------------------------------------------------------------ */
  function icsStamp(date) {
    return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  }

  function downloadICS(ev) {
    const start = new Date(ev.start);
    const end = new Date(ev.end);
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//EPCO UNAM Ilo//IV Aniversario 2026//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${ev.id}-aniversario-epco-2026@unam-ilo`,
      `DTSTAMP:${icsStamp(new Date())}`,
      `DTSTART:${icsStamp(start)}`,
      `DTEND:${icsStamp(end)}`,
      `SUMMARY:${ev.title} · IV Aniversario EPCO`,
      `LOCATION:${ev.place}, ${ev.address}`,
      `DESCRIPTION:${ev.desc.replace(/\n/g, " ")}`,
      `URL:${CONFIG.siteUrl}#programa`,
      "BEGIN:VALARM",
      "TRIGGER:-PT2H",
      "ACTION:DISPLAY",
      "DESCRIPTION:Recordatorio de actividad EPCO",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ];

    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aniversario-epco-${ev.id}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  /* ------------------------------------------------------------
     5. Próxima actividad + tarjetas mini
     ------------------------------------------------------------ */
  function renderNext() {
    const ev = nextEvent();
    const status = statusOf(ev);

    const badge = $("#nextBadge");
    const title = $("#nextTitle");
    const date = $("#nextDate");
    const place = $("#nextPlace");
    const cd = $("#nextCountdown");
    const btn = $("#nextDetailBtn");

    if (badge) badge.textContent = status === "live" ? "En curso ahora" : status === "past" ? "Última actividad" : "Próxima actividad";
    if (title) title.textContent = ev.title;
    if (date) date.textContent = `${ev.day} ${ev.month} · ${ev.time} — ${longDate(ev.start)}`;
    if (place) place.textContent = ev.place;
    if (cd) {
      cd.dataset.countdown = ev.start;
      registerCountdown(cd);
    }
    if (btn) btn.dataset.eventId = ev.id;

    const grid = $("#miniGrid");
    if (!grid) return;
    grid.innerHTML = "";

    const upcoming = sorted.filter((e) => new Date(e.start) > new Date(ev.start)).slice(0, 3);
    const fallback = sorted.slice(-3);
    const cards = upcoming.length ? upcoming : fallback;

    cards.forEach((e) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "mini-card";
      card.dataset.id = e.id;
      card.style.textAlign = "left";
      card.innerHTML = `
        <span class="mini-top">
          <span class="mini-date">${e.day} ${e.month} · ${e.time}</span>
          <span class="tag">${e.catLabel}</span>
        </span>
        <h4>${e.title}</h4>
        <span class="mini-cd" data-mini="${e.start}">
          <div><b data-mu="d">0</b><small>días</small></div>
          <div><b data-mu="h">00</b><small>hrs</small></div>
          <div><b data-mu="m">00</b><small>min</small></div>
          <div><b data-mu="s">00</b><small>seg</small></div>
        </span>
      `;
      card.addEventListener("click", () => selectEvent(e.id, { scroll: true }));
      grid.appendChild(card);
    });

    if (upcoming.length === 0) cards.forEach((e) => grid.querySelector(`[data-id="${e.id}"]`)?.classList.add("is-done"));
  }

  function tickMini() {
    $$("[data-mini]").forEach((el) => {
      const diff = new Date(el.dataset.mini).getTime() - now();
      const sec = Math.max(0, Math.floor(diff / 1000));
      const vals = {
        d: Math.floor(sec / 86400),
        h: pad(Math.floor((sec % 86400) / 3600)),
        m: pad(Math.floor((sec % 3600) / 60)),
        s: pad(sec % 60)
      };
      Object.entries(vals).forEach(([k, v]) => {
        const node = el.querySelector(`[data-mu="${k}"]`);
        if (node) node.textContent = v;
      });
      if (diff <= 0) el.closest(".mini-card")?.classList.add("is-done");
    });
  }

  /* ------------------------------------------------------------
     6. Navegación: header, menú móvil, progreso, activo
     ------------------------------------------------------------ */
  function initNav() {
    const header = $("#siteHeader");
    const progress = $("#scrollProgress").firstElementChild;
    const burger = $("#burger");
    const menu = $("#mobileMenu");

    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 40);
      if (progress) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = `${h > 0 ? Math.min(100, (y / h) * 100) : 0}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const closeMenu = () => {
      if (!menu || !burger) return;
      menu.classList.remove("is-open");
      menu.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Abrir menú");
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };

    if (burger && menu) {
      burger.addEventListener("click", () => {
        const open = burger.getAttribute("aria-expanded") === "true";
        if (open) closeMenu();
        else {
          menu.classList.add("is-open");
          menu.setAttribute("aria-hidden", "false");
          burger.setAttribute("aria-expanded", "true");
          burger.setAttribute("aria-label", "Cerrar menú");
          document.body.classList.add("menu-open");
          document.body.style.overflow = "hidden";
        }
      });
      $$("a", menu).forEach((a) => a.addEventListener("click", closeMenu));
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
      });
    }

    // Sección activa
    const links = $$("#navLinks a");
    const sections = links
      .map((a) => document.querySelector(a.getAttribute("href")))
      .filter(Boolean);

    if ("IntersectionObserver" in window && sections.length) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = `#${entry.target.id}`;
            links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
          });
        },
        { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach((s) => obs.observe(s));
    }

    // Volver arriba
    $("#toTop")?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------
     7. Reveal on scroll + contadores
     ------------------------------------------------------------ */
  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((el) => el.classList.add("in-view"));
      $$("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach((el) => obs.observe(el));

    // Contadores
    const counters = $$("[data-count]");
    const cObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = Number(el.dataset.count) || 0;
          const duration = 1200;
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            el.textContent = String(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cObs.unobserve(el);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cObs.observe(el));
  }

  /* ------------------------------------------------------------
     8. Galería / lightbox
     ------------------------------------------------------------ */
  function initGallery() {
    const items = $$(".gallery-item");
    const lb = $("#lightbox");
    if (!items.length || !lb) return;
    const img = $("#lbImage");
    const cap = $("#lbCaption");
    let index = 0;
    let lastFocused = null;

    const open = (i) => {
      index = (i + items.length) % items.length;
      const item = items[index];
      img.src = item.dataset.full;
      img.alt = $("img", item)?.alt || "";
      cap.textContent = item.dataset.caption || "";
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      $("#lbClose")?.focus();
    };

    const close = () => {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lastFocused?.focus();
    };

    items.forEach((item, i) =>
      item.addEventListener("click", () => {
        lastFocused = item;
        open(i);
      })
    );

    $("#lbClose")?.addEventListener("click", close);
    $("#lbPrev")?.addEventListener("click", () => open(index - 1));
    $("#lbNext")?.addEventListener("click", () => open(index + 1));
    lb.addEventListener("click", (e) => {
      if (e.target === lb) close();
    });
    document.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") open(index + 1);
      if (e.key === "ArrowLeft") open(index - 1);
    });
  }

  /* ------------------------------------------------------------
     9. Filtros + teclado en la agenda
     ------------------------------------------------------------ */
  function initFilters() {
    const chips = $$(".chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        chips.forEach((c) => {
          c.classList.toggle("is-active", c === chip);
          c.setAttribute("aria-pressed", String(c === chip));
        });
        renderList(chip.dataset.filter);
      });
    });

    const list = $("#eventList");
    list?.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
      const buttons = $$(".event-item", list);
      if (!buttons.length) return;
      const current = buttons.findIndex((b) => b.dataset.id === activeEventId);
      let next = current;
      if (e.key === "ArrowDown") next = Math.min(buttons.length - 1, current + 1);
      if (e.key === "ArrowUp") next = Math.max(0, current - 1);
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = buttons.length - 1;
      e.preventDefault();
      buttons[next]?.focus();
      if (buttons[next]) selectEvent(buttons[next].dataset.id);
    });
  }

  /* ------------------------------------------------------------
     10. Compartir / imprimir / salto a evento
     ------------------------------------------------------------ */
  /* ------------------------------------------------------------
     Galería filtrada por actividad
     ------------------------------------------------------------ */
  function nextEditionMail(ev) {
    const subject = `Quiero participar en la próxima edición · ${ev.title}`;
    const body = [
      "Hola, buenas tardes.",
      "",
      `Les escribo porque no pude participar en "${ev.title}" de esta edición del IV Aniversario de la Escuela Profesional de Contabilidad.`,
      "Me gustaría que me consideren para la siguiente edición (2027) y que me informen cuando abran las inscripciones.",
      "",
      "Nombre y apellidos: ",
      "Ciclo / condición (estudiante, docente, egresado): ",
      "Teléfono de contacto: ",
      "",
      "Gracias."
    ].join("\r\n");
    return `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function galleryItems() {
    return $$(".gallery-item").filter((item) => !item.classList.contains("is-pending"));
  }

  function filterGallery(activityId) {
    const items = galleryItems();
    const matches = items.filter((item) => item.dataset.activity === activityId);
    items.forEach((item) => {
      const hide = matches.length > 0 && item.dataset.activity !== activityId;
      item.classList.toggle("is-filtered-out", hide);
    });

    const note = $("#galleryNote");
    const text = $("#galleryNoteText");
    if (note && text) {
      note.hidden = matches.length > 0;
      text.textContent = matches.length > 0
        ? `Mostrando ${matches.length} ${matches.length === 1 ? "foto" : "fotos"} de esta actividad.`
        : "Aún no tenemos fotografías de esta actividad: te mostramos la galería completa.";
      if (matches.length === 0) note.hidden = false;
    }

    $("#galeria")?.scrollIntoView?.({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function resetGalleryFilter() {
    galleryItems().forEach((item) => item.classList.remove("is-filtered-out"));
    const note = $("#galleryNote");
    if (note) note.hidden = true;
  }

  function initActions() {
    // Acciones de galería generadas dinámicamente en el detalle de cada actividad
    document.addEventListener("click", (e) => {
      const go = e.target.closest("[data-gallery-for]");
      if (go) {
        e.preventDefault();
        filterGallery(go.dataset.galleryFor);
        return;
      }
      if (e.target.closest("#galleryReset")) resetGalleryFilter();
    });

    const shareBtn = $("#shareBtn");
    const shareLabel = $("#shareLabel");
    shareBtn?.addEventListener("click", async () => {
      const data = {
        title: CONFIG.siteName,
        text: "Programa oficial del IV Aniversario de la Escuela Profesional de Contabilidad · UNAM Filial Ilo",
        url: CONFIG.siteUrl
      };
      try {
        if (navigator.share) {
          await navigator.share(data);
          return;
        }
        await navigator.clipboard.writeText(CONFIG.siteUrl);
        if (shareLabel) {
          shareLabel.textContent = "¡Enlace copiado!";
          setTimeout(() => (shareLabel.textContent = "Compartir"), 2200);
        }
      } catch {
        if (shareLabel) {
          shareLabel.textContent = "Copia el enlace";
          setTimeout(() => (shareLabel.textContent = "Compartir"), 2200);
        }
      }
    });

    $("#printBtn")?.addEventListener("click", () => window.print());

    $$("[data-jump-event]").forEach((btn) =>
      btn.addEventListener("click", () => selectEvent(btn.dataset.jumpEvent, { scroll: true }))
    );

    $("#nextDetailBtn")?.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.eventId || nextEvent().id;
      selectEvent(id, { scroll: true });
    });
  }

  /* ------------------------------------------------------------
     11. Polvo dorado en el hero + luz del cursor
     ------------------------------------------------------------ */
  function initHeroCanvas() {
    const canvas = $("#dust");
    const hero = $(".hero");
    if (!canvas || !hero || reduceMotion) return;

    const ctx = canvas.getContext("2d");
    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let raf = null;
    let visible = true;

    const resize = () => {
      const rect = hero.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.round((w * h) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.4,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(Math.random() * 0.22 + 0.05),
        a: Math.random() * 0.5 + 0.12,
        phase: Math.random() * Math.PI * 2
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.012;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const alpha = p.a * (0.55 + Math.sin(p.phase) * 0.45);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 195, 116, ${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (raf) return;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (!raf) return;
      cancelAnimationFrame(raf);
      raf = null;
    };

    resize();
    start();
    window.addEventListener("resize", resize);

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          visible = entries[0].isIntersecting;
          if (visible && !document.hidden) start();
          else stop();
        },
        { threshold: 0.02 }
      ).observe(hero);
    }
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else if (visible) start();
    });

    // Luz que sigue al cursor
    const spot = $("#heroSpot");
    if (spot && window.matchMedia("(pointer: fine)").matches) {
      let mx = 50;
      let my = 40;
      let tx = 50;
      let ty = 40;
      let glowRaf = null;

      const loop = () => {
        mx += (tx - mx) * 0.08;
        my += (ty - my) * 0.08;
        spot.style.setProperty("--mx", `${mx}%`);
        spot.style.setProperty("--my", `${my}%`);
        glowRaf = requestAnimationFrame(loop);
      };

      hero.addEventListener("pointermove", (e) => {
        const rect = hero.getBoundingClientRect();
        tx = ((e.clientX - rect.left) / rect.width) * 100;
        ty = ((e.clientY - rect.top) / rect.height) * 100;
      });
      hero.addEventListener("pointerleave", () => {
        tx = 50;
        ty = 40;
      });
      if (!glowRaf) loop();
    }
  }

  /* ------------------------------------------------------------
     12. Marquee: duplicar contenido para bucle infinito
     ------------------------------------------------------------ */
  function initMarquee() {
    const track = $("#marqueeTrack");
    if (!track || reduceMotion) return;
    track.innerHTML += track.innerHTML;
  }

  /* ------------------------------------------------------------
     13. Arranque
     ------------------------------------------------------------ */
  function init() {
    initContactLinks();
    initMarquee();
    initNav();
    initReveal();
    initFilters();

    activeEventId = nextEvent().id;
    renderNext();
    renderList("all");
    initActions();
    initGallery();
    initHeroCanvas();

    $$(".cd[data-countdown]").forEach(registerCountdown);
    startCountdowns();
    tickMini();
    setInterval(tickMini, 1000);
    setInterval(updateDetailCountdown, 1000);

    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
