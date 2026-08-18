(() => {
  'use strict';

  function syncScrollableFocus() {
    const path = document.querySelector('.socrates-life-path');
    if (!path) return;
    const isScrollable = path.scrollWidth > path.clientWidth + 1;
    if (isScrollable) {
      path.setAttribute('tabindex', '0');
      path.dataset.autoScrollableTabindex = 'true';
      return;
    }
    if (path.dataset.autoScrollableTabindex === 'true') {
      path.removeAttribute('tabindex');
      delete path.dataset.autoScrollableTabindex;
    }
  }

  syncScrollableFocus();
  window.addEventListener('resize', syncScrollableFocus, { passive: true });

  const lab = document.querySelector('[data-belief-lab]');
  if (!lab) return;

  const form = lab.querySelector('[data-belief-form]');
  const steps = [...lab.querySelectorAll('[data-belief-step]')];
  const result = lab.querySelector('[data-belief-result]');
  const stage = lab.querySelector('[data-belief-stage]');
  const progress = lab.querySelector('[role="progressbar"]');
  const progressBar = lab.querySelector('[data-belief-progress]');
  const original = lab.querySelector('[data-belief-original]');
  const counter = lab.querySelector('[data-belief-counter-result]');
  const revised = lab.querySelector('[data-belief-revised]');
  const resultHeading = lab.querySelector('[data-belief-result-heading]');
  const reset = lab.querySelector('[data-belief-reset]');

  if (!form || !steps.length || !result || !stage || !progress || !progressBar) return;

  let current = 0;

  function focusTarget(container) {
    const target = container.querySelector('label > strong, h3, textarea, input, button');
    if (!target) return;
    if (!target.matches('textarea, input, button, a[href], select')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function validate(container) {
    const controls = [...container.querySelectorAll('input, textarea, select')];
    const invalid = controls.find((control) => !control.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    invalid.focus();
    return false;
  }

  function show(index, shouldFocus = true) {
    current = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, position) => {
      step.hidden = position !== current;
    });
    form.hidden = false;
    result.hidden = true;

    const number = current + 1;
    stage.textContent = `Etapa ${number} de ${steps.length}`;
    progress.setAttribute('aria-valuenow', String(number));
    progressBar.style.width = `${(number / steps.length) * 100}%`;

    if (shouldFocus) focusTarget(steps[current]);
  }

  lab.addEventListener('click', (event) => {
    const next = event.target.closest('[data-belief-next]');
    if (next) {
      if (!validate(steps[current])) return;
      show(current + 1);
      return;
    }

    const back = event.target.closest('[data-belief-back]');
    if (back) show(current - 1);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validate(steps[current])) return;

    const data = new FormData(form);
    const claim = String(data.get('claim') || '').trim();
    const counterexample = String(data.get('counter') || '').trim();
    const revision = String(data.get('revision') || '').trim();

    if (original) original.textContent = claim;
    if (counter) counter.textContent = counterexample;
    if (revised) revised.textContent = revision;

    form.hidden = true;
    result.hidden = false;
    stage.textContent = 'Exame concluído';
    progress.setAttribute('aria-valuenow', String(steps.length));
    progressBar.style.width = '100%';

    if (resultHeading) {
      resultHeading.focus({ preventScroll: true });
      resultHeading.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  reset?.addEventListener('click', () => {
    form.reset();
    if (original) original.textContent = '';
    if (counter) counter.textContent = '';
    if (revised) revised.textContent = '';
    show(0);
  });

  show(0, false);
})();
