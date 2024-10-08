window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingContainer = document.getElementById('loading-container');loadingContainer.style.opacity = '0';
        loadingContainer.classList.add('hidden');
        const container = document.getElementById('container');
        container.classList.remove('hidden');
    }, 1500);
});

// Navbar ---------------------------------------------------
let selectedNav = document.getElementById("nav-home");
// let selectedNavMenu = document.getElementById("menu-home");

function selectNav(nav) {
    selectedNav.classList.remove('selected');
    nav.classList.add('selected');
    selectedNav = nav;
}

const sections = document.querySelectorAll('.section');

const observerNav = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.navbar li a[href="#${sectionId}"]`);

            // console.log(navLink.parentElement);
            selectNav(navLink.parentElement);
        }
    });
}, observerNav);

sections.forEach(section => {
    observer.observe(section);
});

let lastScrollTop = 0;
const navbar = document.querySelector('.nav-container');
const rocket = document.querySelector('.rocket');
const homeHeight = document.getElementById('home').offsetHeight;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop <= lastScrollTop) {
        // Scroll up
        navbar.classList.remove('hidden');
    } else {
        // Scroll down
        navbar.classList.add('hidden');
    }

    if (scrollTop > homeHeight) {
        rocket.classList.add('active');
    } else {
        rocket.classList.remove('active');
    }

    lastScrollTop = scrollTop;
});

// Toggle sidebar  -------------------------------------------
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');
const menuButton = document.querySelector('.menu-button');
function toggleSidebar() {
    menu.classList.toggle('active');
    menuIcon.classList.toggle('active');
    menuButton.classList.toggle('active');
}

document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target) && menu.classList.contains('active')) {
        toggleSidebar();
    }
});


// High five ------------------------------------------------
const button = document.querySelector(".high-five");
button.addEventListener("click", (e) => {
    e.preventDefault();
    button.classList.add("animate");
    setTimeout(() => {
        button.classList.remove("animate");
    }, 600);
});

//Loop slider -----------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const sliderItems = slider.querySelectorAll('.img-slider');
    const sliderNav = document.querySelectorAll('.slider-nav a');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    function updateActiveNav() {
        sliderNav.forEach(nav => nav.classList.remove('active'));
        sliderNav[currentIndex].classList.add('active');
    }

    function scrollToSlide(index) {
        slider.scrollTo({
            left: sliderItems[index].offsetLeft,
            behavior: 'smooth'
        });
    }

    function loopSlider() {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateActiveNav();
        scrollToSlide(currentIndex);
    }

    let autoSlide = setInterval(loopSlider, 3000);

    function resetInterval() {
        clearInterval(autoSlide);
        autoSlide = setInterval(loopSlider, 3000);
    }

    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        updateActiveNav();
        scrollToSlide(currentIndex);
        resetInterval();
    });

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateActiveNav();
        scrollToSlide(currentIndex);
        resetInterval();
    });

    sliderNav.forEach((nav, index) => {
        nav.addEventListener('click', function (e) {
            e.preventDefault();
            currentIndex = index;
            updateActiveNav();
            scrollToSlide(currentIndex);
            resetInterval();
        });
    });

    slider.addEventListener('mouseover', function() {
        clearInterval(autoSlide);
    });

    slider.addEventListener('mouseout', function() {
        autoSlide = setInterval(loopSlider, 3000);
    });

    updateActiveNav();
});

// Experience Tabs ------------------------------------------

const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.text');
const tabVisuals = document.querySelectorAll('.visual');

let selectedTab = tabs[0];
let selectedContent = tabContents[0];
let selectedVisual = tabVisuals[0];

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e)=>{
        e.preventDefault();
        selectedTab.classList.remove('active');
        tab.classList.add('active');
        selectedTab = tab;

        selectedContent.classList.remove('active');
        tabContents[index].classList.add('active');
        selectedContent = tabContents[index];

        selectedVisual.classList.remove('active');
        tabVisuals[index].classList.add('active');
        selectedVisual = tabVisuals[index];
    })
});
