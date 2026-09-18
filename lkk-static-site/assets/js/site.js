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
  // 8. 案例筛选、搜索与分页加载引擎 (Cases Engine)
  // =========================================================================
  function initCasesEngine() {
    const grid = document.querySelector('#cases-grid-container');
    if (!grid) return;

    const searchInput = document.querySelector('#cases-search-input');
    const searchClear = document.querySelector('#cases-search-clear');
    const loadMoreBtn = document.querySelector('#cases-load-more-btn');
    const loadedCountEl = document.querySelector('#cases-loaded-count');
    const totalCountEl = document.querySelector('#cases-total-count');
    const progressBar = document.querySelector('#cases-progress-bar');
    const paginationWrapper = document.querySelector('#cases-pagination-wrapper');

    let selectedIndustry = '全部';
    let selectedService = '全部';
    let searchQuery = '';
    let currentLimit = 24;

    const allCases = window.LKK_ALL_CASES || [];

    function renderCases() {
      const filtered = allCases.filter(item => {
        const matchIndustry = selectedIndustry === '全部' || item.industry === selectedIndustry;
        const matchService = selectedService === '全部' || item.service === selectedService;
        const matchSearch = !searchQuery || 
          (item.title && item.title.toLowerCase().includes(searchQuery)) ||
          (item.client && item.client.toLowerCase().includes(searchQuery)) ||
          (item.desc && item.desc.toLowerCase().includes(searchQuery)) ||
          (item.industry && item.industry.toLowerCase().includes(searchQuery));
        return matchIndustry && matchService && matchSearch;
      });

      const total = filtered.length;
      const visible = filtered.slice(0, currentLimit);

      if (visible.length === 0) {
        grid.innerHTML = '<div class="col-span-full py-16 text-center text-neutral-400"><p class="text-base font-medium">未找到符合条件的案例</p><p class="text-xs text-neutral-400 mt-2">请尝试更换筛选条件或搜索关键词</p></div>';
      } else {
        grid.innerHTML = visible.map(c => `
          <a href="case-detail.html?case=${c.id}" class="case-card-v2 block relative text-left w-full outline-none select-none overflow-hidden text-decoration-none">
            <img src="${c.image}" alt="${c.title}" referrerPolicy="no-referrer" loading="lazy" class="w-full h-full object-cover" />
            <div class="case-summary-v2">
              <div class="case-brand-label">${c.client || ''}</div>
              <button type="button" class="case-detail-arrow cursor-pointer border-none" data-case-id="${c.id}" aria-label="查看案例简介">
                <span>案例简介</span>
                <span>↗</span>
              </button>
              <div class="case-bottom-block">
                <div class="case-divider">-</div>
                <div class="case-title">${c.title}</div>
                <div class="case-desc">${c.desc || ''}</div>
              </div>
            </div>
          </a>
        `).join('');
      }

      if (loadedCountEl) loadedCountEl.textContent = visible.length;
      if (totalCountEl) totalCountEl.textContent = total;
      if (progressBar) {
        const pct = total === 0 ? 0 : Math.min(100, Math.round((visible.length / total) * 100));
        progressBar.style.width = pct + '%';
      }

      if (loadMoreBtn && paginationWrapper) {
        if (visible.length >= total) {
          loadMoreBtn.style.display = 'none';
        } else {
          loadMoreBtn.style.display = 'inline-flex';
        }
      }

      bindCaseDetailArrows();
      updateDesktopScale();
    }

    const filterButtons = document.querySelectorAll('button');
    filterButtons.forEach(btn => {
      const text = btn.textContent.trim();
      const parentRow = btn.closest('.flex.items-start');
      if (!parentRow) return;

      const label = parentRow.querySelector('span');
      if (!label) return;

      const labelText = label.textContent.trim();
      if (labelText.includes('行业')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          parentRow.querySelectorAll('button').forEach(b => {
            b.className = 'relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 shrink-0 select-none cursor-pointer border-none bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70';
            const bgDiv = b.querySelector('div');
            if (bgDiv) bgDiv.remove();
          });
          btn.className = 'relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 shrink-0 select-none cursor-pointer border-none bg-transparent text-white font-bold';
          btn.insertAdjacentHTML('afterbegin', '<div class="absolute inset-0 bg-[#007BC7] rounded-full -z-0"></div>');
          selectedIndustry = text;
          currentLimit = 24;
          renderCases();
        });
      } else if (labelText.includes('服务')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          parentRow.querySelectorAll('button').forEach(b => {
            b.className = 'relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 shrink-0 select-none cursor-pointer border-none bg-transparent text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70';
            const bgDiv = b.querySelector('div');
            if (bgDiv) bgDiv.remove();
          });
          btn.className = 'relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 shrink-0 select-none cursor-pointer border-none bg-transparent text-white font-bold';
          btn.insertAdjacentHTML('afterbegin', '<div class="absolute inset-0 bg-[#007BC7] rounded-full -z-0"></div>');
          selectedService = text;
          currentLimit = 24;
          renderCases();
        });
      }
    });

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        if (searchClear) searchClear.style.display = searchQuery ? 'block' : 'none';
        currentLimit = 24;
        renderCases();
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        searchClear.style.display = 'none';
        currentLimit = 24;
        renderCases();
      });
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        currentLimit += 24;
        renderCases();
      });
    }

    renderCases();
  }

  // =========================================================================
  // 9. 全局弹窗控制器 (Modals: Contact & Case Popup)
  // =========================================================================
  function openContactModal() {
    const modal = document.querySelector('#global-contact-modal');
    if (modal) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }
  }

  function closeContactModal() {
    const modal = document.querySelector('#global-contact-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  function openCaseModal(caseItem) {
    const modal = document.querySelector('#global-case-modal');
    if (!modal || !caseItem) return;

    const img = modal.querySelector('#modal-case-image');
    const title = modal.querySelector('#modal-case-title');
    const desc = modal.querySelector('#modal-case-desc');
    const industry = modal.querySelector('#modal-case-industry');
    const service = modal.querySelector('#modal-case-service');
    const detailBtn = modal.querySelector('#modal-case-detail-btn');

    if (img) img.src = caseItem.image || 'assets/images/7.15.1.3.gif';
    if (title) title.textContent = caseItem.title || '';
    if (desc) desc.textContent = caseItem.desc || '';
    if (industry) industry.textContent = caseItem.industry || '';
    if (service) service.textContent = caseItem.service || '';
    if (detailBtn) detailBtn.href = 'case-detail.html?case=' + caseItem.id;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeCaseModal() {
    const modal = document.querySelector('#global-case-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  function bindCaseDetailArrows() {
    const allCases = window.LKK_ALL_CASES || [];
    document.querySelectorAll('.case-detail-arrow').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const caseId = btn.getAttribute('data-case-id');
        const item = allCases.find(c => c.id === caseId);
        if (item) {
          openCaseModal(item);
        } else {
          const parentA = btn.closest('a');
          if (parentA) window.location.href = parentA.href;
        }
      };
    });
  }

  function initModals() {
    document.querySelectorAll('[data-open-modal="contact"], .btn-open-contact-modal, #modal-case-contact-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeCaseModal();
        openContactModal();
      });
    });

    document.querySelectorAll('.contact-modal-close, .contact-modal-overlay').forEach(el => {
      el.addEventListener('click', closeContactModal);
    });

    document.querySelectorAll('.case-modal-close, .case-modal-overlay').forEach(el => {
      el.addEventListener('click', closeCaseModal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeContactModal();
        closeCaseModal();
      }
    });

    bindCaseDetailArrows();
  }

  // =========================================================================
  // 10. 案例详情页侧栏智能控制 (Sticky Sidebar Logic)
  // =========================================================================
  function initCaseDetailSidebar() {
    const sidebar = document.querySelector('.case-detail-sidebar');
    const collapseBtn = document.querySelector('#case-sidebar-collapse-btn');
    const expandWrapper = document.querySelector('#case-sidebar-expand-wrapper');
    const expandBtn = document.querySelector('#case-sidebar-expand-btn');

    if (!sidebar) return;

    const content = sidebar.querySelector('.anli-content-left');
    if (content) {
      content.style.opacity = '1';
      content.style.transition = 'opacity 0.3s ease';
    }

    if (collapseBtn) {
      collapseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sidebar.style.display = 'none';
        if (expandWrapper) expandWrapper.style.display = 'block';
        updateDesktopScale();
      });
    }

    if (expandBtn) {
      expandBtn.addEventListener('click', (e) => {
        e.preventDefault();
        sidebar.style.display = 'block';
        if (expandWrapper) expandWrapper.style.display = 'none';
        updateDesktopScale();
      });
    }
  }

  // =========================================================================
  // 11. 标准表单提交拦截与用户友好交互反馈 (Form Submissions)
  // =========================================================================
  function initForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
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
          if (form.id === 'global-modal-form') {
            const card = form.parentElement;
            if (card) {
              card.innerHTML = `
                <button type="button" class="contact-modal-close absolute top-6 right-6 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-all border-none bg-transparent cursor-pointer" aria-label="关闭弹窗">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                </button>
                <div class="py-12 text-center flex flex-col items-center justify-center animate-modal-in">
                  <div class="w-16 h-16 bg-[#E5F2FA] text-[#007BC7] rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h4 class="text-xl font-bold text-neutral-900">恭喜，创新方案需求提交成功！</h4>
                  <p class="text-xs text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
                    我们已收到您的项目概况。负责该垂直行业的品类总监与资深主笔设计师将在下一个工作日前与您取得联系，并为您量身打造第一版“品类策略初稿”。
                  </p>
                </div>
              `;
              const newClose = card.querySelector('.contact-modal-close');
              if (newClose) newClose.addEventListener('click', closeContactModal);
            }
            return;
          }

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
        }, 500);
      });
    });
  }

  // =========================================================================
  // 12. 动态 URL 参数支持 (URL Parameters & Dynamic Routing)
  // =========================================================================
  function initUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const caseParam = params.get('case') || params.get('id');

    if (caseParam && window.LKK_ALL_CASES) {
      const caseItem = window.LKK_ALL_CASES.find(c => c.id === caseParam);
      if (caseItem) {
        const titleEl = document.querySelector('.anli-title, #case-detail-title');
        if (titleEl) titleEl.textContent = caseItem.title;
        const brandEl = document.querySelector('.anli-brand, #case-detail-brand');
        if (brandEl) brandEl.textContent = caseItem.client;
      }
    }
  }

  // =========================================================================
  // 13. DOM 加载完成初始化
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    updateDesktopScale();
    handleHeaderScroll();
    initDropdownMenus();
    initMobileDrawer();
    initCounters();
    initScrollRevealHeadings();
    initHeroCarousel();
    initCasesEngine();
    initModals();
    initCaseDetailSidebar();
    initForms();
    initUrlParams();

    document.querySelectorAll('img').forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', updateDesktopScale, { once: true });
      }
    });

    setTimeout(updateDesktopScale, 200);
    setTimeout(updateDesktopScale, 800);
  });

})();
