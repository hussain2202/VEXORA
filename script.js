const megaProducts = [];
let globalId = 1;

// الصور الاحتياطية لكل فئة في حال تعذر ظهور الصورة المحلية
const defaultImages = {
    gpu: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop",
    cpu: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=600&auto=format&fit=crop",
    laptop: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop",
    apple: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    monitor: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
    headset: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
    keyboard: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
    mouse: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=600&auto=format&fit=crop",
    ram: "https://images.unsplash.com/photo-1562976540-1502c2145386?q=80&w=600&auto=format&fit=crop",
    storage: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=600&auto=format&fit=crop",
    cooler: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop",
    motherboard: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    case: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=600&auto=format&fit=crop"
};

const realDataPool = {
    gpu: [
        "NVIDIA GeForce RTX 4090 24GB", "NVIDIA GeForce RTX 4080 Super 16GB", "NVIDIA GeForce RTX 4070 Ti Super", "NVIDIA GeForce RTX 4070 Super",
        "NVIDIA GeForce RTX 4060 Ti 16GB", "NVIDIA GeForce RTX 4060 8GB", "NVIDIA GeForce RTX 3060 12GB", "AMD Radeon RX 7900 XTX 24GB",
        "AMD Radeon RX 7900 XT 20GB", "AMD Radeon RX 7800 XT 16GB", "AMD Radeon RX 7700 XT 12GB", "AMD Radeon RX 7600 8GB"
    ],
    cpu: [
        "Intel Core i9-14900K", "Intel Core i7-14700K", "Intel Core i5-14600K", "Intel Core i9-13900KS",
        "Intel Core i7-13700KF", "Intel Core i5-13400F", "AMD Ryzen 9 7950X3D", "AMD Ryzen 9 7900X",
        "AMD Ryzen 7 7800X3D", "AMD Ryzen 5 7600X", "AMD Ryzen 7 5800X3D", "Intel Core i3-12100F"
    ],
    laptop: [
        "ASUS TUF Gaming F16", "ASUS ROG Strix SCAR 18 (RTX 4090)", "MSI Raider GE78 HX (RTX 4080)", "Lenovo Legion Pro 7i (RTX 4070)",
        "Acer Predator Helios 16", "ASUS TUF Gaming A15", "MSI Katana 15 B13V", "HP Omen 16 Gaming", "Gigabyte G5 KF Gaming",
        "Razer Blade 16 OLED (RTX 4090)", "Alienware m18 R2 (i9-14900HX)", "ASUS ROG Zephyrus G16 (2024)",
        "Lenovo Legion Slim 5 Gen 9", "MSI Cyborg 15 A12V", "HP Victus 15-fa1093dx", "Acer Nitro 5 AN515-58",
        "Gigabyte AORUS 16X 2024", "ASUS ROG Flow X13 Convertible", "Lenovo LOQ 15IRX9", "MSI Vector GP78HX 13V",
        "Razer Blade 14 (AMD Ryzen 9)", "Alienware x16 R2 Gaming", "ASUS TUF Gaming F17 FX707", "HP Omen Transcend 14",
        "Acer Predator Triton 17 X", "MSI Stealth 16 Studio", "Lenovo Legion 9i Extreme", "Gigabyte Aero 14 OLED",
        "ASUS ROG Strix G16 G614", "Dell G15 5530 Gaming"
    ],
    apple: [
        "Apple MacBook Pro 16 M3 Max", "Apple MacBook Air 15 M3", "Apple Mac Studio M2 Ultra",
        "Apple MacBook Pro 14 M3 Pro", "Apple Mac mini M2 Pro", "Apple iMac 24-inch M3 4.5K"
    ],
    monitor: [
        "ASUS ROG Swift OLED PG32UCDM 4K", "Samsung Odyssey OLED G9 49\"", "LG UltraGear 27GR95QE-B OLED",
        "Gigabyte M27Q 27\" 170Hz 1440p", "MSI Optix MAG274QRF-QD", "Dell Alienware AW3225QF 4K",
        "ASUS TUF Gaming VG27AQ", "MSI G244F Esports Gaming", "Gigabyte G24F 2", "Samsung Odyssey G5"
    ],
    headset: [
        "HyperX Cloud III Wireless", "Logitech G PRO X 2 Lightspeed", "Razer BlackShark V2 Pro",
        "SteelSeries Arctis Nova Pro", "Corsair Virtuoso RGB Wireless SE",
        "HyperX Cloud Stinger 2 Core", "Logitech G435 Lightspeed Wireless", "Razer Kraken Kitty V2 RGB",
        "SteelSeries Arctis 1 Wired", "Corsair HS55 Stereo Gaming"
    ],
    keyboard: [
        "Logitech G915 LIGHTSPEED Wireless", "Razer Huntsman V3 Pro Mechanical", "Corsair K70 MAX RGB Magnetic",
        "SteelSeries Apex Pro TKL", "Keychron Q1 Pro Wireless Custom",
        "Logitech G213 Prodigy RGB", "Razer Cynosa V2 Gaming", "Corsair K55 RGB PRO",
        "SteelSeries Apex 3 TKL", "Keychron C1 Hot-Swappable"
    ],
    mouse: [
        "Logitech G PRO X Superlight 2", "Razer Viper V3 Pro Wireless", "Logitech G502 X PLUS",
        "Razer Basilisk V3 Pro", "SteelSeries Aerox 3 Wireless",
        "Logitech G304 Lightspeed Wireless", "Razer DeathAdder V3 Ergonomic", "Corsair Katar Elite Wireless",
        "SteelSeries Rival 3 RGB", "HyperX Pulsefire Haste 2"
    ],
    ram: [
        "Corsair Vengeance RGB 16GB (2x8GB) DDR5 5600MHz", "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz", "Corsair Vengeance RGB 64GB (2x32GB) DDR5 5200MHz",
        "G.SKILL Trident Z5 RGB 16GB DDR5", "G.SKILL Trident Z5 RGB 32GB DDR5 6400MHz", "G.SKILL Trident Z5 RGB 64GB DDR5",
        "Kingston FURY Beast RGB 16GB DDR5", "Kingston FURY Beast RGB 32GB DDR5 5600MHz", "Kingston FURY Renegade 64GB DDR5",
        "TeamGroup T-Force Delta RGB 16GB DDR5"
    ],
    storage: [
        "Samsung 990 PRO 1TB NVMe M.2 SSD", "Samsung 990 PRO 2TB NVMe M.2 SSD", "Samsung 990 PRO 4TB NVMe M.2 SSD",
        "WD_BLACK SN850X 1TB NVMe M.2 SSD", "WD_BLACK SN850X 2TB NVMe M.2 SSD", "WD_BLACK SN850X 4TB NVMe M.2 SSD",
        "Crucial T700 1TB Gen5 NVMe SSD", "Crucial T700 2TB Gen5 NVMe SSD", "Crucial T700 4TB Gen5 NVMe SSD",
        "Kingston KC3000 1TB NVMe SSD"
    ],
    cooler: [
        "NZXT Kraken Elite 360 RGB", "NZXT Kraken 240 Liquid Cooler",
        "Corsair iCUE H150i ELITE LCD XT", "Corsair H100i RGB CORE",
        "Lian Li UNI FAN SL120 V2 RGB Pack", "Lian Li Galahad II Trinity 360",
        "ASUS ROG Ryujin III 360 ARGB", "ASUS TUF Gaming LC II 240",
        "Cooler Master MasterLiquid ML360L", "Deepcool AK620 Digital Air Cooler"
    ],
    motherboard: [
        "ASUS ROG Maximus Z790 Hero", "MSI MPG Z790 Edge WIFI", "Gigabyte Z790 AORUS Master",
        "ASUS TUF Gaming B760-PLUS WIFI", "MSI MAG B760 TOMAHAWK WIFI",
        "ASUS ROG Strix X670E-E Gaming WiFi", "MSI MPG X670E Carbon WIFI", "Gigabyte X670E AORUS Master",
        "ASUS TUF Gaming B650-PLUS WIFI", "MSI MAG B650 TOMAHAWK WIFI"
    ],
    case: [
        "NZXT H5 Flow RGB Tempered Glass", "NZXT H7 Flow Edition", "Lian Li O11 Dynamic EVO",
        "Corsair 4000D Airflow Tempered Glass", "Corsair 5000D RGB AIRFLOW",
        "ASUS TUF Gaming GT301 Case", "Cooler Master MasterBox TD500 Mesh V2",
        "Lian Li Lancool 216 RGB", "Deepcool CH560 Digital", "Phanteks Eclipse G360A"
    ]
};

// دالة المواصفات الفريدة لكل منتج
function getExactSpecsForProduct(product) {
    const name = product.name_ar;
    const cat = product.category;
    const id = product.id;
    let specs = [];

    if (cat === 'gpu') {
        specs.push(`الموديل الفعلي: ${name}`);
        specs.push(`الرقم التعريفي: VEX-GPU-${1000 + id}`);
        specs.push(name.includes('4090') ? "الذاكرة: 24GB GDDR6X بسرعة نقل خارقة" : "الذاكرة العشوائية: مخصصة لأعلى معدلات الإطارات ودقة 4K");
        specs.push("تقنيات الرسوميات: دعم كامل لـ DirectX 12 Ultimate و Ray Tracing");
        specs.push("مزود الطاقة المقترح: 750W / 850W 80+ Gold");
    } else if (cat === 'cpu') {
        specs.push(`إصدار المعالج: ${name}`);
        specs.push("عدد الأنوية والخيوط: أداء فائق ومسارات متعددة للمونتاج والجيمنج");
        specs.push("دعم ذواكر الوصول العشوائي: متوافق مع DDR5 الحديثة");
        specs.push("نظام الحماية: مستشعر حرارة ذكي للحماية ضد الارتفاع المفاجئ");
    } else if (cat === 'laptop') {
        specs.push(`جهاز لابتوب: ${name}`);
        specs.push("شاشة عرض سريعة بمعدل تحديث عالٍ ومضادة للتوهج");
        specs.push("المنظومة الرسومية: كارت شاشة منفصل مخصص لأحدث الألعاب الثقيلة");
        specs.push("التبريد الداخلي: تقنية أنابيب حرارية مزدوجة لتبديد الحرارة بفاعلية");
    } else if (cat === 'apple') {
        specs.push(`جهاز أبل الأصلي: ${name}`);
        specs.push("معالج أبل سيليكون المدمج (Apple Silicon M-Series)");
        specs.push("شاشة عرض Liquid Retina فائقة الوضوح والدقة");
        specs.push("نظام التشغيل: macOS السلس والمستقر بأعلى معايير الأمان");
    } else {
        specs.push(`اسم المنتج التجاري: ${name}`);
        specs.push(`رقم التثبيت الفني: SEC-PRD-${id}`);
        specs.push("المواد المصنوعة منها: خامات عالية الجودة ومقاومة للاستخدام الشاق");
        specs.push("الضمان المعتمد: ضمان رسمي لمدة عامين كاملين ضد عيوب الصناعة");
    }
    return specs;
}

function generateProducts() {
    const helperAdd = (cat, count) => {
        let list = realDataPool[cat] || [];
        for (let i = 1; i <= count; i++) {
            let baseName = list[(i - 1) % list.length] || `${cat} Item ${i}`;
            let name = `${baseName}`;
            
            // 🌟 هنا يتم ربط كل منتج بصورته المحلية الرقمية بالترتيب (1.jpg, 2.jpg, ...)
            let currentId = globalId++;
            let localImg = `${currentId}.jpg`;
            let fallbackImg = defaultImages[cat] || defaultImages.gpu;

            megaProducts.push({
                id: currentId,
                category: cat,
                image: localImg,       
                fallback: fallbackImg, 
                name_ar: name,
                name_en: name,
                price: 2500 + (currentId * 180),
                desc_ar: `وحدة تشغيل أصلية متطورة من فئة ${cat} مصممة خصيصاً لتوفير أفضل تجربة أداء ممكنة.`,
                desc_en: `Authentic high performance ${cat} item.`
            });
        }
    };

    // الالتزام بالترتيب الدقيق للأقسام كما طلبته
    helperAdd('gpu', 40);
    helperAdd('cpu', 20);
    helperAdd('laptop', 30);
    helperAdd('apple', 6);
    helperAdd('monitor', 10);
    helperAdd('headset', 10);
    helperAdd('keyboard', 10);
    helperAdd('mouse', 10);
    helperAdd('ram', 10);
    helperAdd('storage', 10);
    helperAdd('cooler', 10);
    helperAdd('motherboard', 10);
    helperAdd('case', 10);
}

generateProducts();

let currentFilter = 'all';
let cart = [];
let selectedProductForModal = null;
let currentLang = 'ar';
let activeUser = localStorage.getItem('vexora_active_user') ? JSON.parse(localStorage.getItem('vexora_active_user')) : null;

const translations = {
    ar: { addToCartBtnText: "أضف إلى السلة", toastMsg: "تمت إضافة المنتج إلى السلة بنجاح! 🛒", emptyCartMsg: "سلة التسوق فارغة حالياً.", deleteBtn: "حذف" },
    en: { addToCartBtnText: "Add to Cart", toastMsg: "Product added to cart successfully! 🛒", emptyCartMsg: "Your shopping cart is currently empty.", deleteBtn: "Remove" }
};

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(megaProducts);
    updateUserNavUI();
});

function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    document.documentElement.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', currentLang);
    document.getElementById('lang-text').innerText = currentLang === 'ar' ? 'EN' : 'AR';
    renderProducts(getCurrentFilteredList());
}

function getCurrentFilteredList() {
    const query = document.getElementById('search-input').value.toLowerCase().trim();
    let filtered = megaProducts;
    if (currentFilter !== 'all') filtered = filtered.filter(p => p.category === currentFilter);
    if (query !== '') {
        filtered = filtered.filter(p => p.name_ar.toLowerCase().includes(query) || p.name_en.toLowerCase().includes(query) || p.category.toLowerCase().includes(query) || p.id.toString() === query);
    }
    return filtered;
}

function renderProducts(productsList) {
    const container = document.getElementById('product-container');
    if(!container) return;
    container.innerHTML = '';
    const t = translations[currentLang];
    if (productsList.length === 0) { container.innerHTML = `<div class="not-found-box"><h3>المنتج غير متوفر 🔍</h3></div>`; return; }
    productsList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = (e) => { if (!e.target.classList.contains('add-to-cart-btn')) openModal(product); };
        const catLabel = getCatName(product.category, currentLang);
        const name = currentLang === 'ar' ? product.name_ar : product.name_en;
        const desc = currentLang === 'ar' ? product.desc_ar : product.desc_en;
        card.innerHTML = `
            <div class="product-img-wrapper"><img src="${product.image}" alt="Product" class="product-img" onerror="this.src='${product.fallback}'"></div>
            <span class="product-category-tag">${catLabel}</span>
            <h3 class="product-name">${name} <span class="small-id">(ID: ${product.id})</span></h3>
            <p class="product-desc-short">${desc}</p>
            <div class="product-price">${product.price.toLocaleString()} ${currentLang === 'ar' ? 'ج.م' : 'EGP'}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id}, event)">${t.addToCartBtnText}</button>
        `;
        container.appendChild(card);
    });
}

function handleSearch() { renderProducts(getCurrentFilteredList()); }
function filterCategory(cat, event) {
    if(event) event.preventDefault();
    currentFilter = cat;
    showSection('shop');
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    if(event && event.target.classList.contains('filter-tab')) event.target.classList.add('active');
    document.getElementById('search-input').value = '';
    renderProducts(getCurrentFilteredList());
}
function getCatName(cat, lang) {
    const mapAr = { laptop: 'لابتوب جيمنج', gpu: 'كارت شاشة', cpu: 'معالج', apple: 'أجهزة أبل', monitor: 'الشاشات', headset: 'سماعات', keyboard: 'كيبورد', mouse: 'ماوس', ram: 'رامات', storage: 'تخزين SSD', cooler: 'التبريد', motherboard: 'لوحة أم', case: 'صناديق (Cases)' };
    const mapEn = { laptop: 'Gaming Laptop', gpu: 'GPU', cpu: 'CPU', apple: 'Apple', monitor: 'Monitors', headset: 'Headset', keyboard: 'Keyboard', mouse: 'Mouse', ram: 'RAM', storage: 'SSD', cooler: 'Cooling', motherboard: 'Motherboard', case: 'PC Cases' };
    return lang === 'ar' ? (mapAr[cat] || cat) : (mapEn[cat] || cat);
}
function showSection(sec) {
    const shopSec = document.getElementById('shop-section');
    const homeSec = document.getElementById('home-section');
    const cartPage = document.getElementById('cart-page');
    if(shopSec) shopSec.style.display = 'block';
    if(homeSec) homeSec.style.display = sec === 'shop' ? 'flex' : 'none';
    if(cartPage) cartPage.style.display = 'none';
}
function openCartPage() {
    const shopSec = document.getElementById('shop-section');
    const homeSec = document.getElementById('home-section');
    const cartPage = document.getElementById('cart-page');
    if(shopSec) shopSec.style.display = 'none';
    if(homeSec) homeSec.style.display = 'none';
    if(cartPage) cartPage.style.display = 'block';
    renderCartPage();
    window.scrollTo({top: 0, behavior: 'smooth'});
}
function scrollToShop() { 
    const shopSec = document.getElementById('shop-section');
    if(shopSec) shopSec.scrollIntoView({ behavior: 'smooth' }); 
}
function openWhatsApp() { window.open('https://wa.me/201100984141', '_blank'); }

function addToCart(id, event) {
    if(event) event.stopPropagation();
    const prod = megaProducts.find(p => p.id === id);
    if(prod) {
        const existing = cart.find(item => item.id === id);
        if(existing) existing.qty++; else cart.push({ ...prod, qty: 1 });
        updateCartCount(); showToast();
    }
}
function showToast() {
    const toast = document.getElementById('toast-notification');
    if(!toast) return;
    toast.innerText = translations[currentLang].toastMsg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 2200);
}
function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.querySelector('.cart-count');
    if(badge) badge.innerText = totalCount;
}
function renderCartPage() {
    const container = document.getElementById('cart-items-container');
    if(!container) return;
    container.innerHTML = '';
    const t = translations[currentLang];
    if(cart.length === 0) {
        container.innerHTML = `<p style="color:var(--text-color);">${t.emptyCartMsg}</p>`;
        if(document.getElementById('cart-total-items')) document.getElementById('cart-total-items').innerText = '0';
        if(document.getElementById('cart-total-price')) document.getElementById('cart-total-price').innerText = currentLang === 'ar' ? '0 ج.م' : '0 EGP';
        return;
    }
    let totalPrice = 0, totalItems = 0;
    cart.forEach((item, index) => {
        totalPrice += item.price * item.qty; totalItems += item.qty;
        const name = currentLang === 'ar' ? item.name_ar : item.name_en;
        const row = document.createElement('div');
        row.className = 'cart-item-card';
        row.innerHTML = `
            <img src="${item.image}" class="cart-item-img" onerror="this.src='${item.fallback}'">
            <div style="flex:1;"><h4>${name} (ID: ${item.id})</h4><p style="color:var(--primary-accent);">${item.price.toLocaleString()} ${currentLang === 'ar' ? 'ج.م' : 'EGP'} × ${item.qty}</p></div>
            <button class="btn-secondary" onclick="removeFromCart(${index})" style="color:var(--danger-color); border-color:var(--danger-color);">${t.deleteBtn}</button>
        `;
        container.appendChild(row);
    });
    if(document.getElementById('cart-total-items')) document.getElementById('cart-total-items').innerText = totalItems;
    if(document.getElementById('cart-total-price')) document.getElementById('cart-total-price').innerText = totalPrice.toLocaleString() + (currentLang === 'ar' ? ' ج.م' : ' EGP');
}
function removeFromCart(index) { cart.splice(index, 1); updateCartCount(); renderCartPage(); }

function openCheckoutModal() {
    if(cart.length === 0) { alert('السلة فارغة!'); return; }
    if (activeUser) {
        if (document.getElementById('cust-name')) document.getElementById('cust-name').value = activeUser.fullName || activeUser.name || '';
        if (document.getElementById('cust-email')) document.getElementById('cust-email').value = activeUser.email || '';
    }
    const modal = document.getElementById('checkout-modal');
    if(modal) modal.style.display = 'block';
}
function closeCheckoutModal() { 
    const modal = document.getElementById('checkout-modal');
    if(modal) modal.style.display = 'none'; 
}
function confirmOrder(event) {
    event.preventDefault();
    const nameInput = document.getElementById('cust-name');
    const emailInput = document.getElementById('cust-email');
    const addressInput = document.getElementById('cust-address');
    const phoneInput = document.getElementById('cust-phone1');
    
    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const address = addressInput ? addressInput.value.trim() : '';
    const phone1 = phoneInput ? phoneInput.value.trim() : '';

    if(!name || !address || !phone1) { alert('الرجاء إدخال البيانات المطلوبة!'); return; }
    alert(`شكراً لك يا ${name}! تم إتمام طلبك بنجاح وسنتواصل معك عبر البريد (${email}).`);
    cart = []; updateCartCount(); closeCheckoutModal(); showSection('shop');
}

function openModal(product) {
    selectedProductForModal = product;
    const modal = document.getElementById('product-modal');
    if(!modal) return;
    
    const imgEl = document.getElementById('modal-img');
    if(imgEl) {
        imgEl.src = product.image;
        imgEl.onerror = function() { this.src = product.fallback; };
    }
    
    const titleEl = document.getElementById('modal-title');
    if(titleEl) titleEl.innerText = (currentLang === 'ar' ? product.name_ar : product.name_en) + ` (ID: ${product.id})`;
    
    const catEl = document.getElementById('modal-cat');
    if(catEl) catEl.innerText = getCatName(product.category, currentLang);
    
    const priceEl = document.getElementById('modal-price');
    if(priceEl) priceEl.innerText = product.price.toLocaleString() + (currentLang === 'ar' ? ' ج.م' : ' EGP');
    
    const descEl = document.getElementById('modal-desc');
    if(descEl) descEl.innerText = product.desc_ar;
    
    const list = document.getElementById('modal-specs-list');
    if(list) {
        list.innerHTML = '';
        const specs = getExactSpecsForProduct(product);
        specs.forEach(s => { 
            const li = document.createElement('li'); 
            li.innerText = s; 
            list.appendChild(li); 
        });
    }
    modal.style.display = 'flex';
}
function addCurrentToCart() { if(selectedProductForModal) { addToCart(selectedProductForModal.id); closeProductModal(); } }
function closeProductModal() { 
    const modal = document.getElementById('product-modal');
    if(modal) modal.style.display = 'none'; 
}

function openAuthModal(defaultView = 'login') {
    switchAuthView(defaultView);
    const overlay = document.getElementById('auth-modal-overlay');
    if(overlay) overlay.classList.add('active');
}
function closeAuthModal() { 
    const overlay = document.getElementById('auth-modal-overlay');
    if(overlay) overlay.classList.remove('active'); 
}
function switchAuthView(viewName) {
    ['login', 'signup', 'forgot-email', 'forgot-code', 'reset-pass'].forEach(v => {
        const el = document.getElementById(`view-${v}`);
        if(el) el.style.display = (v === viewName) ? 'block' : 'none';
    });
}
function handleLoginSubmit(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('login-username');
    const username = usernameInput ? usernameInput.value.trim() : 'User';
    activeUser = { name: username, fullName: username, email: `${username.toLowerCase()}@gmail.com` };
    localStorage.setItem('vexora_active_user', JSON.stringify(activeUser));
    alert(`مرحباً بك يا ${username}!`);
    updateUserNavUI(); closeAuthModal();
}
function handleSignUpSubmit(e) {
    e.preventDefault();
    const fullNameInput = document.getElementById('signup-fullname');
    const usernameInput = document.getElementById('signup-username');
    const contactInput = document.getElementById('signup-email');
    
    const fullName = fullNameInput ? fullNameInput.value.trim() : 'User';
    const username = usernameInput ? usernameInput.value.trim() : 'User';
    const contact = contactInput ? contactInput.value.trim() : '';

    activeUser = { name: username, fullName: fullName, email: contact.includes('@') ? contact : `${username.toLowerCase()}@gmail.com` };
    localStorage.setItem('vexora_active_user', JSON.stringify(activeUser));
    alert(`تم إنشاء الحساب بنجاح يا ${username}!`);
    updateUserNavUI(); closeAuthModal();
}
function openGoogleAccountsModal() { 
    const modal = document.getElementById('google-accounts-modal');
    if(modal) modal.classList.add('active'); 
}
function closeGoogleAccountsModal() { 
    const modal = document.getElementById('google-accounts-modal');
    if(modal) modal.classList.remove('active'); 
}
function selectGoogleAccount(email) {
    const namePart = email.split('@')[0];
    activeUser = { name: namePart, fullName: namePart, email: email };
    localStorage.setItem('vexora_active_user', JSON.stringify(activeUser));
    alert(`تم تسجيل الدخول بنجاح عبر حساب جوجل: ${email}`);
    closeGoogleAccountsModal(); closeAuthModal(); updateUserNavUI();
}
function handleSendCodeSubmit(e) { e.preventDefault(); alert("تم إرسال كود التحقق لبريدك (كود التجربة: 1234)"); switchAuthView('forgot-code'); }
function handleVerifyCodeSubmit(e) {
    e.preventDefault();
    const codeInput = document.getElementById('reset-code');
    if(codeInput && codeInput.value.trim() === "1234") switchAuthView('reset-pass');
    else alert("الكود غير صحيح! استخدم 1234");
}
function handleNewPasswordSubmit(e) {
    e.preventDefault();
    const p1 = document.getElementById('new-password');
    const p2 = document.getElementById('confirm-new-password');
    if(p1 && p2 && p1.value !== p2.value) { alert("كلمتا السر غير متطابقتين!"); return; }
    alert("تم تغيير كلمة السر بنجاح!"); switchAuthView('login');
}
function updateUserNavUI() {
    const slot = document.getElementById('auth-header-slot');
    if (!slot) return;
    if (activeUser) {
        slot.innerHTML = `<div class="user-profile-avatar" onclick="logoutUser()" title="تسجيل الخروج"><span>👤 ${activeUser.name}</span></div>`;
    } else {
        slot.innerHTML = `<button class="btn-secondary login-header-btn" onclick="openAuthModal('login')" id="nav-login-btn">🔑 تسجيل الدخول</button>`;
    }
}
function logoutUser() {
    if(confirm("هل تريد تسجيل الخروج؟")) {
        localStorage.removeItem('vexora_active_user');
        activeUser = null; updateUserNavUI(); alert("تم تسجيل الخروج.");
    }
}

// نظام التقييمات والفيدباك للمتجر
let storeReviews = JSON.parse(localStorage.getItem('vexora_reviews')) || [
    { name: "أحمد محمود", rating: 5, comment: "شريت من المتجر والتوصيل كان في أسرع وقت وتغليف احترافي جداً!", date: "2026-10-15" },
    { name: "سارة خليل", rating: 5, comment: "أفضل أسعار ومنتجات أصلية بالضمان تماماً.", date: "2026-10-28" }
];

document.addEventListener('DOMContentLoaded', () => {
    renderReviews();
});

function renderReviews() {
    const grid = document.getElementById('reviews-grid');
    if(!grid) return;
    grid.innerHTML = '';
    storeReviews.forEach(r => {
        const stars = '⭐'.repeat(r.rating);
        const card = document.createElement('div');
        card.style.cssText = "background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <strong style="color:var(--primary-accent, #00f0ff);">${r.name}</strong>
                <span>${stars}</span>
            </div>
            <p style="font-size:0.9em; opacity:0.9; margin-bottom:8px;">"${r.comment}"</p>
            <small style="opacity:0.5; font-size:0.75em;">${r.date}</small>
        `;
        grid.appendChild(card);
    });
}

function openFeedbackModal() { 
    const fbModal = document.getElementById('feedback-modal');
    if(fbModal) fbModal.style.display = 'flex'; 
}

function closeFeedbackModal() { 
    const fbModal = document.getElementById('feedback-modal');
    if(fbModal) fbModal.style.display = 'none'; 
}

function handleFeedbackSubmit(e) {
    e.preventDefault();
    const nameIn = document.getElementById('fb-name');
    const rateIn = document.getElementById('fb-rating');
    const commIn = document.getElementById('fb-comment');
    
    const name = nameIn ? nameIn.value.trim() : 'زائر';
    const rating = rateIn ? parseInt(rateIn.value) : 5;
    const comment = commIn ? commIn.value.trim() : '';
    
    const newReview = { name, rating, comment, date: new Date().toISOString().split('T')[0] };
    storeReviews.unshift(newReview);
    localStorage.setItem('vexora_reviews', JSON.stringify(storeReviews));
    
    renderReviews();
    closeFeedbackModal();
    alert('شكراً لك على تقييمك لمتاجر VEXORA! ❤️');
}

window.addEventListener('click', (e) => {
    if(e.target === document.getElementById('product-modal')) closeProductModal();
    if(e.target === document.getElementById('checkout-modal')) closeCheckoutModal();
    if(e.target === document.getElementById('auth-modal-overlay')) closeAuthModal();
    if(e.target === document.getElementById('google-accounts-modal')) closeGoogleAccountsModal();
    if(e.target === document.getElementById('feedback-modal')) closeFeedbackModal();
});

// فتح نافذة التقييم
function openFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) {
        modal.style.display = 'flex'; // أو block حسب تصميمك
    }
}

// قفل نافذة التقييم
function closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// إرسال التقييم
function handleFeedbackSubmit(event) {
    event.preventDefault();
    // هنا الكود اللي بيحفظ التقييم أو يعرضه
    alert('شكراً لك! تم إضافة تقييمك بنجاح ⭐');
    closeFeedbackModal();
}

// فتح نافذة إضافة التقييم
function openFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

// إغلاق نافذة إضافة التقييم
function closeFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleFeedbackSubmit(event) {
    event.preventDefault(); // منع الصفحة من إعادة التحميل

    // 1. استخراج البيانات اللي المستخدم كتبها في النماذج
    const name = document.getElementById('fb-name').value;
    const rating = document.getElementById('fb-rating').value;
    const comment = document.getElementById('fb-comment').value;

    // 2. تحويل رقم التقييم لنجوم (مثل ⭐⭐⭐⭐⭐)
    let stars = '';
    for (let i = 0; i < Number(rating); i++) {
        stars += '⭐';
    }

    // 3. إنشاء كارت جديد للتقييم بنفس تصميم موقعك
    const reviewsGrid = document.getElementById('reviews-grid');
    const newReviewCard = document.createElement('div');
    
    // تصميم الكارت (نفس ستايل الموقع الداكن والشيك)
    newReviewCard.style.cssText = "background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; color: #fff; text-align: right;";
    
    newReviewCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
            <strong style="color: #00f0ff; font-size: 1.05rem;">${name}</strong>
            <span style="font-size: 0.85rem;">${stars}</span>
        </div>
        <p style="color: #ccc; font-size: 0.9rem; line-height: 1.5; margin-bottom: 10px;">"${comment}"</p>
        <span style="font-size: 0.75rem; color: #777;">الآن</span>
    `;

    // 4. إضافة الكارت الجديد في أول شبكة التقييمات
    if (reviewsGrid) {
        reviewsGrid.prepend(newReviewCard);
    }

    // 5. إغلاق النافذة وتفريغ الحقول
    document.getElementById('feedback-modal').style.display = 'none';
    event.target.reset(); // مسح الـ Inputs بعد النشر
}