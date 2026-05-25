document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. ФУНКЦІОНАЛ ПОШУКУ ТОВАРІВ
    // ==========================================
    const searchInput = document.querySelector(".search-bar input");
    const productCards = document.querySelectorAll(".product-card");

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const searchText = e.target.value.toLowerCase().trim();

            productCards.forEach((card) => {
                const productName = card.querySelector("h4").textContent.toLowerCase();
                
                // Якщо назва товару містить текст пошуку, показуємо його, інакше — ховаємо
                if (productName.includes(searchText)) {
                    card.style.display = ""; // повертає початковий стан (наприклад, block)
                } else {
                    card.style.style.display = "none";
                }
            });
        });
    }

    // ==========================================
    // 2. ДОДАВАННЯ ТОВАРУ В КОШИК (ІМІТАЦІЯ)
    // ==========================================
    const basketIcon = document.querySelector('img[src="img/basket.png"]');
    
    // Створюємо індикатор кількості товарів над кошиком
    let cartCount = 0;
    const badge = document.createElement("span");
    badge.style.cssText = `
        position: absolute;
        background: red;
        color: white;
        border-radius: 50%;
        padding: 2px 6px;
        font-size: 12px;
        transform: translate(-10px, -10px);
        display: none;
    `;
    if (basketIcon && basketIcon.parentElement) {
        basketIcon.parentElement.style.position = "relative";
        basketIcon.parentElement.appendChild(badge);
    }

    productCards.forEach((card) => {
        // Додамо просту кнопку "В кошик" для кожної картки динамічно
        const buyBtn = document.createElement("button");
        buyBtn.textContent = "В кошик";
        buyBtn.style.cssText = `
            background-color: #7b2cbf;
            color: white;
            border: none;
            padding: 8px 12px;
            margin-top: 10px;
            cursor: pointer;
            border-radius: 4px;
            width: 100%;
        `;
        card.appendChild(buyBtn);

        buyBtn.addEventListener("click", () => {
            const productName = card.querySelector("h4").textContent;
            cartCount++;
            
            // Оновлюємо цифру на іконці кошика
            badge.textContent = cartCount;
            badge.style.display = "inline";

            alert(`Товар "${productName}" успішно додано до кошика!`);
        });
    });

    // ==========================================
    // 3. ВАЛІДАЦІЯ ФОРМИ ПОЖЕРТВУВАННЯ В ФУТЕРІ
    // ==========================================
    const donateBtn = document.querySelector(".btn-submit");
    const amountInput = document.querySelector('.footer-form input[placeholder="Сума"]');
    const emailInput = document.querySelector('.footer-form input[placeholder="E-mail"]');

    if (donateBtn) {
        donateBtn.addEventListener("click", (e) => {
            e.preventDefault(); // Зупиняємо перезавантаження сторінки

            const amount = amountInput.value.trim();
            const email = emailInput.value.trim();

            // Перевірка на заповненість полів
            if (!amount || !email) {
                alert("Будь ласка, заповніть обидва поля: суму та E-mail.");
                return;
            }

            // Перевірка чи сума є числом і вона більша за нуль
            if (isNaN(amount) || Number(amount) <= 0) {
                alert("Будь ласка, введіть коректну суму (число більше за 0).");
                return;
            }

            // Перевірка формату email (простий регулярний вираз)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("Будь ласка, введіть правильну адресу електронної пошти.");
                return;
            }

            // Якщо все добре
            alert(`Дякуємо за вашу допомогу! Ви пожертвували ${amount} грн. На вказаний email ${email} надіслано квитанцію.`);
            
            // Очищення полів після успішної відправки
            amountInput.value = "";
            emailInput.value = "";
        });
    }
});