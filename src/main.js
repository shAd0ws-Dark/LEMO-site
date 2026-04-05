// Shared JavaScript for MPA
import './style.css';
import { createIcons, icons } from 'lucide';
import LendiraBot from './chatbot';

// Initialize Lucide icons
createIcons({
  icons
});

// Initialize Chatbot
new LendiraBot();

// Mobile Menu Logic
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.classList.add('mobile-menu-open');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.classList.remove('mobile-menu-open');
      }
    });
  }

  // Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  if (navbar && navbar.classList.contains('transparent-nav')) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('bg-white', 'shadow-md', 'py-2');
        navbar.classList.remove('bg-transparent', 'py-4');
        navbar.querySelectorAll('.nav-text').forEach(el => {
          el.classList.add('text-stone-700');
          el.classList.remove('text-white');
        });
        const logoText = document.getElementById('logo-text');
        if (logoText) {
          logoText.classList.add('text-g2-green');
          logoText.classList.remove('text-white');
        }
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
          menuBtn.classList.add('text-stone-900');
          menuBtn.classList.remove('text-white');
        }
      } else {
        navbar.classList.remove('bg-white', 'shadow-md', 'py-2');
        navbar.classList.add('bg-transparent', 'py-4');
        navbar.querySelectorAll('.nav-text').forEach(el => {
          el.classList.remove('text-stone-700');
          el.classList.add('text-white');
        });
        const logoText = document.getElementById('logo-text');
        if (logoText) {
          logoText.classList.remove('text-g2-green');
          logoText.classList.add('text-white');
        }
        const menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
          menuBtn.classList.remove('text-stone-900');
          menuBtn.classList.add('text-white');
        }
      }
    });
  }
});
