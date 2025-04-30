// Dark Mode Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.classList.remove("fa-moon");
    themeToggle.classList.add("fa-sun");
    localStorage.setItem("theme", "dark");
  } else {
    themeToggle.classList.remove("fa-sun");
    themeToggle.classList.add("fa-moon");
    localStorage.setItem("theme", "light");
  }
});

// Check saved theme
if (
  localStorage.getItem("theme") === "dark" ||
  (!localStorage.getItem("theme") &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.body.classList.add("dark-mode");
  themeToggle.classList.remove("fa-moon");
  themeToggle.classList.add("fa-sun");
}

// WhatsApp buton işlevselliği
document.addEventListener("DOMContentLoaded", function () {
  const whatsAppButton = document.getElementById("whatsAppButton");
  let isDragging = false;
  let touchOffset = { x: 0, y: 0 };
  let wasDragged = false;

  // WhatsApp butonunun varsayılan sürükleme görselini engelle
  whatsAppButton.addEventListener("dragstart", function (e) {
    e.preventDefault();
  });

  // Fare olayları
  whatsAppButton.addEventListener("mousedown", (e) => {
    isDragging = true;
    wasDragged = false;
    touchOffset.x = e.clientX - whatsAppButton.getBoundingClientRect().left;
    touchOffset.y = e.clientY - whatsAppButton.getBoundingClientRect().top;
    whatsAppButton.style.transition = "none";
    whatsAppButton.style.boxShadow = "none"; // Bu satırı ekleyin
    e.preventDefault();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    wasDragged = true; // Sürükleme gerçekleştiğini işaretle

    const x = e.clientX - touchOffset.x;
    const y = e.clientY - touchOffset.y;

    // Butonu görüntü alanı içinde tut
    const buttonWidth = whatsAppButton.offsetWidth;
    const buttonHeight = whatsAppButton.offsetHeight;
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const constrainedX = Math.max(0, Math.min(x, maxX));
    const constrainedY = Math.max(0, Math.min(y, maxY));

    whatsAppButton.style.left = `${constrainedX}px`;
    whatsAppButton.style.top = `${constrainedY}px`;
    whatsAppButton.style.right = "auto";
    whatsAppButton.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      whatsAppButton.style.transition = "transform 0.2s, box-shadow 0.2s";
      setTimeout(() => {
        wasDragged = false;
      }, 10);
    }
  });

  // Mobil için dokunma olayları
  whatsAppButton.addEventListener("touchstart", (e) => {
    isDragging = true;
    wasDragged = false;
    const touch = e.touches[0];
    touchOffset.x = touch.clientX - whatsAppButton.getBoundingClientRect().left;
    touchOffset.y = touch.clientY - whatsAppButton.getBoundingClientRect().top;
    whatsAppButton.style.transition = "none";
    whatsAppButton.style.boxShadow = "none"; // Bu satırı ekleyin
  });

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Sürükleme sırasında kaydırmayı engelle

      wasDragged = true; // Sürükleme gerçekleştiğini işaretle

      const touch = e.touches[0];
      const x = touch.clientX - touchOffset.x;
      const y = touch.clientY - touchOffset.y;

      // Butonu görüntü alanı içinde tut
      const buttonWidth = whatsAppButton.offsetWidth;
      const buttonHeight = whatsAppButton.offsetHeight;
      const maxX = window.innerWidth - buttonWidth;
      const maxY = window.innerHeight - buttonHeight;

      const constrainedX = Math.max(0, Math.min(x, maxX));
      const constrainedY = Math.max(0, Math.min(y, maxY));

      whatsAppButton.style.left = `${constrainedX}px`;
      whatsAppButton.style.top = `${constrainedY}px`;
      whatsAppButton.style.right = "auto";
      whatsAppButton.style.bottom = "auto";
    },
    { passive: false }
  );

  document.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      whatsAppButton.style.transition = "transform 0.2s, box-shadow 0.2s";
      setTimeout(() => {
        wasDragged = false;
      }, 10);
    }
  });

  // WhatsApp butonuna tıklama işlevi
  whatsAppButton.addEventListener("click", function (e) {
    // 1. Eğer son mouseup ile click arasında çok az zaman geçtiyse ve sürükleme olduysa, tıklamayı engelle
    if (wasDragged || Date.now() - lastMouseUp < 50) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 2. Gerçek bir tıklama olduğunu düşünüyoruz, WhatsApp'a yönlendir
    const phoneNumber = "905352549734";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Merhaba, hukuki danışmanlık almak istiyorum.`;
    window.open(whatsappUrl, "_blank");
  });
});

// Ana sayfa linkinin davranışını düzenle
document.addEventListener("DOMContentLoaded", function () {
  // Ana sayfa linkini seç (Home ikonu)
  const homeLink = document.querySelector(".main-menu li:first-child a");

  // Ana sayfa linkine tıklama işlevi ekle
  homeLink.addEventListener("click", function (e) {
    e.preventDefault(); // Varsayılan link davranışını engelle

    // Sayfanın en üstüne yavaşça kaydır
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Dark Mode Toggle
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.classList.remove("fa-moon");
      themeToggle.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.classList.remove("fa-sun");
      themeToggle.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // Check saved theme
  if (
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-mode");
    themeToggle.classList.remove("fa-moon");
    themeToggle.classList.add("fa-sun");
  }

  // Draggable WhatsApp Button
  const whatsAppButton = document.getElementById("whatsAppButton");
  let isDragging = false;
  let touchOffset = { x: 0, y: 0 };
  let wasDragged = false;
  let lastMouseUp = 0; // Yeni değişken: son mouseup zamanı

  // Handle mouse events
  whatsAppButton.addEventListener("mousedown", (e) => {
    isDragging = true;
    wasDragged = false; // Sürüklemeyi başlangıçta false olarak ayarla
    touchOffset.x = e.clientX - whatsAppButton.getBoundingClientRect().left;
    touchOffset.y = e.clientY - whatsAppButton.getBoundingClientRect().top;
    whatsAppButton.style.transition = "none";
    e.preventDefault(); // Metin seçimini engelle
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    wasDragged = true;

    const x = e.clientX - touchOffset.x;
    const y = e.clientY - touchOffset.y;

    // Ekranın içinde tut
    const buttonWidth = whatsAppButton.offsetWidth;
    const buttonHeight = whatsAppButton.offsetHeight;
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const constrainedX = Math.max(0, Math.min(x, maxX));
    const constrainedY = Math.max(0, Math.min(y, maxY));

    whatsAppButton.style.left = `${constrainedX}px`;
    whatsAppButton.style.top = `${constrainedY}px`;
    whatsAppButton.style.right = "auto";
    whatsAppButton.style.bottom = "auto";
    whatsAppButton.style.backgroundColor = "#25d366"; // Bu satırı ekleyin
    whatsAppButton.style.boxShadow = "none"; // Bu satırı ekleyin
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      whatsAppButton.style.transition = "transform 0.2s, box-shadow 0.2s";
      lastMouseUp = Date.now(); // Son bırakma zamanını kaydet
    }
  });

  // Handle touch events for mobile
  whatsAppButton.addEventListener("touchstart", (e) => {
    isDragging = true;
    wasDragged = false; // Reset dragging flag
    const touch = e.touches[0];
    touchOffset.x = touch.clientX - whatsAppButton.getBoundingClientRect().left;
    touchOffset.y = touch.clientY - whatsAppButton.getBoundingClientRect().top;
    whatsAppButton.style.transition = "none";
  });

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scrolling while dragging

      wasDragged = true; // Set flag when dragging occurs

      const touch = e.touches[0];
      const x = touch.clientX - touchOffset.x;
      const y = touch.clientY - touchOffset.y;

      // Keep button within viewport
      const buttonWidth = whatsAppButton.offsetWidth;
      const buttonHeight = whatsAppButton.offsetHeight;
      const maxX = window.innerWidth - buttonWidth;
      const maxY = window.innerHeight - buttonHeight;

      const constrainedX = Math.max(0, Math.min(x, maxX));
      const constrainedY = Math.max(0, Math.min(y, maxY));

      whatsAppButton.style.left = `${constrainedX}px`;
      whatsAppButton.style.top = `${constrainedY}px`;
      whatsAppButton.style.right = "auto";
      whatsAppButton.style.bottom = "auto";
    },
    { passive: false }
  );

  document.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      whatsAppButton.style.transition = "transform 0.2s, box-shadow 0.2s";
    }
  });

  // WhatsApp butonuna tıklama işlevi
  whatsAppButton.addEventListener("click", function () {
    if (!wasDragged) {
      // Sadece sürüklenmediğinde çalışır
      const phoneNumber = "905352549734"; // Burayı avukat numarasına göre değiştirin (90 + numara)
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=Merhaba, hukuki danışmanlık almak istiyorum.`;
      window.open(whatsappUrl, "_blank");
    }
    wasDragged = false; // Her tıklamadan sonra sıfırla
  });

  // Smooth scroll for other anchor links (except home)
  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: "smooth",
          });
        }
      });
    });

  // Add page load time to improve SEO metrics
  setTimeout(function () {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    console.log("Page load time:", pageLoadTime + "ms");
  }, 0);
});

// Ana sayfa linkinin davranışını düzenle ve logo tıklaması için yönlendirme ekle
document.addEventListener("DOMContentLoaded", function () {
  // Ana sayfa linkini seç (Home ikonu)
  const homeLink = document.querySelector(".main-menu li:first-child a");

  // Ana sayfa linkine tıklama işlevi ekle
  homeLink.addEventListener("click", function (e) {
    e.preventDefault(); // Varsayılan link davranışını engelle

    // Sayfanın en üstüne yavaşça kaydır
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Logo tıklamasını site11.html'e yönlendirmek için
  const logoDiv = document.querySelector(".logo");

  // Logo div'ine tıklama işlevi ekle
  logoDiv.addEventListener("click", function () {
    window.location.href = "site11.html";
  });

  // Logo'ya cursor:pointer ekle (tıklanabilir göstermek için)
  logoDiv.style.cursor = "pointer";

  // Dark Mode Toggle
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      themeToggle.classList.remove("fa-moon");
      themeToggle.classList.add("fa-sun");
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.classList.remove("fa-sun");
      themeToggle.classList.add("fa-moon");
      localStorage.setItem("theme", "light");
    }
  });

  // Check saved theme
  if (
    localStorage.getItem("theme") === "dark" ||
    (!localStorage.getItem("theme") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.body.classList.add("dark-mode");
    themeToggle.classList.remove("fa-moon");
    themeToggle.classList.add("fa-sun");
  }

  // Draggable WhatsApp Button
  const whatsAppButton = document.getElementById("whatsAppButton");
  let isDragging = false;
  let touchOffset = { x: 0, y: 0 };
  let wasDragged = false;

  // Handle mouse events
  whatsAppButton.addEventListener("mousedown", (e) => {
    isDragging = true;
    wasDragged = false;
    touchOffset.x = e.clientX - whatsAppButton.getBoundingClientRect().left;
    touchOffset.y = e.clientY - whatsAppButton.getBoundingClientRect().top;
    whatsAppButton.style.transition = "none";
    e.preventDefault(); // Prevent text selection
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    wasDragged = true;

    const x = e.clientX - touchOffset.x;
    const y = e.clientY - touchOffset.y;

    // Keep button within viewport
    const buttonWidth = whatsAppButton.offsetWidth;
    const buttonHeight = whatsAppButton.offsetHeight;
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const constrainedX = Math.max(0, Math.min(x, maxX));
    const constrainedY = Math.max(0, Math.min(y, maxY));

    whatsAppButton.style.left = `${constrainedX}px`;
    whatsAppButton.style.top = `${constrainedY}px`;
    whatsAppButton.style.right = "auto";
    whatsAppButton.style.bottom = "auto";
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      whatsAppButton.style.transition = "transform 0.2s, box-shadow 0.2s";
    }
  });

  // Handle touch events for mobile
  whatsAppButton.addEventListener("touchstart", (e) => {
    isDragging = true;
    wasDragged = false;
    const touch = e.touches[0];
    touchOffset.x = touch.clientX - whatsAppButton.getBoundingClientRect().left;
    touchOffset.y = touch.clientY - whatsAppButton.getBoundingClientRect().top;
    whatsAppButton.style.transition = "none";
  });

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent scrolling while dragging

      wasDragged = true;

      const touch = e.touches[0];
      const x = touch.clientX - touchOffset.x;
      const y = touch.clientY - touchOffset.y;

      // Keep button within viewport
      const buttonWidth = whatsAppButton.offsetWidth;
      const buttonHeight = whatsAppButton.offsetHeight;
      const maxX = window.innerWidth - buttonWidth;
      const maxY = window.innerHeight - buttonHeight;

      const constrainedX = Math.max(0, Math.min(x, maxX));
      const constrainedY = Math.max(0, Math.min(y, maxY));

      whatsAppButton.style.left = `${constrainedX}px`;
      whatsAppButton.style.top = `${constrainedY}px`;
      whatsAppButton.style.right = "auto";
      whatsAppButton.style.bottom = "auto";
    },
    { passive: false }
  );

  document.addEventListener("touchend", () => {
    if (isDragging) {
      isDragging = false;
      whatsAppButton.style.transition = "transform 0.2s, box-shadow 0.2s";
    }
  });

  // WhatsApp butonuna tıklama işlevi
  whatsAppButton.addEventListener("click", function () {
    if (!wasDragged) {
      // Sadece sürüklenmediğinde WhatsApp'a yönlendir
      const phoneNumber = "905352549734";
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=Merhaba, hukuki danışmanlık almak istiyorum.`;
      window.open(whatsappUrl, "_blank");
    }
    wasDragged = false; // Her tıklamadan sonra sıfırla
  });

  // Smooth scroll for other anchor links (except home)
  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: "smooth",
          });
        }
      });
    });

  // Add page load time to improve SEO metrics
  setTimeout(function () {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    console.log("Page load time:", pageLoadTime + "ms");
  }, 0);
});

document.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;
    e.preventDefault();

    wasDragged = true;

    const touch = e.touches[0];
    const x = touch.clientX - touchOffset.x;
    const y = touch.clientY - touchOffset.y;

    // Ekranda tut
    const buttonWidth = whatsAppButton.offsetWidth;
    const buttonHeight = whatsAppButton.offsetHeight;
    const maxX = window.innerWidth - buttonWidth;
    const maxY = window.innerHeight - buttonHeight;

    const constrainedX = Math.max(0, Math.min(x, maxX));
    const constrainedY = Math.max(0, Math.min(y, maxY));

    whatsAppButton.style.left = `${constrainedX}px`;
    whatsAppButton.style.top = `${constrainedY}px`;
    whatsAppButton.style.right = "auto";
    whatsAppButton.style.bottom = "auto";
  },
  { passive: false }
);

document.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    whatsAppButton.style.transition = "transform 0.2s, box-shadow 0.2s";
    lastMouseUp = Date.now(); // Son bırakma zamanını kaydet
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: "smooth",
      });
    }
  });
});

// Add page load time to improve SEO metrics
window.addEventListener("load", function () {
  setTimeout(function () {
    const timing = window.performance.timing;
    const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
    console.log("Page load time:", pageLoadTime + "ms");
  }, 0);
});
document.addEventListener("DOMContentLoaded", function () {
  const whatsAppButton = document.getElementById("whatsAppButton");

  // Engellemek istediğin tüm olaylar
  const eventsToBlock = [
    "mousemove",
    "mouseup",
    "touchstart",
    "touchmove",
    "touchend",
    "mousedown",
    "dragstart",
    "selectstart",
  ];

  eventsToBlock.forEach((eventName) => {
    whatsAppButton.addEventListener(eventName, function (e) {
      e.preventDefault();
    });
  });
});
