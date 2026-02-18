async function generateNotes() {
  const text = document.getElementById("inputText").value;
  if (text.length > 4000) {
  alert("Text too long. Please shorten it.");
  return;
}
  const output = document.getElementById("output");

  output.innerHTML = `
  <div style="text-align:center; margin-top:20px;">
    <div class="spinner"></div>
    <p>Generating smart notes...</p>
  </div>
`;

  const response = await fetch("/api/ai/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  const data = await response.json();
  console.log(data);

  formatOutput(data);
}

function formatOutput(data) {
  const output = document.getElementById("output");

  output.innerHTML = `
    <button class="accordion">📌 Summary</button>
    <div class="panel">
      <div class="panel-content">
        ${data.summary}
      </div>
    </div>

    <button class="accordion">📝 Key Points</button>
    <div class="panel">
      <div class="panel-content">
        <ul>
          ${data.keyPoints.map(point => `<li>${point}</li>`).join("")}
        </ul>
      </div>
    </div>

    <button class="accordion">❓ Quiz</button>
    <div class="panel">
      <div class="panel-content">
        ${data.quiz.map(q => `
          <div style="margin-bottom:15px;">
            <strong>Q:</strong> ${q.question}<br>
            <strong>A:</strong> ${q.answer}
          </div>
        `).join("")}
      </div>
    </div>
  `;

  enableAccordion();
}

function enableAccordion() {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach(acc => {
    acc.addEventListener("click", function () {
      this.classList.toggle("active");

      const panel = this.nextElementSibling;

      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
}

