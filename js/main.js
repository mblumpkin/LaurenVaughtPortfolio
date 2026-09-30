/* =========================================
   PORTFOLIO JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("PORTFOLIO JS LOADED");


    /* =====================================
       DESCRIPTION DROPDOWNS
    ====================================== */

    var descriptionButtons =
        document.querySelectorAll(".description-button");

    console.log(
        "Description buttons found:",
        descriptionButtons.length
    );


    descriptionButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            var card =
                button.closest(".project-card");

            if (!card) {
                return;
            }

            var isOpen =
                card.classList.contains("open");


            /* Close all other project descriptions */

            document
                .querySelectorAll(".project-card.open")
                .forEach(function (openCard) {

                    if (openCard !== card) {
                        openCard.classList.remove("open");
                    }

                });


            /* Open or close this description */

            if (isOpen) {

                card.classList.remove("open");

            } else {

                card.classList.add("open");

            }

        });

    });



    /* =====================================
       IMAGE CAROUSELS
    ====================================== */

    var carousels =
        document.querySelectorAll(".carousel");

    console.log(
        "Carousels found:",
        carousels.length
    );


    carousels.forEach(function (carousel) {

        var track =
            carousel.querySelector(".carousel-track");

        var images =
            carousel.querySelectorAll(".carousel-track img");

        var previousButton =
            carousel.querySelector(".carousel-prev");

        var nextButton =
            carousel.querySelector(".carousel-next");

        var dotsContainer =
            carousel.querySelector(".carousel-dots");


        console.log(
            "Carousel:",
            images.length,
            "images"
        );


        /* Make sure everything exists */

        if (!track) {

            console.error(
                "Carousel is missing .carousel-track",
                carousel
            );

            return;

        }

        if (!previousButton) {

            console.error(
                "Carousel is missing .carousel-prev",
                carousel
            );

            return;

        }

        if (!nextButton) {

            console.error(
                "Carousel is missing .carousel-next",
                carousel
            );

            return;

        }


        if (images.length === 0) {

            console.error(
                "Carousel has no images",
                carousel
            );

            return;

        }


        var currentIndex = 0;



        /* =================================
           CREATE DOTS
        ================================== */

        if (dotsContainer) {

            images.forEach(function (image, index) {

                var dot =
                    document.createElement("button");

                dot.type = "button";

                dot.classList.add("carousel-dot");

                dot.setAttribute(
                    "aria-label",
                    "Go to image " + (index + 1)
                );


                if (index === 0) {

                    dot.classList.add("active");

                }


                dot.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();

                        event.stopPropagation();

                        goToImage(index);

                    }
                );


                dotsContainer.appendChild(dot);

            });

        }


        var dots =
            dotsContainer
                ? dotsContainer.querySelectorAll(".carousel-dot")
                : [];



        /* =================================
           MOVE TO IMAGE
        ================================== */

        function goToImage(index) {

            if (images.length === 0) {
                return;
            }


            currentIndex = index;


            /*
             * Move the track horizontally.
             *
             * Image 1 = 0%
             * Image 2 = -100%
             * Image 3 = -200%
             */

            track.style.transform =
                "translateX(-" +
                (currentIndex * 100) +
                "%)";


            /* Update dots */

            dots.forEach(function (dot, dotIndex) {

                if (dotIndex === currentIndex) {

                    dot.classList.add("active");

                } else {

                    dot.classList.remove("active");

                }

            });

        }



        /* =================================
           NEXT BUTTON
        ================================== */

        nextButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                console.log("NEXT CLICKED");


                currentIndex =
                    currentIndex + 1;


                if (
                    currentIndex >=
                    images.length
                ) {

                    currentIndex = 0;

                }


                goToImage(currentIndex);

            }
        );



        /* =================================
           PREVIOUS BUTTON
        ================================== */

        previousButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                console.log("PREVIOUS CLICKED");


                currentIndex =
                    currentIndex - 1;


                if (currentIndex < 0) {

                    currentIndex =
                        images.length - 1;

                }


                goToImage(currentIndex);

            }
        );



        /* =================================
           KEYBOARD CONTROLS
        ================================== */

        carousel.setAttribute(
            "tabindex",
            "0"
        );


        carousel.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "ArrowRight") {

                    event.preventDefault();

                    currentIndex =
                        currentIndex + 1;


                    if (
                        currentIndex >=
                        images.length
                    ) {

                        currentIndex = 0;

                    }


                    goToImage(currentIndex);

                }


                if (event.key === "ArrowLeft") {

                    event.preventDefault();

                    currentIndex =
                        currentIndex - 1;


                    if (currentIndex < 0) {

                        currentIndex =
                            images.length - 1;

                    }


                    goToImage(currentIndex);

                }

            }
        );


        /* Start at first image */

        goToImage(0);

    });



    /* =====================================
       SMOOTH NAVIGATION
    ====================================== */

    var navLinks =
        document.querySelectorAll(".nav-links a");


    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                var targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID.charAt(0) !== "#"
                ) {

                    return;

                }


                var target =
                    document.querySelector(targetID);


                if (!target) {

                    return;

                }


                event.preventDefault();


                var navbar =
                    document.querySelector(".navbar");


                var navbarHeight =
                    navbar
                    ? navbar.offsetHeight
                    : 0;


                var targetPosition =
                    target.getBoundingClientRect().top
                    + window.scrollY
                    - navbarHeight
                    - 10;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });



    /* =====================================
       ACTIVE NAVIGATION
    ====================================== */

    var sections =
        document.querySelectorAll(
            "main section[id]"
        );


    var observerOptions = {

        root: null,

        rootMargin: "-35% 0px -55% 0px",

        threshold: 0

    };


    var sectionObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        var currentID =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach(
                            function (link) {

                                link.classList.remove(
                                    "active"
                                );


                                if (
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    "#" + currentID
                                ) {

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }
                );

            },

            observerOptions

        );


    sections.forEach(function (section) {

        sectionObserver.observe(section);

    });



    /* =====================================
       CLOSE DESCRIPTIONS WHEN CLICKING
       OUTSIDE A PROJECT CARD
    ====================================== */

    document.addEventListener(
        "click",
        function (event) {

            var clickedInsideCard =
                event.target.closest(
                    ".project-card"
                );


            if (!clickedInsideCard) {

                document
                    .querySelectorAll(
                        ".project-card.open"
                    )
                    .forEach(
                        function (card) {

                            card.classList.remove(
                                "open"
                            );

                        }
                    );

            }

        }
    );

});