document.addEventListener('DOMContentLoaded', () => {
    const applyBtn = document.querySelector('.apply');
    const firstNameInput = document.querySelector('input[placeholder="First name"]');
    const lastNameInput = document.querySelector('input[placeholder="Last name"]');
    const emailInput = document.querySelector('input[type="email"]');
    const phoneInput = document.querySelector('input[type="tel"]');
  
    // الفقرات اللي فوق عشان نحدثها
    const studentDetailsParagraphs = document.querySelectorAll('.studentDetails p');
  
    applyBtn.addEventListener('click', (e) => {
      e.preventDefault(); // عشان ما يعيدش تحميل الصفحة لو الزر داخل فورم
  
      // قيم الحقول
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
  
      if (!firstName || !lastName || !email || !phone) {
        alert('من فضلك املأ كل الحقول.');
        return;
      }
  
      // تحديث النصوص
      studentDetailsParagraphs[0].textContent = firstName + ' ' + lastName; // الاسم كامل
      studentDetailsParagraphs[1].textContent = 'Student'; // ثابت (لو تحبي تخليه قابل للتعديل ممكن تضيفي حقل)
      studentDetailsParagraphs[2].textContent = email;
      studentDetailsParagraphs[3].textContent = phone;
  
      alert('تم تحديث البيانات بنجاح!');
    });
  });
  