import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart, Shield, Users, Zap, Target, Globe, Code2,
  Github, Linkedin, Mail, ArrowRight, Sparkles,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/about.css';

import abhishekImg from '../assets/abhishek.png';
import parthImg from '../assets/parth.jpg';
import smitImg from '../assets/smit.png';

/* ─── Team Data ──────────────────────────────────────────────────────────── */
const TEAM = [
  {
    name: 'Abhishek Dige',
    title: 'Full-Stack Developer',
    role: 'Co-Founder',
    roleBg: 'rgba(37,99,235,0.6)',
    image: abhishekImg,
    bio: 'Passionate about building scalable civic-tech solutions that directly impact communities. Drives the architecture and backend systems behind CivicBridge.',
    skills: ['React', 'Node.js', 'Supabase', 'System Design'],
    github: '#',
    linkedin: '#',
    email: '#',
  },
  {
    name: 'Parth Badgire',
    title: 'Full-Stack Developer',
    role: 'Co-Founder',
    roleBg: 'rgba(16,185,129,0.6)',
    image: parthImg,
    bio: 'Focused on creating beautiful, intuitive interfaces that make civic participation accessible to everyone. The design force behind the platform.',
    skills: ['React', 'UI/UX', 'CSS', 'Supabase'],
    github: '#',
    linkedin: '#',
    email: '#',
  },
  {
    name: 'Smit Jain',
    title: 'Full-Stack Developer',
    role: 'Co-Founder',
    roleBg: 'rgba(79,70,229,0.6)',
    image: smitImg,
    bio: 'Ensures every feature runs flawlessly. From database design to API integration, Smit keeps the platform robust and reliable.',
    skills: ['Node.js', 'PostgreSQL', 'API Design', 'Testing'],
    github: '#',
    linkedin: '#',
    email: '#',
  },
];

const VALUES = [
  {
    icon: '🏛️',
    bg: '#eff6ff',
    title: 'Transparency',
    desc: 'Every complaint, every status update — fully visible to the community.',
  },
  {
    icon: '⚡',
    bg: '#f0fdf4',
    title: 'Speed',
    desc: 'Real-time updates and instant submissions for faster civic action.',
  },
  {
    icon: '🤝',
    bg: '#fefce8',
    title: 'Inclusion',
    desc: 'Designed so every citizen can participate, regardless of technical ability.',
  },
  {
    icon: '🔒',
    bg: '#fdf2f8',
    title: 'Trust',
    desc: 'Secure authentication and data handling you can rely on.',
  },
];

/* ─── Page Component ─────────────────────────────────────────────────────── */
const AboutPage = () => {
  return (
    <>
      <Navbar />

      {/* ═══  HERO  ═══ */}
      <section className="about-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-hero-tag">
            <Sparkles size={14} /> Our Story
          </div>
          <h1>
            Building the Bridge Between<br />
            <span className="text-gradient">Citizens & Governance</span>
          </h1>
          <p className="about-hero-desc">
            CivicBridge is an open-source civic-tech platform that empowers communities to
            report issues, track resolutions, and discover government schemes — all in one beautiful,
            transparent interface.
          </p>

          {/* Stats bar */}
          <div className="about-stats-bar">
            <div className="about-stat">
              <div className="about-stat-value">3</div>
              <div className="about-stat-label">Builders</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-value">5+</div>
              <div className="about-stat-label">Modules</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-value">100%</div>
              <div className="about-stat-label">Open Source</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-value">∞</div>
              <div className="about-stat-label">Impact Potential</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══  MISSION & VALUES  ═══ */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission-grid">
            {/* Left — text */}
            <div>
              <div className="about-mission-label">
                <Target size={13} /> Our Mission
              </div>
              <h2>
                Making civic participation<br />
                effortless and impactful
              </h2>
              <p>
                In India, millions of civic complaints go unresolved because the gap between
                citizens and local authorities is too wide. CivicBridge closes that gap with
                technology.
              </p>
              <p>
                From reporting a broken road to checking eligibility for government schemes,
                our platform turns civic engagement from a frustrating bureaucratic process
                into a seamless digital experience.
              </p>
              <p style={{ color: '#2563eb', fontWeight: 600 }}>
                We believe every citizen deserves to be heard — and every authority deserves
                the tools to respond effectively.
              </p>
            </div>

            {/* Right — values grid */}
            <div className="about-values-grid">
              {VALUES.map((v) => (
                <div className="about-value-card" key={v.title}>
                  <div className="about-value-icon" style={{ background: v.bg }}>
                    {v.icon}
                  </div>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══  TEAM  ═══ */}
      <section className="about-team">
        <div className="container">
          <div className="about-team-header">
            <div className="about-mission-label" style={{ margin: '0 auto 16px' }}>
              <Users size={13} /> Meet the Team
            </div>
            <h2>The Builders Behind CivicBridge</h2>
            <p>Three developers, one vision — empowering communities through technology.</p>
          </div>

          <div className="about-team-grid">
            {TEAM.map((member) => (
              <div className="team-card" key={member.name}>
                {/* Photo */}
                <div className="team-card-img-wrap">
                  <img src={member.image} alt={member.name} />
                  <div className="team-card-img-overlay" />
                  <span
                    className="team-card-role-badge"
                    style={{ background: member.roleBg }}
                  >
                    {member.role}
                  </span>
                </div>

                {/* Body */}
                <div className="team-card-body">
                  <h3 className="team-card-name">{member.name}</h3>
                  <p className="team-card-title">{member.title}</p>
                  <p className="team-card-desc">{member.bio}</p>

                  <div className="team-card-skills">
                    {member.skills.map((s) => (
                      <span className="team-skill-tag" key={s}>{s}</span>
                    ))}
                  </div>

                  <div className="team-card-socials">
                    <a href={member.github} className="team-social-link" aria-label="GitHub">
                      <Github size={16} />
                    </a>
                    <a href={member.linkedin} className="team-social-link" aria-label="LinkedIn">
                      <Linkedin size={16} />
                    </a>
                    <a href={member.email} className="team-social-link" aria-label="Email">
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══  CTA  ═══ */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of citizens who are transforming their communities.</p>
          <div className="about-cta-btns">
            <Link to="/citizen/report" className="btn btn-primary">
              Report an Issue <ArrowRight size={18} />
            </Link>
            <Link to="/schemes" className="btn btn-secondary">
              Explore Schemes
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutPage;
