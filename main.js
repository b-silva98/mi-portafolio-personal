// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll animation for sections
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

// Smooth scroll for navbar links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: "smooth",
    });
  });
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Mostrar estado de carga
    submitBtn.disabled = true;
    submitBtn.innerHTML =
      '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Enviando...';

    emailjs
      .sendForm("service_w7hbeod", "template_q6z9b0q", this)
      .then(
        function (response) {
          // Mostrar mensaje de éxito
          document.getElementById("success-message").classList.remove("d-none");
          document.getElementById("error-message").classList.add("d-none");

          // Resetear formulario
          document.getElementById("contact-form").reset();

          // Ocultar mensaje después de 5 segundos
          setTimeout(() => {
            document.getElementById("success-message").classList.add("d-none");
          }, 5000);
        },
        function (error) {
          // Mostrar mensaje de error
          document.getElementById("error-message").classList.remove("d-none");
          document.getElementById("success-message").classList.add("d-none");
          console.error("Error al enviar:", error);
        }
      )
      .finally(function () {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
  });
