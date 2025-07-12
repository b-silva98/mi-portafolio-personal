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

// Consumir JSON de HABILIDADES
fetch("habilidades.json")
  .then((respuesta) => respuesta.json())
  .then((habilidades) => {
    const contenedor = document.getElementById("habilidades-container");

    habilidades.forEach((hab) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "col-6 col-md-3 mb-4";

      tarjeta.innerHTML = `
        <div class="p-4 bg-white rounded shadow">
          <i class="${hab.icono} fa-3x mb-3 ${hab.color}"></i>
          <h5>${hab.nombre}</h5>
          <div class="progress mt-2">
            <div
              class="progress-bar ${hab.color}"
              role="progressbar"
              style="width: ${hab.porcentaje}%; ${hab.estilo || ""}"
              aria-valuenow="${hab.porcentaje}"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      `;

      contenedor.appendChild(tarjeta);
    });
  })
  .catch((error) => {
    console.error("Error al cargar habilidades:", error);
  });

// Consumir JSON de proyectos
fetch("proyectos.json")
  .then((res) => res.json())
  .then((proyectos) => {
    const contenedor = document.getElementById("proyectos-container");

    proyectos.forEach((proy) => {
      const tarjeta = document.createElement("div");
      tarjeta.className = "col-md-4 mb-4";

      let badgesHTML = "";
      proy.tecnologias.forEach((tec, i) => {
        badgesHTML += `<span class="badge ${proy.colores[i]} me-1">${tec}</span>`;
      });

      tarjeta.innerHTML = `
          <div class="card h-100">
            <img
              src="${proy.imagen}"
              class="card-img-top"
              alt="${proy.alt}"
            />
            <div class="card-body">
              <h5 class="card-title">${proy.titulo}</h5>
              <p class="card-text">${proy.descripcion}</p>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <div class="badges">
                  ${badgesHTML}
                </div>
              </div>
              <a href="${proy.repositorio}" target="_blank" class="btn btn-sm btn-outline-dark w-100">
                Ver repositorio <i class="fab fa-gitlab ms-1"></i>
              </a>
            </div>
          </div>
        `;

      contenedor.appendChild(tarjeta);
    });
  })
  .catch((error) => console.error("Error al cargar proyectos:", error));

// Consumir JSON de educacion

fetch("educacion.json")
  .then((res) => res.json())
  .then((educaciones) => {
    const contenedor = document.getElementById("educacion-container");

    educaciones.forEach((edu) => {
      const item = document.createElement("div");
      item.className = "mb-4";

      item.innerHTML = `
        <h5>${edu.titulo}</h5>
        <p class="mb-0"><strong>${edu.institucion}</strong></p>
        <small class="text-muted">${edu.periodo}</small>
        <p class="mt-2">${edu.descripcion}</p>
      `;

      contenedor.appendChild(item);
    });
  })
  .catch((error) => console.error("Error al cargar educación:", error));
