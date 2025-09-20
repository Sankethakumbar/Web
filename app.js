// --- Countdown Timer ---
        const countdownDate = new Date("October 10, 2025 23:59:59").getTime();

        const countdownFunction = setInterval(function() {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                clearInterval(countdownFunction);
                document.getElementById("countdown").innerHTML = "<div class='text-2xl text-red-500 font-bold'>Registration Closed</div>";
            }
        }, 1000);

        // --- Mobile Menu ---
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // --- Page Navigation Logic ---
        const mainContent = document.getElementById('main-content');
        const hiddenPages = document.getElementById('hidden-pages');
        
        function showPage(pageId, event) {
            if (event) {
                event.preventDefault();
            }
            // Logic to show/hide the main content wrapper vs the hidden pages wrapper
            if (pageId === 'home' || pageId === 'about') {
                mainContent.classList.remove('hidden');
                hiddenPages.classList.add('hidden');
            } else {
                mainContent.classList.add('hidden');
                hiddenPages.classList.remove('hidden');
            }

            // Hide all hidden pages first
            document.getElementById('domains-page').classList.add('hidden');
            document.getElementById('team-page').classList.add('hidden');

            // Page-specific logic
            if (pageId === 'home') {
                // Restore display of all main sections
                document.querySelectorAll('#main-content > section').forEach(section => {
                    section.style.display = 'block';
                });
                // scroll to top INSTANTLY to avoid layout shifts during smooth scroll
                window.scrollTo({ top: 0, behavior: 'auto' }); 
            } else if (pageId === 'about') {
                // Hide all sections in main except about
                document.querySelectorAll('#main-content > section').forEach(section => {
                    section.style.display = (section.id === 'about') ? 'block' : 'none';
                });
                document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            } else if (pageId === 'domains') {
                document.getElementById('domains-page').classList.remove('hidden');
                window.scrollTo(0, 0); 
            } else if (pageId === 'team') {
                document.getElementById('team-page').classList.remove('hidden');
                
                const teamCoordinatorsContainer = document.getElementById('team-coordinators-container');
                if(teamCoordinatorsContainer.innerHTML.trim() === ''){
                     const coordinatorsContent = document.querySelector('#coordinators .container').cloneNode(true);
                     const buttonContainer = coordinatorsContent.querySelector('.text-center.mt-12');
                     if(buttonContainer) {
                        buttonContainer.remove();
                     }
                     teamCoordinatorsContainer.appendChild(coordinatorsContent);
                }
                window.scrollTo(0, 0); 
            }
        }

        // --- Register Button ---
        function openRegistration(event) {
            if (event) {
                event.preventDefault();
            }
            // I will add the google form link here later
            const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdxi3nid1QzCMrhxJTYmwKS3Xx0jkoNZUFULqp7Kvq7QqbPRQ/viewform";
            window.open(registrationUrl, '_blank');
        }

        // --- Team Carousel ---
        document.addEventListener('DOMContentLoaded', function() {
            const teamMembers = [
                { name: "Mustafeez S", role: "Financial", img: "https://placehold.co/150x150/FFFFFF/171729?text=MS" },
                { name: "Prajwal", role: "Financial", img: "https://placehold.co/150x150/FFFFFF/171729?text=PR" },
                { name: "Pradeep A", role: "Financial", img: "https://placehold.co/150x150/FFFFFF/171729?text=PA" },
                { name: "Pallavi", role: "Judgement and evaluation", img: "https://placehold.co/150x150/FFFFFF/171729?text=P" },
                { name: "Shobha M", role: "Technical", img: "https://placehold.co/150x150/FFFFFF/171729?text=SM" },
                { name: "Aishwarya M", role: "Logistic and operation", img: "https://placehold.co/150x150/FFFFFF/171729?text=AM" },
                { name: "Omkar K", role: "Logistic and operation", img: "https://placehold.co/150x150/FFFFFF/171729?text=OK" },
                { name: "Asfiya", role: "hospitality", img: "https://placehold.co/150x150/FFFFFF/171729?text=A" },
                { name: "Pradeep K", role: "hospitality", img: "https://placehold.co/150x150/FFFFFF/171729?text=PK" },
                { name: "Prajakta", role: "hospitality", img: "https://placehold.co/150x150/FFFFFF/171729?text=P" },
                { name: "Zahir", role: "Marketing and publicity", img: "https://placehold.co/150x150/FFFFFF/171729?text=ZG" },
                { name: "Manjunath", role: "Marketing and publicity", img: "https://placehold.co/150x150/FFFFFF/171729?text=M" },
                { name: "Vinayak G", role: "Marketing and publicity", img: "https://placehold.co/150x150/FFFFFF/171729?text=VG" },
                { name: "Masoom", role: "Technical", img: "https://placehold.co/150x150/FFFFFF/171729?text=MM" }
            ];

            const carousel = document.getElementById('team-carousel');
            const visibleCards = window.innerWidth < 640 ? 1 : 2;
            let pageHTML = '';

            for (let i = 0; i < teamMembers.length; i += visibleCards) {
                pageHTML += `<div class="flex-shrink-0 w-full flex justify-center">`;
                for (let j = 0; j < visibleCards && (i + j) < teamMembers.length; j++) {
                    const member = teamMembers[i + j];
                    pageHTML += `
                        <div class="team-card w-full sm:w-1/2 p-4">
                            <div class="card p-6 rounded-lg flex items-center space-x-6 h-full">
                               <img src="${member.img}" alt="${member.name}" class="w-24 h-24 rounded-full">
                               <div>
                                    <h3 class="text-xl font-bold">${member.name}</h3>
                                    <p class="text-blue-400">${member.role}</p>
                               </div>
                            </div>
                        </div>
                    `;
                }
                pageHTML += `</div>`;
            }
            carousel.innerHTML = pageHTML;

            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            let currentIndex = 0;
            const numPages = carousel.children.length;

            function updateCarousel() {
                 const offset = -currentIndex * 100;
                 carousel.style.transform = `translateX(${offset}%)`;
            }
            
            function showNext() {
                currentIndex = (currentIndex + 1) % numPages;
                updateCarousel();
            }

            function showPrev() {
                currentIndex = (currentIndex - 1 + numPages) % numPages;
                updateCarousel();
            }

            nextBtn.addEventListener('click', showNext);
            prevBtn.addEventListener('click', showPrev);

            let autoScroll = setInterval(showNext, 4000); // Auto-scroll every 4 seconds
            
            carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
            carousel.addEventListener('mouseleave', () => autoScroll = setInterval(showNext, 4000));
        });

        // --- Scroll Animations ---
        const revealElements = document.querySelectorAll('.reveal');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(elem => {
            revealObserver.observe(elem);
        });