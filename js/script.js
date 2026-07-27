/*
==========================================================
ARIA MODEL MANAGEMENT
script.js
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       Sticky Navigation
    ===================================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if(window.scrollY > 50){

            header.classList.add("scrolled");

        }else{

            header.classList.remove("scrolled");

        }

    });

    /* =====================================
       Fade In Sections
    ===================================== */

    const revealElements = document.querySelectorAll(
        ".featured-models, .about-preview, .cta-section, .editorial, .stats, .instagram"
    );

    const revealObserver = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.classList.add("active");

            }

        });

    },{
        threshold:.15
    });

    revealElements.forEach(section=>{

        section.classList.add("reveal");

        revealObserver.observe(section);

    });

    /* =====================================
       Smooth Anchor Scrolling
    ===================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            const target=document.querySelector(this.getAttribute("href"));

            if(target){

                e.preventDefault();

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

    /* =====================================
       Active Navigation
    ===================================== */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link=>{

        const href = link.getAttribute("href");

        if(href===currentPage){

            link.style.opacity="1";

            link.style.fontWeight="600";

        }

    });

    /* =====================================
       Button Hover Ripple
    ===================================== */

    document.querySelectorAll(".btn").forEach(button=>{

        button.addEventListener("mouseenter",()=>{

            button.style.transform="translateY(-3px)";

        });

        button.addEventListener("mouseleave",()=>{

            button.style.transform="translateY(0px)";

        });

    });

    /* =====================================
       Model Card Hover Effect
    ===================================== */

    document.querySelectorAll(".model-card").forEach(card=>{

        card.addEventListener("mousemove",(e)=>{

            const rect=card.getBoundingClientRect();

            const x=e.clientX-rect.left;

            const y=e.clientY-rect.top;

            card.style.setProperty("--mouseX",`${x}px`);

            card.style.setProperty("--mouseY",`${y}px`);

        });

    });

    /* =====================================
       Lazy Loading Images
    ===================================== */

    const images=document.querySelectorAll("img");

    images.forEach(img=>{

        img.setAttribute("loading","lazy");

    });

    /* =====================================
       Simple Number Counter
    ===================================== */

    const counters=document.querySelectorAll(".stats-grid h2");

    const counterObserver=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            const counter=entry.target;

            const finalValue=parseInt(counter.innerText);

            if(isNaN(finalValue)) return;

            let current=0;

            const increment=Math.ceil(finalValue/80);

            const timer=setInterval(()=>{

                current+=increment;

                if(current>=finalValue){

                    current=finalValue;

                    clearInterval(timer);

                }

                counter.innerText=current+"+";

            },20);

            counterObserver.unobserve(counter);

        });

    });

    counters.forEach(counter=>{

        counterObserver.observe(counter);

    });

    /* =====================================
       Scroll Progress Bar
    ===================================== */

    const progress=document.createElement("div");

    progress.style.position="fixed";

    progress.style.top="0";

    progress.style.left="0";

    progress.style.height="3px";

    progress.style.background="#111";

    progress.style.width="0%";

    progress.style.zIndex="9999";

    progress.style.transition="width .1s linear";

    document.body.appendChild(progress);

    window.addEventListener("scroll",()=>{

        const scrollTop=window.scrollY;

        const height=document.documentElement.scrollHeight-window.innerHeight;

        const percent=(scrollTop/height)*100;

        progress.style.width=percent+"%";

    });

    /* =====================================
       Current Year
    ===================================== */

    const year=document.querySelector(".year");

    if(year){

        year.innerText=new Date().getFullYear();

    }

    /* =====================================
       Console Greeting
    ===================================== */

    console.log("%cARIA MODEL MANAGEMENT","font-size:20px;font-weight:bold;");

    console.log("%cDesigned with elegance.","font-size:13px;");

});
