const reportContainer = document.querySelector(".studentDetails");
const reportImage = document.querySelector("#img");

// 👇 نجيب اسم الطالب من localStorage أو URL أو ثابت مؤقت
const studentName = "Nada Tarek"; // ممكن تستبدليه لاحقًا بـ session أو login

fetch(`http://YOUR_BACKEND_URL/student-report?name=${encodeURIComponent(studentName)}`)
  .then(res => res.json())
  .then(data => {
    // لو مفيش بيانات
    if (!data || !data.result) {
      reportContainer.innerHTML = "<p>لا يوجد تقرير حتى الآن.</p>";
      return;
    }

    const { result, timestamp, imageName, customReport, imageUrl } = data;

    // عرض بيانات التقرير
    reportContainer.innerHTML = `
      <h3>👩‍⚕️ الاسم: ${studentName}</h3>
      <p>🧪 نتيجة التحليل: <strong>${result}</strong></p>
      <p>📅 التاريخ: ${new Date(timestamp).toLocaleString()}</p>
      ${customReport ? `<p>📄 تقرير الدكتور: ${customReport}</p>` : "<p>📄 لا يوجد تقرير دكتور حتى الآن.</p>"}
    `;

    // عرض صورة الأشعة لو فيه رابط
    if (imageUrl) {
      reportImage.src = imageUrl;
      reportImage.classList.remove("hidden");
      reportImage.style.maxWidth = "300px";
      reportImage.style.marginTop = "10px";
      reportImage.alt = imageName || "X-ray";
    }
  })
  .catch(err => {
    console.error("خطأ في تحميل التقرير:", err);
    reportContainer.innerHTML = "<p style='color:red;'>حدث خطأ أثناء تحميل التقرير.</p>";
  });
