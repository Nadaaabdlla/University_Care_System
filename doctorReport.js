function editReport(button) {
  // العنصر الأب للزر (div.studentCard)
  const card = button.closest('.studentCard');

  // العنصر <p> اللي يحتوي نص التعليق (آخر <p> داخل card)
  // افتراضًا آخر <p> داخل studentCard هو نص التعليق
  const commentParagraph = card.querySelectorAll('p');
  const commentIndex = commentParagraph.length - 1;
  const commentP = commentParagraph[commentIndex];

  // لو موجود textarea (يعني في وضع تعديل) ما نفعلش شيء
  if (card.querySelector('textarea')) return;

  // خزن النص الحالي
  const originalText = commentP.textContent;

  // إنشاء textarea ومليها النص
  const textarea = document.createElement('textarea');
  textarea.value = originalText;
  textarea.style.width = '100%';
  textarea.style.minHeight = '80px';
  textarea.style.fontSize = '14px';


// إنشاء أزرار حفظ وإلغاء
const saveBtn = document.createElement('button');
saveBtn.textContent = 'save';
saveBtn.style.backgroundColor = '#4CAF50';  // أخضر
saveBtn.style.color = 'white';
saveBtn.style.border = 'none';
saveBtn.style.padding = '8px 16px';
saveBtn.style.marginRight = '15px';  // مسافة بين الزرين
saveBtn.style.borderRadius = '5px';
saveBtn.style.cursor = 'pointer';
saveBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
saveBtn.style.fontWeight = 'bold';

const cancelBtn = document.createElement('button');
cancelBtn.textContent = 'cancel';
cancelBtn.style.backgroundColor = '#f44336'; // أحمر
cancelBtn.style.color = 'white';
cancelBtn.style.border = 'none';
cancelBtn.style.padding = '8px 16px';
cancelBtn.style.borderRadius = '5px';
cancelBtn.style.cursor = 'pointer';
cancelBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
cancelBtn.style.fontWeight = 'bold';

  // استبدال نص الفقرة بال textarea والأزرار
  commentP.style.display = 'none'; // أخفي النص القديم
  commentP.parentNode.insertBefore(textarea, commentP.nextSibling);
  commentP.parentNode.insertBefore(saveBtn, textarea.nextSibling);
  commentP.parentNode.insertBefore(cancelBtn, saveBtn.nextSibling);

  // إخفاء زر Edit أثناء التعديل
  button.style.display = 'none';

  // حدث حفظ التعديل
  saveBtn.addEventListener('click', () => {
    const newText = textarea.value.trim();
    if (newText.length === 0) {
      alert('لا يمكن ترك التعليق فارغًا.');
      return;
    }
    commentP.textContent = newText;
    commentP.style.display = 'block';

    // إزالة textarea والأزرار
    textarea.remove();
    saveBtn.remove();
    cancelBtn.remove();

    // إظهار زر التعديل مرة أخرى
    button.style.display = 'inline-block';
  });

  // حدث إلغاء التعديل
  cancelBtn.addEventListener('click', () => {
    commentP.style.display = 'block';
    textarea.remove();
    saveBtn.remove();
    cancelBtn.remove();
    button.style.display = 'inline-block';
  });
}
