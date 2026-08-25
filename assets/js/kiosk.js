/* =========================================================
   ONT Table Order Kiosk — Application runtime
   ========================================================= */
(function () {
  'use strict';

  var DATA = window.ONT_DATA;
  var STAGE_W = 1920, STAGE_H = 1080, BEZEL = 96;

  /* ---------------------------------------------------------
     i18n
     --------------------------------------------------------- */
  var I18N = {
    en: {
      allMenu: 'All Menu', call: 'Call Staff', table: 'Table',
      orderList: 'Order List', viewBill: 'View Bill',
      cart: 'Cart', items: 'items', item: 'item',
      touchToOrder: 'Touch anywhere to start', welcome: 'Welcome', start: 'Start ordering', home: 'Home',
      cartEmpty: 'Your cart is empty.', cartEmptySub: 'Tap a dish to add it to your order.',
      subtotal: 'Subtotal', tax: 'Tax (10%)', total: 'Total',
      close: 'Close', order: 'Send Order', pay: 'Pay',
      addToOrder: 'Add to order', updateOrder: 'Update item', cancel: 'Cancel',
      required: 'Required', optional: 'Optional', pickOne: 'Choose 1',
      pickUpTo: 'Choose up to', soldOut: 'Sold out',
      qty: 'Quantity', extra: 'Extra instructions', extraHint: 'List any special requests',
      extraPh: 'e.g. allergies, no onion, extra spicy…',
      soldOutPolicy: 'If sold out', noSelect: '--- No selection ---',
      confirmTitle: 'Please confirm your order', confirmSub: 'Check the quantity before sending it to the kitchen.',
      yes: 'Yes, send it', no: 'Keep editing',
      ordersTitle: 'Order history', ordersSub: 'Everything sent to the kitchen from this table.',
      ordersEmpty: 'No orders sent yet.',
      billTitle: 'Table bill', billSub: 'Includes every order placed at this table.',
      billEmpty: 'Nothing to pay yet.',
      payNow: 'Pay now', payTitle: 'Please tap your card', payDesc: 'Hold your card or phone over the reader below.',
      payCancel: 'Cancel payment', payStep1: 'Reading card', payStep2: 'Authorising', payStep3: 'Approved',
      doneTitle: 'Payment complete', doneDesc: 'Thank you. Your receipt is printing at the table.',
      orderedTitle: 'Order sent!', orderedDesc: 'The kitchen has received your order.',
      called: 'A staff member is on the way.',
      added: 'added to your order', updated: 'Item updated', removed: 'Item removed',
      backToMenu: 'Back to menu', newOrder: 'Start new order',
      returning: 'Returning to the start screen in', sec: 's',
      selectRequired: 'Please choose the required options.',
      kcal: 'kcal', orderNo: 'Order', preparing: 'Preparing', served: 'Served',
      paidTotal: 'Paid total', method: 'Payment method', card: 'Credit card',
      guests: 'Guests', open: 'Open', jumpCat: 'Jump to a category'
    },
    ko: {
      allMenu: '전체 메뉴', call: '직원 호출', table: '테이블',
      orderList: '주문 내역', viewBill: '결제 금액',
      cart: '장바구니', items: '개', item: '개',
      touchToOrder: '화면을 터치하면 시작합니다', welcome: '환영합니다', start: '주문 시작하기', home: '처음으로',
      cartEmpty: '담긴 메뉴가 없습니다.', cartEmptySub: '메뉴를 선택해 주문을 시작하세요.',
      subtotal: '주문 금액', tax: '부가세 (10%)', total: '합계',
      close: '닫기', order: '주문하기', pay: '결제하기',
      addToOrder: '담기', updateOrder: '수정 완료', cancel: '취소',
      required: '필수', optional: '선택', pickOne: '1개 선택',
      pickUpTo: '최대 선택', soldOut: '품절',
      qty: '수량', extra: '요청사항', extraHint: '알레르기 등 요청사항을 적어주세요',
      extraPh: '예) 양파 빼주세요, 아주 맵게…',
      soldOutPolicy: '품절 시 처리', noSelect: '--- 선택 안 함 ---',
      confirmTitle: '수량 확인하셨습니까?', confirmSub: '주방으로 전송하기 전에 수량을 확인해 주세요.',
      yes: '네, 주문할게요', no: '더 담을게요',
      ordersTitle: '주문 내역', ordersSub: '이 테이블에서 주방으로 전송된 전체 내역입니다.',
      ordersEmpty: '아직 전송된 주문이 없습니다.',
      billTitle: '결제 금액', billSub: '이 테이블의 전체 주문 합계입니다.',
      billEmpty: '결제할 내역이 없습니다.',
      payNow: '지금 결제', payTitle: '카드를 대주세요', payDesc: '카드 또는 휴대폰을 리더기에 올려주세요.',
      payCancel: '결제 취소', payStep1: '카드 인식 중', payStep2: '승인 요청 중', payStep3: '승인 완료',
      doneTitle: '결제가 완료되었습니다', doneDesc: '감사합니다. 영수증이 테이블에서 출력됩니다.',
      orderedTitle: '주문을 완료했습니다', orderedDesc: '주방에서 주문을 접수했습니다.',
      called: '직원이 곧 도착합니다.',
      added: '을(를) 담았습니다', updated: '옵션을 수정했습니다', removed: '메뉴를 삭제했습니다',
      backToMenu: '메뉴로 돌아가기', newOrder: '새로 주문하기',
      returning: '초기 화면으로 돌아갑니다', sec: '초 후',
      selectRequired: '필수 옵션을 선택해 주세요.',
      kcal: 'kcal', orderNo: '주문', preparing: '조리 중', served: '서빙 완료',
      paidTotal: '결제 금액', method: '결제 수단', card: '신용카드',
      guests: '인원', open: '입장', jumpCat: '카테고리 바로가기'
    }
  };

  var SOLDOUT_POLICY = {
    en: ['Go with merchant recommendation', 'Refund this item', 'Contact me', 'Cancel the entire order'],
    ko: ['가게 추천으로 대체', '해당 메뉴 환불', '전화로 연락', '주문 전체 취소']
  };

  /* ---------------------------------------------------------
     State
     --------------------------------------------------------- */
  var state = {
    lang: 'ko',
    view: 'attract',
    cat: DATA.categories[0].id,
    cart: [],            /* {uid,itemId,qty,options:{groupId:[optId]},memo,soldoutPolicy} */
    orders: [],          /* {no,time,lines:[...cart lines],total} */
    paid: false,
    table: 12,
    editingUid: null,
    draft: null
  };

  var uidSeq = 1;
  var orderSeq = 1;

  /* ---------------------------------------------------------
     Utilities
     --------------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function t(key) { return I18N[state.lang][key] || I18N.en[key] || key; }
  function money(v) { return '$' + v.toFixed(2); }
  function itemById(id) { for (var i = 0; i < DATA.items.length; i++) if (DATA.items[i].id === id) return DATA.items[i]; return null; }
  function catById(id) { for (var i = 0; i < DATA.categories.length; i++) if (DATA.categories[i].id === id) return DATA.categories[i]; return null; }
  function nameOf(o) { return state.lang === 'ko' ? (o.kr || o.en) : o.en; }
  function subNameOf(o) { return state.lang === 'ko' ? o.en : (o.kr || ''); }
  function descOf(it) { return state.lang === 'ko' ? it.descKr : it.descEn; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function groupById(item, gid) {
    for (var i = 0; i < item.groups.length; i++) if (item.groups[i].id === gid) return item.groups[i];
    return null;
  }
  function optById(group, oid) {
    for (var i = 0; i < group.options.length; i++) if (group.options[i].id === oid) return group.options[i];
    return null;
  }

  function lineUnitPrice(line) {
    var item = itemById(line.itemId);
    var p = item.price;
    for (var gid in line.options) {
      var g = groupById(item, gid); if (!g) continue;
      line.options[gid].forEach(function (oid) {
        var o = optById(g, oid); if (o) p += o.price;
      });
    }
    return p;
  }
  function lineTotal(line) { return lineUnitPrice(line) * line.qty; }
  function cartSubtotal() { return state.cart.reduce(function (s, l) { return s + lineTotal(l); }, 0); }
  function cartCount() { return state.cart.reduce(function (s, l) { return s + l.qty; }, 0); }
  function ordersSubtotal() {
    return state.orders.reduce(function (s, o) { return s + o.total; }, 0);
  }
  function optionLabels(line) {
    var item = itemById(line.itemId), out = [];
    item.groups.forEach(function (g) {
      var sel = line.options[g.id] || [];
      sel.forEach(function (oid) {
        var o = optById(g, oid);
        if (o) out.push(nameOf(o) + (o.price > 0 ? ' (+' + money(o.price) + ')' : ''));
      });
    });
    if (line.memo) out.push('“' + line.memo + '”');
    return out;
  }

  /* ---------------------------------------------------------
     Stage scaling — always keep 1920x1080 ratio
     --------------------------------------------------------- */
  function fitStage() {
    var vw = window.innerWidth, vh = window.innerHeight;
    if (vw < 40 || vh < 40) return;           /* layout not settled yet */
    var pad = vw < 700 ? 8 : 28;
    var scale = Math.min((vw - pad * 2) / (STAGE_W + BEZEL), (vh - pad * 2) / (STAGE_H + BEZEL));
    scale = Math.max(0.08, scale);
    document.documentElement.style.setProperty('--device-scale', scale.toFixed(4));
  }

  /* ---------------------------------------------------------
     Clock
     --------------------------------------------------------- */
  function tickClock() {
    var d = new Date();
    var h = d.getHours(), m = d.getMinutes();
    var txt = (h < 10 ? '0' : '') + h + ':' + (m < 10 ? '0' : '') + m;
    $$('.js-clock').forEach(function (n) { n.textContent = txt; });
  }

  /* ---------------------------------------------------------
     View router
     --------------------------------------------------------- */
  function showView(name) {
    if (state.view === name) return;
    var current = $('.view.is-active');
    var next = $('#view-' + name);
    if (!next) return;
    if (current) {
      current.classList.remove('is-active');
      current.classList.add('is-leaving');
      setTimeout(function () { current.classList.remove('is-leaving'); }, 460);
    }
    next.classList.add('is-active');
    state.view = name;
    syncHeroVideo(name);
    var focusTarget = next.querySelector('[data-autofocus]');
    if (focusTarget) setTimeout(function () { focusTarget.focus(); }, 120);
    announce(next.getAttribute('data-announce') || '');
  }

  /* ---------------------------------------------------------
     Attract hero video — loops forever while the screen is shown
     --------------------------------------------------------- */
  var heroVideo = null, heroReduced = false;
  function initHeroVideo() {
    heroVideo = $('#attract-video');
    if (!heroVideo) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroReduced = true;
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
      return;                                   /* the still image stays */
    }
    heroVideo.addEventListener('playing', function () { heroVideo.classList.add('is-playing'); });
    /* some kiosks/browsers still refuse to autoplay: retry on first input */
    var kick = function () { playHero(); };
    ['pointerdown', 'keydown', 'touchstart'].forEach(function (e) {
      document.addEventListener(e, kick, { once: true, passive: true });
    });
    playHero();
  }
  function playHero() {
    if (!heroVideo) return;
    var p = heroVideo.play();
    if (p && p.catch) p.catch(function () { /* blocked — poster remains */ });
  }
  function syncHeroVideo(viewName) {
    if (!heroVideo || heroReduced) return;
    if (viewName === 'attract') playHero();
    else heroVideo.pause();                     /* no decoding behind other views */
  }

  function announce(msg) {
    var live = $('#live-region');
    if (!live || !msg) return;
    live.textContent = '';
    setTimeout(function () { live.textContent = msg; }, 40);
  }

  /* ---------------------------------------------------------
     Toast
     --------------------------------------------------------- */
  function toast(msg, kind) {
    var wrap = $('#toast-wrap');
    var el = document.createElement('div');
    el.className = 'toast ' + (kind || '');
    el.setAttribute('role', 'status');
    el.innerHTML = '<span class="t-ico" aria-hidden="true">' + (kind === 'ok' ? '✓' : kind === 'warn' ? '!' : '•') + '</span><span>' + esc(msg) + '</span>';
    wrap.appendChild(el);
    setTimeout(function () {
      el.classList.add('is-out');
      setTimeout(function () { el.remove(); }, 340);
    }, 2400);
  }

  /* ---------------------------------------------------------
     Modal manager (focus trap + esc)
     --------------------------------------------------------- */
  var modalStack = [];
  var lastFocus = null;

  function openModal(id) {
    var m = $('#' + id);
    if (!m || m.classList.contains('is-open')) return;
    if (!modalStack.length) lastFocus = document.activeElement;
    modalStack.push(m);
    $('#backdrop').classList.add('is-open');
    m.classList.add('is-open');
    m.setAttribute('aria-hidden', 'false');
    setTimeout(function () {
      var f = m.querySelector('[data-autofocus]') || focusables(m)[0];
      if (f) f.focus();
    }, 60);
  }

  function closeModal(m) {
    m = m || modalStack[modalStack.length - 1];
    if (!m) return;
    m.classList.remove('is-open');
    m.setAttribute('aria-hidden', 'true');
    modalStack = modalStack.filter(function (x) { return x !== m; });
    if (!modalStack.length) {
      if (!$('#cart-panel').classList.contains('is-open')) $('#backdrop').classList.remove('is-open');
      if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
    }
  }
  function closeAllModals() { modalStack.slice().forEach(closeModal); }

  function focusables(root) {
    return $$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', root)
      .filter(function (n) { return n.offsetParent !== null; });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (modalStack.length) { closeModal(); e.preventDefault(); }
      else if ($('#cart-panel').classList.contains('is-open')) { closeCart(); e.preventDefault(); }
      else if ($('#allmenu-sheet').classList.contains('is-open')) { toggleAllMenu(false); e.preventDefault(); }
      return;
    }
    if (e.key === 'Tab' && modalStack.length) {
      var m = modalStack[modalStack.length - 1];
      var f = focusables(m);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    }
  });

  /* ---------------------------------------------------------
     Rendering — chrome / static labels
     --------------------------------------------------------- */
  function renderStatic() {
    document.documentElement.lang = state.lang === 'ko' ? 'ko' : 'en';
    $$('[data-i18n]').forEach(function (n) { n.textContent = t(n.getAttribute('data-i18n')); });
    $$('[data-i18n-aria]').forEach(function (n) { n.setAttribute('aria-label', t(n.getAttribute('data-i18n-aria'))); });
    $$('.js-table-no').forEach(function (n) { n.textContent = t('table') + ' ' + state.table; });
    $$('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === state.lang));
    });
  }

  function renderCategories() {
    var wrap = $('#cate-wrapper');
    wrap.innerHTML = '';
    DATA.categories.forEach(function (c) {
      var count = DATA.items.filter(function (i) { return i.cat === c.id; }).length;
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'category press';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(c.id === state.cat));
      b.setAttribute('aria-controls', 'menu-grid');
      b.dataset.cat = c.id;
      b.tabIndex = c.id === state.cat ? 0 : -1;
      b.innerHTML = '<span class="c-name">' + esc(nameOf(c)) + '</span><span class="c-sub">' + esc(subNameOf(c) || c.sub) + ' · ' + count + '</span>';
      b.addEventListener('click', function () { selectCategory(c.id); });
      wrap.appendChild(b);
    });

    /* roving tabindex for arrow-key navigation */
    wrap.addEventListener('keydown', onCatKeydown);
  }

  function onCatKeydown(e) {
    var keys = ['ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (keys.indexOf(e.key) < 0) return;
    var tabs = $$('.category', $('#cate-wrapper'));
    var idx = tabs.indexOf(document.activeElement);
    if (idx < 0) return;
    e.preventDefault();
    var next = idx;
    if (e.key === 'ArrowDown') next = (idx + 1) % tabs.length;
    if (e.key === 'ArrowUp') next = (idx - 1 + tabs.length) % tabs.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = tabs.length - 1;
    tabs[next].focus();
    selectCategory(tabs[next].dataset.cat);
  }

  function selectCategory(catId) {
    state.cat = catId;
    $$('.category').forEach(function (b) {
      var on = b.dataset.cat === catId;
      b.setAttribute('aria-selected', String(on));
      b.tabIndex = on ? 0 : -1;
    });
    renderMenu();
    $('#menu-scroll').scrollTop = 0;
    toggleAllMenu(false);
  }

  function renderMenu() {
    var cat = catById(state.cat);
    var list = DATA.items.filter(function (i) { return i.cat === state.cat; });
    $('#cat-title').textContent = nameOf(cat);
    $('#cat-sub').textContent = subNameOf(cat) || cat.sub;
    $('#cat-count').textContent = list.length + ' ' + (state.lang === 'ko' ? '개 메뉴' : (list.length === 1 ? 'item' : 'items'));

    var grid = $('#menu-grid');
    grid.innerHTML = '';
    if (!list.length) {
      grid.innerHTML = '<p class="empty-state">' + (state.lang === 'ko' ? '준비 중입니다.' : 'Coming soon.') + '</p>';
      return;
    }
    list.forEach(function (it, i) {
      grid.appendChild(menuCard(it, i));
    });
  }

  function inCartQty(itemId) {
    return state.cart.filter(function (l) { return l.itemId === itemId; })
      .reduce(function (s, l) { return s + l.qty; }, 0);
  }

  function tagLabel(tag) {
    var map = {
      best: state.lang === 'ko' ? '인기' : 'BEST',
      new: state.lang === 'ko' ? '신메뉴' : 'NEW',
      spicy: state.lang === 'ko' ? '매움' : 'SPICY',
      veg: state.lang === 'ko' ? '베지' : 'VEG',
      sold: t('soldOut')
    };
    return map[tag] || tag;
  }

  function menuCard(it, index) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'menu-card' + (it.soldout ? ' is-soldout' : '');
    b.style.animationDelay = Math.min(index, 11) * 34 + 'ms';
    b.dataset.id = it.id;
    if (it.soldout) b.setAttribute('aria-disabled', 'true');

    var tags = (it.tags || []).slice();
    if (it.soldout) tags = ['sold'];
    var tagHtml = tags.length
      ? '<span class="tag-row">' + tags.map(function (x) { return '<span class="tag ' + x + '">' + esc(tagLabel(x)) + '</span>'; }).join('') + '</span>'
      : '';
    var q = inCartQty(it.id);
    var qtyHtml = q ? '<span class="qty-chip" aria-hidden="true">' + q + '</span>' : '';

    b.innerHTML =
      '<span class="thumb">' + tagHtml + qtyHtml + '<img src="' + it.img + '" alt="" loading="lazy"></span>' +
      '<span class="info">' +
      '<h3>' + esc(nameOf(it)) + '</h3>' +
      '<span class="kr">' + esc(subNameOf(it)) + '</span>' +
      '<span class="price">' + money(it.price) + '</span>' +
      '</span>';

    b.setAttribute('aria-label',
      nameOf(it) + ', ' + money(it.price) + (it.soldout ? ', ' + t('soldOut') : '') + (q ? ', ' + q + ' ' + t('items') : ''));

    b.addEventListener('click', function () {
      if (it.soldout) { toast(nameOf(it) + ' — ' + t('soldOut'), 'warn'); return; }
      openDetail(it.id, null);
    });
    return b;
  }

  /* ---------------------------------------------------------
     Detail modal
     --------------------------------------------------------- */
  function defaultDraft(item) {
    var opts = {};
    item.groups.forEach(function (g) {
      opts[g.id] = [];
      if (g.type === 'radio' && g.required && g.options.length) opts[g.id] = [g.options[0].id];
    });
    return { itemId: item.id, qty: 1, options: opts, memo: '', soldoutPolicy: '' };
  }

  function openDetail(itemId, uid) {
    var item = itemById(itemId);
    state.editingUid = uid || null;
    if (uid) {
      var line = state.cart.filter(function (l) { return l.uid === uid; })[0];
      state.draft = {
        itemId: line.itemId, qty: line.qty, memo: line.memo, soldoutPolicy: line.soldoutPolicy,
        options: JSON.parse(JSON.stringify(line.options))
      };
    } else {
      state.draft = defaultDraft(item);
    }
    buildDetail(item);
    openModal('modal-detail');
  }

  function buildDetail(item) {
    var box = $('#detail-box');
    var d = state.draft;
    var tags = (item.tags || []).map(function (x) { return '<span class="tag ' + x + '">' + esc(tagLabel(x)) + '</span>'; }).join('');

    var groupsHtml = item.groups.map(function (g) {
      var chip = g.required
        ? '<span class="req-chip">' + t('required') + '</span>'
        : '<span class="req-chip optional">' + t('optional') + '</span>';
      var hint = g.type === 'radio' ? t('pickOne') : (t('pickUpTo') + ' ' + (g.max || g.options.length));
      var lis = g.options.map(function (o) {
        var checked = (d.options[g.id] || []).indexOf(o.id) >= 0;
        return '' +
          '<li>' +
          '<label class="opt-item press' + (checked ? ' is-checked' : '') + '" data-type="' + g.type + '" data-group="' + g.id + '" data-opt="' + o.id + '">' +
          '<input type="' + g.type + '" name="grp-' + g.id + '" value="' + o.id + '"' + (checked ? ' checked' : '') + '>' +
          '<span class="mark" aria-hidden="true"></span>' +
          '<span class="o-name">' + esc(nameOf(o)) + '<small>' + esc(subNameOf(o)) + '</small></span>' +
          '<span class="o-price">' + (o.price > 0 ? '+' + money(o.price) : money(0)) + '</span>' +
          '</label>' +
          '</li>';
      }).join('');
      return '' +
        '<fieldset class="opt-panel">' +
        '<legend class="sr-only">' + esc(nameOf(g)) + '</legend>' +
        '<div class="opt-head"><div><h3>' + esc(nameOf(g)) + '</h3><p class="hint">' + esc(hint) + '</p></div>' + chip + '</div>' +
        '<ul class="opt-list">' + lis + '</ul>' +
        '</fieldset>';
    }).join('');

    var policyOpts = SOLDOUT_POLICY[state.lang].map(function (p, i) {
      return '<option value="' + esc(p) + '"' + (d.soldoutPolicy === p ? ' selected' : '') + '>' + esc(p) + '</option>';
    }).join('');

    box.innerHTML = '' +
      '<button type="button" class="modal-close press" data-close aria-label="' + t('close') + '"><img src="assets/images/pop_close.png" alt=""></button>' +
      '<div class="detail-wrapper">' +
      '  <div class="detail-left">' +
      '    <div class="detail-photo"><span class="tag-row">' + tags + '</span><img src="' + item.img + '" alt="' + esc(nameOf(item)) + '"></div>' +
      '    <div class="detail-badges">' +
      '      <span class="badge-chip">' + item.kcal + ' ' + t('kcal') + '</span>' +
      '      <span class="badge-chip">' + esc(nameOf(catById(item.cat))) + '</span>' +
      '    </div>' +
      '    <div class="qty-stepper" role="group" aria-label="' + t('qty') + '">' +
      '      <button type="button" class="press" id="qty-minus" aria-label="−1"><img src="assets/images/minus_button.svg" alt=""></button>' +
      '      <span class="val" id="qty-val" aria-live="polite">' + d.qty + '</span>' +
      '      <button type="button" class="press" id="qty-plus" aria-label="+1"><img src="assets/images/plus_button.svg" alt=""></button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="detail-right">' +
      '    <div class="detail-scroll" id="detail-scroll">' +
      '      <div class="detail-header">' +
      '        <h2 id="detail-title" tabindex="-1" data-autofocus>' + esc(nameOf(item)) + '</h2>' +
      '        <p class="kr">' + esc(subNameOf(item)) + '</p>' +
      '        <p class="desc">' + esc(descOf(item)) + '</p>' +
      '        <p class="base-price">' + money(item.price) + '</p>' +
      '      </div>' +
      '      <div class="detail-divider"></div>' +
      groupsHtml +
      '      <div class="opt-panel field">' +
      '        <label for="memo">' + t('extra') + '<small>' + t('extraHint') + '</small></label>' +
      '        <textarea id="memo" maxlength="80" placeholder="' + t('extraPh') + '">' + esc(d.memo) + '</textarea>' +
      '        <p class="counter"><span id="memo-count">' + d.memo.length + '</span> / 80</p>' +
      '      </div>' +
      '      <div class="opt-panel field">' +
      '        <label for="soldout-policy">' + t('soldOutPolicy') + '</label>' +
      '        <select id="soldout-policy"><option value="">' + t('noSelect') + '</option>' + policyOpts + '</select>' +
      '      </div>' +
      '    </div>' +
      '    <div class="detail-footer">' +
      '      <button type="button" class="btn-cancel press" data-close>' + t('cancel') + '</button>' +
      '      <button type="button" class="btn-add press" id="btn-add">' +
      '        <span>' + (state.editingUid ? t('updateOrder') : t('addToOrder')) + '</span>' +
      '        <span class="sum" id="add-sum">' + money(0) + '</span>' +
      '      </button>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    /* events */
    $('#qty-minus').addEventListener('click', function () { setQty(d.qty - 1); });
    $('#qty-plus').addEventListener('click', function () { setQty(d.qty + 1); });
    $$('.opt-item', box).forEach(function (lab) {
      lab.addEventListener('click', function (e) {
        e.preventDefault();
        toggleOption(item, lab.dataset.group, lab.dataset.opt);
      });
      lab.addEventListener('keydown', function (e) {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggleOption(item, lab.dataset.group, lab.dataset.opt); }
      });
    });
    $('#memo').addEventListener('input', function () {
      d.memo = this.value;
      $('#memo-count').textContent = d.memo.length;
    });
    $('#soldout-policy').addEventListener('change', function () { d.soldoutPolicy = this.value; });
    $('#btn-add').addEventListener('click', commitDraft);
    $$('[data-close]', box).forEach(function (n) {
      n.addEventListener('click', function () { closeModal($('#modal-detail')); });
    });
    updateDetailSummary(item);
  }

  function setQty(v) {
    var d = state.draft;
    d.qty = Math.max(1, Math.min(99, v));
    $('#qty-val').textContent = d.qty;
    $('#qty-minus').disabled = d.qty <= 1;
    updateDetailSummary(itemById(d.itemId));
  }

  function toggleOption(item, gid, oid) {
    var g = groupById(item, gid), d = state.draft;
    var sel = d.options[gid] || [];
    if (g.type === 'radio') {
      if (sel[0] === oid && !g.required) sel = [];
      else sel = [oid];
    } else {
      var i = sel.indexOf(oid);
      if (i >= 0) sel.splice(i, 1);
      else {
        if (g.max && sel.length >= g.max) { toast(t('pickUpTo') + ' ' + g.max, 'warn'); return; }
        sel.push(oid);
      }
    }
    d.options[gid] = sel;
    $$('.opt-item[data-group="' + gid + '"]').forEach(function (lab) {
      var on = sel.indexOf(lab.dataset.opt) >= 0;
      lab.classList.toggle('is-checked', on);
      var input = lab.querySelector('input');
      input.checked = on;
    });
    updateDetailSummary(item);
  }

  function draftValid(item) {
    for (var i = 0; i < item.groups.length; i++) {
      var g = item.groups[i];
      if (g.required && !(state.draft.options[g.id] || []).length) return false;
    }
    return true;
  }

  function updateDetailSummary(item) {
    var total = lineTotal(state.draft);
    $('#add-sum').textContent = money(total);
    var ok = draftValid(item);
    var btn = $('#btn-add');
    btn.classList.toggle('is-disabled', !ok);
    btn.setAttribute('aria-disabled', String(!ok));
  }

  function commitDraft() {
    var item = itemById(state.draft.itemId);
    if (!draftValid(item)) { toast(t('selectRequired'), 'warn'); return; }
    if (state.editingUid) {
      state.cart = state.cart.map(function (l) {
        if (l.uid !== state.editingUid) return l;
        return {
          uid: l.uid, itemId: state.draft.itemId, qty: state.draft.qty,
          options: state.draft.options, memo: state.draft.memo, soldoutPolicy: state.draft.soldoutPolicy
        };
      });
      toast(t('updated'), 'ok');
    } else {
      state.cart.push({
        uid: 'L' + (uidSeq++), itemId: state.draft.itemId, qty: state.draft.qty,
        options: state.draft.options, memo: state.draft.memo, soldoutPolicy: state.draft.soldoutPolicy
      });
      toast(nameOf(item) + (state.lang === 'ko' ? '' : ' ') + t('added'), 'ok');
      bumpCartTrigger();
    }
    state.editingUid = null;
    closeModal($('#modal-detail'));
    renderCart();
    renderMenu();
  }

  /* ---------------------------------------------------------
     Cart panel
     --------------------------------------------------------- */
  function openCart() {
    $('#cart-panel').classList.add('is-open');
    $('#cart-panel').setAttribute('aria-hidden', 'false');
    $('#backdrop').classList.add('is-open');
    $('#cart-trigger').classList.add('is-hidden');
    setTimeout(function () {
      var f = $('#cart-panel .panel-header .ph-table') || focusables($('#cart-panel'))[0];
      if (f) f.focus();
    }, 120);
  }
  function closeCart() {
    $('#cart-panel').classList.remove('is-open');
    $('#cart-panel').setAttribute('aria-hidden', 'true');
    if (!modalStack.length) $('#backdrop').classList.remove('is-open');
    setTimeout(function () { $('#cart-trigger').classList.remove('is-hidden'); }, 260);
    var trig = $('#cart-trigger');
    if (trig) trig.focus();
  }
  function bumpCartTrigger() {
    var el = $('#cart-trigger');
    el.animate(
      [{ transform: 'translate(0,-50%) scale(1)' }, { transform: 'translate(-10px,-50%) scale(1.07)' }, { transform: 'translate(0,-50%) scale(1)' }],
      { duration: 420, easing: 'cubic-bezier(.22,.9,.28,1)' }
    );
  }

  function renderCart() {
    var count = cartCount(), sub = cartSubtotal();
    $('#ct-count').textContent = count;
    $('#ct-total').textContent = money(sub);
    $('#cart-badge').textContent = count;
    $('#cart-badge').style.display = count ? '' : 'none';
    $('#cart-trigger').setAttribute('aria-label', t('cart') + ', ' + count + ' ' + t('items') + ', ' + money(sub));

    var body = $('#cart-body');
    body.innerHTML = '';
    if (!state.cart.length) {
      body.innerHTML = '<div class="cart-empty"><div class="ce-ico" aria-hidden="true">🍽</div><p><b>' + t('cartEmpty') + '</b><br>' + t('cartEmptySub') + '</p></div>';
    } else {
      state.cart.forEach(function (line, i) {
        body.appendChild(cartRow(line, i));
      });
    }
    var tax = sub * 0.1;
    $('#sum-sub').textContent = money(sub);
    $('#sum-tax').textContent = money(tax);
    $('#sum-total').textContent = money(sub + tax);
    $('#btn-order-total').textContent = money(sub + tax);
    $('#btn-order').classList.toggle('is-disabled', !state.cart.length);
  }

  function cartRow(line, index) {
    var item = itemById(line.itemId);
    var row = document.createElement('article');
    row.className = 'order-item';
    row.style.animationDelay = Math.min(index, 8) * 30 + 'ms';
    var opts = optionLabels(line);
    row.innerHTML = '' +
      '<div class="item-num" aria-hidden="true">' + (index + 1) + '</div>' +
      '<div class="item-body">' +
      '  <h3 class="item-name">' + esc(nameOf(item)) + '<span class="kr">' + esc(subNameOf(item)) + '</span></h3>' +
      (opts.length ? '<ul class="item-options">' + opts.map(function (o) { return '<li>- ' + esc(o) + '</li>'; }).join('') + '</ul>' : '') +
      '  <div class="item-actions">' +
      '    <div class="qty-mini" role="group" aria-label="' + t('qty') + '">' +
      '      <button type="button" class="press" data-act="dec" aria-label="−1">−</button>' +
      '      <span>' + line.qty + '</span>' +
      '      <button type="button" class="press" data-act="inc" aria-label="+1">+</button>' +
      '    </div>' +
      '    <button type="button" class="link press" data-act="edit">EDIT</button>' +
      '    <button type="button" class="link press" data-act="remove">REMOVE</button>' +
      '  </div>' +
      '</div>' +
      '<div class="item-price">' + money(lineTotal(line)) + '</div>';

    row.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-act]');
      if (!btn) return;
      var act = btn.dataset.act;
      if (act === 'inc') { line.qty = Math.min(99, line.qty + 1); renderCart(); renderMenu(); }
      if (act === 'dec') {
        if (line.qty <= 1) removeLine(line, row);
        else { line.qty -= 1; renderCart(); renderMenu(); }
      }
      if (act === 'edit') { openDetail(line.itemId, line.uid); }
      if (act === 'remove') removeLine(line, row);
    });
    return row;
  }

  function removeLine(line, row) {
    row.classList.add('is-removing');
    setTimeout(function () {
      state.cart = state.cart.filter(function (l) { return l.uid !== line.uid; });
      renderCart(); renderMenu();
      announce(t('removed'));
    }, 260);
  }

  /* ---------------------------------------------------------
     Confirm → send order
     --------------------------------------------------------- */
  function openConfirm() {
    if (!state.cart.length) return;
    var box = $('#confirm-content');
    box.innerHTML = state.cart.map(function (l) {
      var item = itemById(l.itemId), opts = optionLabels(l);
      return '' +
        '<div class="list-item">' +
        '<div class="li-qty">x ' + l.qty + '</div>' +
        '<div class="li-body"><div class="li-name">' + esc(nameOf(item)) + '<span class="kr">' + esc(subNameOf(item)) + '</span></div>' +
        (opts.length ? '<ul class="li-opts">' + opts.map(function (o) { return '<li>- ' + esc(o) + '</li>'; }).join('') + '</ul>' : '') +
        '</div>' +
        '<div class="li-price">' + money(lineTotal(l)) + '</div>' +
        '</div>';
    }).join('');
    var sub = cartSubtotal();
    $('#confirm-total').textContent = money(sub + sub * 0.1);
    openModal('modal-confirm');
  }

  function sendOrder() {
    var sub = cartSubtotal();
    var order = {
      no: orderSeq++,
      time: new Date(),
      lines: state.cart.map(function (l) { return JSON.parse(JSON.stringify(l)); }),
      total: sub + sub * 0.1,
      state: 'preparing'
    };
    state.orders.push(order);
    state.cart = [];
    state.paid = false;
    closeAllModals();
    closeCart();
    renderCart();
    renderMenu();
    showMsg(t('orderedTitle'), t('orderedDesc'));
    announce(t('orderedTitle'));
    setTimeout(function () { order.state = 'served'; }, 30000);
  }

  function showMsg(title, desc) {
    $('#msg-title').textContent = title;
    $('#msg-desc').textContent = desc || '';
    openModal('modal-msg');
    clearTimeout(showMsg._t);
    showMsg._t = setTimeout(function () { closeModal($('#modal-msg')); }, 2600);
  }

  /* ---------------------------------------------------------
     Order history / bill
     --------------------------------------------------------- */
  function openOrders() {
    var box = $('#orders-content');
    if (!state.orders.length) {
      box.innerHTML = '<p class="empty-state">' + t('ordersEmpty') + '</p>';
    } else {
      box.innerHTML = state.orders.map(function (o) {
        var time = ('0' + o.time.getHours()).slice(-2) + ':' + ('0' + o.time.getMinutes()).slice(-2);
        return '' +
          '<section class="order-group">' +
          '<header class="og-head"><span class="og-title">' + t('orderNo') + ' #' + o.no + ' · ' + time + '</span>' +
          '<span class="og-state' + (o.state === 'served' ? ' done' : '') + '">' + (o.state === 'served' ? t('served') : t('preparing')) + '</span></header>' +
          '<div class="list-content">' +
          o.lines.map(function (l) {
            var item = itemById(l.itemId), opts = optionLabels(l);
            return '<div class="list-item"><div class="li-qty">x ' + l.qty + '</div>' +
              '<div class="li-body"><div class="li-name">' + esc(nameOf(item)) + '</div>' +
              (opts.length ? '<ul class="li-opts">' + opts.map(function (x) { return '<li>- ' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
              '</div><div class="li-price">' + money(lineTotal(l)) + '</div></div>';
          }).join('') +
          '</div></section>';
      }).join('');
    }
    $('#orders-total').textContent = money(ordersSubtotal());
    openModal('modal-orders');
  }

  function openBill() {
    var box = $('#bill-content');
    var lines = [];
    state.orders.forEach(function (o) { lines = lines.concat(o.lines); });
    if (!lines.length) {
      box.innerHTML = '<p class="empty-state">' + t('billEmpty') + '</p>';
    } else {
      box.innerHTML = '<div class="list-content">' + lines.map(function (l) {
        var item = itemById(l.itemId), opts = optionLabels(l);
        return '<div class="list-item"><div class="li-qty">x ' + l.qty + '</div>' +
          '<div class="li-body"><div class="li-name">' + esc(nameOf(item)) + '</div>' +
          (opts.length ? '<ul class="li-opts">' + opts.map(function (x) { return '<li>- ' + esc(x) + '</li>'; }).join('') + '</ul>' : '') +
          '</div><div class="li-price">' + money(lineTotal(l)) + '</div></div>';
      }).join('') + '</div>';
    }
    var total = ordersSubtotal();
    $('#bill-total').textContent = money(total);
    $('#btn-pay-now').classList.toggle('is-disabled', total <= 0 || state.paid);
    openModal('modal-bill');
  }

  /* ---------------------------------------------------------
     Payment flow
     --------------------------------------------------------- */
  var payTimer = null;
  function startPayment() {
    var total = ordersSubtotal();
    if (total <= 0) return;
    closeAllModals();
    closeCart();
    $('#pay-amount').textContent = money(total);
    $('#pay-bar').style.width = '0%';
    $$('.pay-steps .s').forEach(function (s, i) { s.classList.toggle('on', i === 0); });
    showView('pay');

    var p = 0;
    clearInterval(payTimer);
    payTimer = setInterval(function () {
      p += 4;
      $('#pay-bar').style.width = Math.min(100, p) + '%';
      var step = p < 34 ? 0 : p < 72 ? 1 : 2;
      $$('.pay-steps .s').forEach(function (s, i) { s.classList.toggle('on', i === step); });
      if (p >= 100) {
        clearInterval(payTimer);
        setTimeout(finishPayment, 420);
      }
    }, 90);
  }

  function cancelPayment() {
    clearInterval(payTimer);
    showView('menu');
  }

  function finishPayment() {
    var total = ordersSubtotal();
    var count = state.orders.reduce(function (s, o) {
      return s + o.lines.reduce(function (a, l) { return a + l.qty; }, 0);
    }, 0);
    state.paid = true;
    $('#done-count').textContent = count + ' ' + (state.lang === 'ko' ? '개' : (count === 1 ? 'item' : 'items'));
    $('#done-orders').textContent = state.orders.length;
    $('#done-total').textContent = money(total);
    showView('done');
    startDoneCountdown();
  }

  var doneTimer = null;
  function startDoneCountdown() {
    var left = 20;
    clearInterval(doneTimer);
    $('#done-left').textContent = left;
    doneTimer = setInterval(function () {
      left -= 1;
      $('#done-left').textContent = left;
      if (left <= 0) { clearInterval(doneTimer); resetSession(); }
    }, 1000);
  }

  function resetSession() {
    clearInterval(doneTimer);
    state.cart = [];
    state.orders = [];
    state.paid = false;
    orderSeq = 1;
    state.cat = DATA.categories[0].id;
    renderCategories(); renderMenu(); renderCart();
    showView('attract');
  }

  /* ---------------------------------------------------------
     All-menu sheet
     --------------------------------------------------------- */
  function toggleAllMenu(force) {
    var sheet = $('#allmenu-sheet');
    var open = typeof force === 'boolean' ? force : !sheet.classList.contains('is-open');
    sheet.classList.toggle('is-open', open);
    sheet.setAttribute('aria-hidden', String(!open));
    $('#btn-allmenu').setAttribute('aria-expanded', String(open));
    if (open) {
      var grid = $('#allmenu-grid');
      grid.innerHTML = '';
      DATA.categories.forEach(function (c) {
        var n = DATA.items.filter(function (i) { return i.cat === c.id; }).length;
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'press';
        b.innerHTML = '<span class="am-name">' + esc(nameOf(c)) + '</span><span class="am-sub">' + esc(subNameOf(c) || c.sub) + '</span><span class="am-count">' + n + ' ' + (state.lang === 'ko' ? '개' : 'items') + '</span>';
        b.addEventListener('click', function () { selectCategory(c.id); });
        grid.appendChild(b);
      });
      var first = grid.querySelector('button'); if (first) first.focus();
    }
  }

  /* ---------------------------------------------------------
     Idle timer — returns to attract screen
     --------------------------------------------------------- */
  var idleTimer = null;
  var IDLE_MS = 180000;
  function resetIdle() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      if (state.view !== 'menu') return;
      if (state.cart.length || state.orders.length) return;
      if (modalStack.length) return;
      showView('attract');
    }, IDLE_MS);
  }

  /* ---------------------------------------------------------
     Language
     --------------------------------------------------------- */
  function setLang(lang) {
    if (state.lang === lang) return;
    state.lang = lang;
    renderStatic();
    renderCategories();
    renderMenu();
    renderCart();
    if ($('#modal-detail').classList.contains('is-open')) buildDetail(itemById(state.draft.itemId));
  }

  /* ---------------------------------------------------------
     Boot
     --------------------------------------------------------- */
  function bind() {
    /* attract */
    $('#view-attract').addEventListener('click', function (e) {
      if (e.target.closest('.lang-switch')) return;
      showView('menu');
    });

    /* language */
    $$('.lang-switch button').forEach(function (b) {
      b.addEventListener('click', function (e) { e.stopPropagation(); setLang(b.dataset.lang); });
    });

    /* header */
    $('#btn-allmenu').addEventListener('click', function () { toggleAllMenu(); });
    $('#btn-bell').addEventListener('click', function () {
      showMsg(t('call'), t('called'));
      announce(t('called'));
    });
    $('#btn-home').addEventListener('click', function () { showView('attract'); });

    /* sidebar */
    $('#btn-orderlist').addEventListener('click', openOrders);
    $('#btn-bill').addEventListener('click', openBill);

    /* cart */
    $('#cart-trigger').addEventListener('click', openCart);
    $('#btn-cart-top').addEventListener('click', openCart);
    $('#btn-cart-close').addEventListener('click', closeCart);
    $('#btn-order').addEventListener('click', function () {
      if (!state.cart.length) return;
      openConfirm();
    });
    $('#backdrop').addEventListener('click', function () {
      if (modalStack.length) closeModal();
      else if ($('#cart-panel').classList.contains('is-open')) closeCart();
      toggleAllMenu(false);
    });

    /* confirm */
    $('#btn-confirm-yes').addEventListener('click', sendOrder);
    $('#btn-confirm-no').addEventListener('click', function () { closeModal($('#modal-confirm')); });

    /* bill + payment */
    $('#btn-pay-now').addEventListener('click', startPayment);
    $('#btn-pay-cancel').addEventListener('click', cancelPayment);
    $('#btn-done-menu').addEventListener('click', function () { clearInterval(doneTimer); showView('menu'); });
    $('#btn-done-new').addEventListener('click', resetSession);

    /* generic close buttons */
    $$('[data-close-modal]').forEach(function (b) {
      b.addEventListener('click', function () { closeModal(b.closest('.modal')); });
    });
    $$('.modal').forEach(function (m) {
      m.addEventListener('click', function (e) { if (e.target === m) closeModal(m); });
    });

    /* drag-to-scroll on the menu grid (kiosk feel) */
    var scroller = $('#menu-scroll');
    var down = false, startY = 0, startTop = 0, moved = 0;
    scroller.addEventListener('pointerdown', function (e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      down = true; moved = 0; startY = e.clientY; startTop = scroller.scrollTop;
    });
    scroller.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dy = e.clientY - startY;
      moved = Math.max(moved, Math.abs(dy));
      if (moved > 6) scroller.scrollTop = startTop - dy;
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (evt) {
      scroller.addEventListener(evt, function () { down = false; });
    });
    scroller.addEventListener('click', function (e) {
      if (moved > 10) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    /* the stage must never scroll itself (off-canvas panels) */
    var screenEl = $('#screen');
    screenEl.addEventListener('scroll', function () {
      if (screenEl.scrollLeft || screenEl.scrollTop) { screenEl.scrollLeft = 0; screenEl.scrollTop = 0; }
    });

    /* idle + resize */
    ['pointerdown', 'keydown', 'wheel'].forEach(function (evt) {
      document.addEventListener(evt, resetIdle, { passive: true });
    });
    window.addEventListener('resize', fitStage);
    window.addEventListener('orientationchange', fitStage);
    window.addEventListener('load', fitStage);
    if (window.visualViewport) window.visualViewport.addEventListener('resize', fitStage);
    if (window.ResizeObserver) new ResizeObserver(fitStage).observe(document.documentElement);
    requestAnimationFrame(fitStage);
  }

  function init() {
    fitStage();
    initHeroVideo();
    renderStatic();
    renderCategories();
    renderMenu();
    renderCart();
    bind();
    tickClock();
    setInterval(tickClock, 15000);
    resetIdle();
    document.body.classList.add('is-ready');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
