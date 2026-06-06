
// ================= NAVBAR SCROLL =================

// const header = document.getElementById('header');

// window.addEventListener('scroll', () => {

//     if (window.scrollY > 80) {
//         header.classList.add('scrolled');
//     } else {
//         header.classList.remove('scrolled');
//     }

// });

/* ================= SMART NAVBAR ================= */

const header = document.getElementById("header");

let lastScroll = 0;

window.addEventListener("scroll", () => {

    const currentScroll = window.pageYOffset;

    /* add glass effect */

    if (currentScroll > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

    /* hide when scrolling down */

    if (currentScroll > lastScroll && currentScroll > 120) {

        header.classList.add("hide-nav");

    }

    /* show when scrolling up */

    else {

        header.classList.remove("hide-nav");

    }

    lastScroll = currentScroll;

});

// ================= HERO SLIDESHOW =================
document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slides.length) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }

    // Start automatic slideshow (change every 5 seconds)
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopSlideshow();
            showSlide(index);
            startSlideshow();
        });
    });

    // Pause slideshow on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);

    // Start the slideshow
    startSlideshow();
});

const staffSwiper = new Swiper(".staffSwiper", {

    loop: true,

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    speed: 1000,

    spaceBetween: 25,

    slidesPerView: 4,

    breakpoints: {

        0: {
            slidesPerView: 1,
        },

        768: {
            slidesPerView: 2,
        },

        1024: {
            slidesPerView: 4,
        }
    }

});

const historySwiper = new Swiper(".historySwiper", {

    slidesPerView: 1,

    spaceBetween: 30,

    loop: true,

    navigation: {
        nextEl: ".history-nav.next",
        prevEl: ".history-nav.prev",
    },

    breakpoints: {

        768: {
            slidesPerView: 2,
        },

        1200: {
            slidesPerView: 4,
        }
    }
});

// ================= MOBILE MENU =================

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {

    navMenu.classList.toggle('active');

});


// ================= SCROLL ANIMATION =================

const reveals = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
);

const revealOnScroll = () => {

    reveals.forEach((element) => {

        const windowHeight = window.innerHeight;
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            element.classList.add('reveal-active');
        }

    });

};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


// ================= ACTIVE NAV LINK =================

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {

    let current = '';

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }

    });

    navLinks.forEach(link => {

        link.classList.remove('active');

        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }

    });

});


// ================= CLOSE MOBILE MENU =================

navLinks.forEach(link => {

    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });

});

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    setTimeout(() => {

        preloader.classList.add("hide");

    }, 5000);

});

// ================= LANGUAGE SWITCHER =================

/* ================= LANGUAGE SWITCHER ================= */

const translations = {

    en: {
        home: "Home",
        about: "About",
        history: "History",
        achievements: "Achievements",
        events: "Events",
        gallery: "Gallery",
        contact: "Contact",

        welcome: "WELCOME TO",
        heroTitle: "Polegoda Maha Vidyalaya",
        heroSubtitle: "A Century of Excellence, Leadership & Knowledge",

        exploreBtn: "Explore School",
        contactBtn: "Contact Us",

        yearsLegacy: "Years Legacy",
        students: "Students",
        teachers: "Teachers",

        sectionTag: "ABOUT OUR SCHOOL",
        sectionTitle: "Building Future Leaders",
        sectionHighlight: "Since 1926",
        sectionSubtitle : "For nearly a century, Polegoda Maha Vidyalaya has nurtured generations of students through knowledge, discipline, values, and excellence.",
        visionTag: "OUR VISION",
        visionTitle: "Vision",
        visionQuote: "A quality child through good management.",
        missionTag: "OUR MISSION",
        missionTitle: "Mission",
        missionQuote: "It is our mission to raise a noble generation of children who are disciplined, knowledgeable, and socially responsible.",

        principalTag: "Principal Message",
        principalTitle: "Message from the ",
        principalHighlight: "Principal",
        principalMessage1 : "We are committed to creating a learning environment where every student can discover their talents, build confidence, and achieve academic excellence.",
        principalMessage2 : "Our school continues to inspire generations through discipline, innovation, leadership, and values that prepare students for a successful future.",
        principalName: "Mrs. W.D. Duleeka M. Premathilaka",
        principalRole: "PRINCIPAL",
        principalQuote: "Education is the most powerful weapon which you can use to change the world.",
        principalQuoteAuthor: "– Nelson Mandela",
        principalValues1: "Student Centred",
        principalValues2: "Values & Discipline",
        principalValues3: "Innovation & Excellence",
        principalValues4: "Leadership",

        historyTag: "Our History",
        historyTitle: "A Proud Journey Through Time",

        achievementTag: "Achievements",
        achievementTitle: "Our Success Stories",

        eventTag: "Upcoming Events",
        eventTitle: "Latest School Events",

        galleryTag: "Gallery",
        galleryTitle: "School Memories",

        contactTag: "Contact Us",
        contactTitle: "Get In Touch",

        sendMessage: "Send Message",

        namePlaceholder: "Your Name",
        emailPlaceholder: "Your Email",
        messagePlaceholder: "Your Message"
    },

    si: {
        home: "මුල් පිටුව",
        about: "අප ගැන",
        history: "ඉතිහාසය",
        achievements: "ජයග්‍රහණ",
        events: "වැඩසටහන්",
        gallery: "ගැලරිය",
        contact: "සම්බන්ධ වන්න",

        welcome: "සාදරයෙන් පිළිගනිමු",
        heroTitle: "පොලේගොඩ මහා විද්‍යාලය",
        heroSubtitle: "ශතවර්ෂයක විශිෂ්ටත්වය, නායකත්වය සහ දැනුම",

        exploreBtn: "පාසල බලන්න",
        contactBtn: "අප අමතන්න",

        yearsLegacy: "වසරක උරුමය",
        students: "සිසුන්",
        teachers: "ගුරුවරුන්",

        sectionTag: "අපගේ පාසල ගැන",
        sectionTitle: "1926 සිට අනාගත නායකයින්",
        sectionHighlight: "බිහිකිරීම",
        sectionSubtitle: "ශතවර්ෂයකට ආසන්න කාලයක් පුරා පොලේගොඩ මහා විද්‍යාලය දැනුම, විනය, සාරධර්ම සහ විශිෂ්ටත්වය තුළින් සිසු පරපුරක් බිහිකර ඇත.",
        visionTag: "අපගේ දැක්ම",
        visionTitle: "දැක්ම",
        visionQuote: "නිවැරදි කළමනාකරණය මගින් ගුණාත්මක ළමයෙක්.",
        missionTag: "අපගේ මෙහෙවර",
        missionTitle: "මෙහෙවර",
        missionQuote: "ප්‍රඥාවන්ත, අධ්‍යාත්මික සහ ස්වාධීනව නැගී සිටීමට හැකියාව ඇති උතුම් දරු පරපුරක් ඇති කිරීම අපගේ මෙහෙවරයි.",

        principalTag: "අපගේ විදුහල්පතිතුමිය",
        principalTitle: "විදුහල්පතිතුමියගේ",
        principalHighlight: "පණිවිඩය",
        principalMessage1 : "සෑම සිසුවෙකුටම තම දක්ෂතා සොයා ගැනීමට, විශ්වාසය ගොඩනඟා ගැනීමට සහ අධ්‍යයන විශිෂ්ටත්වය අත්කර ගැනීමට හැකි ඉගෙනුම් පරිසරයක් නිර්මාණය කිරීමට අපි කැපවී සිටිමු.",
        principalMessage2 : "අපගේ පාසල විනය, නව්‍යකරණය, නායකත්වය සහ සාර්ථක අනාගතයක් සඳහා සිසුන් සූදානම් කරන වටිනාකම් මගින් පරපුරක් ප්‍රේරණය කරමින් ඉදිරියට යයි.",
        principalName: "ගරු W.D දුලීකා M ප්‍රේමතිලක",
        principalRole: "විදුහල්පතිතුමිය",
        principalQuote: "ලෝකය වෙනස් කිරීමට ඔබට භාවිතා කළ හැකි බලවත්ම ආයුධය අධ්‍යාපනයයි.",
        principalQuoteAuthor: "– නෙල්සන් මැන්ඩෙලා",
        principalValues1: "ශිෂ්‍ය කේන්ද්‍රීය",
        principalValues2: "සාරධර්ම සහ විනය",
        principalValues3: "නවෝත්පාදනය සහ විශිෂ්ටත්වය",
        principalValues4: "නායකත්වය",

        historyTag: "අපගේ ඉතිහාසය",
        historyTitle: "අභිමානවත් ගමන් මග",

        achievementTag: "ජයග්‍රහණ",
        achievementTitle: "අපගේ සාර්ථකත්වයන්",

        eventTag: "ඉදිරි වැඩසටහන්",
        eventTitle: "නවතම පාසල් වැඩසටහන්",

        galleryTag: "ගැලරිය",
        galleryTitle: "පාසල් මතකයන්",

        contactTag: "සම්බන්ධ වන්න",
        contactTitle: "අප හා සම්බන්ධ වන්න",

        sendMessage: "පණිවිඩය යවන්න",

        namePlaceholder: "ඔබගේ නම",
        emailPlaceholder: "ඔබගේ ඊමේල් ලිපිනය",
        messagePlaceholder: "ඔබගේ පණිවිඩය"
    },

    ta: {
        home: "முகப்பு",
        about: "எங்களை பற்றி",
        history: "வரலாறு",
        achievements: "சாதனைகள்",
        events: "நிகழ்வுகள்",
        gallery: "காட்சியகம்",
        contact: "தொடர்பு",

        welcome: "வரவேற்கிறோம்",
        heroTitle: "பொலேகொட மகா வித்தியாலயம்",
        heroSubtitle: "நூற்றாண்டு சிறப்பு மற்றும் அறிவு",

        exploreBtn: "பள்ளியை பாருங்கள்",
        contactBtn: "தொடர்பு கொள்ள",

        yearsLegacy: "வருட பாரம்பரியம்",
        students: "மாணவர்கள்",
        teachers: "ஆசிரியர்கள்",

        sectionTag: "எங்கள் பள்ளி பற்றி",
        sectionTitle: "1926 முதல் எதிர்கால தலைவர்களை உருவாக்குகிறோம்",
        sectionHighlight: "Since 1926",
        sectionSubtitle : "கிட்டத்தட்ட ஒரு நூற்றாண்டாக பொலேகொட மகா வித்தியாலயம் அறிவு, ஒழுக்கம், மதிப்புகள் மற்றும் சிறப்பின் மூலம் மாணவர் தலைமுறைகளை உருவாக்கி வருகிறது.",

        principalTag: "அதிபரின் செய்தி",
        principalTitle: "அதிபரின் செய்தி",

        historyTag: "எங்கள் வரலாறு",
        historyTitle: "பெருமைமிகு பயணம்",

        achievementTag: "சாதனைகள்",
        achievementTitle: "எங்கள் வெற்றி கதைகள்",

        eventTag: "வரவிருக்கும் நிகழ்வுகள்",
        eventTitle: "சமீபத்திய நிகழ்வுகள்",

        galleryTag: "காட்சியகம்",
        galleryTitle: "பள்ளி நினைவுகள்",

        contactTag: "தொடர்பு கொள்ள",
        contactTitle: "எங்களை தொடர்பு கொள்ளுங்கள்",

        sendMessage: "செய்தி அனுப்பு",

        namePlaceholder: "உங்கள் பெயர்",
        emailPlaceholder: "உங்கள் மின்னஞ்சல்",
        messagePlaceholder: "உங்கள் செய்தி"
    }

};

const languageSwitcher = document.getElementById("languageSwitcher");

languageSwitcher.addEventListener("change", (e) => {

    const lang = e.target.value;

    /* TEXT CONTENT */

    document.querySelectorAll("[data-key]").forEach(element => {

        const key = element.getAttribute("data-key");

        if (translations[lang][key]) {

            element.textContent = translations[lang][key];

        }

    });

    /* PLACEHOLDERS */

    document.querySelectorAll("[data-placeholder]").forEach(element => {

        const key = element.getAttribute("data-placeholder");

        if (translations[lang][key]) {

            element.placeholder = translations[lang][key];

        }

    });

    /* NAV FONT SIZE */

    const navLinks = document.querySelectorAll(".nav a");
    const heroTitle = document.querySelector("[data-key='heroTitle']");
    const visionQuote = document.querySelector("[data-key='visionQuote']");
    const missionQuote = document.querySelector("[data-key='missionQuote']");
    const missionTitle = document.querySelector("[data-key='missionTitle']");
    const visionTitle = document.querySelector("[data-key='visionTitle']");
    const principalTitle = document.querySelector("[data-key='principalTitle']");
    const principalHighlight = document.querySelector("[data-key='principalHighlight']");
    const principalName = document.querySelector("[data-key='principalName']");
    const principalRole = document.querySelector("[data-key='principalRole']");
    const principalValues = document.querySelectorAll(".principal-values h4");

    navLinks.forEach(link => {

        if (lang === "en") {

            link.style.fontSize = "1rem";
            link.style.fontWeight = "500";

        }

        else if (lang === "si") {

            heroTitle.style.fontFamily = "'Noto Serif Sinhala', serif";
            heroTitle.style.fontSize = "4rem";
            heroTitle.style.fontWeight = "700";
            heroTitle.style.lineHeight = "1.3";
            visionQuote.style.fontFamily = "'Noto Serif Sinhala', serif";
            missionQuote.style.fontFamily = "'Noto Serif Sinhala', serif";
            visionTitle.style.fontFamily = "'Noto Serif Sinhala', serif";
            missionTitle.style.fontFamily = "'Noto Serif Sinhala', serif";
            principalTitle.style.fontFamily = "'Noto Serif Sinhala', serif";
            principalTitle.style.fontSize = "2.5rem";
            principalTitle.style.lineHeight = "1.2";
            principalHighlight.style.fontSize = "2.5rem";
            principalHighlight.style.lineHeight = "1.6";
            principalName.style.fontSize = "1.2rem";
            principalRole.style.fontSize = "1rem";
            principalValues.forEach(value => {
                value.style.fontFamily = "'Noto Serif Sinhala', serif";
                value.style.fontSize = "1.1rem";
            });
            link.style.fontSize = "0.75rem";
            link.style.fontWeight = "500";

        }

        else if (lang === "ta") {
            heroTitle.style.fontSize = "4rem";
            heroTitle.style.fontWeight = "600";
            heroTitle.style.lineHeight = "1.2";
            link.style.fontSize = "0.82rem";
            link.style.fontWeight = "700";

        }

    });

});

document
    .getElementById("contactForm")
    .addEventListener("submit", async function (e) {

        e.preventDefault();

        const formData = new FormData(this);

        const response = await fetch("contact.php", {

            method: "POST",

            body: formData

        });

        const result = await response.json();

        if (result.success) {

            alert("Message sent successfully.");

            this.reset();

        } else {

            alert("Failed to send message.");
        }
    });