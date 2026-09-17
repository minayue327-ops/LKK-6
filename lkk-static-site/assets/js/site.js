/**
 * LKK 洛可可创新设计集团 - 官方网站核心交互脚本
 * 原生 JavaScript 驱动，无任何第三方框架依赖
 * 支持现代浏览器，原生适配 Cloudflare Pages / Nginx / 静态托管
 */

(function() {
  'use strict';

  // =========================================================================
  // 1. 桌面端 1707px 物理基准等比缩放引擎 (Desktop Proportional Scale Engine)
  // =========================================================================
  const DESKTOP_DESIGN_WIDTH = 1707;
  const MIN_DESKTOP_WIDTH = 1024;
  const MAX_DESKTOP_WIDTH = 2560;

  function calculateDesktopScale(viewportWidth) {
    if (viewportWidth < MIN_DESKTOP_WIDTH) return 1;
    const minScale = MIN_DESKTOP_WIDTH / DESKTOP_DESIGN_WIDTH;
    const maxScale = MAX_DESKTOP_WIDTH / DESKTOP_DESIGN_WIDTH;
    const ratio = viewportWidth / DESKTOP_DESIGN_WIDTH;
    return Math.min(Math.max(minScale, ratio), maxScale);
  }

  function updateDesktopScale() {
    const width = window.innerWidth;
    const scale = calculateDesktopScale(width);
    const root = document.documentElement;

    root.style.setProperty('--desktop-design-width', DESKTOP_DESIGN_WIDTH + 'px');
    root.style.setProperty('--desktop-page-scale', scale.toString());

    const shells = document.querySelectorAll('.desktop-scale-shell');
    shells.forEach(shell => {
      const canvas = shell.querySelector('.desktop-scale-canvas');
      if (!canvas) return;

      if (width >= MIN_DESKTOP_WIDTH) {
        const unscaledHeight = Math.max(canvas.offsetHeight, canvas.scrollHeight);
        shell.style.height = (unscaledHeight * scale) + 'px';
        const unscaledOffsetX = Math.max(0, (width - DESKTOP_DESIGN_WIDTH * scale) / 2);
        root.style.setProperty('--desktop-canvas-offset-x', (unscaledOffsetX / scale) + 'px');
      } else {
        shell.style.height = '';
        root.style.setProperty('--desktop-canvas-offset-x', '0px');
      }
    });
  }

  window.addEventListener('resize', () => requestAnimationFrame(updateDesktopScale), { passive: true });
  window.addEventListener('orientationchange', () => requestAnimationFrame(updateDesktopScale), { passive: true });
  window.addEventListener('load', updateDesktopScale);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(updateDesktopScale);
  }

  // =========================================================================
  // 2. 页面顶部 Header 滚动穿透与磨砂毛玻璃控制
  // =========================================================================
  let lastScrollY = 0;
  function handleHeaderScroll() {
    const header = document.querySelector('.site-header, header');
    if (!header) return;
    const currentY = window.scrollY;

    // 毛玻璃渐变
    if (currentY > 20) {
      header.classList.add('is-glass');
    } else {
      header.classList.remove('is-glass');
    }

    // 智能折叠/展开
    if (currentY > 120 && currentY > lastScrollY + 5) {
      header.classList.add('is-hidden');
    } else if (currentY < lastScrollY - 5 || currentY <= 120) {
      header.classList.remove('is-hidden');
    }
    lastScrollY = currentY;
  }

  window.addEventListener('scroll', () => requestAnimationFrame(handleHeaderScroll), { passive: true });

  // =========================================================================
  // 3. 导航栏下拉菜单交互 (Mega-Menu Dropdowns)
  // =========================================================================
  function initDropdownMenus() {
    const dropdownGroups = document.querySelectorAll('.nav-dropdown-group');
    dropdownGroups.forEach(group => {
      const menu = group.querySelector('.nav-dropdown-menu');
      if (!menu) return;

      let timeoutId = null;
      group.addEventListener('mouseenter', () => {
        clearTimeout(timeoutId);
        dropdownGroups.forEach(g => {
          if (g !== group) {
            const m = g.querySelector('.nav-dropdown-menu');
            if (m) m.classList.add('hidden');
          }
        });
        menu.classList.remove('hidden');
      });

      group.addEventListener('mouseleave', () => {
        timeoutId = setTimeout(() => {
          menu.classList.add('hidden');
        }, 150);
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown-group')) {
        document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.classList.add('hidden'));
      }
    });
  }

  // =========================================================================
  // 4. 移动端侧边抽屉式导航 (Mobile Drawer Navigation)
  // =========================================================================
  function initMobileDrawer() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle-btn');
    const drawer = document.querySelector('#mobile-menu-drawer');
    const closeBtn = document.querySelector('.mobile-menu-close-btn');
    const backdrop = document.querySelector('#mobile-menu-backdrop');

    if (!toggleBtn || !drawer) return;

    function openDrawer() {
      drawer.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.add('hidden');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openDrawer();
    });

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (backdrop) backdrop.addEventListener('click', closeDrawer);

    // 点击抽屉内链接自动关闭
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // =========================================================================
  // 5. 核心指标数字平滑自增动画 (Stats Counter Engine)
  // =========================================================================
  function initCounters() {
    const counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-counter-target') || '0');
        const prefix = el.getAttribute('data-counter-prefix') || '';
        const suffix = el.getAttribute('data-counter-suffix') || '';
        const duration = 1500;
        const start = performance.now();

        function update(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * easeProgress);
          el.textContent = prefix + current + suffix;
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = prefix + target + suffix;
          }
        }

        requestAnimationFrame(update);
        obs.unobserve(el);
      });
    }, { threshold: 0.1 });

    counters.forEach(c => observer.observe(c));
  }

  // =========================================================================
  // 6. 标题双向滚动渐变显现动效 (Scroll Reveal for Section Titles)
  // =========================================================================
  function initScrollRevealHeadings() {
    const headings = document.querySelectorAll('.scroll-section-header h2, .scroll-reveal-heading');
    if (!headings.length) return;

    headings.forEach(heading => {
      if (heading.dataset.charsInitialized) return;
      const text = heading.innerText.trim();
      heading.innerText = '';
      for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.className = 'char inline-block transition-colors duration-200';
        span.textContent = text[i];
        heading.appendChild(span);
      }
      heading.dataset.charsInitialized = 'true';
    });

    function updateChars() {
      const windowHeight = window.innerHeight;
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        // Visible range
        const start = windowHeight * 0.85;
        const end = windowHeight * 0.35;
        const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
        const chars = heading.querySelectorAll('.char');
        chars.forEach((c, idx) => {
          const charThreshold = idx / chars.length;
          if (progress >= charThreshold) {
            c.style.color = '#1a1a1a';
            c.style.opacity = '1';
          } else {
            c.style.color = '#d4d4d4';
            c.style.opacity = '0.4';
          }
        });
      });
    }

    window.addEventListener('scroll', () => requestAnimationFrame(updateChars), { passive: true });
    updateChars();
  }

  // =========================================================================
  // 7. 首页大图轮播控制器 (Homepage Hero Carousel)
  // =========================================================================
  function initHeroCarousel() {
    const carousel = document.querySelector('.hero-carousel-container');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.hero-carousel-slide');
    const dots = carousel.querySelectorAll('.hero-carousel-dot');
    const prevBtn = carousel.querySelector('.hero-carousel-prev');
    const nextBtn = carousel.querySelector('.hero-carousel-next');

    if (!slides.length) return;
    let currentIndex = 0;
    let timer = null;

    function goTo(index) {
      slides[currentIndex].classList.add('hidden');
      slides[currentIndex].classList.remove('opacity-100');
      slides[currentIndex].classList.add('opacity-0');

      if (dots[currentIndex]) {
        dots[currentIndex].classList.remove('bg-white', 'w-8');
        dots[currentIndex].classList.add('bg-white/40', 'w-2.5');
      }

      currentIndex = (index + slides.length) % slides.length;

      slides[currentIndex].classList.remove('hidden');
      slides[currentIndex].classList.remove('opacity-0');
      slides[currentIndex].classList.add('opacity-100');

      if (dots[currentIndex]) {
        dots[currentIndex].classList.add('bg-white', 'w-8');
        dots[currentIndex].classList.remove('bg-white/40', 'w-2.5');
      }
    }

    function startAuto() {
      stopAuto();
      timer = setInterval(() => goTo(currentIndex + 1), 7000);
    }

    function stopAuto() {
      if (timer) clearInterval(timer);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentIndex - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentIndex + 1); startAuto(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => { goTo(idx); startAuto(); });
    });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    goTo(0);
    startAuto();
  }

  // =========================================================================
  // 8. 案例筛选 Tab 交互 (Cases Filtering Engine)
  // =========================================================================
  function initCaseFilterTabs() {
    const tabs = document.querySelectorAll('.case-filter-tab');
    const caseCards = document.querySelectorAll('.case-grid-card');
    if (!tabs.length || !caseCards.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-case-category');
        tabs.forEach(t => {
          t.classList.remove('bg-[#007BC7]', 'text-white', 'font-bold');
          t.classList.add('bg-neutral-100', 'text-neutral-600');
        });
        tab.classList.add('bg-[#007BC7]', 'text-white', 'font-bold');
        tab.classList.remove('bg-neutral-100', 'text-neutral-600');

        caseCards.forEach(card => {
          const cardCats = (card.getAttribute('data-category') || '').split(' ');
          if (category === 'all' || cardCats.includes(category)) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
        updateDesktopScale();
      });
    });
  }

  // =========================================================================
  // 9. 弹出式咨询弹窗与案例弹窗控制器 (Modal Controller)
  // =========================================================================
  function initModals() {
    const contactModal = document.querySelector('#contact-modal');
    const caseModal = document.querySelector('#case-preview-modal');

    // 绑定所有触发联系我们弹窗的按钮
    document.querySelectorAll('[data-open-modal="contact"], .btn-open-contact-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (contactModal) {
          contactModal.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // 绑定所有弹窗关闭按钮
    document.querySelectorAll('.modal-close-btn, .modal-backdrop').forEach(closeEl => {
      closeEl.addEventListener('click', () => {
        if (contactModal) contactModal.classList.add('hidden');
        if (caseModal) caseModal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (contactModal) contactModal.classList.add('hidden');
        if (caseModal) caseModal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }

  // =========================================================================
  // 10. 标准表单提交拦截与用户友好交互反馈 (Form Submissions)
  // =========================================================================
  function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // 校验必填项
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.innerHTML : '';
        if (btn) {
          btn.innerHTML = '<span>提交中...</span>';
          btn.disabled = true;
        }

        setTimeout(() => {
          // 提交成功反馈展示
          const successContainer = form.parentElement.querySelector('.form-success-message');
          if (successContainer) {
            form.classList.add('hidden');
            successContainer.classList.remove('hidden');
          } else {
            alert('感谢您的垂询！洛可可创新咨询专家将在 15 分钟内与您致电联系。');
            form.reset();
            if (btn) {
              btn.innerHTML = originalText;
              btn.disabled = false;
            }
          }
        }, 600);
      });
    });
  }

  // =========================================================================
  // 11. 动态 URL 参数支持 (URL Parameters & Tab Switcher)
  // =========================================================================
  function initUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const caseId = params.get('id');
    const serviceId = params.get('service');
    const industryKey = params.get('key');

    // 针对案例详情页的多案例切换
    if (caseId && document.querySelector('#case-detail-container')) {
      const caseSections = document.querySelectorAll('[data-case-id]');
      caseSections.forEach(sec => {
        if (sec.getAttribute('data-case-id') === caseId) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });
    }

    // 针对服务详情页的多服务切换
    if (serviceId && document.querySelector('#service-detail-container')) {
      const serviceSections = document.querySelectorAll('[data-service-id]');
      serviceSections.forEach(sec => {
        if (sec.getAttribute('data-service-id') === serviceId) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });
    }
  }

  // =========================================================================
  // 12. DOM 加载完成初始化
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    updateDesktopScale();
    handleHeaderScroll();
    initDropdownMenus();
    initMobileDrawer();
    initCounters();
    initScrollRevealHeadings();
    initHeroCarousel();
    initCaseFilterTabs();
    initModals();
    initForms();
    initUrlParams();

    // 确保所有图片加载后重新计算高度
    document.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', updateDesktopScale, { once: true });
      }
    });

    setTimeout(updateDesktopScale, 200);
    setTimeout(updateDesktopScale, 800);
  });

})();
