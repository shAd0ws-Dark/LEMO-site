// Learning & Quiz Logic for LEMO SENEGAL
import { createIcons, icons } from 'lucide';
import LendiraBot from './chatbot';

// Initialize icons and chatbot
createIcons({ icons });
new LendiraBot();

// Quiz Data
const quizData = [
    {
        question: "Comment dit-on 'Bonjour' en Obamba ?",
        options: ["Akiba", "Ambolo", "Ndzou", "Mona"],
        correct: 1,
        feedback: "Correct ! 'Ambolo' ou 'Mbolo' est la salutation standard en Obamba."
    },
    {
        question: "Que signifie 'Akiba' ?",
        options: ["Bienvenue", "Au revoir", "Merci", "Comment ça va ?"],
        correct: 2,
        feedback: "Bravo ! 'Akiba' signifie 'Merci' en Obamba et est aussi compris en Téké."
    },
    {
        question: "En Téké, comment dit-on 'Bienvenue' ?",
        options: ["Kuo mbe", "Ndzari", "O dju kadi", "Mbolo"],
        correct: 0,
        feedback: "Exact ! 'Kuo mbe' est utilisé pour souhaiter la bienvenue."
    },
    {
        question: "Traduisez 'La famille' (Obamba) :",
        options: ["Tata", "Mwana", "Ndjandji", "Li-kanda"],
        correct: 3,
        feedback: "Bien joué ! 'Li-kanda' désigne la famille ou le clan."
    }
];

let currentQuestion = 0;

function initQuiz() {
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-question');

    if (!questionEl || !optionsEl) return;

    function loadQuestion() {
        const data = quizData[currentQuestion];
        questionEl.textContent = data.question;
        optionsEl.innerHTML = '';
        feedbackEl.classList.add('hidden');
        nextBtn.classList.add('hidden');

        data.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'w-full text-left p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/20 transition-all text-sm font-medium';
            btn.textContent = opt;
            btn.onclick = () => checkAnswer(index);
            optionsEl.appendChild(btn);
        });
    }

    function checkAnswer(index) {
        const data = quizData[currentQuestion];
        const options = optionsEl.querySelectorAll('button');
        
        // Disable all buttons
        options.forEach(btn => btn.disabled = true);

        if (index === data.correct) {
            options[index].classList.add('bg-g2-green', 'border-g2-green');
            feedbackEl.textContent = data.feedback;
            feedbackEl.className = 'mt-8 p-4 rounded-2xl text-center font-bold bg-g2-green/20 text-g2-green animate-fade-in';
        } else {
            options[index].classList.add('bg-sn-red', 'border-sn-red');
            options[data.correct].classList.add('bg-g2-green', 'border-g2-green');
            feedbackEl.textContent = "Oups ! Ce n'est pas tout à fait ça. " + data.feedback;
            feedbackEl.className = 'mt-8 p-4 rounded-2xl text-center font-bold bg-sn-red/20 text-sn-red animate-fade-in';
        }

        feedbackEl.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
        
        if (currentQuestion === quizData.length - 1) {
            nextBtn.textContent = "Recommencer le Quiz";
        } else {
            nextBtn.textContent = "Question Suivante";
        }
    }

    nextBtn.onclick = () => {
        currentQuestion++;
        if (currentQuestion >= quizData.length) {
            currentQuestion = 0;
        }
        loadQuestion();
    };

    loadQuestion();
}

function initTableSearch() {
    const searchInput = document.getElementById('table-search');
    const table = document.getElementById('salutations-table');
    if (!searchInput || !table) return;

    const rows = table.querySelectorAll('tbody tr');

    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(term)) {
                row.classList.remove('hidden');
            } else {
                row.classList.add('hidden');
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initQuiz();
    initTableSearch();

    // Mobile Menu Logic (copied from main.js for consistency)
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
});
