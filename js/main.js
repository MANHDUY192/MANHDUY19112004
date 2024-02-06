/*-----------------------------------------------------------------
    Sticky sidebar
  -------------------------------------------------------------------*/

const $sidebar = document.querySelector("#sidebar");

if (window.innerWidth > 992) {
  $sidebar.classList.add("sticky-column");
}

// resize window
window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    $sidebar.classList.add("sticky-column");
  } else {
    $sidebar.classList.remove("sticky-column");
  }
});

/*-----------------------------------------------------------------
    Progress bar
  -------------------------------------------------------------------*/

const $progressBar = document.querySelectorAll(".progress-bar");

$progressBar.forEach((progressBar) => {
  let value = progressBar.getAttribute("data-value");
  progressBar.style.width = value + "%";
});

/*-----------------------------------------------------------------
    Back to top
  -------------------------------------------------------------------*/

const $backToTop = document.querySelector(".back-to-top");

if ($backToTop) {
  $backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      $backToTop.style.display = "block";
    } else {
      $backToTop.style.display = "none";
    }
  });
}

/*-----------------------------------------------------------------
  Tabs
  -------------------------------------------------------------------*/

const $tabs = document.querySelectorAll(".js-tabs");

$tabs.forEach((tab) => {
  const $tabContent = document.querySelectorAll(".content .tabcontent");

  $tabContent.forEach((content) => {
    content.style.display = "none";
  });

  // show first tab
  $tabContent[0].style.display = "block";

  const $navItem = document.querySelectorAll(".nav__item a");

  $navItem.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      // remove class active on $navItem
      $navItem.forEach((item) => {
        item.classList.remove("active");
      });

      // add class active on $navItem
      item.classList.add("active");

      const currentTab = item.getAttribute("href");

      // show current tab
      $tabContent.forEach((content) => {
        content.style.display = "none";
      });

      document.querySelector(currentTab).style.display = "block";

      // scroll to content
      let offset = -35;
      window.scrollTo({
        top: document.querySelector("#content").offsetTop + offset,
        behavior: "smooth",
      });

      // change hash
      window.location.hash = currentTab;
    });
  });
});

// on load page check hash
if (window.location.hash) {
  let hash = window.location.hash;
  document.querySelector(".nav__item a[href='" + hash + "']").click();
}

/*-----------------------------------------------------------------
  Contact form
  -------------------------------------------------------------------*/

const $contactForm = document.querySelector("#contact-form");

if ($contactForm) {
  $contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = [];

    const addError = (el, msg) => {
      el.classList.add("is-invalid");
      el.nextElementSibling.textContent = msg;
    };

    // remove all error
    $contactForm.querySelectorAll(".is-invalid").forEach((el) => {
      el.classList.remove("is-invalid");
    });

    $contactForm.querySelectorAll(".help-block").forEach((el) => {
      el.textContent = "";
    });

    // check name
    const $name = $contactForm.querySelector('input[name="name"]');
    const nameVal = $name.value.trim();

    if (nameVal == "") {
      addError($name, "Please enter your name.");
      errors.push("name");
    } else {
      $name.classList.remove("is-invalid");
    }

    // check email
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const $email = $contactForm.querySelector('input[name="email"]');
    const emailVal = $email.value.trim();

    if (emailVal == "") {
      addError($email, "Please enter your email address.");
      errors.push("email");
    } else if (!emailReg.test(emailVal)) {
      addError($email, "Please enter a valid email address.");
      errors.push("email");
    } else {
      $email.classList.remove("is-invalid");
    }

    // check subject
    const $subject = $contactForm.querySelector('input[name="subject"]');
    const subjectVal = $subject.value.trim();

    if (subjectVal == "") {
      addError($subject, "Please enter your subject.");
      errors.push("subject");
    } else {
      $subject.classList.remove("is-invalid");
    }

    // check message
    const $message = $contactForm.querySelector('textarea[name="message"]');
    const messageVal = $message.value.trim();

    if (messageVal == "") {
      addError($message, "Please enter your message.");
      errors.push("message");
    } else {
      $message.classList.remove("is-invalid");
    }

    if (errors.length) {
      $contactForm.querySelector(".is-invalid").focus();
      return;
    }

    // add text success to #success and remove it after 3s
    const $success = document.querySelector("#success");
    $success.textContent = "Your message has been sent. Thank you!";
    $success.style.display = "block";

    // empty form
    $contactForm.reset();

    setTimeout(() => {
      $success.style.display = "none";
    }, 3000);
  });
}

/*-----------------------------------------------------------------
  Portfolio
  -------------------------------------------------------------------*/
const $portfolioFilters = document.querySelectorAll(".filter__item");

$portfolioFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    // remove class active on $portfolioFilters
    $portfolioFilters.forEach((filter) => {
      filter.classList.remove("active");
    });

    // add class active on $portfolioFilters
    filter.classList.add("active");

    const selector = filter.getAttribute("data-filter");

    // show all .portfolio-item and hide .portfolio-item with selector
    const $portfolioItem = document.querySelectorAll(".gallery-grid-item");

    $portfolioItem.forEach((item) => {
      item.style.display = "none";

      if (selector == "*") {
        item.style.display = "block";
      } else {
        item.style.display = "none";

        if (item.classList.contains(selector)) {
          item.style.display = "block";
        }
      }
    });
  });
});

/*-----------------------------------------------------------------
  Testimonial slider
  -------------------------------------------------------------------*/
// testimonial slider
const $testimonialItem = document.querySelectorAll(".swiper-slide");

// generate carousel indicators
const $dots = document.querySelector(".dots");
const itemCount = $testimonialItem.length;

for (let i = 0; i < itemCount; i++) {
  const $dot = document.createElement("li");
  $dot.setAttribute("data-slide-to", i);
  $dot.classList.add("dot");

  $dots.appendChild($dot);
}

// active first dot
$dots.firstElementChild.classList.add("active");

// add event click on $dots
const $dot = document.querySelectorAll(".dot");

const changeSlide = (index) => {
  // remove class active on $dot
  $dot.forEach((dot) => {
    dot.classList.remove("active");
  });

  // add class active on $dot
  $dot[index].classList.add("active");

  // remove class active on $testimonialItem
  $testimonialItem.forEach((item) => {
    item.classList.remove("active");
  });

  // add class active on $testimonialItem
  $testimonialItem[index].classList.add("active");
};

$dot.forEach((dot) => {
  dot.addEventListener("click", () => {
    const index = dot.getAttribute("data-slide-to");

    changeSlide(index);
  });
});

// auto slide
setInterval(() => {
  let index = document
    .querySelector(".dot.active")
    .getAttribute("data-slide-to");

  index++;

  if (index >= itemCount) {
    index = 0;
  }

  changeSlide(index);
}, 3000);
