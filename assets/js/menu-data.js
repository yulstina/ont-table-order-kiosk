/* =========================================================
   ONT Table Order Kiosk — Menu master data
   (정적 데모 데이터. 실제 운영 시 POS API 응답으로 대체)
   ========================================================= */
window.ONT_DATA = (function () {
  var IMG_A = 'assets/images/menu_sample.jpg';
  var IMG_B = 'assets/images/food_image.jpg';

  /* 공통 옵션 그룹 템플릿 --------------------------------- */
  function spiceGroup(required) {
    return {
      id: 'spice',
      en: 'Spice level', kr: '맵기 선택',
      type: 'radio', required: !!required, min: 1, max: 1,
      options: [
        { id: 'mild', en: 'Mild', kr: '순한맛', price: 0 },
        { id: 'medium', en: 'Medium', kr: '보통맛', price: 0 },
        { id: 'hot', en: 'Great Spicy', kr: '매운맛', price: 0.99 },
        { id: 'extra', en: 'Fire Level', kr: '아주 매운맛', price: 1.49 }
      ]
    };
  }
  var addOnGroup = {
    id: 'addon',
    en: 'Add-ons', kr: '추가 선택',
    type: 'checkbox', required: false, max: 4,
    options: [
      { id: 'egg', en: 'Fried egg', kr: '계란 후라이', price: 1.20 },
      { id: 'cheese', en: 'Extra cheese', kr: '치즈 추가', price: 1.80 },
      { id: 'rice', en: 'Steamed rice', kr: '공기밥', price: 1.50 },
      { id: 'noodle', en: 'Extra noodles', kr: '사리 추가', price: 2.00 }
    ]
  };
  var sauceGroup = {
    id: 'sauce',
    en: 'Choose your sauce', kr: '소스 선택',
    type: 'radio', required: true, min: 1, max: 1,
    options: [
      { id: 'house', en: 'House sauce', kr: '하우스 소스', price: 0 },
      { id: 'garlic', en: 'Garlic butter', kr: '갈릭 버터', price: 0.80 },
      { id: 'truffle', en: 'Truffle oil', kr: '트러플 오일', price: 2.49 },
      { id: 'chimi', en: 'Chimichurri', kr: '치미추리', price: 1.60 }
    ]
  };
  var doneGroup = {
    id: 'doneness',
    en: 'Doneness', kr: '굽기 정도',
    type: 'radio', required: true, min: 1, max: 1,
    options: [
      { id: 'rare', en: 'Rare', kr: '레어', price: 0 },
      { id: 'mr', en: 'Medium rare', kr: '미디엄 레어', price: 0 },
      { id: 'm', en: 'Medium', kr: '미디엄', price: 0 },
      { id: 'wd', en: 'Well done', kr: '웰던', price: 0 }
    ]
  };
  var sizeGroup = {
    id: 'size',
    en: 'Size', kr: '사이즈',
    type: 'radio', required: true, min: 1, max: 1,
    options: [
      { id: 'reg', en: 'Regular', kr: '레귤러', price: 0 },
      { id: 'lg', en: 'Large', kr: '라지', price: 2.50 }
    ]
  };
  var iceGroup = {
    id: 'ice',
    en: 'Ice', kr: '얼음',
    type: 'radio', required: true, min: 1, max: 1,
    options: [
      { id: 'normal', en: 'Regular ice', kr: '얼음 보통', price: 0 },
      { id: 'less', en: 'Less ice', kr: '얼음 적게', price: 0 },
      { id: 'none', en: 'No ice', kr: '얼음 없음', price: 0 }
    ]
  };

  var categories = [
    { id: 'signature', en: 'Signature', kr: '시그니처', sub: 'Chef picks' },
    { id: 'salads', en: 'Salads', kr: '샐러드', sub: 'Fresh & light' },
    { id: 'pasta', en: 'Pasta', kr: '파스타', sub: 'Hand made' },
    { id: 'grill', en: 'Grill', kr: '그릴', sub: 'Charcoal fired' },
    { id: 'sides', en: 'Sides', kr: '사이드', sub: 'Share plates' },
    { id: 'drinks', en: 'Drinks', kr: '음료', sub: 'Bar & soft' }
  ];

  var items = [
    /* ---------- Signature ---------- */
    { id: 'sg01', cat: 'signature', en: 'Original Yuk Gae Jang', kr: '오리지널 육개장', img: IMG_A, price: 18.00, kcal: 620,
      descEn: 'Slow-simmered brisket broth with gosari, scallion and a warm chili finish.',
      descKr: '양지 육수를 4시간 우려낸 얼큰한 시그니처 육개장. 고사리와 대파가 듬뿍.',
      tags: ['best', 'spicy'], groups: [spiceGroup(true), addOnGroup] },
    { id: 'sg02', cat: 'signature', en: 'Lanespan Pizza & Pub Special', kr: '레인스판 스페셜 피자', img: IMG_B, price: 24.50, kcal: 880,
      descEn: 'Garlic and olive oil base, mozzarella, cremini mushrooms, ricotta, thyme and white truffle.',
      descKr: '갈릭 올리브 오일 베이스에 모짜렐라, 크레미니 버섯, 리코타, 타임, 화이트 트러플.',
      tags: ['best'], groups: [sizeGroup, addOnGroup] },
    { id: 'sg03', cat: 'signature', en: 'Charcoal Ribeye Platter', kr: '숯불 립아이 플래터', img: IMG_A, price: 42.00, kcal: 1120,
      descEn: '400g dry-aged ribeye over binchotan charcoal, served with seasonal grilled vegetables.',
      descKr: '400g 드라이에이징 립아이를 빈초탄 숯불에 구워 제철 채소와 함께 제공합니다.',
      tags: ['new'], groups: [doneGroup, sauceGroup] },
    { id: 'sg04', cat: 'signature', en: 'Truffle Cream Risotto', kr: '트러플 크림 리조또', img: IMG_B, price: 22.00, kcal: 740,
      descEn: 'Carnaroli rice, parmesan cream, cremini mushrooms and shaved black truffle.',
      descKr: '까르나롤리 쌀과 파마산 크림, 버섯, 블랙 트러플을 올린 리조또.',
      tags: [], groups: [sauceGroup, addOnGroup] },

    /* ---------- Salads ---------- */
    { id: 'sl01', cat: 'salads', en: 'Spicy Tuna Tartare', kr: '스파이시 튜나 타르타르', img: IMG_A, price: 18.00, kcal: 380,
      descEn: 'Sushi-grade tuna, avocado, sesame dressing and crisp crackers.',
      descKr: '참치 타르타르와 아보카도, 참깨 드레싱, 바삭한 크래커.',
      tags: ['spicy'], groups: [spiceGroup(true), addOnGroup] },
    { id: 'sl02', cat: 'salads', en: 'Burrata & Heirloom Tomato', kr: '부라타 토마토 샐러드', img: IMG_B, price: 16.50, kcal: 420,
      descEn: 'Creamy burrata, heirloom tomatoes, basil oil and aged balsamic.',
      descKr: '부드러운 부라타 치즈와 에어룸 토마토, 바질 오일, 발사믹.',
      tags: ['veg', 'best'], groups: [sauceGroup] },
    { id: 'sl03', cat: 'salads', en: 'Avocado and Egg Toast', kr: '아보카도 에그 토스트', img: IMG_A, price: 10.40, kcal: 460,
      descEn: 'Sourdough toast, smashed avocado, soft egg and chili flakes.',
      descKr: '사워도우 토스트에 아보카도와 반숙 계란, 칠리 플레이크.',
      tags: ['veg'], groups: [spiceGroup(false), addOnGroup] },
    { id: 'sl04', cat: 'salads', en: 'Grilled Chicken Caesar', kr: '그릴 치킨 시저 샐러드', img: IMG_B, price: 15.00, kcal: 520,
      descEn: 'Romaine, grilled chicken breast, parmesan crisp and anchovy dressing.',
      descKr: '로메인과 그릴 치킨, 파마산 크리스프, 앤초비 드레싱.',
      tags: [], groups: [sauceGroup, addOnGroup] },
    { id: 'sl05', cat: 'salads', en: 'Mango Smoothie Bowl', kr: '망고 스무디 볼', img: IMG_A, price: 12.40, kcal: 310,
      descEn: 'Frozen mango, coconut yoghurt, granola and seasonal berries.',
      descKr: '냉동 망고와 코코넛 요거트, 그래놀라, 제철 베리.',
      tags: ['veg'], groups: [sizeGroup] },
    { id: 'sl06', cat: 'salads', en: 'Quinoa Power Bowl', kr: '퀴노아 파워볼', img: IMG_B, price: 14.00, kcal: 480,
      descEn: 'Tri-colour quinoa, roasted pumpkin, chickpeas and tahini dressing.',
      descKr: '3색 퀴노아와 구운 단호박, 병아리콩, 타히니 드레싱.',
      tags: ['veg', 'new'], groups: [sauceGroup] },

    /* ---------- Pasta ---------- */
    { id: 'ps01', cat: 'pasta', en: 'Creamy Mushroom Risotto', kr: '크리미 머쉬룸 리조또', img: IMG_B, price: 22.00, kcal: 700,
      descEn: 'Slow-stirred risotto with three mushrooms and truffle oil.',
      descKr: '세 가지 버섯과 트러플 오일을 더한 크리미 리조또.',
      tags: ['best'], groups: [sauceGroup, addOnGroup] },
    { id: 'ps02', cat: 'pasta', en: 'Rose Cream Tagliatelle', kr: '로제 크림 탈리아텔레', img: IMG_A, price: 19.00, kcal: 810,
      descEn: 'Fresh tagliatelle in tomato cream with pancetta and basil.',
      descKr: '생면 탈리아텔레에 토마토 크림, 판체타, 바질.',
      tags: [], groups: [spiceGroup(true), addOnGroup] },
    { id: 'ps03', cat: 'pasta', en: 'Aglio e Olio Prawn', kr: '알리오 올리오 새우', img: IMG_B, price: 20.50, kcal: 690,
      descEn: 'Spaghetti with garlic confit, chili and grilled tiger prawns.',
      descKr: '마늘 콩피와 페퍼론치노, 구운 타이거 새우 스파게티.',
      tags: ['spicy'], groups: [spiceGroup(true), addOnGroup] },
    { id: 'ps04', cat: 'pasta', en: 'Beef Ragu Pappardelle', kr: '비프 라구 파파르델레', img: IMG_A, price: 23.00, kcal: 920,
      descEn: 'Eight-hour beef shank ragu with wide pappardelle ribbons.',
      descKr: '8시간 끓인 소고기 정강이 라구와 넓은 파파르델레.',
      tags: ['new'], groups: [sauceGroup, addOnGroup] },
    { id: 'ps05', cat: 'pasta', en: 'Vongole Linguine', kr: '봉골레 링귀네', img: IMG_B, price: 21.00, kcal: 640,
      descEn: 'Manila clams, white wine, parsley and lemon zest.',
      descKr: '바지락과 화이트 와인, 파슬리, 레몬 제스트.',
      tags: [], soldout: true, groups: [sauceGroup] },

    /* ---------- Grill ---------- */
    { id: 'gr01', cat: 'grill', en: 'Grilled Ribeye Steak', kr: '그릴 립아이 스테이크', img: IMG_A, price: 28.00, kcal: 950,
      descEn: '250g ribeye grilled to order with rosemary butter.',
      descKr: '250g 립아이를 주문 즉시 구워 로즈마리 버터와 함께.',
      tags: ['best'], groups: [doneGroup, sauceGroup, addOnGroup] },
    { id: 'gr02', cat: 'grill', en: 'Herb Roasted Half Chicken', kr: '허브 로스트 치킨 하프', img: IMG_B, price: 24.00, kcal: 870,
      descEn: 'Half chicken marinated 24 hours in herbs, lemon and garlic.',
      descKr: '24시간 허브·레몬·마늘에 재운 치킨 하프.',
      tags: [], groups: [sauceGroup, addOnGroup] },
    { id: 'gr03', cat: 'grill', en: 'Charcoal Pork Belly', kr: '숯불 삼겹살 구이', img: IMG_A, price: 26.00, kcal: 1010,
      descEn: 'Thick-cut pork belly over charcoal with ssamjang and greens.',
      descKr: '두툼한 삼겹살을 숯불에 구워 쌈장과 채소를 곁들임.',
      tags: ['best'], groups: [spiceGroup(true), addOnGroup] },
    { id: 'gr04', cat: 'grill', en: 'Grilled Seabass Fillet', kr: '농어 필레 그릴', img: IMG_B, price: 27.50, kcal: 520,
      descEn: 'Whole seabass fillet, salt-crusted skin and caper butter.',
      descKr: '농어 필레를 바삭하게 구워 케이퍼 버터와 함께.',
      tags: ['new'], groups: [sauceGroup] },
    { id: 'gr05', cat: 'grill', en: 'Lamb Chop Trio', kr: '램찹 트리오', img: IMG_A, price: 34.00, kcal: 780,
      descEn: 'Three French-trimmed lamb chops with mint chimichurri.',
      descKr: '프렌치 랙 램찹 3점과 민트 치미추리.',
      tags: [], groups: [doneGroup, sauceGroup] },

    /* ---------- Sides ---------- */
    { id: 'sd01', cat: 'sides', en: 'Truffle Parmesan Fries', kr: '트러플 파마산 감자튀김', img: IMG_B, price: 8.00, kcal: 540,
      descEn: 'Double-fried potatoes, truffle oil and shaved parmesan.',
      descKr: '두 번 튀긴 감자에 트러플 오일과 파마산.',
      tags: ['best', 'veg'], groups: [sizeGroup, spiceGroup(false)] },
    { id: 'sd02', cat: 'sides', en: 'Garlic Butter Bread', kr: '갈릭 버터 브레드', img: IMG_A, price: 6.50, kcal: 380,
      descEn: 'Sourdough baked with cultured garlic butter and parsley.',
      descKr: '사워도우에 갈릭 버터와 파슬리를 발라 구웠습니다.',
      tags: ['veg'], groups: [sizeGroup] },
    { id: 'sd03', cat: 'sides', en: 'Crispy Chicken Bites', kr: '크리스피 치킨 바이트', img: IMG_B, price: 9.90, kcal: 610,
      descEn: 'Boneless chicken bites tossed in your choice of sauce.',
      descKr: '순살 치킨에 원하는 소스를 버무렸습니다.',
      tags: ['spicy'], groups: [spiceGroup(true), sauceGroup] },
    { id: 'sd04', cat: 'sides', en: 'Seasonal Grilled Vegetables', kr: '제철 채소 구이', img: IMG_A, price: 7.50, kcal: 220,
      descEn: 'Zucchini, asparagus and peppers with olive oil and sea salt.',
      descKr: '주키니, 아스파라거스, 파프리카를 올리브 오일과 소금으로.',
      tags: ['veg'], groups: [] },

    /* ---------- Drinks ---------- */
    { id: 'dr01', cat: 'drinks', en: 'Cold Brew Latte', kr: '콜드브루 라떼', img: IMG_B, price: 6.00, kcal: 150,
      descEn: '18-hour cold brew with steamed or cold milk.',
      descKr: '18시간 추출한 콜드브루에 우유를 더했습니다.',
      tags: ['best'], groups: [sizeGroup, iceGroup] },
    { id: 'dr02', cat: 'drinks', en: 'Yuzu Sparkling Ade', kr: '유자 스파클링 에이드', img: IMG_A, price: 7.00, kcal: 180,
      descEn: 'House yuzu syrup, sparkling water and fresh mint.',
      descKr: '수제 유자청과 탄산수, 생민트.',
      tags: ['new'], groups: [sizeGroup, iceGroup] },
    { id: 'dr03', cat: 'drinks', en: 'House Red Wine (Glass)', kr: '하우스 레드 와인 (글라스)', img: IMG_B, price: 11.00, kcal: 125,
      descEn: 'Rotating house selection, served at cellar temperature.',
      descKr: '매월 바뀌는 하우스 셀렉션, 셀러 온도로 제공.',
      tags: [], groups: [] },
    { id: 'dr04', cat: 'drinks', en: 'Draft Craft Beer', kr: '수제 생맥주', img: IMG_A, price: 9.00, kcal: 210,
      descEn: 'Local craft lager, poured fresh from the tap.',
      descKr: '로컬 크래프트 라거를 신선하게 따라 드립니다.',
      tags: [], groups: [sizeGroup] },
    { id: 'dr05', cat: 'drinks', en: 'Sparkling Water', kr: '스파클링 워터', img: IMG_B, price: 4.00, kcal: 0,
      descEn: 'Chilled sparkling mineral water, 330ml.',
      descKr: '차갑게 준비한 스파클링 미네랄 워터 330ml.',
      tags: ['veg'], groups: [iceGroup] }
  ];

  return { categories: categories, items: items };
})();
