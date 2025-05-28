const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const cards = document.querySelectorAll(".skill-card");
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("visible");
                }, index * 300);
            });
        }
        else {
            // Optional: remove animation when section goes out of view
            const cards = document.querySelectorAll(".skill-card");
            cards.forEach((card) => {
                card.classList.remove("visible");
            });
        }
    });
}, {
    threshold: 0.3 // Trigger when 30% of the section is visible
});

// Start observing the whole section
const skillsSection = document.querySelector(".skills-section");
if (skillsSection) {
    observer.observe(skillsSection);
}

const projectCards = document.querySelectorAll(".project-card");
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("visible");
                }, index * 150);
            });
        } else {
            projectCards.forEach((card) => {
                card.classList.remove("visible");
            });
        }
    });
}, {
    threshold: 0.3
});

const projectsSection = document.querySelector(".projects-section");
if (projectsSection) {
    projectObserver.observe(projectsSection);
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const responseMsg = document.getElementById("form-response");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = form.querySelector('input[name="name"]').value.trim();
        const email = form.querySelector('input[name="email"]').value.trim();
        const message = form.querySelector('textarea[name="message"]').value.trim();        
        if (!name || !email || !message) {
            responseMsg.textContent = "Please fill out all fields.";
            responseMsg.style.color = "red";
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            responseMsg.textContent = "Please enter a valid email address.";
            responseMsg.style.color = "red";
            return;
        }
        const data = new FormData(form);
        fetch("https://formspree.io/f/mnndevoz", {
            method: "POST",
            body: data,
            headers:
            {
                Accept: "application/json"
            },
        }).then((response) => {
            if (response.ok) {
                responseMsg.textContent = "Message Sent Successfully !";
                responseMsg.style.color = "green";
                form.reset();
            }
            else {
                return response.json.then((data) => {
                    throw new error(data.error || "Something went wrong");
                });
            }
        }).catch((error) => {
            esponseMsg.textContent = `❌ ${error.message}`;
            responseMsg.style.color = "red";
        });
    });
});
 
 
const experienceCards = document.querySelectorAll('.experience');

function revealExperience() {
  const triggerBottom = window.innerHeight * 0.85;
  experienceCards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < triggerBottom) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealExperience);
revealExperience();

 