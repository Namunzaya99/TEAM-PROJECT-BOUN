// Quiz functionality
function startQuiz(lessonTitle) {
  const quizModalContent = document.getElementById('quizModalContent');
  const questions = getQuizQuestions(lessonTitle);
  
  if (!questions || questions.length === 0) {
    alert('Энэ хичээлд асуулт олдсонгүй!');
    return;
  }
  
  let currentQuestion = 0;
  let score = 0;
  
  function showQuestion(index) {
    const question = questions[index];
    
    quizModalContent.innerHTML = `
      <div class="modal-header">
        <div class="modal-title">Асуулт ${index + 1}/${questions.length}</div>
        <button class="modal-close" id="closeQuiz">&times;</button>
      </div>
      <div class="modal-content">
        <div class="quiz-question">${question.question}</div>
        <div class="quiz-options">
          ${question.options.map((option, i) => `
            <div class="quiz-option" data-correct="${option.correct}">
              ${option.text}
            </div>
          `).join('')}
        </div>
        <div class="quiz-feedback"></div>
        <button class="quiz-next">${index < questions.length - 1 ? 'Дараагийн асуулт' : 'Дуусгах'}</button>
      </div>
    `;
    
    document.getElementById('quizModal').classList.add('active');
    
    // Add event listeners for quiz options
    document.querySelectorAll('.quiz-option').forEach(option => {
      option.addEventListener('click', () => {
        const isCorrect = option.dataset.correct === 'true';
        
        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(opt => {
          opt.style.pointerEvents = 'none';
          if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
          } else if (opt === option && !isCorrect) {
            opt.classList.add('incorrect');
          }
        });
        
        // Update score
        if (isCorrect) {
          score++;
          showXPPopup(10);
        }
        
        // Show feedback
        const feedback = document.querySelector('.quiz-feedback');
        feedback.textContent = isCorrect ? 'Зөв! 🎉' : 'Буруу! 😕';
        feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`;
        
        // Show next button
        document.querySelector('.quiz-next').style.display = 'block';
      });
    });
    
    // Next question button
    document.querySelector('.quiz-next').addEventListener('click', () => {
      if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
      } else {
        // Quiz completed
        document.getElementById('quizModal').classList.remove('active');
        showQuizResults(score, questions.length);
      }
    });
    
    // Close quiz button
    document.getElementById('closeQuiz').addEventListener('click', () => {
      document.getElementById('quizModal').classList.remove('active');
    });
  }
  
  showQuestion(0);
}

function getQuizQuestions(lessonTitle) {
  const questionsMap = {
    'Сайн уу': [
      {
        question: '"Сайн уу" дохиог аль нь вэ?',
        options: [
          { text: '🖐️', correct: false },
          { text: '👋', correct: true },
          { text: '✌️', correct: false },
          { text: '🤟', correct: false }
        ]
      },
      {
        question: 'Энэ дохиог хэзээ хэрэглэдэг вэ?',
        options: [
          { text: 'Өглөө', correct: false },
          { text: 'Үдэш', correct: false },
          { text: 'Хүнтэй уулзах үед', correct: true },
          { text: 'Баяртай хэлэхэд', correct: false }
        ]
      }
    ],
    'Өдрийн мэнд': [
      {
        question: '"Өдрийн мэнд" дохиог аль нь вэ?',
        options: [
          { text: '🤟', correct: false },
          { text: '👍', correct: false },
          { text: '☀️', correct: true },
          { text: '👋', correct: false }
        ]
      }
    ],
    'Зүгээр үү?': [
      {
        question: '"Зүгээр үү?" дохиог аль нь вэ?',
        options: [
          { text: '✋', correct: false },
          { text: '🤲', correct: false },
          { text: '👐', correct: true },
          { text: '🖐️', correct: false }
        ]
      }
    ]
  };
  
  return questionsMap[lessonTitle] || [];
}

function showQuizResults(score, total) {
  const percentage = Math.round((score / total) * 100);
  const mainContent = document.getElementById('mainContent');
  
  mainContent.innerHTML = `
    <section class="path-container">
      <h2>Хичээл дууслаа!</h2>
      <p>Та ${total} асуултаас ${score}-д зөв хариулсан байна. (${percentage}%)</p>
      ${percentage >= 80 ? '<p>Өндөр оноо! 👏</p>' : '<p>Дахин оролдоод үзээрэй! 💪</p>'}
      <button id="backToHome" style="padding: 10px 20px; background-color: var(--green); color: white; border: none; border-radius: 8px; margin-top: 20px;">
        Нүүр хуудас руу буцах
      </button>
    </section>
  `;
  
  document.getElementById('backToHome').addEventListener('click', loadHomePage);
}

function showXPPopup(amount) {
  const xpPopup = document.getElementById('xpPopup');
  xpPopup.textContent = `+${amount} XP!`;
  xpPopup.classList.add('show');
  
  setTimeout(() => {
    xpPopup.classList.remove('show');
  }, 1500);
}