/* Final plan (index.html): skip Chamera Lake and Kangra Fort, see
   Baglamukhi on the way to Dharamshala, go to Bir and Kullu on Day 6, and
   spend two nights in Lahaul with a full day at Jispa.
   Trains and the Dalhousie / Dharamshala bookings stay the same.
   data.js and the other data files hold the earlier plan (shown on alt.html);
   this file is loaded after them on the main page and rewrites Days 4, 6, 7
   and 8, reusing everything else. */

(function () {
  const T = (en, gu) => ({ en, gu });
  const trip = window.TRIP;
  const day = Object.fromEntries(trip.days.map((d) => [d.n, d]));
  const wxPlace = (key) => ({ key, ...window.TripWeather.places[key] });
  const mapsFind = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  const mapsDir = (q) => "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + encodeURIComponent(q);
  const HOMESTAY = "Valley View Homestay, Gondla, Lahaul, Himachal Pradesh 175140";

  trip.planNote = {
    title: T("Changes from the earlier plan", "અગાઉના પ્લાનથી ફેરફાર"),
    changes: [
      T("Skip Chamera Lake and Kangra Fort.", "ચમેરા લેક અને કાંગડા ફોર્ટ છોડો."),
      T("Day 4: Mata Baglamukhi, HPCA Stadium and Kunal Pathri on the way to Dharamshala.", "દિવસ 4: ધર્મશાળા જતાં રસ્તામાં માતા બગલામુખી, HPCA સ્ટેડિયમ અને કુનાલ પથરી."),
      T("Day 6: Norbulingka, Tashi Jong, Palpung Sherabling and Bir (no Baijnath), then night in Mandi — no night driving.", "દિવસ 6: નોરબુલિંગકા, તાશી જોંગ, પાલપુંગ શેરાબલિંગ અને બીર (વૈજનાથ નહીં), પછી મંડીમાં રાત — રાત્રે ડ્રાઇવિંગ નહીં."),
      T("Day 7: Mandi → Atal Tunnel → Sissu, then the Gondla homestay — first night in Lahaul.", "દિવસ 7: મંડી → અટલ ટનલ → સિસ્સુ, પછી ગોંદલા હોમસ્ટે — લાહૌલમાં પહેલી રાત."),
      T("Day 8: a full day at Jispa and Darcha, warm lunch in Keylong (Baralacha La only if the road is open).", "દિવસ 8: જિસ્પા અને દારચામાં આખો દિવસ, કેલોંગમાં ગરમ ભોજન (બારાલાચા લા ફક્ત રસ્તો ખુલ્લો હોય તો)."),
    ],
  };

  // ---------- Checklist shown at the bottom of the page ----------
  // Set done: true when something is booked or sorted.
  // Payment deadlines are from the MakeMyTrip / Goibibo reminder emails;
  // an unpaid booking is auto-cancelled after its deadline.
  trip.todo = [
    {
      pay: true,
      what: T("Pay Hotel Himdhara, Dalhousie — ₹7,936", "હોટેલ હિમધારા, ડેલહાઉસીનું ચુકવણું — ₹7,936"),
      when: T("By Sat 7 Nov, 11:59 PM · MakeMyTrip", "શનિ 7 નવે, રાત્રે 11:59 સુધીમાં · MakeMyTrip"),
      note: T("Nothing paid yet — the booking is auto-cancelled if unpaid by then.", "હજી કંઈ ચૂકવ્યું નથી — ત્યાં સુધીમાં ન ચૂકવો તો બુકિંગ આપોઆપ રદ થાય."),
    },
    {
      pay: true,
      what: T("Pay Hotel Pine View, Dharamshala — ₹16,289", "હોટેલ પાઈન વ્યૂ, ધર્મશાળાનું ચુકવણું — ₹16,289"),
      when: T("By Mon 9 Nov, 11:59 PM · MakeMyTrip", "સોમ 9 નવે, રાત્રે 11:59 સુધીમાં · MakeMyTrip"),
      note: T("Nothing paid yet. The deadline falls during the trip — pay before leaving on 8 Nov.", "હજી કંઈ ચૂકવ્યું નથી. છેલ્લી તારીખ પ્રવાસ દરમિયાન આવે છે — 8 નવેએ નીકળતાં પહેલાં ચૂકવી દો."),
    },
    {
      pay: true,
      what: T("Pay Valley View Homestay, night of 14 Nov — ₹8,068", "વેલી વ્યૂ હોમસ્ટે, 14 નવેની રાતનું ચુકવણું — ₹8,068"),
      when: T("By Tue 10 Nov, 11:59 PM · Goibibo", "મંગળ 10 નવે, રાત્રે 11:59 સુધીમાં · Goibibo"),
      note: T("New booking (made 26 Oct). Nothing paid yet — pay before leaving on 8 Nov. Free cancellation until 11 Nov, 11:59 AM.", "નવું બુકિંગ (26 ઑક્ટોબરે કર્યું). હજી કંઈ ચૂકવ્યું નથી — 8 નવેએ નીકળતાં પહેલાં ચૂકવો. 11 નવે સવારે 11:59 સુધી મફત રદ."),
    },
    {
      pay: true,
      what: T("Pay Valley View Homestay, night of 15 Nov — ₹8,088", "વેલી વ્યૂ હોમસ્ટે, 15 નવેની રાતનું ચુકવણું — ₹8,088"),
      when: T("By Wed 11 Nov, 11:59 PM · Goibibo", "બુધ 11 નવે, રાત્રે 11:59 સુધીમાં · Goibibo"),
      note: T("Nothing paid yet. The deadline falls during the trip — pay before leaving on 8 Nov.", "હજી કંઈ ચૂકવ્યું નથી. છેલ્લી તારીખ પ્રવાસ દરમિયાન આવે છે — 8 નવેએ નીકળતાં પહેલાં ચૂકવી દો."),
    },
    {
      what: T("Book a hotel in Amritsar near the Golden Temple", "અમૃતસરમાં ગોલ્ડન ટેમ્પલ નજીક હોટેલ બુક કરો"),
      when: T("Night of Mon 9 Nov", "સોમ 9 નવેની રાત"),
      link: mapsFind("Hotels near Golden Temple, Amritsar"),
    },
    {
      what: T("Book a hotel in Mandi by the Beas river — the same hotel for both nights", "મંડીમાં બિયાસ નદી કિનારે હોટેલ બુક કરો — બંને રાત માટે એક જ હોટેલ"),
      when: T("Nights of Fri 13 and Mon 16 Nov", "શુક્ર 13 અને સોમ 16 નવેની રાત"),
      link: mapsFind("Hotels near Beas River, Mandi, Himachal Pradesh"),
    },
    {
      what: T("Message the homestay host: the two bookings are one stay (14–16 Nov) — keep the same 3 rooms; arriving ~3 PM on 14 Nov", "હોમસ્ટેના યજમાનને જણાવો: બંને બુકિંગ એક જ રોકાણ છે (14–16 નવે) — એ જ 3 રૂમ રાખે; 14 નવેએ ~બપોરે 3 આગમન"),
      when: T("Check-in window is 12–2 PM, so tell them in advance", "ચેક-ઇનનો સમય બપોરે 12–2 છે, તેથી અગાઉથી જણાવો"),
    },
    {
      what: T("Order meals with the homestay: vegetarian, no egg — dinner both nights, breakfasts, and a packed backup lunch for the Jispa day", "હોમસ્ટે પાસે ભોજન નક્કી કરો: શાકાહારી, ઈંડું નહીં — બંને રાત રાત્રિ ભોજન, નાસ્તો, અને જિસ્પાના દિવસ માટે પેક કરેલું બેકઅપ ભોજન"),
      when: T("Meals are extra — about ₹170 per person per meal, per the listing", "ભોજનનો ચાર્જ અલગ — લિસ્ટિંગ મુજબ લગભગ ₹170 પ્રતિ વ્યક્તિ પ્રતિ ભોજન"),
    },
    {
      what: T("Ask Hotel Pine View whether the Tempo Traveller can reach the hotel and where it can park", "હોટેલ પાઈન વ્યૂને પૂછો કે ટેમ્પો ટ્રાવેલર હોટેલ સુધી જઈ શકે કે નહીં અને ક્યાં પાર્ક થાય"),
      when: T("Before 11 Nov", "11 નવે પહેલાં"),
    },
    {
      what: T("Ask the Tempo Traveller operator to carry snow chains for Lahaul", "ટેમ્પો ટ્રાવેલર ઓપરેટરને લાહૌલ માટે સ્નો ચેઇન સાથે રાખવા કહો"),
      when: T("Before the trip", "પ્રવાસ પહેલાં"),
    },
    {
      what: T("Check both train timings on NTES", "બંને ટ્રેનનો સમય NTES પર તપાસો"),
      when: T("A few days before 8 Nov", "8 નવે પહેલાં થોડા દિવસ"),
    },
    {
      what: T("Check the Atal Tunnel / Lahaul road status", "અટલ ટનલ / લાહૌલ રસ્તાની સ્થિતિ તપાસો"),
      when: T("Evening of Fri 13 Nov, in Mandi", "શુક્ર 13 નવેની સાંજે, મંડીમાં"),
    },
    { done: true, what: T("Tempo Traveller for the road trip", "રોડ ટ્રિપ માટે ટેમ્પો ટ્રાવેલર"), when: T("Jalandhar 9 Nov → Chandigarh 17 Nov", "જલંધર 9 નવે → ચંડીગઢ 17 નવે") },
    { done: true, what: T("Trains: 19107 Janmabhoomi Express and 19412 DLPC GNC Express", "ટ્રેન: 19107 જન્મભૂમિ એક્સપ્રેસ અને 19412 DLPC GNC એક્સપ્રેસ"), when: T("8 Nov and 17 Nov", "8 નવે અને 17 નવે") },
    { done: true, what: T("Hotel Himdhara, Dalhousie — booked", "હોટેલ હિમધારા, ડેલહાઉસી — બુક"), when: T("Night of 10 Nov · payment still due, see above", "10 નવેની રાત · ચુકવણું બાકી, ઉપર જુઓ") },
    { done: true, what: T("Hotel Pine View, Dharamshala — booked", "હોટેલ પાઈન વ્યૂ, ધર્મશાળા — બુક"), when: T("Nights of 11–12 Nov · payment still due, see above", "11–12 નવેની રાત · ચુકવણું બાકી, ઉપર જુઓ") },
    { done: true, what: T("Valley View Homestay, Gondla — booked for both nights", "વેલી વ્યૂ હોમસ્ટે, ગોંદલા — બંને રાત બુક"), when: T("14 Nov and 15 Nov (two Goibibo bookings) · payment still due, see above", "14 અને 15 નવે (બે Goibibo બુકિંગ) · ચુકવણું બાકી, ઉપર જુઓ") },
  ];

  trip.route = [
    T("Ahmedabad", "અમદાવાદ"), T("Amritsar", "અમૃતસર"), T("Dalhousie", "ડેલહાઉસી"),
    T("Dharamshala", "ધર્મશાળા"), T("Bir", "બીર"), T("Mandi", "મંડી"), T("Lahaul", "લાહૌલ"),
    T("Jispa", "જિસ્પા"), T("Chandigarh", "ચંડીગઢ"),
  ];

  // ---------- Day 2: early night before the Day 3 start ----------
  const d2 = {
    ...day[2],
    items: [
      ...day[2].items.slice(0, 5),
      { time: T("07:30 PM", "સાંજે 07:30"), text: T("Sri Harmandir Sahib (Golden Temple) at night.", "રાત્રે શ્રી હરિમંદિર સાહિબ (ગોલ્ડન ટેમ્પલ) દર્શન.") },
      { time: T("08:30 PM", "રાત્રે 08:30"), text: T("Early dinner outside (see “Where to eat”).", "વહેલું રાત્રિ ભોજન બહાર (“ક્યાં જમવું” જુઓ).") },
      {
        time: T("10:00 PM", "રાત્રે 10:00"),
        text: T("Back at the hotel and asleep by 10 — tomorrow starts early.", "હોટેલ પર પાછા અને 10 વાગ્યા સુધીમાં સૂઈ જાઓ — કાલે વહેલી શરૂઆત છે."),
        tip: T("Pack the bags tonight so the morning is quick.", "આજે રાત્રે જ બેગ પેક કરી લો જેથી સવારે ઝડપ રહે."),
      },
    ],
  };

  // ---------- Day 3: Dainkund trek optional ----------
  const d3 = {
    ...day[3],
    wake: T("06:00 AM (bags packed the night before)", "સવારે 06:00 (બેગ આગલી રાત્રે પેક)"),
    items: day[3].items.map((it, i) =>
      i === 3
        ? {
            ...it,
            text: T("Dainkund Peak trek (2 km) — optional.", "દૈનકુંડ પીક ટ્રેક (2 કિમી) — વૈકલ્પિક."),
            tip: T(
              "Start by 2 PM to be off the trail before the 5:30 PM sunset. Anyone tired can skip it: rest at the hotel or wait at the base café and join the Mall Road walk later.",
              "સાંજે 5:30ના સૂર્યાસ્ત પહેલાં પાછા આવવા 2 વાગ્યા સુધીમાં શરૂ કરો. થાકેલા હોય તે છોડી શકે: હોટેલ પર આરામ કરો અથવા બેઝ પાસે રાહ જુઓ અને પછી મોલ રોડ વોકમાં જોડાઓ."
            ),
          }
        : it
    ),
  };

  // ---------- Day 5: easy afternoon ----------
  const d5 = {
    ...day[5],
    items: [
      ...day[5].items.slice(0, 5),
      { time: T("02:15 – 03:00 PM", "બપોરે 02:15 – 03:00"), text: T("Rest at the hotel after lunch.", "બપોરના ભોજન પછી હોટેલ પર આરામ.") },
      { time: T("03:15 PM", "બપોરે 03:15"), text: T("St. John in the Wilderness Church — short taxi ride, no walking uphill.", "સેન્ટ જોન ઇન ધ વાઇલ્ડરનેસ ચર્ચ — ટૂંકી ટેક્સી સવારી, ચઢાણ નહીં.") },
      { ...day[5].items[6], text: T("Naddi View Point — by taxi.", "નડ્ડી વ્યૂ પોઇન્ટ — ટેક્સીથી.") },
      ...day[5].items.slice(7),
    ],
  };

  // ---------- Day 4: Dalhousie → Baglamukhi → Dharamshala ----------
  const d4 = {
    ...day[4],
    title: T("Baglamukhi & Dharamshala", "બગલામુખી અને ધર્મશાળા"),
    where: T("Dalhousie → Bankhandi → Dharamshala", "ડેલહાઉસી → બનખંડી → ધર્મશાળા"),
    wake: T("06:30 AM", "સવારે 06:30"),
    items: [
      { time: T("08:00 AM", "સવારે 08:00"), text: T("Check out and leave Dalhousie (no Chamera Lake).", "ચેક-આઉટ કરીને ડેલહાઉસીથી નીકળો (ચમેરા લેક નહીં)."), drive: true },
      {
        time: T("08:00 AM – 12:45 PM", "સવારે 08:00 – બપોરે 12:45"),
        text: T("Drive via Nurpur and Ranital to Bankhandi (about 4.5 hours).", "નૂરપુર અને રાણીતાલ થઈને બનખંડી ડ્રાઇવ (લગભગ 4.5 કલાક)."),
        drive: true,
      },
      {
        time: T("12:45 – 01:45 PM", "બપોરે 12:45 – 01:45"),
        text: T("Darshan at Mata Baglamukhi Temple, Bankhandi, then lunch.", "બનખંડીમાં માતા બગલામુખી મંદિરે દર્શન, પછી બપોરનું ભોજન."),
        tip: T("Check afternoon darshan timings — many temples close briefly around midday.", "બપોરના દર્શનનો સમય તપાસો — ઘણાં મંદિરો બપોરે થોડો સમય બંધ રહે છે."),
      },
      { time: T("02:00 – 03:30 PM", "બપોરે 02:00 – 03:30"), text: T("Drive to Dharamshala (about 1.5 hours).", "ધર્મશાળા તરફ ડ્રાઇવ (લગભગ 1.5 કલાક)."), drive: true },
      { time: T("03:30 PM", "બપોરે 03:30"), text: T("HPCA Stadium — photo stop with the Dhauladhar behind.", "HPCA સ્ટેડિયમ — પાછળ ધૌલાધાર સાથે ફોટો સ્ટોપ.") },
      { time: T("04:00 PM", "સાંજે 04:00"), text: T("Kunal Pathri Temple in the tea gardens.", "ચાના બગીચાઓમાં કુનાલ પથરી મંદિર.") },
      {
        time: T("05:00 PM", "સાંજે 05:00"),
        text: T("Check in at Hotel Pine View.", "હોટેલ પાઈન વ્યૂમાં ચેક-ઇન."),
        tip: T("McLeod Ganj lanes are narrow and steep — ask the hotel beforehand whether the Tempo Traveller can reach it and where it can park.", "મેકલિયોડ ગંજની ગલીઓ સાંકડી અને ઢાળવાળી છે — ટેમ્પો ટ્રાવેલર હોટેલ સુધી જઈ શકે કે નહીં અને ક્યાં પાર્ક થાય તે અગાઉથી હોટેલને પૂછો."),
      },
      { time: T("06:00 PM", "સાંજે 06:00"), text: T("Evening on McLeod Ganj Mall Road.", "મેકલિયોડ ગંજ મોલ રોડ પર સાંજ.") },
    ],
    wx: [wxPlace("kangra"), wxPlace("mcleod")],
    food: [
      day[4].food[0],
      {
        meal: "lunch", time: T("~1:45 PM · Bankhandi", "~બપોરે 1:45 · બનખંડી"),
        name: T("Packed lunch from Dalhousie", "ડેલહાઉસીથી પેક કરેલું ભોજન"),
        pure: true,
        order: T("Parathas and sabzi from Manmahesh Rasoi, packed in the morning", "સવારે મનમહેશ રસોઈથી પરાઠા અને શાક પેક કરાવો"),
        note: T("No confirmed pure-veg restaurant near the temple; there is an eatery inside the temple premises.", "મંદિર પાસે શુદ્ધ શાકાહારી રેસ્ટોરન્ટ નક્કી નથી; મંદિર પરિસરમાં ભોજનાલય છે."),
        alt: { name: T("Sharma Punjabi Vaishnav Dhaba (~15 min away)", "શર્મા પંજાબી વૈષ્ણવ ઢાબા (~15 મિનિટ દૂર)"), pure: false, query: "Sharma Punjabi Vaishnav Dhaba, Bankhandi, Kangra" },
      },
      day[4].food[2],
    ],
    places: [
      { file: "Maa_Baglamukhi_Temple_Bankhandi_(Kangra).jpg", name: T("Mata Baglamukhi Temple, Bankhandi", "માતા બગલામુખી મંદિર, બનખંડી") },
      { file: "Dharamshala_Cricket_Stadium_Landscape.jpg", taken: "2017-03", name: T("HPCA Stadium, Dharamshala", "HPCA સ્ટેડિયમ, ધર્મશાળા") },
      { file: "Mann_Tea_Estate_1.jpg", taken: "2016-06", name: T("Dharamshala tea gardens (Kunal Pathri area)", "ધર્મશાળાના ચાના બગીચા (કુનાલ પથરી વિસ્તાર)") },
      { file: "Panoramic_view_of_McLeod_Ganj_during_winters,_2005.jpg", taken: "2005-02", name: T("McLeod Ganj in winter", "શિયાળામાં મેકલિયોડ ગંજ") },
    ],
    videos: [...day[4].videos, ...day[6].videos],
  };

  // ---------- Day 6: Norbulingka → Tashi Jong → Sherabling → Bir → Mandi ----------
  const mandiStay = (nights) => ({ ...day[9].stay, nights });
  const d6 = {
    ...day[6],
    title: T("Norbulingka, Sherabling & Bir", "નોરબુલિંગકા, શેરાબલિંગ અને બીર"),
    where: T("Dharamshala → Palampur → Tashi Jong → Sherabling → Bir → Mandi", "ધર્મશાળા → પાલમપુર → તાશી જોંગ → શેરાબલિંગ → બીર → મંડી"),
    wake: T("06:30 AM", "સવારે 06:30"),
    items: [
      { time: T("07:45 AM", "સવારે 07:45"), text: T("Early breakfast, check out of Hotel Pine View.", "વહેલો નાસ્તો, હોટેલ પાઈન વ્યૂમાંથી ચેક-આઉટ."), drive: true },
      { time: T("09:00 – 10:15 AM", "સવારે 09:00 – 10:15"), text: T("Norbulingka Institute, Sidhpur — gardens, workshops, temple.", "નોરબુલિંગકા ઇન્સ્ટિટ્યૂટ, સિદ્ધપુર — બગીચા, કારીગરી, મંદિર.") },
      { time: T("10:15 – 11:15 AM", "સવારે 10:15 – 11:15"), text: T("Drive via Palampur, short stop at the tea gardens.", "પાલમપુર થઈને ડ્રાઇવ, ચાના બગીચાઓમાં ટૂંકો સ્ટોપ."), drive: true },
      { time: T("11:15 – 11:45 AM", "સવારે 11:15 – 11:45"), text: T("Tashi Jong Khampagar Monastery, Taragarh (on the main road).", "તાશી જોંગ ખામ્પાગર મઠ, તારાગઢ (મુખ્ય રસ્તા પર).") },
      {
        time: T("12:00 – 12:45 PM", "બપોરે 12:00 – 12:45"),
        text: T("Palpung Sherabling Monastery, Bhattu — on the lane between Baijnath and Bir.", "પાલપુંગ શેરાબલિંગ મઠ, ભટ્ટુ — વૈજનાથ અને બીર વચ્ચેના રસ્તે."),
        tip: T("Main hall reportedly open 8:30 AM – 4:30 PM. No photos inside the prayer halls; dress modestly.", "મુખ્ય હોલ સામાન્ય રીતે સવારે 8:30 – સાંજે 4:30 ખુલ્લો. પ્રાર્થના હોલમાં ફોટા નહીં; સાદાં કપડાં પહેરો."),
      },
      { time: T("01:00 – 02:00 PM", "બપોરે 01:00 – 02:00"), text: T("Lunch in Bir.", "બીરમાં બપોરનું ભોજન.") },
      { time: T("02:00 – 03:00 PM", "બપોરે 02:00 – 03:00"), text: T("Bir Tibetan Colony, Chokling Monastery and the paragliding landing site.", "બીર તિબેટીયન કોલોની, ચોકલિંગ મઠ અને પેરાગ્લાઇડિંગ લેન્ડિંગ સાઇટ.") },
      {
        time: T("03:00 – 05:45 PM", "બપોરે 03:00 – સાંજે 05:45"),
        text: T("Drive via Joginder Nagar to Mandi (about 85 km, 2.5–3 hours).", "જોગિન્દરનગર થઈને મંડી ડ્રાઇવ (લગભગ 85 કિમી, 2.5–3 કલાક)."),
        tip: T("Leave Bir by 3 PM — only the last 20–30 minutes are after sunset.", "બીરથી 3 વાગ્યા સુધીમાં નીકળો — ફક્ત છેલ્લી 20–30 મિનિટ સૂર્યાસ્ત પછી."),
        drive: true,
      },
      { time: T("06:00 PM", "સાંજે 06:00"), text: T("Check in at the Mandi hotel; easy evening.", "મંડીની હોટેલમાં ચેક-ઇન; આરામની સાંજ.") },
    ],
    stay: mandiStay(T("Book the same hotel for 13 and 16 Nov · Night 1", "13 અને 16 નવે માટે એક જ હોટેલ બુક કરો · પહેલી રાત")),
    night: T("Mandi", "મંડી"),
    wx: [wxPlace("bir"), wxPlace("mandi")],
    food: [
      {
        meal: "breakfast", time: T("7:00 AM", "સવારે 07:00"),
        name: T("Breakfast at Hotel Pine View", "હોટેલ પાઈન વ્યૂમાં નાસ્તો"),
        pure: false,
        note: T("Ask the hotel the night before for an early breakfast.", "વહેલા નાસ્તા માટે આગલી રાત્રે હોટેલને કહો."),
      },
      day[7].food[1],
      day[9].food[2],
    ],
    places: [
      { file: "Norbulinka.JPG", taken: "2010-08", name: T("Norbulingka Institute", "નોરબુલિંગકા ઇન્સ્ટિટ્યૂટ") },
      { file: "Sherabling_Monastery_-_Inner_Sanctum.jpg", name: T("Palpung Sherabling Monastery", "પાલપુંગ શેરાબલિંગ મઠ") },
      { file: "BIR_BILLING_PARAGLIDING.jpg", taken: "2017-12", name: T("Paragliding at Bir Billing", "બીર બિલિંગ પેરાગ્લાઇડિંગ") },
      { file: "Victoria_Bridge_Mandi.JPG", taken: "2011-12", name: T("Victoria Bridge over the Beas, Mandi", "બિયાસ પર વિક્ટોરિયા બ્રિજ, મંડી") },
    ],
    videos: day[7].videos,
  };

  // ---------- Day 7: Mandi → Atal Tunnel → Sissu → Gondla ----------
  // Two Goibibo bookings for the same 3 rooms: 14 Nov (new) and 15 Nov (original).
  const homestay14 = {
    ...day[8].stay,
    id: "GH••••••••1666",
    checkin: T("Sat 14 Nov, 12:00 – 02:00 PM", "શનિ 14 નવે, બપોરે 12:00 – 02:00"),
    checkout: T("Sun 15 Nov, before 10:00 AM", "રવિ 15 નવે, સવારે 10:00 પહેલાં"),
    nights: T("Night 1 of 2 · first of two bookings — ask the host to keep the same rooms", "2માંથી પહેલી રાત · બેમાંથી પહેલું બુકિંગ — યજમાનને એ જ રૂમ રાખવા કહો"),
  };
  const homestay15 = {
    ...day[8].stay,
    nights: T("Night 2 of 2 · second booking, same rooms", "2માંથી બીજી રાત · બીજું બુકિંગ, એ જ રૂમ"),
  };
  const d7 = {
    ...day[7],
    title: T("Through the Tunnel to Lahaul", "અટલ ટનલ થઈને લાહૌલ"),
    where: T("Mandi → Kullu → Atal Tunnel → Sissu → Gondla", "મંડી → કુલ્લુ → અટલ ટનલ → સિસ્સુ → ગોંદલા"),
    wake: T("06:00 AM", "સવારે 06:00"),
    items: [
      {
        time: T("07:00 AM – 12:15 PM", "સવારે 07:00 – બપોરે 12:15"),
        text: T("Drive from Mandi via Kullu and the Atal Tunnel to Sissu (about 160 km).", "મંડીથી કુલ્લુ અને અટલ ટનલ થઈને સિસ્સુ ડ્રાઇવ (લગભગ 160 કિમી)."),
        tip: T("Leave by 7 AM sharp. Check the Atal Tunnel / Lahaul road status the evening before — heavy snow can close it at short notice.", "સવારે 7 વાગ્યે ચોક્કસ નીકળો. આગલી સાંજે અટલ ટનલ / લાહૌલ રસ્તાની સ્થિતિ તપાસો — ભારે બરફવર્ષામાં અચાનક બંધ થઈ શકે છે."),
        drive: true,
      },
      { time: T("12:30 – 01:30 PM", "બપોરે 12:30 – 01:30"), text: T("Lunch around Sissu / Koksar.", "સિસ્સુ / કોકસર આસપાસ બપોરનું ભોજન.") },
      {
        time: T("01:30 – 02:15 PM", "બપોરે 01:30 – 02:15"),
        text: T("Sissu: waterfall viewpoint and the Chandra river banks.", "સિસ્સુ: વોટરફોલ વ્યૂપોઇન્ટ અને ચંદ્રા નદીનો કિનારો."),
        tip: T("If snow is forecast, skip this stop and go straight to Gondla.", "બરફવર્ષાની આગાહી હોય તો આ સ્ટોપ છોડીને સીધા ગોંદલા જાઓ."),
      },
      { time: T("02:15 – 02:45 PM", "બપોરે 02:15 – 02:45"), text: T("Short drive on to Gondla (about 15 km).", "ગોંદલા સુધી ટૂંકી ડ્રાઇવ (લગભગ 15 કિમી)."), drive: true },
      {
        time: T("02:45 PM", "બપોરે 02:45"),
        text: T("Check in at the homestay and rest — let your body get used to the altitude.", "હોમસ્ટેમાં ચેક-ઇન અને આરામ — ઊંચાઈની ટેવ પડવા દો."),
        tip: T("Gondla is before Keylong, so there's no need to drive on to Keylong today — you pass it tomorrow.", "ગોંદલા કેલોંગ પહેલાં આવે છે, તેથી આજે કેલોંગ જવાની જરૂર નથી — કાલે ત્યાંથી પસાર થશો."),
      },
    ],
    stay: homestay14,
    night: T("Gondla / Lahaul", "ગોંદલા / લાહૌલ"),
    wx: [wxPlace("sissu"), wxPlace("keylong")],
    food: [
      {
        meal: "breakfast", time: T("~6:30 AM", "~સવારે 6:30"),
        name: T("Early breakfast at the Mandi hotel, or packed", "મંડીની હોટેલમાં વહેલો નાસ્તો, અથવા પેક કરેલો"),
        pure: false,
        note: T("Nothing in Mandi town was confirmed open before 7 AM — ask the hotel the evening before.", "મંડી શહેરમાં સવારે 7 પહેલાં ખુલ્લું કંઈ નક્કી નથી — આગલી સાંજે હોટેલને કહો."),
        alt: { name: T("Sapna Food Corner — on the way, ~9 AM", "સપના ફૂડ કોર્નર — રસ્તામાં, ~સવારે 9"), area: T("Dhalpur, Kullu", "ઢાલપુર, કુલ્લુ"), pure: true, query: "Sapna Food Corner, Dhalpur, Kullu" },
      },
      day[8].food[1],
      day[8].food[2],
    ],
    places: [
      { file: "Atal_Tunnel_01.jpg", name: T("Atal Tunnel (Rohtang)", "અટલ ટનલ (રોહતાંગ)") },
      { file: "Sissu_Water_Fall.jpg", taken: "2016-06", name: T("Sissu Waterfall", "સિસ્સુ વોટરફોલ") },
    ],
    videos: day[8].videos,
  };

  // ---------- Day 8: full day at Jispa ----------
  const d8 = {
    ...day[8],
    title: T("A Full Day at Jispa", "જિસ્પામાં આખો દિવસ"),
    where: T("Gondla → Jispa → Darcha → Keylong → Gondla", "ગોંદલા → જિસ્પા → દારચા → કેલોંગ → ગોંદલા"),
    wake: T("07:00 AM", "સવારે 07:00"),
    items: [
      {
        time: T("08:30 AM", "સવારે 08:30"),
        text: T("Leave the homestay after breakfast; drive past Keylong towards Jispa.", "નાસ્તા પછી હોમસ્ટેથી નીકળો; કેલોંગ થઈને જિસ્પા તરફ."),
        tip: T("Fill fuel at the Tandi petrol pump on the way — the last fuel station for a long way.", "રસ્તામાં તાંદી પેટ્રોલ પંપ પર ઈંધણ ભરાવો — લાંબા અંતર સુધી છેલ્લો પંપ."),
        drive: true,
      },
      { time: T("09:30 AM", "સવારે 09:30"), text: T("Gemur village and monastery, just before Jispa.", "જિસ્પા પહેલાં ગેમુર ગામ અને મઠ.") },
      { time: T("10:00 AM – 12:00 PM", "સવારે 10:00 – બપોરે 12:00"), text: T("Jispa: walk along the Bhaga river, the village and its small monastery; photos of the snow peaks.", "જિસ્પા: ભાગા નદીના કિનારે વોક, ગામ અને નાનો મઠ; બરફીલા શિખરોના ફોટા.") },
      {
        time: T("12:00 – 12:30 PM", "બપોરે 12:00 – 12:30"),
        text: T("Darcha (7 km): river confluence, Darcha bridge and the police check post.", "દારચા (7 કિમી): નદીઓનો સંગમ, દારચા પુલ અને પોલીસ ચેક પોસ્ટ."),
        tip: T("Ask the police about the road ahead — usually closed by mid-November. If it is open and you go towards Zingzingbar / Deepak Tal / Baralacha La, skip the Keylong lunch, eat a packed lunch in the vehicle and turn back by 1 PM.", "આગળના રસ્તા વિશે પોલીસને પૂછો — નવેમ્બરના મધ્યમાં સામાન્ય રીતે બંધ હોય છે. ખુલ્લો હોય અને ઝિંગઝિંગબાર / દીપક તાલ / બારાલાચા લા તરફ જાઓ, તો કેલોંગનું ભોજન છોડો, વાહનમાં પેક કરેલું ભોજન લો અને બપોરે 1 સુધીમાં પાછા વળો."),
      },
      { time: T("12:30 – 01:30 PM", "બપોરે 12:30 – 01:30"), text: T("Drive back down to Keylong (about 30 km).", "કેલોંગ સુધી પાછા ડ્રાઇવ (લગભગ 30 કિમી)."), drive: true },
      {
        time: T("01:30 – 02:30 PM", "બપોરે 01:30 – 02:30"),
        text: T("Warm indoor lunch in Keylong market.", "કેલોંગ બજારમાં ગરમ ભોજન, અંદર બેસીને."),
        tip: T("Around 0–4°C outside at this altitude in mid-November — too cold for a riverside picnic.", "નવેમ્બરના મધ્યમાં આ ઊંચાઈએ બહાર લગભગ 0–4°C — નદી કિનારે પિકનિક માટે ખૂબ ઠંડી."),
      },
      { time: T("02:30 – 03:15 PM", "બપોરે 02:30 – 03:15"), text: T("Optional: Kardang Monastery, across the river from Keylong.", "વૈકલ્પિક: કેલોંગની સામે નદી પાર કરડાંગ મઠ.") },
      { time: T("03:15 – 04:00 PM", "બપોરે 03:15 – સાંજે 04:00"), text: T("Drive back to Gondla (about 25 km).", "ગોંદલા પાછા ડ્રાઇવ (લગભગ 25 કિમી)."), drive: true },
      {
        time: T("04:00 PM", "સાંજે 04:00"),
        text: T("Back at the homestay before the 5:15 PM sunset; stargazing at night.", "સાંજે 5:15ના સૂર્યાસ્ત પહેલાં હોમસ્ટે પર; રાત્રે તારા જોવા."),
        tip: T("Icy roads after dark are the main risk — don't stay out late.", "અંધારા પછી બરફીલા રસ્તા સૌથી મોટું જોખમ છે — મોડે સુધી બહાર ન રહો."),
      },
    ],
    stay: homestay15,
    night: T("Gondla / Lahaul", "ગોંદલા / લાહૌલ"),
    wx: [wxPlace("jispa"), wxPlace("keylong")],
    food: [
      day[9].food[0],
      {
        meal: "lunch", time: T("~1:30 PM · Keylong", "~બપોરે 1:30 · કેલોંગ"),
        name: T("Nordaling Restaurant", "નોર્ડાલિંગ રેસ્ટોરન્ટ"),
        area: T("Keylong market", "કેલોંગ બજાર"),
        pure: false,
        order: T("Veg thali, dal-rice, veg thukpa or momos — say \"no egg\"", "વેજ થાળી, દાળ-ભાત, વેજ થુકપા અથવા મોમોઝ — \"ઈંડું નહીં\" કહો"),
        note: T("Mixed menu; Lonely Planet calls its food among the best in Keylong. Winter opening not confirmed — Jispa eateries are mostly shut, so carry snacks and ask the homestay to pack a backup lunch.", "માંસાહારી પણ મળે છે; Lonely Planet મુજબ કેલોંગમાં શ્રેષ્ઠ ભોજનમાંનું એક. શિયાળામાં ખુલ્લું હોવાનું નક્કી નથી — જિસ્પામાં ભોજનાલયો મોટાભાગે બંધ, તેથી નાસ્તો સાથે રાખો અને હોમસ્ટે પાસે બેકઅપ ભોજન પેક કરાવો."),
        query: "Nordaling Restaurant, Keylong",
        alt: { name: T("Snow Lion Restaurant — veg thukpa, momos", "સ્નો લાયન રેસ્ટોરન્ટ — વેજ થુકપા, મોમોઝ"), area: T("Main Bazaar, Keylong", "મેઇન બજાર, કેલોંગ"), pure: false, query: "Snow Lion Restaurant, Keylong" },
      },
      day[8].food[2],
    ],
    places: [
      { file: "Jispa_Village_View_Gemur_Lahaul_Oct22_A7C_03384.jpg", taken: "2022-10", name: T("Jispa village from Gemur", "ગેમુરથી જિસ્પા ગામ") },
      { file: "Darcha_Bridge_NW_Lahaul_Himachal_India_Oct22_A7C_03526.jpg", taken: "2022-10", name: T("Darcha bridge (3,340 m)", "દારચા પુલ (3,340 મી)") },
      { file: "Bhaga_River_Darcha_Gemur_Lahaul_Jun24_A7CR_00231.jpg", taken: "2024-06", name: T("Bhaga river between Gemur and Darcha", "ગેમુર અને દારચા વચ્ચે ભાગા નદી") },
      { file: "Keylong_West_Lahaul_Himachal_Oct22_A7C_03375_panorama.jpg", taken: "2022-10", name: T("Keylong & the Kardang peaks", "કેલોંગ અને કરડાંગ શિખરો") },
      { file: "Kardang_West_Lahaul_Himachal_Oct22_A7C_03376.jpg", taken: "2022-10", name: T("Kardang, across from Keylong", "કરડાંગ, કેલોંગની સામે") },
    ],
    videos: [],
  };

  // ---------- Day 9: Gondla → Mandi ----------
  const d9 = {
    ...day[9],
    stay: mandiStay(T("Same hotel as 13 Nov · Night 2", "13 નવે જેવી જ હોટેલ · બીજી રાત")),
    where: T("Gondla → Atal Tunnel → Mandi", "ગોંદલા → અટલ ટનલ → મંડી"),
    items: [
      { time: T("07:30 – 09:00 AM", "સવારે 07:30 – 09:00"), text: T("A crisp, snowy morning around the Gondla homestay; check out.", "ગોંદલા હોમસ્ટે આસપાસ તાજી, બરફીલી સવાર; ચેક-આઉટ.") },
      {
        time: T("09:00 AM – 03:00 PM", "સવારે 09:00 – બપોરે 03:00"),
        text: T("Drive from Gondla back through the Atal Tunnel, bypassing Manali, down the river valley to Mandi (about 190 km, ~6 hours).", "ગોંદલાથી અટલ ટનલ થઈને, મનાલીને બાયપાસ કરીને, નદીની ખીણ થઈને મંડી સુધી ડ્રાઇવ (લગભગ 190 કિમી, ~6 કલાક)."),
        tip: T("Check the morning road advisory before leaving; leave early to allow for mountain traffic.", "નીકળતાં પહેલાં સવારની રસ્તાની સૂચના તપાસો; પહાડી ટ્રાફિકને ધ્યાનમાં રાખીને વહેલા નીકળો."),
        drive: true,
      },
      { time: T("03:00 PM", "બપોરે 03:00"), text: T("Late lunch on arrival in Mandi (or stop along the route).", "મંડી આગમન પર મોડું બપોરનું ભોજન (અથવા રસ્તામાં).") },
      { time: T("04:00 PM", "સાંજે 04:00"), text: T("Check into your hotel and relax by the Beas River.", "હોટેલમાં ચેક-ઇન કરો અને બિયાસ નદીના કિનારે આરામ કરો.") },
    ],
  };

  trip.days = trip.days.map((d) => ({ 2: d2, 3: d3, 4: d4, 5: d5, 6: d6, 7: d7, 8: d8, 9: d9 })[d.n] || d);

  // ---------- How demanding each day is ----------
  const pace = {
    1: ["relaxed", T("Train day — rest on board", "ટ્રેનનો દિવસ — આરામ")],
    2: ["moderate", T("Arrive after the night train; Wagah and Golden Temple; early night", "રાતની ટ્રેન પછી આગમન; વાઘા અને ગોલ્ડન ટેમ્પલ; વહેલા સૂઈ જવું")],
    3: ["busy", T("Early start, ~5.5 h drive; Dainkund trek is optional", "વહેલી શરૂઆત, ~5.5 કલાક ડ્રાઇવ; દૈનકુંડ ટ્રેક વૈકલ્પિક")],
    4: ["busy", T("~6 h on the road with three short stops", "~6 કલાક રસ્તા પર, ત્રણ ટૂંકા સ્ટોપ")],
    5: ["moderate", T("Walking day, no long drive; easy afternoon by taxi", "ચાલવાનો દિવસ, લાંબી ડ્રાઇવ નહીં; બપોર પછી ટેક્સીથી આરામથી")],
    6: ["busy", T("~5.5 h on the road with four stops; reach Mandi around sunset", "~5.5 કલાક રસ્તા પર, ચાર સ્ટોપ; સૂર્યાસ્ત આસપાસ મંડી")],
    7: ["busy", T("~5.5 h drive up to Lahaul; early start, rest at the homestay", "લાહૌલ સુધી ~5.5 કલાક ડ્રાઇવ; વહેલી શરૂઆત, હોમસ્ટે પર આરામ")],
    8: ["moderate", T("Short drives, cold and high; back by 4 PM", "ટૂંકી ડ્રાઇવ, ઠંડી અને ઊંચાઈ; સાંજે 4 સુધીમાં પાછા")],
    9: ["busy", T("~6 h drive down to Mandi; free evening", "મંડી સુધી ~6 કલાક ડ્રાઇવ; સાંજ ખાલી")],
    10: ["moderate", T("~5 h drive, about 5 h buffer before the train", "~5 કલાક ડ્રાઇવ, ટ્રેન પહેલાં લગભગ 5 કલાકનો સમય")],
  };
  trip.days.forEach((d) => {
    if (pace[d.n]) [d.pace, d.paceWhy] = pace[d.n];
  });

  // ---------- Map stops ----------
  trip.stops = [
    { day: 2, date: "2026-11-09", name: T("Jalandhar City", "જલંધર સિટી"), lat: 31.326, lon: 75.5762,
      what: T("Arrive by train 10 AM, pick up the Tempo Traveller", "સવારે 10 ટ્રેનથી આગમન, ટેમ્પો ટ્રાવેલર લો") },
    { day: 2, date: "2026-11-09", name: T("Amritsar", "અમૃતસર"), lat: 31.62, lon: 74.8765, night: true,
      what: T("Golden Temple, Wagah Border", "ગોલ્ડન ટેમ્પલ, વાઘા બોર્ડર") },
    { day: 3, date: "2026-11-10", name: T("Dalhousie", "ડેલહાઉસી"), lat: 32.536, lon: 75.97, night: true,
      what: T("Dainkund Peak trek, Mall Road", "દૈનકુંડ પીક ટ્રેક, મોલ રોડ") },
    { day: 4, date: "2026-11-11", name: T("Mata Baglamukhi, Bankhandi", "માતા બગલામુખી, બનખંડી"), lat: 31.968, lon: 76.207,
      what: T("Darshan on the way to Dharamshala", "ધર્મશાળા જતાં દર્શન") },
    { day: 4, date: "2026-11-11", end: "2026-11-12", name: T("McLeod Ganj / Dharamshala", "મેકલિયોડ ગંજ / ધર્મશાળા"), lat: 32.2427, lon: 76.3234, night: true,
      what: T("HPCA, Kunal Pathri, Dalai Lama Temple, Bhagsu, Naddi — 2 nights", "HPCA, કુનાલ પથરી, દલાઈ લામા મંદિર, ભાગસુ, નડ્ડી — 2 રાત") },
    { day: 6, date: "2026-11-13", name: T("Norbulingka", "નોરબુલિંગકા"), lat: 32.205, lon: 76.345,
      what: T("Tibetan arts institute and gardens", "તિબેટીયન કળા સંસ્થા અને બગીચા") },
    { day: 6, date: "2026-11-13", name: T("Tashi Jong", "તાશી જોંગ"), lat: 32.054, lon: 76.597,
      what: T("Khampagar Monastery, Taragarh", "ખામ્પાગર મઠ, તારાગઢ") },
    { day: 6, date: "2026-11-13", name: T("Palpung Sherabling", "પાલપુંગ શેરાબલિંગ"), lat: 32.035, lon: 76.68,
      what: T("Monastery on the lane between Baijnath and Bir", "વૈજનાથ અને બીર વચ્ચેના રસ્તે મઠ") },
    { day: 6, date: "2026-11-13", name: T("Bir", "બીર"), lat: 32.044, lon: 76.723,
      what: T("Tibetan Colony, paragliding landing site", "તિબેટીયન કોલોની, પેરાગ્લાઇડિંગ લેન્ડિંગ સાઇટ") },
    { day: 6, date: "2026-11-13", name: T("Mandi", "મંડી"), lat: 31.708, lon: 76.9318, night: true,
      what: T("Night 1 in Mandi, by the Beas river", "મંડીમાં પહેલી રાત, બિયાસ નદી કિનારે") },
    { day: 7, date: "2026-11-14", name: T("Atal Tunnel", "અટલ ટનલ"), lat: 32.385, lon: 77.15, via: false,
      what: T("Through the tunnel into Lahaul", "ટનલ થઈને લાહૌલમાં") },
    { day: 7, date: "2026-11-14", name: T("Sissu", "સિસ્સુ"), lat: 32.48, lon: 77.125,
      what: T("Sissu waterfall, Chandra river", "સિસ્સુ ધોધ, ચંદ્રા નદી") },
    { day: 7, date: "2026-11-14", end: "2026-11-15", name: T("Gondla homestay", "ગોંદલા હોમસ્ટે"), lat: 32.513, lon: 77.0208, night: true,
      what: T("Valley View Homestay — 2 nights", "વેલી વ્યૂ હોમસ્ટે — 2 રાત") },
    { day: 8, date: "2026-11-15", name: T("Jispa & Darcha", "જિસ્પા અને દારચા"), lat: 32.64, lon: 77.185,
      what: T("Full day: Gemur, Jispa, Bhaga river, Darcha", "આખો દિવસ: ગેમુર, જિસ્પા, ભાગા નદી, દારચા") },
    { day: 8, date: "2026-11-15", name: T("Keylong", "કેલોંગ"), lat: 32.5717, lon: 77.0328,
      what: T("Warm lunch in the market; Kardang Monastery (optional)", "બજારમાં ગરમ ભોજન; કરડાંગ મઠ (વૈકલ્પિક)") },
    { day: 9, date: "2026-11-16", name: T("Mandi", "મંડી"), lat: 31.708, lon: 76.9318, night: true,
      what: T("By the Beas river", "બિયાસ નદી કિનારે") },
    { day: 10, date: "2026-11-17", name: T("Chandigarh", "ચંડીગઢ"), lat: 30.7333, lon: 76.7794,
      what: T("Sukhna Lake, train home 5:55 PM", "સુખના લેક, ઘરે જવાની ટ્રેન સાંજે 5:55") },
  ];
})();
