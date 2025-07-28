import React, { useEffect } from "react";
import "../styles/LandingPage.css";
import logo from "../assets/Logo.png";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import youtube from "../assets/youtube.png";
import x from "../assets/x.png";
import computer from "../assets/computer.png";
import star from "../assets/Star 14.png";

const LandingPage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="hero-section">
        <div className="over-lay"></div>
        <header className="navbar">
          <div className="logo">
            <img src={logo} alt="talentloop logo" />
            <span className="name">talentloop</span>
          </div>
          <div className="navbuttons">
            <a href="SignIn" className="button-outline">
              Sign In
            </a>
            <a href="SignUp" className="button-filled">
              Sign Up
            </a>
          </div>
        </header>
        <div className="hero-text">
          <h1 className="font-bold">
            Your Skills Matter. Your Growth Matters More
          </h1>
          <p>
            Find your learning partner, trade talents and unlock your
            potential—one peer at a time.
          </p>
        </div>
      </div>

      <section className="about-mission" id="AboutUs">
        <div className="left-column">
          <h2 className="flex items-center font-bold text-xl gap-2">
            <img src={star} alt="Star icon" className="w-6 h-6" />
            About Us
          </h2>

          <p>
            At TalentLoop, we believe that every student has something valuable
            to teach — and something new to learn. Traditional education often
            puts people into silos, but we are building a platform that breaks
            those walls down by connecting students directly through
            peer-to-peer skill exchange.
            <br />
            <br />
            Whether it is coding, music, design, public speaking, or anything in
            between — TalentLoop helps you find the right person to learn from
            or teach, for free. We are creating a space where growth is mutual,
            learning is social, and every student is both a learner and a
            mentor.
            <br />
            <br />
            Founded by students, for students — TalentLoop is designed with
            accessibility, usability, and real human connection at its core. Our
            goal is to help you unlock your full potential — not alone, but
            together.
          </p>
          <img src={computer} alt="About TalentLoop" />
        </div>

        <div className="right-column">
          <section id="mission">
            <h2 className="mission">Our Mission</h2>
            <ul>
              <li>
                <strong>Empowerment & Access</strong>
                <p>
                  To empower students to take control of their learning by
                  connecting them through peer-to-peer skill exchange — making
                  education more accessible, collaborative, and human.
                </p>
              </li>
              <br /> <br />
              <li>
                <strong>Growth Through Community</strong>
                <p>
                  To build a supportive, student-driven community where everyone
                  can teach, learn, and grow together by sharing their unique
                  talents and skills.
                </p>
              </li>{" "}
              <br /> <br />
              <li>
                <strong>Learning Without Limits</strong>
                <p>
                  We believe learning should be driven by curiosity—not
                  constrained by classrooms. TalentLoop opens the door to
                  endless skill exchange, where students explore new passions
                  and grow on their own terms.
                </p>
              </li>{" "}
              <br /> <br />
            </ul>
          </section>
        </div>
      </section>

      <section className="services" id="services">
        <h2 className="flex items-center font-bold text-xl gap-2">
          <img src={star} alt="Star icon" className="w-6 h-6" />
          OUR SERVICES
        </h2>

        <div className="services-grid">
          <div className="service-card">
            <h3 className="flex items-center font-bold text-lg gap-2">
              <img src={star} alt="Star icon" className="w-5 h-5" /> Peer Skill
              Sharing
            </h3>
            <p>
              Students can select skills they are confident in and offer to
              teach them to their peers.
            </p>
          </div>
          <div className="service-card">
            <h3 className="flex items-center font-bold text-lg gap-2">
              <img src={star} alt="Star icon" className="w-5 h-5" />
              Availability Tags
            </h3>
            <p>
              Users can display their available time slots (e.g., Morning,
              Afternoon, Weekends).
            </p>
          </div>
          <div className="service-card">
            <h3 className="flex items-center font-bold text-lg gap-2">
              <img src={star} alt="Star icon" className="w-5 h-5" /> Explore
              Page with Skill Categories
            </h3>
            <p>
              Our platform includes an Explore page where users can browse
              profiles grouped under categories.
            </p>
          </div>
          <div className="service-card">
            <h3 className="flex items-center font-bold text-lg gap-2">
              <img src={star} alt="Star icon" className="w-5 h-5" /> Direct
              Email Contact
            </h3>
            <p>
              Each user profile includes a clickable email link, allowing
              students to contact each other.
            </p>
          </div>
          <div className="service-card">
            <h3 className="flex items-center font-bold text-lg gap-2">
              <img src={star} alt="Star icon" className="w-5 h-5" /> Feedback
              System
            </h3>
            <p>
              After a learning session, students can give quick feedback through
              a simple thumbs-up or thumbs-down.
            </p>
          </div>
          <div className="service-card">
            <h3 className="flex items-center font-bold text-lg gap-2">
              <img src={star} alt="Star icon" className="w-5 h-5" /> Secure
              Sign-Up
            </h3>
            <p>
              To maintain user integrity and prevent duplicates, our system
              ensures that each email address
            </p>
          </div>
        </div>
      </section>

      <section className="faqs" id="FAQS">
        <div className="over-lay"></div>
        <div className="faq-content">
          <h2 className="font-bold">FAQS</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="font-bold">Is TalentLoop free to use?</h3>
              <p>
                Yes! TalentLoop is 100% free for students. The goal is to create
                a space for peer learning without any cost barriers.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="font-bold">Do I need to be an expert to teach?</h3>
              <p>
                Not at all! You just need to be comfortable enough to share what
                you know. Peer learning is all about growing together, not being
                perfect.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="font-bold">How are sessions scheduled?</h3>
              <p>
                You and your match will decide on a time that works for both of
                you. We recommend using tools like Google Meet or Zoom for
                virtual sessions.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="font-bold">
                Can I offer and learn skills at the same time?
              </h3>
              <p>
                Absolutely! You can be both a mentor and a learner on
                TalentLoop. That is the magic of peer exchange.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-socials">
            <a href="#">
              <img src={facebook} alt="Facebook" />
            </a>
            <a href="#">
              <img src={x} alt="X" />
            </a>
            <a href="#">
              <img src={instagram} alt="Instagram" />
            </a>
            <a href="#">
              <img src={youtube} alt="YouTube" />
            </a>
          </div>
          <div className="footer-links">
            <div className="link-column">
              <a href="#AboutUs">About Us</a>
              <a href="#services">Services</a>
            </div>
            <div className="link-column">
              <a href="#mission">Our Mission</a>
              <a href="#FAQS">FAQs</a>
            </div>
          </div>
          <div className="footer-brand">
            <div className="logo">
              <img src={logo} alt="TalentLoop Logo" />
              <span>talentloop</span>
            </div>
            <p className="quote">When we trade skills, we multiply our value</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 TalentLoop. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
