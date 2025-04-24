let questions = [
  { question: "1 + 1 = ?", answer: 2 },
  { question: "4 + 6 = ?", answer: 10 },
  { question: "5 + 16 = ?", answer: 21 },
  { question: "7 + 3 = ?", answer: 10 }, // 自行產生的題目
  { question: "9 + 8 = ?", answer: 17 }  // 自行產生的題目
];

let currentQuestion = 0;
let score = 0;
let input, button, resultText;

function setup() {
  createCanvas(windowWidth, windowHeight); // 全螢幕
  setGradientBackground(); // 設定漸層背景
  
  input = createInput();
  input.position(width / 2 - 100, height / 2 - 20);
  input.style('font-size', '18px');
  input.style('padding', '10px');
  input.style('border', '2px solid #555');
  input.style('border-radius', '5px');
  input.style('width', '200px');
  
  button = createButton('提交');
  button.position(input.x + input.width + 20, input.y);
  button.style('font-size', '18px');
  button.style('padding', '10px 20px');
  button.style('background-color', '#4CAF50');
  button.style('color', 'white');
  button.style('border', 'none');
  button.style('border-radius', '5px');
  button.style('cursor', 'pointer');
  button.mousePressed(checkAnswer);
  
  resultText = createP('');
  resultText.position(width / 2 - 150, height / 2 + 40);
  resultText.style('font-size', '24px');
  resultText.style('color', '#333');
  resultText.style('text-align', 'center');
  
  showQuestion();
}

function draw() {
  setGradientBackground(); // 繪製漸層背景
}

function setGradientBackground() {
  noFill();
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color(135, 206, 250), color(25, 25, 112), inter); // 漸層從淺藍到深藍
    stroke(c);
    line(0, i, width, i);
  }
}

function showQuestion() {
  if (currentQuestion < questions.length) {
    resultText.html(questions[currentQuestion].question);
  } else {
    showScore();
  }
}

function checkAnswer() {
  let userAnswer = parseInt(input.value());
  if (userAnswer === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  input.value('');
  showQuestion();
}

function showScore() {
  resultText.html(`你的分數是 ${score} / ${questions.length}`);
  resultText.style('color', 'green'); // 美化分數顯示
  button.html('再試一次');
  button.style('background-color', '#FF5722'); // 改變按鈕顏色
  button.mousePressed(restartQuiz);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  button.html('提交');
  button.style('background-color', '#4CAF50');
  button.mousePressed(checkAnswer);
  showQuestion();
}
