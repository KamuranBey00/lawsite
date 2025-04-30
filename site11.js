const slides = document.querySelectorAll(".slide");
const prevButton = document.getElementById("prev-slide");
const nextButton = document.getElementById("next-slide");
const indicators = document.querySelectorAll(".indicator");
let currentSlideIndex = 0;
let slideshowInterval;

function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  indicators.forEach((indicator) => indicator.classList.remove("active"));

  currentSlideIndex = (index + slides.length) % slides.length;
  slides[currentSlideIndex].classList.add("active");
  indicators[currentSlideIndex].classList.add("active");
}

function nextSlide() {
  showSlide(currentSlideIndex + 1);
}

function prevSlide() {
  showSlide(currentSlideIndex - 1);
}

function startSlideshow() {
  slideshowInterval = setInterval(nextSlide, 7000);
}

function resetInterval() {
  clearInterval(slideshowInterval);
  startSlideshow();
}

function handleVisibilityChange() {
  if (document.hidden) {
    clearInterval(slideshowInterval);
  } else {
    startSlideshow();
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange);

prevButton.addEventListener("click", () => {
  prevSlide();
  resetInterval();
});

nextButton.addEventListener("click", () => {
  nextSlide();
  resetInterval();
});

indicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    const slideIndex = parseInt(indicator.getAttribute("data-index"));
    showSlide(slideIndex);
    resetInterval();
  });
});

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

function toggleTheme() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  }
}

function checkThemePreference() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  checkThemePreference();
  themeToggle.addEventListener("click", toggleTheme);
  startSlideshow();

  const expertiseItems = document.querySelectorAll(".expertise-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  expertiseItems.forEach((item) => {
    observer.observe(item);
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Sayfanın üst kısmından hedef elemana olan uzaklığı hesapla
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;

        // Header yüksekliğini hesaba katarak yumuşak kaydırma yap
        window.scrollTo({
          top: targetPosition - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });

  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      const isActive = question.classList.contains("active");

      document.querySelectorAll(".faq-question").forEach((q) => {
        q.classList.remove("active");
        q.nextElementSibling.classList.remove("active");
      });

      if (!isActive) {
        question.classList.add("active");
        answer.classList.add("active");
      }
    });
  });
});

window.addEventListener("resize", function () {});

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (!img.complete) {
      img.setAttribute("loading", "lazy");
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".expertise-item").forEach((item) => {
    observer.observe(item);
  });

  window.addEventListener("load", function () {
    const loadTime =
      window.performance.timing.domContentLoadedEventEnd -
      window.performance.timing.navigationStart;
    console.log("Sayfa yükleme süresi:", loadTime, "ms");
  });
});

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-XXXXXXXXXX"); // Google Analytics ID'nizi buraya ekleyin

document.addEventListener("DOMContentLoaded", function () {
  const whatsappButton = document.getElementById("whatsapp-button");
  let isDragging = false;
  let offsetX, offsetY, initialX, initialY;
  let wasDragged = false;

  // Touch events
  whatsappButton.addEventListener("touchstart", dragStart, {
    passive: false,
  });
  document.addEventListener("touchend", dragEnd, { passive: false });
  document.addEventListener("touchmove", drag, { passive: false });

  // Mouse events
  whatsappButton.addEventListener("mousedown", dragStart);
  document.addEventListener("mouseup", dragEnd);
  document.addEventListener("mousemove", drag);

  // Whatsapp Redirect on Click
  whatsappButton.addEventListener("click", function (e) {
    if (!wasDragged) {
      // Telefon numarası (başında ülke kodu ile)
      const phoneNumber = "905352549734"; // Burayı avukat numarasına göre değiştirin (90 + numara)
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=Merhaba, hukuki danışmanlık almak istiyorum.`;
      window.open(whatsappUrl, "_blank");
    }
    wasDragged = false;
  });

  function dragStart(e) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
      offsetX = whatsappButton.getBoundingClientRect().left;
      offsetY = whatsappButton.getBoundingClientRect().top;
    } else {
      initialX = e.clientX;
      initialY = e.clientY;
      offsetX = whatsappButton.getBoundingClientRect().left;
      offsetY = whatsappButton.getBoundingClientRect().top;
    }

    isDragging = true;

    e.preventDefault();
  }

  function drag(e) {
    if (!isDragging) return;

    e.preventDefault();

    let clientX, clientY;

    if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const dx = clientX - initialX;
    const dy = clientY - initialY;

    const newX = offsetX + dx;
    const newY = offsetY + dy;

    // Ekran sınırlarını kontrol et
    const buttonRect = whatsappButton.getBoundingClientRect();
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    if (newX >= 0 && newX + buttonRect.width <= windowWidth) {
      whatsappButton.style.right = "auto";
      whatsappButton.style.left = newX + "px";
    }

    if (newY >= 0 && newY + buttonRect.height <= windowHeight) {
      whatsappButton.style.bottom = "auto";
      whatsappButton.style.top = newY + "px";
    }

    wasDragged = true;
  }

  function dragEnd(e) {
    isDragging = false;

    // 3 saniyelik bir gecikmeyle wasDragged değerini sıfırla
    // Böylece kullanıcı sürükleme işlemi bittikten sonra butona tıklayabilir
    setTimeout(() => {
      wasDragged = false;
    }, 100);
  }

  // Pencere boyutu değiştiğinde butonu ekran sınırları içinde tut
  window.addEventListener("resize", function () {
    const buttonRect = whatsappButton.getBoundingClientRect();
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    // Sağ taraftan taşıyorsa
    if (buttonRect.right > windowWidth) {
      whatsappButton.style.left = windowWidth - buttonRect.width + "px";
    }

    // Alt taraftan taşıyorsa
    if (buttonRect.bottom > windowHeight) {
      whatsappButton.style.top = windowHeight - buttonRect.height + "px";
    }
  });
});
