# Oʻzgarishlar jurnali — Davlat akkreditatsiyasi monitoringi

## 2026-10-28 — Taʼlim tashkilotlari reyestri 27.10.2026 holatiga yangilandi

### Oʻzgartirildi
- `data-institutions.js` «Таълим ташкилотлари 27.10.2026.xlsx» asosida toʻliq qayta shakllantirildi: 1 242 ta tashkilot (avval 1 125). Yangi maydonlar: `type` (tashkilot turi: oliy/kasbiy/oʻrta maxsus taʼlim tashkiloti, ilmiy-tadqiqot tashkiloti, markaz, institut va b.), `founder` (tasarruf etuvchi vazirlik/idora, 100 ta), `lvls` (tashkilot taʼlim beradigan barcha darajalar — 136 ta tashkilotda bir nechta daraja), `apps` (har bir daraja boʻyicha ariza sanasi), `approx` (faqat yili koʻrsatilgan sanalar, 36 ta — 1-yanvar deb olinadi). `lvl` — asosiy daraja (oliy → oʻrta maxsus → kasbiy → oliy taʼlimdan keyingi → kadrlar malakasi), `app` — eng erta ariza sanasi; shuning uchun mavjud hisob-kitoblar oʻzgarmadi.
- Reyestrga ilk bor **oliy taʼlimdan keyingi taʼlim** (259 ta tashkilot, shundan 129 tasi faqat shu darajada — asosan ilmiy-tadqiqot institutlari) kiritildi; «Taʼlim tashkilotlari» va «Akkreditatsiya grafigi» boʻlimlarida shu daraja uchun alohida ichki boʻlim qoʻshildi.
- Taʼlim turi boʻyicha filtrlar (Dashboard, reyestr, hisobotlar) endi tashkilotning barcha darajalarini hisobga oladi; «Oʻzbekiston xaritasi» yozuvida darajalar boʻyicha sonlar ham barcha darajalar boʻyicha (jami — noyob tashkilotlar).
- Reyestr sahifasida (`institutional.html`): «Tashkilot turi» va «Tasarruf etuvchi» filtrlari, jadvalda «Tashkilot turi» ustuni (qoʻshimcha: «Tasarruf etuvchi tashkilot», «Taʼlim darajalari»), tashkilot kartochkasida va Excel/CSV eksportida yangi maydonlar.
- Dashboard «Taʼlim tashkilotlari tahlili» boʻlimiga ikkita yangi diagramma: «Tashkilot turi boʻyicha» va «Tasarruf etuvchi tashkilotlar kesimida» (eng koʻp 12 tasi).

- Koʻp darajali tashkilotlar koʻrsatiladi: Dashboardda «Bir nechta taʼlim darajasida oʻqitadigan tashkilotlar» (darajalar kombinatsiyasi) va «Tashkilotdagi taʼlim darajalari soni» diagrammalari; reyestr jadvalida standart ustun endi «Taʼlim darajalari» (barchasi), «Taʼlim darajalari» koʻrinishida kombinatsiyalar va holat jadvali.
- Buyurtmachi koʻrsatmasi boʻyicha 22 ta harbiy va huquqni muhofaza qiluvchi idoralar tasarrufidagi tashkilotning nomi platformada koʻrsatilmaydi: ular barcha svod sonlarda hisobga olinadi, lekin reyestr, kartochka, jadval, eksport, hisobot va boshqa bazalarda «Yopiq taʼlim tashkiloti (T/r N)» yorligʻi bilan beriladi (`conf` maydoni; kompleks/maxsus bazalaridagi mos yozuv ham shu yorliqqa oʻtkazildi).

### Eslatma
- 2025-yil oktabrida qayta tashkil etilgan ~550 kasbiy taʼlim muassasasining 2 yillik muddati 2027-yil oktabrida tugaydi; 2026-yil 27-oktabrdan boshlab ular «muddati yaqin» (1 yil ichida) holatiga oʻtdi — bu sana effekti, maʼlumot xatosi emas.
- Reyestrda 111 ta tashkilotda (asosan yangi kiritilgan ilmiy-tadqiqot tashkilotlari) sana maʼlumotlari yoʻq — ular «Maʼlumot yetarli emas» holatida.

## 2026-10-20 — «Oʻzbekiston xaritasi» boʻlimi

### Qoʻshildi
- Asosiy boʻlimlar roʻyxatida Dashboard'dan keyin **«Oʻzbekiston xaritasi»** (`uzmap.js`, `uz-map-data.js`): 14 hudud chegarasi (och koʻk hududlar, toʻq koʻk chegaralar, hudud nomlari). Kursor ustida hudud animatsiya bilan boʻrtib chiqadi, hudud markazida nuqta va yoʻnaltiruvchi chiziq paydo boʻladi, yozuvda jami taʼlim tashkilotlari soni hamda turlar boʻyicha (oliy taʼlim, oʻrta maxsus taʼlim, kasbiy taʼlim, kadrlarni qayta tayyorlash va malaka oshirish) sonlar chiqadi; nol qiymatli turlar koʻrsatilmaydi (reyestrda «oliy taʼlimdan keyingi taʼlim» turi hozircha yoʻq). Manba: `data-institutions.js` (1125 tashkilot), hudud nomlari apostrof variantlari bilan moslashtiriladi.
- Ichki boʻlimlar: «Hududlar xaritasi» va «Hududlar jadvali» (turlar boʻyicha jadval). Klaviatura (Tab/Esc) va sensorli ekran qoʻllab-quvvatlanadi; harakatni kamaytirish rejimida animatsiya oʻchadi; tungi mavzu; uch tilda; ovozli qisqacha sharh; admin panelda boshqariladi (`xarita`, `msec-top`, `msec-table`).
- Chegaralar manbasi: geoBoundaries (gbOpen, UZB ADM1, ODbL 1.0), soddalashtirilgan.
- Xaritada 14 hududning markaziy shaharlari geografik joylashuvi boʻyicha nuqta va nom bilan koʻrsatiladi (Nukus, Andijon, Buxoro, Fargʻona, Jizzax, Urganch, Namangan, Navoiy, Qarshi, Samarqand, Guliston, Termiz, Nurafshon, Toshkent). Pulsatsiya qiluvchi belgi va yozuvga boruvchi tirsakli chiziq endi markaziy shahar nuqtasidan chiqadi; yozuv shahar nomini yopmaydi (kerak boʻlsa pastga yoki tepaga suriladi). Yozuvda «Markaziy shahar» qatori qoʻshildi. Yozuv xarita ustini yopmaydi: doimo xaritaning yuqori oʻng burchagidagi boʻsh joyda chiqadi, tirsakli chiziq shahar nuqtasidan oʻsha yergacha boradi (telefonda yozuv xarita ostida).

## 2026-10-19 — Atamalar (ru/en) va admin backend ulanishi

### Oʻzgartirildi
- Rasmiy atamalar tarjimasi butun platformada (interfeys, dashbord, hisobotlar, ovozli sharh, eksportlar) yagonalashtirildi: **Kompleks davlat akkreditatsiyasi** → ru «Институциональная аккредитация», en «Institutional Accreditation»; **Maxsus davlat akkreditatsiyasi** → ru «Программная аккредитация», en «Programme Accreditation» (hosila shakllari ham: институциональной/программной, institutional/programme). «Oʻrta maxsus taʼlim» va «Maxsus imkoniyatlar» oʻzgarmadi. Oʻzbekcha matn va hisob-kitoblar oʻzgarmagan.
- `admin-config.js` Supabase loyihasiga ulandi (URL + publishable kalit); admin kirish ishga tushdi.

## 2026-10-17 — Admin panel va menyu koʻrinishini boshqarish (ACL)

### Qoʻshildi
- **«Admin kirish»** (sahifa pastida; mobil «⋯» menyusida) — Supabase Auth (email + parol), rol server tomonida (`admin_roles`, `my_role()`), 5 urinishdan soʻng vaqtinchalik blok, sessiya muddati, parolni tiklash. Parollar frontendda saqlanmaydi; backend sozlanmaguncha tugma sozlash eslatmasini koʻrsatadi.
- **ADMIN PANEL — MENYULARNI BOSHQARISH**: 6 asosiy boʻlim va barcha ichki boʻlimlar/bloklar daraxti (barqaror IDlar), ON/OFF (Ochiq/Yopiq), samarali holat, qidiruv, ochish/yigʻish, Saqlash (qoralama), Foydalanuvchi koʻrinishini tekshirish (eʼlon qilmasdan), Oʻzgarishlarni eʼlon qilish (tasdiq xulosasi, «hammasi yopiq» ogohlantirishi, atomik `publish_config`), Bekor qilish, Oʻzgarishlar tarixi (versiyalar, tiklash, audit).
- **Nazorat**: navigatsiya + marshrut (`switchMode`, `dbGo`, `dbOpenInst`, `loadEmbed`) + eksport (Word/PDF, Dashboard Word/PDF/Excel, tahliliy hisobotlar) yopiq modullarni chiqarib tashlaydi; yopiq boʻlimdan birinchi ochiq boʻlimga yoʻnaltirish yoki neytral sahifa; admin uchun yopiq boʻlimlar belgilanadi.
- **Markazlashgan saqlash**: `supabase/schema.sql` (admin_roles, menu_items, menu_config versiyalari, menu_drafts, audit_log, publish_config, datasets + RLS). Barcha qurilmalar bitta eʼlon qilingan konfiguratsiyani oladi; kesh tozalansa ham saqlanadi; realtime yangilanish.
- Xavfsiz yuklanish: konfiguratsiya kelguncha navigatsiya koʻrsatilmaydi; backend ishlamasa oxirgi eʼlon qilingan nusxa, u ham boʻlmasa yopiq holat va «Qayta urinish».
- Testlar: `tests/acl-tests.html`; hujjat: `docs/ADMIN.md`.

### Cheklov
- Maʼlumotlar hozircha statik fayllarda (GitHub Pages) — menyu yopilishi maʼlumot himoyasi emas; haqiqiy himoya uchun `datasets` jadvaliga koʻchirish (2-bosqich) `docs/ADMIN.md` da tavsiflangan.
- Birinchi joylashtirishda barcha boʻlimlar ochiq (joriy koʻrinish saqlanadi).

## 2026-10-17 — Mobil va planshet moslashuvi

### Qoʻshildi (faqat ≤1023 px ekranlar; desktop oʻzgarmagan)
- `mobile.css` (`media="(max-width:1023px)"` bilan ulangan) va `mobile.js`: barcha mobil qoidalar alohida, desktop CSS tegilmagan.
- **Mobil sarlavha**: yopishqoq, ixcham; gamburger tugmasi chap yon panelni tortma (drawer) sifatida ochadi (tashqariga bosish, Esc va «orqaga» bilan yopiladi, fokus boshqariladi, fon aylantirilmaydi); til bayroqlari va maxsus imkoniyatlar tugmasi koʻrinib turadi; mavzu, toʻliq ekran, yangilash, tahliliy hisobotlar, Word/PDF/Excel/CSV eksportlari «⋯» qoʻshimcha menyusida.
- **Filtrlar**: har bir boʻlimdagi filtr paneli oʻrniga «Filtrlar» tugmasi (faol filtrlar soni va chiplar bilan); bosilganda pastki varaq (bottom sheet) ochiladi: Qoʻllash / Tozalash; tanlangan qiymatlar saqlanadi, oʻsha manba maʼlumot ishlatiladi.
- **Dashboard va boʻlimlar**: KPI kartalar 2 ustun (320–374 px da 1 ustun), tahliliy panellar vertikal, diagrammalar ekran eniga moslashadi (kichik shriftlar, aylanuvchi legenda, qisqartirilgan oʻq yozuvlari, chegaralangan tultiplar), har bir diagrammada «Kattalashtirish» (toʻliq ekran koʻrinishi).
- **Jadvallar → kartalar** (≤767 px): arizalar, dasturlar, xodimlar, guruhlar reyestrlari karta koʻrinishida; ustun nomlari saralash chiplari sifatida qoladi, qidiruv, sahifalash, CSV eksport va «Batafsil ›» (qator bosilganda kartochka) saqlanadi. Planshetda (768–1023 px) jadvallar oʻz konteyneri ichida gorizontal aylanadi, sahifa toshib ketmaydi.
- **Taʼlim tashkilotlari va Akkreditatsiya grafigi** (institutional.html): reyestr jadvali kartalarga aylanadi, filtr paneli gorizontal aylanadi, sensor nishonlari ≥40 px.
- **Sensor va kirish imkoniyati**: tugma va maydonlar ≥44 px, select/input 16 px shrift (iOS masshtablashini oldini oladi), safe-area chekkalari, landshaft holat uchun alohida qoida.

### Tekshiruv natijalari
- 390 px: sahifa kengligi = 390, toshib ketish yoʻq; tortma 0–320 px; filtr varagʻi va kartalar ishlaydi; diagrammalar 340–349 px enida.
- 768 px: KPI 2 ustun, jadvallar konteyner ichida aylanadi, sahifa kengligi 759 px.
- 1440 px: mobil elementlar yashirin, desktop koʻrinishi oʻzgarmagan.

## 2026-10-17 — Avtomatlashtirilgan tahliliy hisobotlar

### Qoʻshildi
- **«Tahliliy hisobotlar» paneli** (sarlavhada): hisobot turi (umumiy akkreditatsiya holati · kompleks · maxsus · umumlashtirilgan), til (ўзбек кирилл — standart, lotin, рус, English), hajm (qisqa / standart / batafsil), hisobot sanasi va davr, kontekstga bogʻliq filtrlar (taʼlim turi, hudud, mulkchilik, daraja, bilim sohasi), tarkibiy qismlar, sozlanadigan meʼyoriy chegaralar, A4 koʻrish oynasi (sahifalar, masshtab, chop etish), eksport: Word (.docx), PDF, Word + PDF.
- **Hisobot dvigateli** (`reports.js`, `reports-text.js`): bitta hujjat modeli → DOCX (OOXML, kolontitul raqami, rasmli diagrammalar, jadvallar, «Маълумот учун» bloklari) va HTML/PDF. Dizayn «Сертификатлаш ДЗ 14.10.26_1.docx» namunasidan dasturiy ajratilgan (shrift, oʻlchamlar, ranglar, maydonlar, diagramma palitrasi).
- **Tahliliy matn generatori**: Fakt → son → taqqoslash → talqin → boshqaruv xulosasi mantigʻi; I. Амалдаги ҳолат, II. Тизимли масалалар (avtomatik aniqlanadi), III. Таклифлар (masʼul, muddat, natija koʻrsatkichi bilan; «taxliliy taklif» sifatida).
- **Maʼlumot sifati tekshiruvi** va metodika qaydi hisobot yakunida; namuna hisobot `examples/` papkasida.
- Texnik hujjat: `docs/REPORTS.md`.

## 2026-10-17 — Koʻp tillilik va maxsus imkoniyatlar

### Qoʻshildi
- **Uch tilli interfeys** (oʻzbek lotin · rus · ingliz-britan). Sarlavhadagi bayroqli tanlagich (UZ / RU / EN), matnli yorliqlar va `aria-pressed` holati bilan. Tanlov `localStorage` da saqlanadi, birinchi tashrifda brauzer tili aniqlanadi (qoʻllab-quvvatlanmasa — oʻzbek lotin). `<html lang>` dinamik oʻzgaradi. Til almashganda sahifa qayta yuklanmaydi; faol boʻlim, filtrlar va tanlovlar saqlanadi.
- **Markazlashgan tarjima tizimi**: `locales.js` (lugʻat, ≈900 kalit, sonlar uchun `#`, ismlar uchun `@`, iqtiboslar uchun `«@»` oʻrin egallovchilari) va `i18n.js` (yadro). Tarjima koʻrsatish qatlamida bajariladi: DOM matnlari va atributlari (MutationObserver), ECharts yozuvlari (oʻq, legenda, tultip, belgilar), Word/PDF/Excel/CSV hisobotlar, bildirishnomalar. Hisob-kitob mantigʻi va maʼlumotlar oʻzgartirilmagan.
- **Tilga mos son va sana formati**: EN — `1,125` / `83.6%`; RU — `1 125` / `83,6%`; UZ — avvalgidek. Sarlavhadagi sana va diagramma oylari tarjima qilinadi.
- **Ichki oynalar (Taʼlim tashkilotlari, Akkreditatsiya grafigi)** asosiy platforma tili bilan sinxron (`postMessage`), maxsus imkoniyatlar sozlamalari ham uzatiladi.
- **Maxsus imkoniyatlar paneli** (sarlavhadagi universal belgi): shrift oʻlchami (90–200 %), standart / yuqori kontrast (och, toʻq), harakatni kamaytirish (tizim `prefers-reduced-motion` hurmat qilinadi, diagramma animatsiyasi oʻchadi), soddalashtirilgan koʻrinish (diagrammalar oʻrniga jadvallar), fokusni ajratib koʻrsatish. Sozlamalar `localStorage` da saqlanadi.
- **Klaviatura**: «Asosiy mazmunga oʻtish» havolasi, koʻrinadigan fokus (`:focus-visible`), `Esc` bilan modal oynalar va panel yopiladi, jadval ustunlari klaviaturadan saralanadi.
- **Ovozli oʻqish (Web Speech API)**: har bir boʻlim uchun «Qisqacha audio sharh» (Dashboard, Taʼlim tashkilotlari, Akkreditatsiya grafigi, Kompleks, Maxsus, Xodimlar) — joriy filtrlangan maʼlumotdan tuziladi. Boshqaruv: tinglash / pauza / davom / toʻxtatish, tezlik 0.75–1.5×, ovoz tanlash. Ovoz topilmasa foydalanuvchiga aniq xabar beriladi va matnli variant koʻrsatiladi; boshqa tildagi ovoz avtomatik ishlatilmaydi. Avtomatik ijro yoʻq.
- **Diagrammalarning uch koʻrinishi**: Diagramma | Jadval | Audio sharh — har bir diagramma panelida. Jadval: ekran oʻquvchilari uchun semantik, saralanadigan, nusxalash va CSV eksport bilan. Audio sharh diagramma maʼlumotidan (eng katta / eng kichik toifa, ulushlar) hosil qilinadi va filtr oʻzgarganda yangilanadi.
- **Koʻrsatkich izohlari**: Dashboard KPI kartalarida ⓘ belgisi (hisoblash qoidasi va manba, uch tilda).
- **Koʻp tilli eksport**: Word, PDF, Excel va CSV tanlangan tilda; PNG diagrammalarda legenda va oʻqlar tarjimada. Sonlar oʻzgartirilmaydi.

### Oʻzgartirildi
- `index.html`: `fmtNum`/`fmtPct` tilga mos; `embedSrc` ichki oynaga tilni uzatadi; Dashboard eksportida matnlar tarjima qatlamidan oʻtadi; maxsus imkoniyatlar va til tanlagich uchun CSS; yangi skriptlar ulandi (`locales.js`, `i18n.js`, `access.js`).
- `institutional.html`: `postMessage` orqali til va maxsus imkoniyatlar sinxroni.
- Maxsus hisobot 1.3-boʻlim jumlasi tarjima uchun biroz tahrirlandi («…esa X zimmasida — N ta dastur»).

### Cheklovlar va keyingi tekshiruv
- Oʻzbek tili uchun brauzerlarda odatda tayyor ovoz mavjud emas (Windows/Chrome/Edge). Bu holda matnli sharh koʻrsatiladi; ovoz boshqa tilga almashtirilmaydi.
- Tashkilot, dastur va xodim nomlari rasmiy manbada faqat oʻzbek tilida; ular tarjima qilinmaydi (transliteratsiya ixtiro qilinmaydi).
- Sana formati barcha tillarda `dd.mm.yyyy`.
- WCAG 2.2 AA muvofiqligi avtomatik (Lighthouse/axe) va qoʻlda tekshiruvlardan keyin tasdiqlanishi kerak; ekran oʻquvchilari (NVDA/JAWS/VoiceOver) bilan toʻliq sinov alohida oʻtkazilishi lozim.
- Hisobotlardagi ayrim dinamik jumlalar (ism yoki holat nomi oʻzgaruvchan) lugʻatdagi shablon boʻyicha tarjima qilinadi; yangi jumla qoʻshilsa, lugʻatga kalit qoʻshish kerak.
