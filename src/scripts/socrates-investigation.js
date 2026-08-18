(() => {
  'use strict';

  const lab = document.querySelector('[data-socratic-lab]');
  if (!lab) return;

  const form = lab.querySelector('[data-lab-form]');
  const steps = [...lab.querySelectorAll('[data-step]')];
  const result = lab.querySelector('[data-result]');
  const stageLabel = lab.querySelector('[data-stage-label]');
  const progress = lab.querySelector('[role="progressbar"]');
  const progressBar = lab.querySelector('[data-progress]');
  const originalDefinition = lab.querySelector('[data-original-definition]');
  const revisedDefinition = lab.querySelector('[data-revised-definition]');
  const resultHeading = lab.querySelector('[data-result-heading]');
  const resetButton = lab.querySelector('[data-reset]');

  if (!form || !steps.length || !result || !stageLabel || !progress || !progressBar) return;

  let currentStep = 0;

  function controlsForStep(step) {
    return [...step.querySelectorAll('input, textarea, select')];
  }

  function validateStep(step) {
    const controls = controlsForStep(step);
    const invalid = controls.find((control) => !control.checkValidity());
    if (!invalid) return true;
    invalid.reportValidity();
    invalid.focus();
    return false;
  }

  function focusStep(step) {
    const target = step.querySelector('legend, label > strong, h3, input, textarea');
    if (!target) return;
    if (!target.matches('input, textarea, select, button, a[href]')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function showStep(index, shouldFocus = true) {
    currentStep = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, position) => {
      step.hidden = position !== currentStep;
    });
    form.hidden = false;
    result.hidden = true;

    const humanStep = currentStep + 1;
    stageLabel.textContent = `Etapa ${humanStep} de ${steps.length}`;
    progress.setAttribute('aria-valuenow', String(humanStep));
    progressBar.style.width = `${(humanStep / steps.length) * 100}%`;

    if (shouldFocus) focusStep(steps[currentStep]);
  }

  lab.addEventListener('click', (event) => {
    const next = event.target.closest('[data-next]');
    if (next) {
      if (!validateStep(steps[currentStep])) return;
      showStep(currentStep + 1);
      return;
    }

    const back = event.target.closest('[data-back]');
    if (back) showStep(currentStep - 1);
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateStep(steps[currentStep])) return;

    const data = new FormData(form);
    const firstDefinition = String(data.get('definition') || '').trim();
    const finalDefinition = String(data.get('revision') || '').trim();

    if (originalDefinition) originalDefinition.textContent = firstDefinition;
    if (revisedDefinition) revisedDefinition.textContent = finalDefinition;

    form.hidden = true;
    result.hidden = false;
    stageLabel.textContent = 'Investigação concluída';
    progress.setAttribute('aria-valuenow', String(steps.length));
    progressBar.style.width = '100%';

    if (resultHeading) {
      resultHeading.focus({ preventScroll: true });
      resultHeading.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  resetButton?.addEventListener('click', () => {
    form.reset();
    if (originalDefinition) originalDefinition.textContent = '';
    if (revisedDefinition) revisedDefinition.textContent = '';
    showStep(0);
  });

  showStep(0, false);
})();
