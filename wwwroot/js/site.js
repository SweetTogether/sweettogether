document.addEventListener("DOMContentLoaded", () => {
    const dateInput = document.getElementById("startDate");
    const todayStr = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("max", todayStr);

    const quoteText = document.getElementById("quoteText");
    const mascotImage = document.getElementById("mascotImage");
    const cardBox = document.getElementById("cardBox");
    const name1Input = document.getElementById("name1");
    const name2Input = document.getElementById("name2");
    const namesDisplay = document.getElementById("namesDisplay");
    const photoInput = document.getElementById("photoInput");
    const photoPreview = document.getElementById("photoPreview");
    const plusSign = document.getElementById("plusSign");
    const cuteFactBtn = document.getElementById("cuteFactToggle");
    const cuteFactText = document.getElementById("cuteFactText");

    const colorButtons = document.querySelectorAll(".color-circle");
    const mascotButtons = document.querySelectorAll(".mascot-choice");
    const langButtons = document.querySelectorAll(".lang-btn");

    let currentFacts = [];
    let currentLang = "en";
    let currentMascot = "stars";
    let currentPhrase = "";
    let currentFactIndex = 0;
    let cuteFactVisible = false;

    const mascotPhrases = {
        en: {
            stars: "We've been shining together",
            birds: "We've been flying together",
            bunnybear: "We've been hugging together",
            cats: "We've been purring together",
            clouds: "We've been dreaming together",
            bees: "We've been buzzing together",
            music: "We've been vibing together",
            gamepads: "We've been playing together"
        },
        ru: {
            stars: "Мы сияем вместе",
            birds: "Мы летаем вместе",
            bunnybear: "Мы обнимаемся вместе",
            cats: "Мы мурлыкаем вместе",
            clouds: "Мы мечтаем вместе",
            bees: "Мы жужжим вместе",
            music: "Мы звучим вместе",
            gamepads: "Мы играем вместе"
        }
    };

    function decline(number, one, few, many) {
        const mod10 = number % 10;
        const mod100 = number % 100;
        if (mod100 >= 11 && mod100 <= 14) return many;
        if (mod10 === 1) return one;
        if (mod10 >= 2 && mod10 <= 4) return few;
        return many;
    }

    function formatTime(mins, lang = "en") {
        const h = Math.floor(mins / 60);
        const m = mins % 60;

        if (lang === "ru") {
            if (h > 0 && m > 0) return `${h} ч и ${m} мин`;
            if (h > 0) return `${h} ч`;
            return `${m} мин`;
        } else {
            if (h > 0 && m > 0) return `${h} hour${h !== 1 ? "s" : ""} and ${m} minute${m !== 1 ? "s" : ""}`;
            if (h > 0) return `${h} hour${h !== 1 ? "s" : ""}`;
            return `${m} minute${m !== 1 ? "s" : ""}`;
        }
    }

    function getDaysSinceStart() {
        const startDate = new Date(dateInput.value);
        const today = new Date();
        if (!isNaN(startDate)) {
            return Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
        }
        return 0;
    }

    function updateCard(phrase, mascot) {
        currentMascot = mascot;
        currentPhrase = phrase;

        const days = getDaysSinceStart();
        generateFacts(days);

        const years = Math.floor(days / 365);
        const extraDays = days % 365;

        let timeText = "";

        if (currentLang === "ru") {
            if (years > 0 && extraDays > 0) {
                timeText = `${years} ${decline(years, "год", "года", "лет")} и ${extraDays} ${decline(extraDays, "день", "дня", "дней")}`;
            } else if (years > 0) {
                timeText = `${years} ${decline(years, "год", "года", "лет")}`;
            } else if (extraDays > 0) {
                timeText = `${extraDays} ${decline(extraDays, "день", "дня", "дней")}`;
            }
        } else {
            if (years > 0 && extraDays > 0) {
                timeText = `${years} year${years !== 1 ? "s" : ""} and ${extraDays} day${extraDays !== 1 ? "s" : ""}`;
            } else if (years > 0) {
                timeText = `${years} year${years !== 1 ? "s" : ""}`;
            } else if (extraDays > 0) {
                timeText = `${extraDays} day${extraDays !== 1 ? "s" : ""}`;
            }
        }

        quoteText.textContent = timeText ? `${phrase} ${timeText}!` : `${phrase}!`;
        mascotImage.src = `/img/mascot-${mascot}.png`;
        updateCuteFact();
    }

    function generateFacts(days) {
        const hugs = days * 3;
        const hugMinutes = days * 3;
        const kisses = days * 4;
        const handHoldMinutes = days * 15;
        const eyeContacts = days * 20;
        const laughMinutes = days * 5;
        const loveSeconds = days * 86400;
        const messages = days * 30;
        const calls = days * 1;
        const thinkingMinutes = days * 2;

        currentFacts = currentLang === "ru" ? [
            `💛 За все время мы обнялись уже более ${hugs} раз.`,
            `💛 Общее время наших обнимашек: ${formatTime(hugMinutes, "ru")}.`,
            `💛 За все время мы целовали друг друга более ${kisses} раз.`,
            `💛 Мы держались за ручки в сумме ${formatTime(handHoldMinutes, "ru")}.`,
            `💛 Мы смотрели друг другу в глаза более ${eyeContacts} раз.`,
            `💛 Мы смеялись вместе целых ${formatTime(laughMinutes, "ru")}.`,
            `💛 Наша любовь длится уже ${loveSeconds.toLocaleString("ru-RU")} секунд.`,
            `💛 Мы отправили друг другу более ${messages} милых сообщений.`,
            `💛 Мы звонили друг другу более ${calls} раз.`,
            `💛 Мы сказали \"Люблю\" друг другу более ${thinkingMinutes} раз.`
        ] : [
            `💛 We've hugged more than ${hugs} times together.`,
            `💛 Our cuddle time adds up to ${formatTime(hugMinutes)}.`,
            `💛 We've kissed over ${kisses} sweet times.`,
            `💛 We've held hands for ${formatTime(handHoldMinutes)} in total.`,
            `💛 We've met eyes more than ${eyeContacts} times.`,
            `💛 We've laughed together for ${formatTime(laughMinutes)}.`,
            `💛 Our love has lasted ${loveSeconds.toLocaleString("en-US")} seconds.`,
            `💛 We've sent each other over ${messages} sweet messages.`,
            `💛 We've made more than ${calls} lovely phone calls.`,
            `💛 We've said \"I love you\" over ${thinkingMinutes} times.`
        ];

        if (cuteFactVisible && currentFacts.length > 0) {
            cuteFactText.textContent = currentFacts[currentFactIndex];
        }
    }

    function updateCuteFact() {
        if (cuteFactVisible && currentFacts.length > 0) {
            cuteFactText.textContent = currentFacts[currentFactIndex];
            cuteFactText.style.display = "block";
        } else {
            cuteFactText.style.display = "none";
        }
    }

    cuteFactBtn.addEventListener("click", () => {
        cuteFactBtn.classList.toggle("active");
        cuteFactVisible = cuteFactBtn.classList.contains("active");

        if (cuteFactVisible) {
            currentFactIndex = Math.floor(Math.random() * currentFacts.length);
        }

        updateCuteFact();
    });

    cuteFactText.addEventListener("click", () => {
        currentFactIndex = (currentFactIndex + 1) % currentFacts.length;
        updateCuteFact();
    });

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            setLanguage(btn.dataset.lang);
        });
    });    

    dateInput.addEventListener("change", () => {
        const active = document.querySelector(".mascot-choice.active");
        const mascot = active ? active.dataset.mascot : "stars";
        const phrase = mascotPhrases[currentLang][mascot];
        updateCard(phrase, mascot);

        document.getElementById("cuteFactWrapper").style.display = dateInput.value ? "inline-block" : "none";
    });

    colorButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            cardBox.style.backgroundColor = btn.dataset.color;
        });
    });

    mascotButtons.forEach(button => {
        button.addEventListener("click", () => {
            mascotButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const mascot = button.dataset.mascot;
            const phrase = mascotPhrases[currentLang][mascot];
            updateCard(phrase, mascot);
        });
    });

    downloadBtn.addEventListener("click", () => {
        const exportArea = document.getElementById("cardContentToExport");
        const photoUpload = document.getElementById("photoUpload");
        const hasPhoto = photoPreview && photoPreview.style.display === "block";
        const leftSection = document.querySelector(".left-section");

        // Сохраняем старое состояние
        const originalDisplay = photoUpload.style.display;
        const originalLeftClass = leftSection.className;

        // 1. Подготовка перед рендером
        if (!hasPhoto) {
            photoUpload.style.display = "none";
            leftSection.classList.add("centered");
        }

        html2canvas(exportArea, {
            backgroundColor: window.getComputedStyle(cardBox).backgroundColor,
            scale: 2
        }).then(canvas => {
            // 2. Возврат оригинального состояния
            photoUpload.style.display = originalDisplay;
            leftSection.className = originalLeftClass;

            // 3. Скачивание
            const link = document.createElement("a");
            link.download = "SweetTogether_Card.png";
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    photoInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            photoPreview.src = reader.result;
            photoPreview.style.display = "block";
            plusSign.style.display = "none";

            // Добавляем рамку к блоку с фото
            document.getElementById("photoUpload").classList.add("has-photo");
        };
        reader.readAsDataURL(file);
    });
    function updateNamesDisplay() {
        const name1 = name1Input.value.trim();
        const name2 = name2Input.value.trim();
        namesDisplay.textContent = name1 && name2 ? `${name1} ❤️ ${name2}` : "";
    }

    name1Input.addEventListener("input", updateNamesDisplay);
    name2Input.addEventListener("input", updateNamesDisplay);

    function setLanguage(lang) {       
        const mascotLabels = {
            en: {
                stars: "Stars",
                birds: "Birds",
                bunnybear: "Bunny & Bear",
                cats: "Cats",
                clouds: "Clouds",
                bees: "Bees",
                music: "Music",
                gamepads: "Gamepads"
            },
            ru: {
                stars: "Звёзды",
                birds: "Птички",
                bunnybear: "Зайка и Мишка",
                cats: "Котики",
                clouds: "Облачки",
                bees: "Пчёлки",
                music: "Музыка",
                gamepads: "Джойстики"
            }
        };

        currentLang = lang;

        // Обновление текста
        document.querySelector(".title").textContent = "SweetTogether ❤️";
        document.querySelector('label[for="startDate"]').textContent = lang === "ru" ? "Дата начала" : "Start Date";
        document.querySelector("h3").textContent = lang === "ru" ? "Мы как..." : "We’re like...";
        document.getElementById("downloadBtn").textContent = lang === "ru" ? "⬇ Скачать" : "⬇ Download";
        document.getElementById("copyLinkBtn").textContent = lang === "ru" ? "🔗 Поделиться" : "🔗 Share";
        document.getElementById("cuteFactToggle").textContent = lang === "ru" ? "💡 Факт" : "💡 Cute Fact";
        document.getElementById("name1").placeholder = lang === "ru" ? "Имя 1" : "Name 1";
        document.getElementById("name2").placeholder = lang === "ru" ? "Имя 2" : "Name 2";

        // Обновление фраз и надписей маскотов
        document.querySelectorAll(".mascot-choice").forEach(button => {
            const mascot = button.dataset.mascot;
            const labelSpan = button.querySelector(".mascot-label");
            if (labelSpan && mascotLabels[lang][mascot]) {
                labelSpan.textContent = mascotLabels[lang][mascot];
            }

            // Обновляем текст фразы
            button.dataset.phrase = mascotPhrases[lang][mascot];
        });

        const active = document.querySelector(".mascot-choice.active");
        const mascot = active ? active.dataset.mascot : "stars";
        const phrase = mascotPhrases[lang][mascot];
        document.documentElement.lang = lang;
        // Обновляем открытку и текущий факт
        updateCard(phrase, mascot);     

        // === Footer Translation ===
        const footerPrivacyLink = document.getElementById("privacyFooterLink");
        if (footerPrivacyLink) {
            footerPrivacyLink.textContent = lang === "ru" ? "Политика конфиденциальности" : "Privacy Policy";
        }

    }

    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            setLanguage(btn.dataset.lang);
        });
    });

    const activeLangButton = document.querySelector(".lang-btn.active");
    if (activeLangButton) {
        setLanguage(activeLangButton.dataset.lang);
    }

    const copyLinkBtn = document.getElementById("copyLinkBtn");

    copyLinkBtn.addEventListener("click", function () {
        const name1 = document.getElementById("name1").value.trim();
        const name2 = document.getElementById("name2").value.trim();
        const startDate = document.getElementById("startDate").value;
        const card = document.getElementById("cardBox");
        const mascotSrc = document.getElementById("mascotImage").getAttribute("src");
        const quoteText = document.getElementById("quoteText").innerText.trim();
        const factToggle = document.getElementById("cuteFactToggle");
        const factText = factToggle?.classList.contains("active") ? document.getElementById("cuteFactText").innerText.trim() : "";
        const lang = document.documentElement.lang || "en";

        if (!name1 || !name2) {
            alert(lang === "ru" ? "Пожалуйста, введите оба имени." : "Please enter both names.");
            return;
        }

        if (!startDate) {
            alert(lang === "ru" ? "Пожалуйста, выберите дату." : "Please select a start date.");
            return;
        }

        // Получаем дату отношений
        const start = new Date(startDate);
        const today = new Date();
        const totalDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
        const years = Math.floor(totalDays / 365);
        const days = totalDays % 365;

        let dateText = "";
        if (lang === "ru") {
            const decline = (n, one, few, many) => {
                const mod10 = n % 10;
                const mod100 = n % 100;
                if (mod100 >= 11 && mod100 <= 14) return many;
                if (mod10 === 1) return one;
                if (mod10 >= 2 && mod10 <= 4) return few;
                return many;
            };

            if (years > 0 && days > 0) {
                dateText = `${years} ${decline(years, "год", "года", "лет")} и ${days} ${decline(days, "день", "дня", "дней")}`;
            } else if (years > 0) {
                dateText = `${years} ${decline(years, "год", "года", "лет")}`;
            } else {
                dateText = `${days} ${decline(days, "день", "дня", "дней")}`;
            }
        } else {
            if (years > 0 && days > 0) {
                dateText = `${years} year${years !== 1 ? "s" : ""} and ${days} day${days !== 1 ? "s" : ""}`;
            } else if (years > 0) {
                dateText = `${years} year${years !== 1 ? "s" : ""}`;
            } else {
                dateText = `${days} day${days !== 1 ? "s" : ""}`;
            }
        }

        const color = rgbToHex(window.getComputedStyle(card).backgroundColor);
        const mascotMatch = mascotSrc.match(/mascot-(.*?)\.png$/);
        const mascot = mascotMatch ? mascotMatch[1] : "stars";

        const query = new URLSearchParams({
            name1: name1,
            name2: name2,
            dateText: dateText,
            color: color,
            mascot: mascot,
            lang: lang
        });

        if (factText) {
            query.append("fact", factText);
        }

        const shareUrl = `${window.location.origin}/Card?${query.toString()}`;

        navigator.clipboard.writeText(shareUrl).then(() => {
            alert(lang === "ru" ? "Ссылка скопирована!" : "Link copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    });

    function rgbToHex(rgb) {
        const result = rgb.match(/\d+/g);
        if (!result) return "#fef3f3";
        return "#" + result.map(x => {
            const hex = parseInt(x).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }
});
