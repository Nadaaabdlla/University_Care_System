const illContainer = document.querySelector(".illStudentDetails");
const goodContainer = document.querySelector(".goodStudentDetails");
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIwYjZhZTcxZS0yNTE3LTQzNTMtYmJlMC1hNmQzYzQ3MDViNzYiLCJ1bmlxdWVfbmFtZSI6InR0IiwiZW1haWwiOiJ0QGV4YW1wbGUuY29tIiwicm9sZSI6IkRvY3RvciIsIm5iZiI6MTc0NzQzMTc4OSwiZXhwIjoxNzQ3NTE4MTg5LCJpYXQiOjE3NDc0MzE3ODksImlzcyI6IlVuaUhlYWx0aCIsImF1ZCI6IlVuaUhlYWx0aFVzZXJzIn0.uVhgE4fAIbQLOHZZ6qjX8g4-aZC9YHzpu6Ar1PpnJhs";
fetch("https://universitycaresystem.runasp.net/api/Reports/Get-All-Reports",{
    headers:{Authorization:`Bearer ${token}`}
})
  .then(res => {
    if (!res.ok) {
      // حالة الخطأ من السيرفر (500 - 404 - etc.)
      throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
  })
  .then(data => {
    // التحقق من وجود بيانات
    if (!Array.isArray(data) || data.length === 0) {
      illContainer.innerHTML = `
        <div class="studentCard">
          <p>No data available.</p>
        </div>
      `;
      goodContainer.innerHTML = `
        <div class="studentCard">
          <p>No data available.</p>
        </div>
      `;
      return;
    }

    // عرض البيانات
    data.forEach(report => {
      const studentCard = document.createElement("div");
      studentCard.classList.add("studentCard");

      studentCard.innerHTML = `
        <h3>${report.name}</h3>
        <p class="result">📝 ${report.result}</p>
        <small>📅 ${new Date(report.timestamp).toLocaleString()}</small>
      `;

      if (report.result.toLowerCase().includes("no disease")) {
        studentCard.classList.add("good");
        goodContainer.appendChild(studentCard);
      } else {
        studentCard.classList.add("ill");

        const addReportBtn = document.createElement("button");
        addReportBtn.textContent = "➕ Add Doctor Report";
        addReportBtn.style.marginTop = "10px";
        addReportBtn.style.padding = "6px 10px";
        addReportBtn.style.borderRadius = "6px";
        addReportBtn.style.border = "none";
        addReportBtn.style.cursor = "pointer";
        addReportBtn.style.backgroundColor = "#c62828";
        addReportBtn.style.color = "#fff";
        addReportBtn.style.fontWeight = "bold";

        // عند الضغط على زر إضافة تقرير
        addReportBtn.addEventListener("click", () => {
          const customReport = prompt(`Write a report for: ${report.name}`);
          if (customReport) {
            fetch("http://YOUR_BACKEND_URL/add-custom-report", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: report.name,
                report: customReport,
                timestamp: new Date().toISOString(),
              }),
            })
              .then(res => res.json())
              .then(data => {
                alert("✅ Report sent successfully");
              })
              .catch(err => {
                console.error("Failed to save report:", err);
                alert("❌ An error occurred while sending the report");
              });
          }
        });

        studentCard.appendChild(addReportBtn);
        illContainer.appendChild(studentCard);
      }
    });
  })
  .catch(err => {
    console.error("Failed to fetch data:", err);

    const errorCardIll = document.createElement("div");
    errorCardIll.className = "studentCard errorCard";
    errorCardIll.innerHTML = `
      <h3>⚠️ Error</h3>
      <p style="color:#b71c1c;">An error occurred while loading ill students data.</p>
    `;
    illContainer.appendChild(errorCardIll);

    const errorCardGood = document.createElement("div");
    errorCardGood.className = "studentCard good";
    errorCardGood.innerHTML = `
      <h3>⚠️ Error</h3>
      <p style="color:#b71c1c;">An error occurred while loading healthy students data.</p>
    `;
    goodContainer.appendChild(errorCardGood);
  });