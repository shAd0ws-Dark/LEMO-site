// Lendira-Bot: Interactive Chatbot for LEMO SENEGAL
import { createIcons, MessageCircle, X, Send, User } from 'lucide';

class LendiraBot {
  constructor() {
    this.isOpen = false;
    this.messages = [];
    this.init();
  }

  init() {
    this.createUI();
    this.addEventListeners();
    this.renderWelcome();
  }

  createUI() {
    // Container
    const container = document.createElement('div');
    container.id = 'lendira-bot-container';
    container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans';
    
    // Chat Window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'lendira-chat-window';
    chatWindow.className = 'hidden mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-stone-100 transform transition-all duration-300 origin-bottom-right scale-95 opacity-0';
    chatWindow.innerHTML = `
      <div class="bg-g2-green p-4 flex justify-between items-center text-white">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <i data-lucide="message-circle" class="w-6 h-6"></i>
          </div>
          <div>
            <h3 class="font-bold text-sm">Lendira-Bot</h3>
            <p class="text-[10px] opacity-80">Votre guide G2 au Sénégal</p>
          </div>
        </div>
        <button id="close-chat" class="hover:bg-white/10 p-1 rounded-lg transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
      </div>
      
      <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 scrollbar-hide">
        <!-- Messages will appear here -->
      </div>
      
      <div id="chat-options" class="p-3 bg-white border-t border-stone-100 flex flex-wrap gap-2">
        <!-- Quick options will appear here -->
      </div>

      <div class="p-4 bg-white border-t border-stone-100 flex gap-2">
        <input type="text" id="chat-input" placeholder="Posez votre question..." class="flex-1 bg-stone-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-g2-green outline-none">
        <button id="send-btn" class="bg-g2-green text-white p-2 rounded-xl hover:bg-forest-dark transition-colors">
          <i data-lucide="send" class="w-5 h-5"></i>
        </button>
      </div>
    `;

    // Floating Bubble
    const bubble = document.createElement('button');
    bubble.id = 'lendira-bubble';
    bubble.className = 'w-14 h-14 bg-g2-green text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative';
    bubble.innerHTML = `
      <i data-lucide="message-circle" class="w-7 h-7 group-hover:rotate-12 transition-transform"></i>
      <span class="absolute -top-1 -right-1 w-4 h-4 bg-g2-yellow rounded-full border-2 border-white animate-pulse"></span>
    `;

    container.appendChild(chatWindow);
    container.appendChild(bubble);
    document.body.appendChild(container);

    // Initialize icons for the newly created elements
    createIcons({
      icons: { MessageCircle, X, Send, User }
    });

    this.chatWindow = chatWindow;
    this.bubble = bubble;
    this.messagesContainer = document.getElementById('chat-messages');
    this.optionsContainer = document.getElementById('chat-options');
    this.input = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('send-btn');
    this.closeBtn = document.getElementById('close-chat');
  }

  addEventListeners() {
    this.bubble.addEventListener('click', () => this.toggleChat());
    this.closeBtn.addEventListener('click', () => this.toggleChat(false));
    
    this.sendBtn.addEventListener('click', () => this.handleUserInput());
    this.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserInput();
    });

    // Delegate option clicks
    this.optionsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (btn && btn.dataset.action) {
        this.handleOptionClick(btn.dataset.action, btn.textContent);
      }
    });
  }

  toggleChat(force) {
    this.isOpen = force !== undefined ? force : !this.isOpen;
    
    if (this.isOpen) {
      this.chatWindow.classList.remove('hidden');
      // Small delay to allow CSS transition
      setTimeout(() => {
        this.chatWindow.classList.remove('scale-95', 'opacity-0');
        this.chatWindow.classList.add('scale-100', 'opacity-100');
      }, 10);
    } else {
      this.chatWindow.classList.remove('scale-100', 'opacity-100');
      this.chatWindow.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        this.chatWindow.classList.add('hidden');
      }, 300);
    }
  }

  renderWelcome() {
    this.addMessage('bot', "Ambolo ! Bienvenue chez LEMO SENEGAL. Je suis Lendira-Bot, votre guide pour tout ce qui concerne le Haut-Ogooué (G2) au Sénégal. Comment puis-je vous aider aujourd'hui ?");
    this.showOptions([
      { text: "Comment adhérer à LEMO ?", action: "join" },
      { text: "Je suis un nouvel étudiant à Dakar", action: "student" },
      { text: "Contacter le bureau via WhatsApp", action: "whatsapp" }
    ]);
  }

  addMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`;
    
    const inner = document.createElement('div');
    inner.className = `max-w-[80%] p-3 rounded-2xl text-sm ${
      sender === 'user' 
        ? 'bg-g2-green text-white rounded-tr-none' 
        : 'bg-white text-stone-700 shadow-sm border border-stone-100 rounded-tl-none'
    }`;
    inner.textContent = text;
    
    msgDiv.appendChild(inner);
    this.messagesContainer.appendChild(msgDiv);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  showOptions(options) {
    this.optionsContainer.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'text-xs bg-stone-100 hover:bg-g2-yellow/20 hover:text-stone-900 border border-stone-200 rounded-full px-3 py-1.5 transition-colors text-stone-600 font-medium';
      btn.textContent = opt.text;
      btn.dataset.action = opt.action;
      this.optionsContainer.appendChild(btn);
    });
  }

  handleUserInput() {
    const text = this.input.value.trim();
    if (!text) return;

    this.addMessage('user', text);
    this.input.value = '';
    
    // Simple bot logic
    setTimeout(() => {
      this.processResponse(text.toLowerCase());
    }, 600);
  }

  handleOptionClick(action, text) {
    this.addMessage('user', text);
    
    setTimeout(() => {
      switch(action) {
        case 'join':
          this.addMessage('bot', "C'est une excellente initiative ! Pour adhérer, vous pouvez remplir le formulaire sur notre page dédiée. Souhaitez-vous que je vous y redirige ?");
          this.showOptions([
            { text: "Oui, aller vers l'Espace Membre", action: "go_join" },
            { text: "Pas maintenant", action: "cancel" }
          ]);
          break;
        case 'go_join':
          window.location.href = 'espace-membre.html';
          break;
        case 'student':
          this.addMessage('bot', "Bienvenue à Dakar ! LEMO est là pour vous. Nous organisons des journées d'accueil et pouvons vous aider pour le logement et les démarches administratives. Contactez notre responsable social.");
          this.showOptions([
            { text: "Contacter le responsable", action: "whatsapp" },
            { text: "Retour au menu", action: "welcome" }
          ]);
          break;
        case 'whatsapp':
          this.addMessage('bot', "Je vous redirige vers notre secrétariat sur WhatsApp...");
          setTimeout(() => {
            window.open('https://wa.me/221330000000', '_blank');
          }, 1000);
          break;
        case 'welcome':
          this.renderWelcome();
          break;
        case 'cancel':
          this.addMessage('bot', "Très bien. Je reste à votre disposition si vous avez d'autres questions.");
          this.showOptions([
            { text: "Retour au menu", action: "welcome" }
          ]);
          break;
      }
    }, 600);
  }

  processResponse(text) {
    if (text.includes('manioc') || text.includes('moanda')) {
      this.addMessage('bot', "Le manioc de Moanda est un trésor de chez nous ! À Dakar, vous pouvez en trouver régulièrement au marché de Castors ou via nos membres qui font des arrivages directs du Gabon. Voulez-vous le contact d'un revendeur membre ?");
      this.showOptions([
        { text: "Oui, je veux bien", action: "whatsapp" },
        { text: "Non merci", action: "cancel" }
      ]);
    } else if (text.includes('bonjour') || text.includes('salut') || text.includes('ambolo') || text.includes('mbolo')) {
      this.addMessage('bot', "Ambolo ! Comment puis-je vous aider ?");
      this.showOptions([
        { text: "Comment adhérer ?", action: "join" },
        { text: "Patrimoine G2", action: "heritage" }
      ]);
    } else if (text.includes('patrimoine') || text.includes('culture')) {
      this.addMessage('bot', "Notre patrimoine est riche ! Des plateaux Batéké aux rives de l'Ogooué, nous avons tant à partager. Consultez notre page Patrimoine pour en savoir plus.");
      this.showOptions([
        { text: "Voir le patrimoine", action: "go_heritage" },
        { text: "Retour", action: "welcome" }
      ]);
    } else if (text.includes('go_heritage')) {
      window.location.href = 'patrimoine.html';
    } else {
      this.addMessage('bot', "Je ne suis pas sûr de comprendre, mais je peux vous aider pour l'adhésion, l'accueil des étudiants ou vous mettre en contact avec le bureau.");
      this.showOptions([
        { text: "Menu principal", action: "welcome" },
        { text: "WhatsApp", action: "whatsapp" }
      ]);
    }
  }
}

export default LendiraBot;
