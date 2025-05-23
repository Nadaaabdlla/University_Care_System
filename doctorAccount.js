const edit = document.getElementById("edit");
const img = document.getElementById("img");
img.addEventListener('mouseover', () => {
    edit.classList.toggle('hidden')
});
document.addEventListener('DOMContentLoaded', () => {
    const applyBtn = document.querySelector('.apply');
    const firstNameInput = document.querySelector('input[placeholder="First name"]');
    const lastNameInput = document.querySelector('input[placeholder="Last name"]');
    const emailInput = document.querySelector('input[type="email"]');
    const phoneInput = document.querySelector('input[type="tel"]');
  
    // الفقرات اللي فوق عشان نحدثها
    const doctorDetailsParagraphs = document.querySelectorAll('.doctorDetails p');
  
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
      doctorDetailsParagraphs[0].textContent = firstName + ' ' + lastName; // الاسم كامل
      doctorDetailsParagraphs[1].textContent = 'doctor'; // ثابت (لو تحبي تخليه قابل للتعديل ممكن تضيفي حقل)
      doctorDetailsParagraphs[2].textContent = email;
      doctorDetailsParagraphs[3].textContent = phone;
  
      alert('تم تحديث البيانات بنجاح!');
    });
  });
  