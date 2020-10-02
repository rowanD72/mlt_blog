(function () {
    'use strict'
    window.addEventListener('load', () => {
        let forms = document.getElementsByClassName('needs-validation')
        let validation = Array.prototype.filter.call(forms, (form) => {
            form.addEventListener('submit', (event) => {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();