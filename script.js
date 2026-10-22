
/* =========================================
   CUSTOM THREE-DOT CURSOR
========================================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorTrail = document.querySelector(".cursor-trail");
const cursorTrailTwo = document.querySelector(".cursor-trail-two");

const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

let mouseX = 0;
let mouseY = 0;
let trailX = 0;
let trailY = 0;
let trailTwoX = 0;
let trailTwoY = 0;

if (hasFinePointer && cursorDot) {
    document.addEventListener("mousemove", function (event) {
        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    function updateCursorTrail() {
        trailX += (mouseX - trailX) * 0.22;
        trailY += (mouseY - trailY) * 0.22;

        trailTwoX += (mouseX - trailTwoX) * 0.12;
        trailTwoY += (mouseY - trailTwoY) * 0.12;

        if (cursorTrail) {
            cursorTrail.style.left = `${trailX}px`;
            cursorTrail.style.top = `${trailY}px`;
        }

        if (cursorTrailTwo) {
            cursorTrailTwo.style.left = `${trailTwoX}px`;
            cursorTrailTwo.style.top = `${trailTwoY}px`;
        }

        requestAnimationFrame(updateCursorTrail);
    }

    updateCursorTrail();
}

/* Cursor visibility */

document.addEventListener("mouseleave", function () {
    [cursorDot, cursorTrail, cursorTrailTwo].forEach(function (element) {
        if (element) element.style.opacity = "0";
    });
});

document.addEventListener("mouseenter", function () {
    if (!hasFinePointer) return;

    if (cursorDot) cursorDot.style.opacity = "1";
    if (cursorTrail) cursorTrail.style.opacity = "0.5";
    if (cursorTrailTwo) cursorTrailTwo.style.opacity = "0.22";
});

/* =========================================
   FOOTER YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".section, .easter-egg-section"
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {
    revealElements.forEach(function (element) {
        element.classList.add("reveal-ready");
    });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}

/* =========================================
   RIGHT-SIDE SCROLL INDICATOR
========================================= */

const scrollProgress = document.querySelector(
    ".scroll-indicator-progress"
);

let scrollTicking = false;

function updateScrollProgress() {
    if (!scrollProgress) return;

    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
        ? window.scrollY / scrollableHeight
        : 0;

    scrollProgress.style.height = `${progress * 100}%`;
    scrollTicking = false;
}

window.addEventListener("scroll", function () {
    if (!scrollTicking) {
        requestAnimationFrame(updateScrollProgress);
        scrollTicking = true;
    }
}, { passive: true });

window.addEventListener("resize", updateScrollProgress);
updateScrollProgress();

/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navigationLinks.forEach(function (item) {
            item.classList.remove("selected");
        });

        link.classList.add("selected");
    });
});

if ("IntersectionObserver" in window) {
    const observedSections = document.querySelectorAll(
        "main section[id]"
    );

    const sectionObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                const activeLink = document.querySelector(
                    `.nav-links a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    navigationLinks.forEach(function (link) {
                        link.classList.remove("selected");
                    });

                    activeLink.classList.add("selected");
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );

    observedSections.forEach(function (section) {
        sectionObserver.observe(section);
    });
}

/* =========================================
   PROJECT HOVER
========================================= */

const projects = document.querySelectorAll(".project");

projects.forEach(function (project) {
    project.addEventListener("mouseenter", function () {
        project.classList.add("project-hovered");
    });

    project.addEventListener("mouseleave", function () {
        project.classList.remove("project-hovered");
    });
});

/* =========================================
   EASTER EGG
========================================= */

const easterEggTrigger = document.getElementById("easterEggTrigger");
const easterEggMessage = document.getElementById("easterEggMessage");

if (easterEggTrigger && easterEggMessage) {
    easterEggTrigger.addEventListener("click", function () {
        const isExpanded =
            easterEggTrigger.getAttribute("aria-expanded") === "true";

        easterEggTrigger.setAttribute(
            "aria-expanded",
            String(!isExpanded)
        );

        easterEggMessage.hidden = isExpanded;

        if (!isExpanded) {
            easterEggMessage.classList.add("is-revealed");
        } else {
            easterEggMessage.classList.remove("is-revealed");
        }
    });
}

/* =========================================
   PREVENT PLACEHOLDER LINKS FROM JUMPING
========================================= */

document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
    });
});
