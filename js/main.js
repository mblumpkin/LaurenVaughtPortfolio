/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       DESCRIPTION DROPDOWNS
    ====================================== */

    const descriptionButtons =
        document.querySelectorAll(".description-button");


    descriptionButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".project-card");

            const wasOpen = card.classList.contains("open");


            // Close every other project
            document
                .querySelectorAll(".project-card.open")
                .forEach(openCard => {

                    openCard.classList.remove("open");

                });


            // Open the selected project
            if (!wasOpen) {

                card.classList.add("open");

            }

        });

    });


    /* =====================================
       SMOOTH NAVIGATION
    ====================================== */

    const navLinks =
        document.querySelectorAll(".nav-links a");


    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");


            if (!targetID.startsWith("#")) {
                return;
            }


            const target =
                document.querySelector(targetID);


            if (!target) {
                return;
            }


            event.preventDefault();


            const navbarHeight =
                document.querySelector(".navbar")
                .offsetHeight;


            const targetPosition =
                target.getBoundingClientRect().top
                + window.scrollY
                - navbarHeight
                - 10;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });


    /* =====================================
       ACTIVE NAVIGATION
    ====================================== */

    const sections =
        document.querySelectorAll("main section[id]");


    const observerOptions = {

        root: null,

        rootMargin: "-35% 0px -55% 0px",

        threshold: 0

    };


    const sectionObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const currentID =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href")
                            === `#${currentID}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },

            observerOptions
        );


    sections.forEach(section => {

        sectionObserver.observe(section);

    });


    /* =====================================
       CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
    ====================================== */

    document.addEventListener("click", event => {

        const clickedInsideCard =
            event.target.closest(".project-card");


        if (!clickedInsideCard) {

            document
                .querySelectorAll(".project-card.open")
                .forEach(card => {

                    card.classList.remove("open");

                });

        }

    });

});
