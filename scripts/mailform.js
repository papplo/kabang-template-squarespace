function honeypotAction() {

  const templateParams = {
    firstname: document.forms["honeypot"]["grid-first-name"],
    lastname: document.forms["honeypot"]["grid-last-name"],
    email: document.forms["honeypot"]["grid-email"],
    subject: document.forms["honeypot"]["grid-subject"],
    content: document.forms["honeypot"]["grid-content"]
  }
  const getValues = obj => {
    result = {};
    for (var variable in obj) {
      if (obj.hasOwnProperty(variable)) {
        result[variable] = obj[variable].value;
      }
    }
    return result;
  }
  const s_id = "default_service";
  const t_id = "kabang_honeypot_clone";


  function validateForm(node) {
    const validationErrorElement = document.createElement('p');
    validationErrorElement.classList.add('--isError');
    validationErrorElement.textContent = 'Lämna inga fält tomma!';

    if (node.value === '' || node.value === undefined || node.value === 'angular') {
      node.classList.add('border-orange-500', 'border-2');
      const errors = document.querySelector('.--isError');
      errors && errors.remove();
      node.parentNode.insertBefore(validationErrorElement, node.nextSibling);
      return true;
    }
    if (node.value && node.value.length > 3) {
      node.classList.remove('border-orange-500', 'border-2');
      const errors = document.querySelector('.--isError');
      errors && errors.remove();
    }
    return false
  }

  let formErrors = false, i = 0;
  while (!formErrors && i < 5) {
    formErrors = validateForm(Object.values(templateParams)[i]);
    i++;
  }

  function rewardWithHoneyPot() {
    const url = '/honeypot'
    window.location.href = url;
  }

  if (!formErrors) {
    const button = document.getElementsByName('honeypot-submit')[0];
    button.value = 'Skickar...';
    emailjs.send(s_id, t_id, getValues(templateParams))
    	.then(function(){
         button.value = 'Klart!';
         rewardWithHoneyPot();
      }, function(err) {
         alert("Emailet gick inte att sända tyvärr!\r\n Response:\n " + JSON.stringify(err));
         button.value = 'Tack för det!';
      });
  }

  return false;
};
