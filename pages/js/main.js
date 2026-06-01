/**
 * AGM IR Admin -- Dashboard
 * AGENTS.md: const/let, ===, arrow fn, addEventListener, $ prefix, event delegation
 */

// ---- Sidebar toggle -------------------------------------------------

const initSidebar = () => {
  const $sidebar     = document.getElementById('sidebar');
  const $collapseBtn = document.getElementById('sb-collapse-btn');
  const $collapseIcon= document.getElementById('sb-collapse-icon');
  if (!$sidebar || !$collapseBtn || !$collapseIcon) return;

  $collapseBtn.addEventListener('click', () => {
    const isCollapsed = $collapseBtn.dataset.collapsed === 'true';
    if (isCollapsed) {
      $sidebar.classList.remove('w-0');
      $sidebar.classList.add('w-sidebar');
      $collapseBtn.dataset.collapsed = 'false';
      $collapseBtn.setAttribute('aria-expanded', 'true');
      $collapseBtn.setAttribute('aria-label', '사이드바 접기');
      $collapseIcon.className = 'ti ti-chevron-left';
    } else {
      $sidebar.classList.remove('w-sidebar');
      $sidebar.classList.add('w-0');
      $collapseBtn.dataset.collapsed = 'true';
      $collapseBtn.setAttribute('aria-expanded', 'false');
      $collapseBtn.setAttribute('aria-label', '사이드바 펼치기');
      $collapseIcon.className = 'ti ti-chevron-right';
    }
  });
};

// ---- Instance group accordion (event delegation) ----------------

const initIGAccordion = () => {
  const $nav = document.querySelector('#sidebar nav');
  if (!$nav) return;

  $nav.addEventListener('click', (event) => {
    const $hd = event.target.closest('[data-ig-toggle]');
    if (!$hd) return;

    const isExpanded = $hd.getAttribute('aria-expanded') === 'true';
    const $body = document.getElementById($hd.getAttribute('aria-controls'));
    if (!$body) return;

    $hd.setAttribute('aria-expanded', String(!isExpanded));
    $body.dataset.open = String(!isExpanded);
  });
};

// ---- Tab switching --------------------------------------------------

const initTabs = () => {
  const $tabBar = document.querySelector('[role="tablist"]');
  if (!$tabBar) return;

  const ACTIVE   = ['text-semantic-text-main', 'font-semibold', 'border-semantic-text-main'];
  const INACTIVE = ['text-semantic-text-tertiary', 'border-transparent', 'hover:text-agm-text-sub'];

  $tabBar.addEventListener('click', (event) => {
    const $tab = event.target.closest('[role="tab"]');
    if (!$tab) return;

    $tabBar.querySelectorAll('[role="tab"]').forEach(($t) => {
      const active = $t === $tab;
      $t.setAttribute('aria-selected', String(active));
      $t.classList[active ? 'remove' : 'add'](...INACTIVE);
      $t.classList[active ? 'add' : 'remove'](...ACTIVE);

      const $panel = document.getElementById($t.getAttribute('aria-controls'));
      if ($panel) $panel.classList.toggle('hidden', !active);
    });
  });
};

// ---- Modal ----------------------------------------------------------

const initModal = () => {
  const $modal = document.getElementById('modal-new-agm');
  const $form  = document.getElementById('form-new-agm');
  if (!$modal) return;

  const open = () => {
    $modal.classList.replace('hidden', 'flex');
    $modal.querySelector('input, button')?.focus();
  };
  const close = () => {
    $modal.classList.replace('flex', 'hidden');
    $form?.reset();
  };

  document.querySelectorAll('#btn-new-agm, #btn-create-agm').forEach(($b) =>
    $b.addEventListener('click', open)
  );
  document.querySelectorAll('#modal-close-btn, #btn-modal-cancel').forEach(($b) =>
    $b.addEventListener('click', close)
  );
  $modal.addEventListener('click', (e) => { if (e.target === $modal) close(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$modal.classList.contains('hidden')) close();
  });
  $form?.addEventListener('submit', (e) => { e.preventDefault(); close(); });
};

// ---- Card / table row navigation (event delegation) ----------------

const initNavigation = () => {
  const $main = document.getElementById('main-content');
  if (!$main) return;

  $main.addEventListener('click', (event) => {
    const $el = event.target.closest('[data-action="navigate"]');
    if (!$el) return;
    const $btn = event.target.closest('button[data-action="navigate"]');
    const href = ($btn ?? $el).dataset.href;
    if (href && href !== '#') location.href = href;
  });
};

// ---- Init -----------------------------------------------------------

const init = () => {
  initSidebar();
  initIGAccordion();
  initTabs();
  initModal();
  initNavigation();
};

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', init)
  : init();
