(() => {
  'use strict';

  function syncScrollableFocus(selector) {
    document.querySelectorAll(selector).forEach((region) => {
      const isScrollable = region.scrollWidth > region.clientWidth + 1;
      if (isScrollable) {
        region.setAttribute('tabindex', '0');
        region.dataset.autoScrollableTabindex = 'true';
        return;
      }
      if (region.dataset.autoScrollableTabindex === 'true') {
        region.removeAttribute('tabindex');
        delete region.dataset.autoScrollableTabindex;
      }
    });
  }

  function validateStep(step) {
    const controls = [...step.querySelectorAll('input, textarea, select')];
    const invalid = controls.find((control) => !control.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    invalid.focus();
    return false;
  }

  function focusStep(step) {
    const target = step.querySelector('legend, label > strong, h3, input, textarea, button');
    if (!target) return;
    if (!target.matches('input, textarea, select, button, a[href]')) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function createStepper(config) {
    const lab = document.querySelector(config.root);
    if (!lab) return;

    const form = lab.querySelector(config.form);
    const steps = [...lab.querySelectorAll(config.step)];
    const result = lab.querySelector(config.result);
    const stage = lab.querySelector(config.stage);
    const progress = lab.querySelector('[role="progressbar"]');
    const progressBar = lab.querySelector(config.progressBar);
    const resultHeading = lab.querySelector(config.resultHeading);
    const resetButton = lab.querySelector(config.reset);
    const resultBindings = config.resultBindings.map(({ field, target }) => ({
      field,
      target: lab.querySelector(target),
    }));

    if (!form || !steps.length || !result || !stage || !progress || !progressBar) return;

    let currentStep = 0;

    function showStep(index, shouldFocus = true) {
      currentStep = Math.max(0, Math.min(index, steps.length - 1));
      steps.forEach((step, position) => {
        step.hidden = position !== currentStep;
      });
      form.hidden = false;
      result.hidden = true;

      const humanStep = currentStep + 1;
      stage.textContent = `Etapa ${humanStep} de ${steps.length}`;
      progress.setAttribute('aria-valuenow', String(humanStep));
      progressBar.style.width = `${(humanStep / steps.length) * 100}%`;

      if (shouldFocus) focusStep(steps[currentStep]);
    }

    lab.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;

      const next = target.closest(config.next);
      if (next) {
        if (!validateStep(steps[currentStep])) return;
        showStep(currentStep + 1);
        return;
      }

      const back = target.closest(config.back);
      if (back) showStep(currentStep - 1);
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateStep(steps[currentStep])) return;

      const data = new FormData(form);
      resultBindings.forEach(({ field, target }) => {
        if (target) target.textContent = String(data.get(field) || '').trim();
      });

      form.hidden = true;
      result.hidden = false;
      stage.textContent = config.completedLabel;
      progress.setAttribute('aria-valuenow', String(steps.length));
      progressBar.style.width = '100%';

      if (resultHeading) {
        resultHeading.focus({ preventScroll: true });
        resultHeading.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });

    resetButton?.addEventListener('click', () => {
      form.reset();
      resultBindings.forEach(({ target }) => {
        if (target) target.textContent = '';
      });
      showStep(0);
    });

    showStep(0, false);
  }

  syncScrollableFocus('.socrates-life-path');
  window.addEventListener('resize', () => syncScrollableFocus('.socrates-life-path'), { passive: true });

  createStepper({
    root: '[data-socratic-lab]',
    form: '[data-lab-form]',
    step: '[data-step]',
    result: '[data-result]',
    stage: '[data-stage-label]',
    progressBar: '[data-progress]',
    resultHeading: '[data-result-heading]',
    next: '[data-next]',
    back: '[data-back]',
    reset: '[data-reset]',
    completedLabel: 'Investigação concluída',
    resultBindings: [
      { field: 'definition', target: '[data-original-definition]' },
      { field: 'revision', target: '[data-revised-definition]' },
    ],
  });

  createStepper({
    root: '[data-belief-lab]',
    form: '[data-belief-form]',
    step: '[data-belief-step]',
    result: '[data-belief-result]',
    stage: '[data-belief-stage]',
    progressBar: '[data-belief-progress]',
    resultHeading: '[data-belief-result-heading]',
    next: '[data-belief-next]',
    back: '[data-belief-back]',
    reset: '[data-belief-reset]',
    completedLabel: 'Exame concluído',
    resultBindings: [
      { field: 'claim', target: '[data-belief-original]' },
      { field: 'counter', target: '[data-belief-counter-result]' },
      { field: 'revision', target: '[data-belief-revised]' },
    ],
  });
})();
