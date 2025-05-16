window.addEventListener("load", () => {
  const drIdInput = document.getElementById("drId");
  const btnDoctor = document.getElementById("formTypeBtn1");
  const btnStudent = document.getElementById("formTypeBtn2");
  const form = document.getElementById("signUpForm");

  let userType = "student"; // القيمة الافتراضية

  function toggleFormType(selected) {
    userType = selected;
    if (selected === "doctor") {
      drIdInput.classList.remove("hidden");
      drIdInput.required = true;  // اجعل إدخال الدكتور مطلوب
      btnDoctor.classList.add("hover");
      btnStudent.classList.remove("hover");
    } else {
      drIdInput.classList.add("hidden");
      drIdInput.required = false; // مش مطلوب للطالب
      btnDoctor.classList.remove("hover");
      btnStudent.classList.add("hover");
    }
  }

  btnDoctor.addEventListener("click", (e) => {
    e.preventDefault();
    toggleFormType("doctor");
  });

  btnStudent.addEventListener("click", (e) => {
    e.preventDefault();
    toggleFormType("student");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // منع الإرسال الافتراضي

    // تأكد أن الدكتور حط ID لو هو دكتور
    if (userType === "doctor" && drIdInput.value.trim() === "") {
      alert("Please enter Doctor ID.");
      return;
    }

    // تجهيز البيانات للإرسال
    const formData = {
      firstName: form[0].value,
      lastName: form[1].value,
      phone: form[2].value,
      email: form[3].value,
      password: form[4].value,
      doctorId: userType === "doctor" ? drIdInput.value : null,
      userType: userType,
    };

    try {
      // إرسال البيانات للسيرفر (غير الرابط حسب سيرفرك)
      if (userType === "doctor") {
       
      const response = await fetch("https://universitycaresystem.runasp.net/api/Auth/register/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
       }
else{
     
      const response = await fetch("https://universitycaresystem.runasp.net/api/Auth/register/doctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
}
      const result = await response.json();

      if (response.ok) {
        // بعد النجاح، توجه للصفحة المناسبة
        if (userType === "doctor") {
          window.location.href = "/doctor-home.html";
        } else {
          window.location.href = "/student-home.html";
        }
      } else {
        alert(result.message || "Sign up failed.");
      }
    } catch (error) {
      alert("Error connecting to server.");
      console.error(error);
    }
  });
});

