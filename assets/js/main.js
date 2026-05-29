(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');

  function closePrimaryNav(){
    if(!nav || !toggle) return;
    nav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open menu');
  }

  function getScrollOffset(){
    const header = document.querySelector('.site-header');
    const schoolNav = document.querySelector('.school-nav-b');
    let offset = 18;
    if(header && getComputedStyle(header).position === 'sticky'){
      offset += header.offsetHeight;
    }
    if(schoolNav && getComputedStyle(schoolNav).position === 'sticky'){
      offset += schoolNav.offsetHeight;
    }
    return offset;
  }

  if(toggle && nav){
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      toggle.classList.toggle('is-open', !isOpen);
      nav.classList.toggle('is-open', !isOpen);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const id = link.getAttribute('href');
      if(!id || id === '#') return;
      const target = document.querySelector(id);
      if(!target) return;
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - getScrollOffset();
      window.scrollTo({top, behavior:'smooth'});
      closePrimaryNav();
    });
  });

  const schoolLinks = Array.from(document.querySelectorAll('.school-nav-b a'));
  const sections = schoolLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if(schoolLinks.length && sections.length){
    const setActive = () => {
      if(!window.matchMedia('(min-width: 901px)').matches){
        schoolLinks.forEach((link, index) => link.classList.toggle('is-active', index === 0));
        return;
      }
      const offset = getScrollOffset() + 22;
      let current = sections[0];
      sections.forEach(section => {
        if(section.getBoundingClientRect().top - offset <= 0) current = section;
      });
      schoolLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === '#' + current.id));
    };
    setActive();
    window.addEventListener('scroll', setActive, {passive:true});
    window.addEventListener('resize', setActive);
  }
})();
