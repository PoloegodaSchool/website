// ================= SMART NAVBAR =================

const header = document.getElementById("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    // Add glass effect
    if (currentScroll > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Hide when scrolling down
    if (currentScroll > lastScroll && currentScroll > 120) {
        header.classList.add("hide-nav");
    } else {
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

    // Only run if slides exist
    if (slides.length === 0) return;

    // Function to show a specific slide
    function showSlide(index) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        slides[index].classList.add('active');
        if (dots[index]) {
            dots[index].classList.add('active');
        }

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

    // Start automatic slideshow
    function startSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Stop slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
        slideInterval = null;
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
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopSlideshow);
        heroSection.addEventListener('mouseleave', startSlideshow);
    }

    // Start the slideshow
    startSlideshow();
});

// ================= SWIPER INITIALIZATION =================

// Staff Swiper - only initialize if element exists
const staffSwiperElement = document.querySelector(".staffSwiper");
if (staffSwiperElement) {
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
}

// History Swiper - only initialize if element exists
const historySwiperElement = document.querySelector(".historySwiper");
if (historySwiperElement) {
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
}

// ================= MOBILE MENU =================

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle("active");
        navMenu.classList.toggle('active');
    });
}

// ================= SCROLL ANIMATION =================

const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

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
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ================= CLOSE MOBILE MENU =================

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (menuBtn) {
            menuBtn.classList.remove('active');
        }
    });
});

// ================= PRELOADER =================

window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    if (sessionStorage.getItem("preloaderShown")) {
        preloader.style.display = "none";
        return;
    }

    sessionStorage.setItem("preloaderShown", "true");

    setTimeout(() => {
        preloader.classList.add("hide");
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500);
    }, 5000);
});

// ================= STAFF GRID (staff.html) =================

let allStaff = [];
const staffGrid = document.getElementById("staffGrid");
const searchInput = document.querySelector(".filter-bar input");
const gradeFilter = document.getElementById("gradeFilter");

// Only run staff-related code if we're on the staff page
if (staffGrid) {
    // Fetch staff data
    fetch("staff.json")
        .then(res => {
            if (!res.ok) {
                throw new Error('Staff data not found');
            }
            return res.json();
        })
        .then(data => {
            allStaff = data;
            renderStaff(allStaff);
        })
        .catch(err => {
            console.error('Error loading staff data:', err);
            staffGrid.innerHTML = `
                <div class="staff-error">
                    <i class="fa-solid fa-exclamation-circle"></i>
                    <p>Unable to load staff data. Please try again later.</p>
                </div>
            `;
        });

    function renderStaff(staffList) {
        staffGrid.innerHTML = "";

        if (staffList.length === 0) {
            staffGrid.innerHTML = `
                <div class="staff-empty">
                    <i class="fa-solid fa-user-slash"></i>
                    <p>No staff members found matching your criteria.</p>
                </div>
            `;
            return;
        }

        staffList.forEach(staff => {
            const card = document.createElement("div");
            card.className = "staff-card reveal-up";

            // Handle missing image
            const imageSrc = staff.image || 'assets/default-avatar.jpg';

            card.innerHTML = `
                <img src="${imageSrc}" alt="${staff.name || 'Staff Member'}">
                <div class="staff-content">
                    <h3>${staff.name || 'Unknown'}</h3>
                    <p>${staff.role || 'Staff Member'}</p>
                    <span>${staff.subject || ''}</span>
                </div>
            `;

            staffGrid.appendChild(card);

            // Trigger reveal animation
            requestAnimationFrame(() => {
                card.classList.add('active');
            });
        });
    }

    // Apply filters
    function applyFilters() {
        if (!searchInput || !gradeFilter) return;

        const keyword = searchInput.value.toLowerCase().trim();
        const selectedGrade = gradeFilter.value;

        const filtered = allStaff.filter(staff => {
            const matchSearch = 
                (staff.name && staff.name.toLowerCase().includes(keyword)) ||
                (staff.subject && staff.subject.toLowerCase().includes(keyword));

            const matchGrade = 
                selectedGrade === "All Staff" ||
                (staff.grades && staff.grades.includes(selectedGrade));

            return matchSearch && matchGrade;
        });

        renderStaff(filtered);
    }

    // Add event listeners
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }
    if (gradeFilter) {
        gradeFilter.addEventListener("change", applyFilters);
    }
}

// ================= LANGUAGE SWITCHER =================

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
        sectionSubtitle: "For nearly a century, Polegoda Maha Vidyalaya has nurtured generations of students through knowledge, discipline, values, and excellence.",
        visionTag: "OUR VISION",
        visionTitle: "Vision",
        visionQuote: "A quality child through good management.",
        missionTag: "OUR MISSION",
        missionTitle: "Mission",
        missionQuote: "It is our mission to raise a noble generation of children who are disciplined, knowledgeable, and socially responsible.",
        principalTag: "Principal Message",
        principalTitle: "Message from the ",
        principalHighlight: "Principal",
        principalMessage1: "We are committed to creating a learning environment where every student can discover their talents, build confidence, and achieve academic excellence.",
        principalMessage2: "Our school continues to inspire generations through discipline, innovation, leadership, and values that prepare students for a successful future.",
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
        messagePlaceholder: "Your Message",
        "school-name": "Polegoda Maha Vidyalaya",
        "school-mission": "Inspiring generations through knowledge, discipline, and excellence.",
        copyright: "© 2026 Polegoda Maha Vidyalaya. All Rights Reserved.",
        "academic-excellence": "Academic Excellence",
        "sports-victories": "Sports Victories",
        "arts-culture": "Arts & Culture",
        innovation: "Innovation",
        "achievement-1": "Outstanding A/L and O/L examination results every year.",
        "achievement-2": "Championship wins in cricket, volleyball, and athletics.",
        "achievement-3": "National recognition in music, drama, and dancing competitions.",
        "achievement-4": "Students leading technology and science exhibitions.",
        "centenary-walk": "Centenary Walk",
        "new-building-opening": "New Building Opening",
        "big-match": "Big Match",
        "event-description-1": "Celebrating 100 years with students, teachers, and old boys.",
        "event-description-2": "Official opening ceremony of the new Mahasen Hall.",
        "event-description-3": "Annual inter-school cricket tournament with exciting performances."
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
        principalMessage1: "සෑම සිසුවෙකුටම තම දක්ෂතා සොයා ගැනීමට, විශ්වාසය ගොඩනඟා ගැනීමට සහ අධ්‍යයන විශිෂ්ටත්වය අත්කර ගැනීමට හැකි ඉගෙනුම් පරිසරයක් නිර්මාණය කිරීමට අපි කැපවී සිටිමු.",
        principalMessage2: "අපගේ පාසල විනය, නව්‍යකරණය, නායකත්වය සහ සාර්ථක අනාගතයක් සඳහා සිසුන් සූදානම් කරන වටිනාකම් මගින් පරපුරක් ප්‍රේරණය කරමින් ඉදිරියට යයි.",
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
        messagePlaceholder: "ඔබගේ පණිවිඩය",
        "school-name": "පොලේගොඩ මහා විද්‍යාලය",
        "school-mission": "දැනුම, විනය සහ විශිෂ්ටත්වය තුළින් පරපුරක් ප්‍රේරණය කිරීම.",
        copyright: "© 2026 පොලේගොඩ මහා විද්‍යාලය. සියලුම හිමිකම් ඇවිරිණි."
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
        heroSubtitle: "நூற்றாண்டு சிறப்பு, தலைமைத்துவம் மற்றும் அறிவு",
        exploreBtn: "பள்ளியை பாருங்கள்",
        contactBtn: "தொடர்பு கொள்ள",
        yearsLegacy: "வருட பாரம்பரியம்",
        students: "மாணவர்கள்",
        teachers: "ஆசிரியர்கள்",
        sectionTag: "எங்கள் பள்ளி பற்றி",
        sectionTitle: "1926 முதல் எதிர்கால தலைவர்களை உருவாக்குகிறோம்",
        sectionHighlight: "Since 1926",
        sectionSubtitle: "கிட்டத்தட்ட ஒரு நூற்றாண்டாக பொலேகொட மகா வித்தியாலயம் அறிவு, ஒழுக்கம், மதிப்புகள் மற்றும் சிறப்பின் மூலம் மாணவர் தலைமுறைகளை உருவாக்கி வருகிறது.",
        visionTag: "எங்கள் பார்வை",
        visionTitle: "பார்வை",
        visionQuote: "நல்ல மேலாண்மை மூலம் தரமான குழந்தை.",
        missionTag: "எங்கள் பணி",
        missionTitle: "பணி",
        missionQuote: "ஒழுக்கமான, அறிவுள்ள மற்றும் சமூக பொறுப்புள்ள உன்னதமான குழந்தைகளை உருவாக்குவது எங்கள் பணியாகும்.",
        principalTag: "அதிபரின் செய்தி",
        principalTitle: "அதிபரின் செய்தி",
        principalHighlight: "அதிபர்",
        principalMessage1: "ஒவ்வொரு மாணவரும் தங்கள் திறமைகளை கண்டறியவும், நம்பிக்கையை வளர்க்கவும், கல்வி சிறப்பை அடையவும் உதவும் கற்றல் சூழலை உருவாக்க நாங்கள் உறுதிபூண்டுள்ளோம்.",
        principalMessage2: "எங்கள் பள்ளி ஒழுக்கம், புதுமை, தலைமைத்துவம் மற்றும் மாணவர்களை வெற்றிகரமான எதிர்காலத்திற்கு தயார்படுத்தும் மதிப்புகள் மூலம் தலைமுறைகளை ஊக்குவித்து வருகிறது.",
        principalName: "திருமதி. W.D துலீகா M பிரேமதிலக",
        principalRole: "அதிபர்",
        principalQuote: "உலகை மாற்ற நீங்கள் பயன்படுத்தக்கூடிய மிகவும் சக்திவாய்ந்த ஆயுதம் கல்வியாகும்.",
        principalQuoteAuthor: "– நெல்சன் மண்டேலா",
        principalValues1: "மாணவர் மையம்",
        principalValues2: "மதிப்புகள் & ஒழுக்கம்",
        principalValues3: "புதுமை & சிறப்பு",
        principalValues4: "தலைமைத்துவம்",
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
        messagePlaceholder: "உங்கள் செய்தி",
        "school-name": "பொலேகொட மகா வித்தியாலயம்",
        "school-mission": "அறிவு, ஒழுக்கம் மற்றும் சிறப்பு மூலம் தலைமுறைகளை ஊக்குவித்தல்.",
        copyright: "© 2026 பொலேகொட மகா வித்தியாலயம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
    }
};

const languageSwitcher = document.getElementById("languageSwitcher");

// Apply language function
function applyLanguage(lang) {
    // Text content
    document.querySelectorAll("[data-key]").forEach(element => {
        const key = element.getAttribute("data-key");
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Placeholders
    document.querySelectorAll("[data-placeholder]").forEach(element => {
        const key = element.getAttribute("data-placeholder");
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });

    // NAV font size and styles
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

    // Reset styles first
    navLinks.forEach(link => {
        link.style.fontSize = "";
        link.style.fontWeight = "";
    });
    
    if (heroTitle) {
        heroTitle.style.fontFamily = "";
        heroTitle.style.fontSize = "";
        heroTitle.style.fontWeight = "";
        heroTitle.style.lineHeight = "";
    }

    if (lang === "en") {
        navLinks.forEach(link => {
            link.style.fontSize = "1rem";
            link.style.fontWeight = "500";
        });
    } else if (lang === "si") {
        if (heroTitle) {
            heroTitle.style.fontFamily = "'Noto Serif Sinhala', serif";
            heroTitle.style.fontSize = "3rem";
            heroTitle.style.fontWeight = "700";
            heroTitle.style.lineHeight = "1.3";
        }
        [visionQuote, missionQuote, visionTitle, missionTitle].forEach(el => {
            if (el) el.style.fontFamily = "'Noto Serif Sinhala', serif";
        });
        if (principalTitle) {
            principalTitle.style.fontFamily = "'Noto Serif Sinhala', serif";
            principalTitle.style.fontSize = "2.5rem";
            principalTitle.style.lineHeight = "1.2";
        }
        if (principalHighlight) {
            principalHighlight.style.fontSize = "2.5rem";
            principalHighlight.style.lineHeight = "1.6";
        }
        if (principalName) {
            principalName.style.fontSize = "1.2rem";
        }
        if (principalRole) {
            principalRole.style.fontSize = "1rem";
        }
        principalValues.forEach(value => {
            value.style.fontFamily = "'Noto Serif Sinhala', serif";
            value.style.fontSize = "1.1rem";
        });
        navLinks.forEach(link => {
            link.style.fontSize = "0.75rem";
            link.style.fontWeight = "500";
        });
    } else if (lang === "ta") {
        if (heroTitle) {
            heroTitle.style.fontSize = "4rem";
            heroTitle.style.fontWeight = "600";
            heroTitle.style.lineHeight = "1.2";
        }
        navLinks.forEach(link => {
            link.style.fontSize = "0.82rem";
            link.style.fontWeight = "700";
        });
    }
}

// Load saved language preference
const savedLang = localStorage.getItem('selectedLanguage') || 'en';
if (languageSwitcher) {
    languageSwitcher.value = savedLang;
}

// Apply language on page load
document.addEventListener('DOMContentLoaded', function() {
    applyLanguage(savedLang);
});

// Language switcher event listener
if (languageSwitcher) {
    languageSwitcher.addEventListener("change", (e) => {
        const lang = e.target.value;
        localStorage.setItem('selectedLanguage', lang);
        applyLanguage(lang);
    });
}

// ================= CONTACT FORM =================

const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        try {
            const response = await fetch("contact.php", {
                method: "POST",
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert("Message sent successfully.");
                this.reset();
            } else {
                alert("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert("An error occurred. Please try again later.");
        }
    });
}