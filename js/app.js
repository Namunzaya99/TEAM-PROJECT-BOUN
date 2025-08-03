// Main application controller
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  loadHomePage();
  setupEventListeners();
});

function loadHomePage() {
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <section class="path-container">
      <div class="path-header">
        <div class="path-title">Миний ахиц</div>
        <div class="path-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="progress-text">45%</div>
        </div>
      </div>
      <div class="path">
        <div class="path-line"></div>
        <div class="path-items">
          <div class="path-item completed">
            <i class="fas fa-check"></i>
            <i class="fas fa-crown path-item-crown"></i>
          </div>
          <div class="path-item completed">
            <i class="fas fa-check"></i>
          </div>
          <div class="path-item completed">
            <i class="fas fa-check"></i>
          </div>
          <div class="path-item current">
            <span>4</span>
          </div>
          <div class="path-item locked">
            <i class="fas fa-lock"></i>
          </div>
          <div class="path-item locked">
            <i class="fas fa-lock"></i>
          </div>
        </div>
      </div>
    </section>

    <section class="streak-container">
      <div class="streak-icon">
        <i class="fas fa-fire"></i>
      </div>
      <div class="streak-info">
        <h3>Дараалсан өдрүүд</h3>
        <p>Та <span class="streak-count">3 өдөр</span> дараалан сурсан байна!</p>
      </div>
    </section>

    <section class="shop-container">
      <div class="shop-gems">
        <i class="fas fa-gem gem-icon"></i>
        <div class="gem-count">1,250</div>
      </div>
      <button class="shop-button">
        <i class="fas fa-store"></i>
        <span>Дэлгүүр</span>
      </button>
    </section>

    <section class="lessons-container">
      <div class="lessons-header">
        <div class="lessons-title">Өнөөдрийн хичээл</div>
        <div class="lessons-view-all">Бүгдийг харах</div>
      </div>
      <div class="lesson-cards">
        <div class="lesson-card completed">
          <h3>Сайн уу</h3>
          <p>5 үг</p>
          <i class="fas fa-check-circle lesson-icon"></i>
          <i class="fas fa-crown lesson-crown"></i>
        </div>
        <div class="lesson-card completed">
          <h3>Өдрийн мэнд</h3>
          <p>5 үг</p>
          <i class="fas fa-check-circle lesson-icon"></i>
        </div>
        <div class="lesson-card">
          <h3>Зүгээр үү?</h3>
          <p>5 үг</p>
          <i class="fas fa-hand-paper lesson-icon"></i>
        </div>
        <div class="lesson-card locked">
          <h3>Таньд тусламж хэрэгтэй юу?</h3>
          <p>5 үг</p>
          <i class="fas fa-lock lesson-icon"></i>
        </div>
      </div>
    </section>

    <section class="leaderboard-container">
      <div class="leaderboard-header">
        <div class="leaderboard-title">Чансаа</div>
        <div class="leaderboard-view-all">Бүгдийг харах</div>
      </div>
      <div class="leaderboard-users">
        <div class="leaderboard-user">
          <div class="user-avatar">
            <span>А</span>
            <div class="user-rank rank-1">1</div>
          </div>
          <div class="user-name">Анх</div>
          <div class="user-xp">1,245 XP</div>
        </div>
        <div class="leaderboard-user">
          <div class="user-avatar">
            <span>Б</span>
            <div class="user-rank rank-2">2</div>
          </div>
          <div class="user-name">Болд</div>
          <div class="user-xp">1,120 XP</div>
        </div>
        <div class="leaderboard-user">
          <div class="user-avatar">
            <span>Ц</span>
            <div class="user-rank rank-3">3</div>
          </div>
          <div class="user-name">Цэцгээ</div>
          <div class="user-xp">980 XP</div>
        </div>
        <div class="leaderboard-user">
          <div class="user-avatar you">
            <span>Б</span>
            <div class="user-rank">7</div>
          </div>
          <div class="user-name">Та</div>
          <div class="user-xp">450 XP</div>
        </div>
      </div>
    </section>
  `;
}

function setupEventListeners() {
  // Bottom navigation
  document.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      loadPage(page);
      
      // Update active state
      document.querySelectorAll('.bottom-nav-item').forEach(navItem => {
        navItem.classList.remove('active');
      });
      item.classList.add('active');
    });
  });

  // Practice button
  document.getElementById('practiceButton').addEventListener('click', () => {
    loadPracticePage();
  });

  // Lesson cards
  document.addEventListener('click', (e) => {
    if (e.target.closest('.lesson-card:not(.locked)')) {
      const lessonCard = e.target.closest('.lesson-card');
      openLessonModal(lessonCard.querySelector('h3').textContent);
    }
  });
}

function loadPage(page) {
  const mainContent = document.getElementById('mainContent');
  
  switch(page) {
    case 'home':
      loadHomePage();
      break;
    case 'search':
      mainContent.innerHTML = '<h2>Хайлтын хуудас</h2><p>Хайлтын хуудасны агуулга</p>';
      break;
    case 'lessons':
      mainContent.innerHTML = '<h2>Бүх хичээлүүд</h2><p>Хичээлийн жагсаалтын агуулга</p>';
      break;
    case 'profile':
      mainContent.innerHTML = '<h2>Профайл</h2><p>Хэрэглэгчийн профайлын агуулга</p>';
      break;
    default:
      loadHomePage();
  }
}

function loadPracticePage() {
  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = '<h2>Дасгалын хуудас</h2><p>Дасгалын агуулга</p>';
}

function openLessonModal(lessonTitle) {
  const lessonModalContent = document.getElementById('lessonModalContent');
  
  lessonModalContent.innerHTML = `
    <div class="modal-header">
      <div class="modal-title">${lessonTitle}</div>
      <button class="modal-close" id="closeModal">&times;</button>
    </div>
    <div class="modal-content">
      <div class="lesson-image">
        <span>${getSignEmoji(lessonTitle)}</span>
      </div>
      <div class="lesson-description">
        ${getLessonDescription(lessonTitle)}
      </div>
      <div class="lesson-actions">
        <button class="lesson-button secondary">
          <i class="fas fa-book"></i> Дасгал
        </button>
        <button class="lesson-button primary" id="startLesson">
          <i class="fas fa-play"></i> Эхлүүлэх
        </button>
      </div>
    </div>
  `;
  
  document.getElementById('lessonModal').classList.add('active');
  
  // Add event listeners for modal buttons
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('lessonModal').classList.remove('active');
  });
  
  document.getElementById('startLesson').addEventListener('click', () => {
    document.getElementById('lessonModal').classList.remove('active');
    startQuiz(lessonTitle);
  });
}

function getSignEmoji(lessonTitle) {
  const emojiMap = {
    'Сайн уу': '👋',
    'Өдрийн мэнд': '☀️',
    'Зүгээр үү?': '👐',
    'Таньд тусламж хэрэгтэй юу?': '🙏'
  };
  return emojiMap[lessonTitle] || '✋';
}

function getLessonDescription(lessonTitle) {
  const descriptions = {
    'Сайн уу': 'Энэ хичээлд та "Сайн уу" гэх дохиог сурах болно. Энэ бол энгийн мэндчилгээний үг.',
    'Өдрийн мэнд': 'Энэ бол өглөө, өдөр болон үдээс хойш мэндлэх үг юм.',
    'Зүгээр үү?': 'Хэн нэгнийг санаа тавьж асуух үед хэрэглэдэг үг.',
    'Таньд тусламж хэрэгтэй юу?': 'Хэн нэгэнд тусламж санал болгох үед хэрэглэдэг үг.'
  };
  return descriptions[lessonTitle] || 'Энэ хичээлийн талаарх тодорхойлолт.';
}