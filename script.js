// ドロワーメニュー開閉
const burger = document.getElementById('pBurger');
const drawer = document.getElementById('drawer');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  drawer.classList.toggle('open');
});

// ドロワー内リンク・フローティングCTAクリックで閉じる
drawer.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

// Q&A / details のアコーディオンを1つずつ開く
document.querySelectorAll('.qa').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.qa').forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});

// お問い合わせフォームの簡易バリデーション
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if (!name || !email) {
      note.textContent = 'お名前とメールアドレスをご入力ください。';
      note.style.color = '#ffe0d6';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      note.textContent = 'メールアドレスの形式をご確認ください。';
      note.style.color = '#ffe0d6';
      return;
    }
    note.textContent = 'お問い合わせありがとうございます。担当者よりご連絡いたします。';
    note.style.color = '#fff';
    form.reset();
  });
}

// スクロールスパイ：表示中セクションに応じて左ナビをハイライト
const navLinks = Array.from(document.querySelectorAll('.side__nav a'));
const spyTargets = navLinks
  .map(a => ({ a, sec: document.querySelector(a.getAttribute('href')) }))
  .filter(t => t.sec);

if (spyTargets.length) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const hit = spyTargets.find(t => t.sec === en.target);
        if (hit) hit.a.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  spyTargets.forEach(t => spy.observe(t.sec));
}

// スクロールでフェードイン
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity = 1;
      en.target.style.transform = 'none';
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fcard, .mcard, .plan-card, .flow__step, .qa, .highlight').forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});
