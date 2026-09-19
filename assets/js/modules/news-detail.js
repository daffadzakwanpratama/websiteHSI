/**
 * Gesid Halal Center - News Detail Module
 * Dynamically renders article content from URL query param `id` using `window.NEWS_DATA`.
 */

(function () {
  function initNewsDetail() {
    const detailContainer = document.getElementById('newsDetailSection');
    if (!detailContainer) return;

    const newsList = window.NEWS_DATA || [];
    if (!newsList.length) return;

    // Parse ?id= from URL
    const params = new URLSearchParams(window.location.search);
    const rawId = parseInt(params.get('id'), 10);
    let article = newsList.find(item => item.id === rawId);

    // Default to article 1 if not found
    if (!article) {
      article = newsList[0];
    }

    const currentId = article.id;
    const currentIndex = newsList.findIndex(item => item.id === currentId);

    // Update document title and meta description
    document.title = `${article.title} — Gesid Halal Center`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && article.summary) {
      metaDesc.setAttribute('content', article.summary);
    }

    // Helper to safely set text content
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el && val) el.textContent = val;
    };

    // Helper to set HTML
    const setHTML = (id, val) => {
      const el = document.getElementById(id);
      if (el && val) el.innerHTML = val;
    };

    // Helper to set attribute
    const setAttr = (id, attr, val) => {
      const el = document.getElementById(id);
      if (el && val) el.setAttribute(attr, val);
    };

    // 1. Breadcrumb & Meta
    setText('articleBreadcrumbTitle', article.title);
    setText('articleDate', article.date);
    setText('articleReadTime', article.readTime);
    setText('articleTitle', article.title);

    // 2. Category Badge
    const badgeEl = document.getElementById('articleCategoryBadge');
    if (badgeEl) {
      badgeEl.textContent = article.categoryLabel || 'Nasional';
      badgeEl.className = `${article.categoryBadgeClass || 'badge-nasional'} px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-xs`;
    }

    // 3. Author details
    if (article.author) {
      setText('authorName', article.author.name);
      setText('authorRole', article.author.role);
      setText('sidebarAuthorName', article.author.name);
      setText('sidebarAuthorRole', article.author.role);
      if (article.author.avatar) {
        setAttr('authorAvatar', 'src', article.author.avatar);
        setAttr('sidebarAuthorAvatar', 'src', article.author.avatar);
      }
    }

    // 4. Featured Image & Caption
    if (article.image) {
      setAttr('articleImage', 'src', article.image);
      setAttr('articleImage', 'alt', article.title);
    }
    setText('articleCaption', article.caption || article.title);

    // 5. Article Content
    setHTML('articleContent', article.content);

    // 6. Navigation: Previous & Next Article
    const prevIndex = (currentIndex - 1 + newsList.length) % newsList.length;
    const nextIndex = (currentIndex + 1) % newsList.length;
    const prevArticle = newsList[prevIndex];
    const nextArticle = newsList[nextIndex];

    const prevLink = document.getElementById('prevArticleLink');
    if (prevLink && prevArticle) {
      prevLink.href = `detail-berita.html?id=${prevArticle.id}`;
      const prevTitle = document.getElementById('prevArticleTitle');
      if (prevTitle) prevTitle.textContent = prevArticle.title;
    }

    const nextLink = document.getElementById('nextArticleLink');
    if (nextLink && nextArticle) {
      nextLink.href = `detail-berita.html?id=${nextArticle.id}`;
      const nextTitle = document.getElementById('nextArticleTitle');
      if (nextTitle) nextTitle.textContent = nextArticle.title;
    }

    // 7. Sidebar Related Articles
    const sidebarRelated = document.getElementById('sidebarRelatedContainer');
    if (sidebarRelated) {
      const relatedArticles = (article.relatedIds || [])
        .map(id => newsList.find(n => n.id === id))
        .filter(Boolean);

      // Fallback if less than 3
      const displayArticles = relatedArticles.length >= 2 
        ? relatedArticles 
        : newsList.filter(n => n.id !== article.id).slice(0, 3);

      sidebarRelated.innerHTML = displayArticles.map(rel => `
        <a href="detail-berita.html?id=${rel.id}" class="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/80">
          <div class="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative aspect-square">
            <img src="${rel.image}" alt="${rel.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
          </div>
          <div class="flex-1 min-w-0">
            <span class="${rel.categoryBadgeClass} text-[9px] font-bold px-1.5 py-0.5 rounded text-white uppercase">${rel.categoryLabel}</span>
            <h4 class="text-xs font-bold text-slate-900 group-hover:text-[#c89020] transition-colors line-clamp-2 mt-1 leading-snug">
              ${rel.title}
            </h4>
            <p class="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
              <i class="fa-regular fa-clock text-[9px]"></i> ${rel.readTime}
            </p>
          </div>
        </a>
      `).join('');
    }

    // 8. Bottom Related Articles Grid
    const bottomRelated = document.getElementById('bottomRelatedContainer');
    if (bottomRelated) {
      const candidates = newsList.filter(n => n.id !== article.id).slice(0, 4);
      bottomRelated.innerHTML = candidates.map(item => `
        <article class="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover-lift flex flex-col h-full">
          <a href="detail-berita.html?id=${item.id}" class="group flex flex-col h-full">
            <div class="relative aspect-[16/10] overflow-hidden bg-slate-100 flex-shrink-0">
              <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" loading="lazy">
              <span class="${item.categoryBadgeClass} absolute top-3 left-3 px-2.5 py-0.5 text-white text-[10px] font-bold rounded-md uppercase tracking-wide">
                ${item.categoryLabel}
              </span>
            </div>
            <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
              <div>
                <p class="text-[11px] text-slate-400 font-medium mb-2 flex items-center gap-1.5">
                  <i class="fa-regular fa-calendar text-[10px]"></i> ${item.date}
                </p>
                <h3 class="text-[14px] sm:text-[15px] font-bold text-slate-900 leading-snug mb-2 group-hover:text-[#c89020] transition-colors line-clamp-2">
                  ${item.title}
                </h3>
                <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  ${item.summary}
                </p>
              </div>
              <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span class="text-[11px] text-slate-400 font-medium">${item.readTime}</span>
                <span class="text-[11px] font-bold text-[#c89020] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca <i class="fa-solid fa-arrow-right text-[9px]"></i>
                </span>
              </div>
            </div>
          </a>
        </article>
      `).join('');
    }

    // 9. Reading Progress Bar
    window.addEventListener('scroll', function () {
      const progressBar = document.getElementById('readingProgressBar');
      if (!progressBar) return;
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    });

    // 10. Social Sharing Handlers
    initSocialSharing(article);
  }

  function initSocialSharing(article) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);

    // WhatsApp
    const waBtns = document.querySelectorAll('.share-wa-btn');
    waBtns.forEach(btn => {
      btn.href = `https://api.whatsapp.com/send?text=${title}%0A%0A${url}`;
      btn.target = '_blank';
      btn.rel = 'noopener';
    });

    // Twitter / X
    const twBtns = document.querySelectorAll('.share-tw-btn');
    twBtns.forEach(btn => {
      btn.href = `https://twitter.com/intent/tweet?text=${title}&url=${url}&via=GesidHalal`;
      btn.target = '_blank';
      btn.rel = 'noopener';
    });

    // LinkedIn
    const inBtns = document.querySelectorAll('.share-in-btn');
    inBtns.forEach(btn => {
      btn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      btn.target = '_blank';
      btn.rel = 'noopener';
    });

    // Copy Link Button
    const copyBtns = document.querySelectorAll('.share-copy-btn');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href).then(function () {
          showToast('Tautan berhasil disalin ke papan klip!');
        }).catch(function () {
          showToast('Gagal menyalin tautan.');
        });
      });
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('newsToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'newsToast';
      toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl flex items-center gap-2.5 z-50 transition-all duration-300 transform translate-y-8 opacity-0 pointer-events-none';
      toast.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400"></i> <span id="newsToastText"></span>`;
      document.body.appendChild(toast);
    }
    document.getElementById('newsToastText').textContent = msg;
    toast.classList.remove('translate-y-8', 'opacity-0', 'pointer-events-none');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(function () {
      toast.classList.add('translate-y-8', 'opacity-0', 'pointer-events-none');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 2800);
  }

  window.initNewsDetail = initNewsDetail;
})();
