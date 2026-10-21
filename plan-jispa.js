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
      T("Day 6: Norbulingka, Baijnath and Bir, then night in Kullu / Bhuntar.", "દિવસ 6: નોરબુલિંગકા, વૈજનાથ અને બીર, પછી કુલ્લુ / ભુંતરમાં રાત્રિ રોકાણ."),
      T("Day 7: Atal Tunnel and Sissu, first night in Lahaul.", "દિવસ 7: અટલ ટનલ અને સિસ્સુ, લાહૌલમાં પહેલી રાત."),
      T("Day 8: a full day at Jispa and Darcha (Baralacha La only if the road is open).", "દિવસ 8: જિસ્પા અને દારચામાં આખો દિવસ (બારાલાચા લા ફક્ત રસ્તો ખુલ્લો હોય તો)."),
    ],
    bookings: [
      T("Valley View Homestay: change to 2 nights, 14–15 Nov (now booked for 15 Nov only).", "વેલી વ્યૂ હોમસ્ટે: 2 રાત, 14–15 નવે કરાવો (હાલ ફક્ત 15 નવે બુક છે)."),
      T("Book Kullu / Bhuntar for 13 Nov (no Kangra night).", "13 નવે માટે કુલ્લુ / ભુંતર બુક કરો (કાંગડામાં રાત નહીં)."),
      T("Trains, Hotel Himdhara and Hotel Pine View stay as booked.", "ટ્રેન, હોટેલ હિમધારા અને હોટેલ પાઈન વ્યૂ જેમ બુક છે તેમ જ."),
    ],
  };

  trip.route = [
    T("Ahmedabad", "અમદાવાદ"), T("Amritsar", "અમૃતસર"), T("Dalhousie", "ડેલહાઉસી"),
    T("Dharamshala", "ધર્મશાળા"), T("Bir", "બીર"), T("Kullu", "કુલ્લુ"), T("Lahaul", "લાહૌલ"),
    T("Jispa", "જિસ્પા"), T("Mandi", "મંડી"), T("Chandigarh", "ચંડીગઢ"),
  ];

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
      { time: T("05:00 PM", "સાંજે 05:00"), text: T("Check in at Hotel Pine View.", "હોટેલ પાઈન વ્યૂમાં ચેક-ઇન.") },
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

  // ---------- Day 6: Norbulingka → Baijnath → Bir → Kullu ----------
  const d6 = {
    ...day[6],
    title: T("Norbulingka, Baijnath & Bir", "નોરબુલિંગકા, વૈજનાથ અને બીર"),
    where: T("Dharamshala → Palampur → Baijnath → Bir → Kullu", "ધર્મશાળા → પાલમપુર → વૈજનાથ → બીર → કુલ્લુ"),
    wake: T("06:30 AM", "સવારે 06:30"),
    items: [
      { time: T("07:45 AM", "સવારે 07:45"), text: T("Early breakfast, check out of Hotel Pine View.", "વહેલો નાસ્તો, હોટેલ પાઈન વ્યૂમાંથી ચેક-આઉટ."), drive: true },
      {
        time: T("09:00 – 10:15 AM", "સવારે 09:00 – 10:15"),
        text: T("Norbulingka Institute, Sidhpur — gardens, workshops, temple.", "નોરબુલિંગકા ઇન્સ્ટિટ્યૂટ, સિદ્ધપુર — બગીચા, કારીગરી, મંદિર."),
        tip: T("For paragliding at Bir, skip Norbulingka and drive straight to Bir instead.", "બીરમાં પેરાગ્લાઇડિંગ કરવું હોય તો નોરબુલિંગકા છોડીને સીધા બીર જાઓ."),
      },
      { time: T("10:15 – 11:30 AM", "સવારે 10:15 – 11:30"), text: T("Drive via Palampur, short stop at the tea gardens.", "પાલમપુર થઈને ડ્રાઇવ, ચાના બગીચાઓમાં ટૂંકો સ્ટોપ."), drive: true },
      { time: T("11:45 AM", "સવારે 11:45"), text: T("Tashi Jong Monastery, Taragarh (on the main road).", "તાશી જોંગ મઠ, તારાગઢ (મુખ્ય રસ્તા પર).") },
      { time: T("12:15 PM", "બપોરે 12:15"), text: T("Shree Shiv Baijnath Temple.", "શ્રી શિવ વૈજનાથ મંદિર.") },
      { time: T("01:00 – 02:00 PM", "બપોરે 01:00 – 02:00"), text: T("Lunch in Bir.", "બીરમાં બપોરનું ભોજન.") },
      { time: T("02:00 – 02:45 PM", "બપોરે 02:00 – 02:45"), text: T("Bir Tibetan Colony, Chokling Monastery and the paragliding landing site.", "બીર તિબેટીયન કોલોની, ચોકલિંગ મઠ અને પેરાગ્લાઇડિંગ લેન્ડિંગ સાઇટ.") },
      {
        time: T("02:45 – 07:30 PM", "બપોરે 02:45 – સાંજે 07:30"),
        text: T("Drive via Joginder Nagar and Mandi to Kullu / Bhuntar (about 5 hours).", "જોગિન્દરનગર અને મંડી થઈને કુલ્લુ / ભુંતર ડ્રાઇવ (લગભગ 5 કલાક)."),
        tip: T("Leave Bir by 2:45 PM so the mountain roads before Mandi are done in daylight.", "બીરથી 2:45 સુધીમાં નીકળો જેથી મંડી પહેલાંના પહાડી રસ્તા દિવસના પ્રકાશમાં પૂરા થાય."),
        drive: true,
      },
    ],
    stay: day[7].stay,
    night: T("Kullu / Bhuntar", "કુલ્લુ / ભુંતર"),
    wx: [wxPlace("bir"), wxPlace("kullu")],
    food: [
      {
        meal: "breakfast", time: T("7:00 AM", "સવારે 07:00"),
        name: T("Breakfast at Hotel Pine View", "હોટેલ પાઈન વ્યૂમાં નાસ્તો"),
        pure: false,
        note: T("Ask the hotel the night before for an early breakfast.", "વહેલા નાસ્તા માટે આગલી રાત્રે હોટેલને કહો."),
      },
      day[7].food[1],
      day[7].food[2],
    ],
    places: [
      { file: "Norbulinka.JPG", taken: "2010-08", name: T("Norbulingka Institute", "નોરબુલિંગકા ઇન્સ્ટિટ્યૂટ") },
      { file: "Baijnath_Temple.jpg", taken: "2017-04", name: T("Shree Shiv Baijnath Temple", "શ્રી શિવ વૈજનાથ મંદિર") },
      { file: "BIR_BILLING_PARAGLIDING.jpg", taken: "2017-12", name: T("Paragliding at Bir Billing", "બીર બિલિંગ પેરાગ્લાઇડિંગ") },
    ],
    videos: day[7].videos,
  };

  // ---------- Day 7: Kullu → Atal Tunnel → Sissu → Gondla ----------
  const homestay = (nights) => ({
    ...day[8].stay,
    status: "pending",
    nights,
    checkin: T("Sat 14 Nov", "શનિ 14 નવે"),
    checkout: T("Mon 16 Nov, before 10:00 AM", "સોમ 16 નવે, સવારે 10:00 પહેલાં"),
  });
  const d7 = {
    ...day[7],
    title: T("Through the Tunnel to Lahaul", "અટલ ટનલ થઈને લાહૌલ"),
    where: T("Kullu → Atal Tunnel → Sissu → Gondla", "કુલ્લુ → અટલ ટનલ → સિસ્સુ → ગોંદલા"),
    wake: T("06:30 AM", "સવારે 06:30"),
    items: [
      { time: T("07:30 – 10:30 AM", "સવારે 07:30 – 10:30"), text: T("Drive from Kullu to Sissu via the Atal Tunnel.", "અટલ ટનલ થઈને કુલ્લુથી સિસ્સુ ડ્રાઇવ."), drive: true },
      { time: T("10:30 AM – 12:30 PM", "સવારે 10:30 – બપોરે 12:30"), text: T("Sissu: waterfall viewpoint and the Chandra river banks.", "સિસ્સુ: વોટરફોલ વ્યૂપોઇન્ટ અને ચંદ્રા નદીનો કિનારો.") },
      { time: T("12:30 – 01:30 PM", "બપોરે 12:30 – 01:30"), text: T("Lunch, then drive on into Lahaul.", "બપોરનું ભોજન, પછી લાહૌલમાં આગળ ડ્રાઇવ."), drive: true },
      { time: T("02:00 – 03:30 PM", "બપોરે 02:00 – 03:30"), text: T("Kardang Monastery, across the river from Keylong, and Keylong market.", "કેલોંગની સામે નદી પાર કરડાંગ મઠ અને કેલોંગ બજાર.") },
      {
        time: T("04:00 PM", "સાંજે 04:00"),
        text: T("Check in at the homestay and rest — let your body get used to the altitude.", "હોમસ્ટેમાં ચેક-ઇન કરીને આરામ — ઊંચાઈની ટેવ પડવા દો."),
        tip: T("Fill fuel at Tandi petrol pump — the last fuel station for a long way.", "તાંદી પેટ્રોલ પંપ પર ઈંધણ ભરાવો — લાંબા અંતર સુધી છેલ્લો પંપ."),
      },
    ],
    stay: homestay(T("Change booking: 2 nights, 14–15 Nov · Night 1", "બુકિંગ બદલો: 2 રાત, 14–15 નવે · પહેલી રાત")),
    night: T("Gondla / Lahaul", "ગોંદલા / લાહૌલ"),
    wx: [wxPlace("sissu"), wxPlace("keylong")],
    food: [day[8].food[0], day[8].food[1], day[8].food[2]],
    places: [
      { file: "Atal_Tunnel_01.jpg", name: T("Atal Tunnel (Rohtang)", "અટલ ટનલ (રોહતાંગ)") },
      { file: "Sissu_Water_Fall.jpg", taken: "2016-06", name: T("Sissu Waterfall", "સિસ્સુ વોટરફોલ") },
      { file: "Kardang_West_Lahaul_Himachal_Oct22_A7C_03376.jpg", taken: "2022-10", name: T("Kardang, across from Keylong", "કરડાંગ, કેલોંગની સામે") },
      { file: "Keylong_West_Lahaul_Himachal_Oct22_A7C_03375_panorama.jpg", taken: "2022-10", name: T("Keylong & the Kardang peaks", "કેલોંગ અને કરડાંગ શિખરો") },
    ],
    videos: day[8].videos,
  };

  // ---------- Day 8: full day at Jispa ----------
  const d8 = {
    ...day[8],
    title: T("A Full Day at Jispa", "જિસ્પામાં આખો દિવસ"),
    where: T("Gondla → Gemur → Jispa → Darcha → Gondla", "ગોંદલા → ગેમુર → જિસ્પા → દારચા → ગોંદલા"),
    wake: T("07:00 AM", "સવારે 07:00"),
    items: [
      { time: T("08:30 AM", "સવારે 08:30"), text: T("Leave the homestay after breakfast; drive past Keylong towards Jispa.", "નાસ્તા પછી હોમસ્ટેથી નીકળો; કેલોંગ થઈને જિસ્પા તરફ."), drive: true },
      { time: T("09:30 AM", "સવારે 09:30"), text: T("Gemur village and monastery, just before Jispa.", "જિસ્પા પહેલાં ગેમુર ગામ અને મઠ.") },
      { time: T("10:00 AM – 12:00 PM", "સવારે 10:00 – બપોરે 12:00"), text: T("Jispa: walk along the Bhaga river, the village and its small monastery; photos of the snow peaks.", "જિસ્પા: ભાગા નદીના કિનારે વોક, ગામ અને નાનો મઠ; બરફીલા શિખરોના ફોટા.") },
      {
        time: T("12:00 PM", "બપોરે 12:00"),
        text: T("Darcha (7 km): river confluence, Darcha bridge and the police check post.", "દારચા (7 કિમી): નદીઓનો સંગમ, દારચા પુલ અને પોલીસ ચેક પોસ્ટ."),
        tip: T("Ask the police about the road ahead. If open: Zingzingbar → Deepak Tal → Baralacha La, turning back by 1 PM. Usually closed by mid-November.", "આગળના રસ્તા વિશે પોલીસને પૂછો. ખુલ્લો હોય તો: ઝિંગઝિંગબાર → દીપક તાલ → બારાલાચા લા, બપોરે 1 સુધીમાં પાછા વળો. નવેમ્બરના મધ્યમાં સામાન્ય રીતે બંધ હોય છે."),
      },
      { time: T("01:00 – 02:30 PM", "બપોરે 01:00 – 02:30"), text: T("Packed lunch by the river; slow afternoon around Jispa and Darcha.", "નદી કિનારે પેક કરેલું ભોજન; જિસ્પા અને દારચામાં આરામથી બપોર.") },
      { time: T("03:00 PM", "બપોરે 03:00"), text: T("Drive back towards Gondla.", "ગોંદલા તરફ પાછા ડ્રાઇવ."), drive: true },
      {
        time: T("05:00 PM", "સાંજે 05:00"),
        text: T("Back at the homestay before the 5:15 PM sunset; stargazing at night.", "સાંજે 5:15ના સૂર્યાસ્ત પહેલાં હોમસ્ટે પર; રાત્રે તારા જોવા."),
        tip: T("Icy roads after dark are the main risk — don't stay out late.", "અંધારા પછી બરફીલા રસ્તા સૌથી મોટું જોખમ છે — મોડે સુધી બહાર ન રહો."),
      },
    ],
    stay: homestay(T("Night 2 of 2", "બીજી રાત")),
    night: T("Gondla / Lahaul", "ગોંદલા / લાહૌલ"),
    wx: [wxPlace("jispa"), wxPlace("keylong")],
    food: [
      day[9].food[0],
      {
        meal: "lunch", time: T("~1:00 PM · Jispa", "~બપોરે 1:00 · જિસ્પા"),
        name: T("Packed lunch from the homestay", "હોમસ્ટેથી પેક કરેલું ભોજન"),
        pure: false,
        order: T("Parathas, sabzi, hot water and snacks", "પરાઠા, શાક, ગરમ પાણી અને નાસ્તો"),
        note: T("Most Jispa camps and eateries close for winter — ask the host the evening before.", "જિસ્પાના મોટાભાગના કેમ્પ અને ભોજનાલયો શિયાળામાં બંધ હોય છે — આગલી સાંજે યજમાનને કહો."),
      },
      day[8].food[2],
    ],
    places: [
      { file: "Jispa_Village_View_Gemur_Lahaul_Oct22_A7C_03384.jpg", taken: "2022-10", name: T("Jispa village from Gemur", "ગેમુરથી જિસ્પા ગામ") },
      { file: "Darcha_Bridge_NW_Lahaul_Himachal_India_Oct22_A7C_03526.jpg", taken: "2022-10", name: T("Darcha bridge (3,340 m)", "દારચા પુલ (3,340 મી)") },
      { file: "Bhaga_River_Darcha_Gemur_Lahaul_Jun24_A7CR_00231.jpg", taken: "2024-06", name: T("Bhaga river between Gemur and Darcha", "ગેમુર અને દારચા વચ્ચે ભાગા નદી") },
      { file: "Deepak_Tal_Lake,_Leh-Manali_Highway,_Himachal_Pradesh,_India.jpg", name: T("Deepak Tal (if the road is open)", "દીપક તાલ (રસ્તો ખુલ્લો હોય તો)") },
    ],
    videos: [],
  };

  trip.days = trip.days.map((d) => ({ 4: d4, 6: d6, 7: d7, 8: d8 })[d.n] || d);

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
    { day: 6, date: "2026-11-13", name: T("Baijnath", "વૈજનાથ"), lat: 32.0526, lon: 76.6487,
      what: T("Shree Shiv Baijnath Temple", "શ્રી શિવ વૈજનાથ મંદિર") },
    { day: 6, date: "2026-11-13", name: T("Bir", "બીર"), lat: 32.044, lon: 76.723,
      what: T("Tibetan Colony, paragliding landing site", "તિબેટીયન કોલોની, પેરાગ્લાઇડિંગ લેન્ડિંગ સાઇટ") },
    { day: 6, date: "2026-11-13", name: T("Kullu / Bhuntar", "કુલ્લુ / ભુંતર"), lat: 31.9578, lon: 77.1095, night: true,
      what: T("Night stay", "રાત્રિ રોકાણ") },
    { day: 7, date: "2026-11-14", name: T("Atal Tunnel", "અટલ ટનલ"), lat: 32.385, lon: 77.15, via: false,
      what: T("Through the tunnel into Lahaul", "ટનલ થઈને લાહૌલમાં") },
    { day: 7, date: "2026-11-14", name: T("Sissu", "સિસ્સુ"), lat: 32.48, lon: 77.125,
      what: T("Sissu waterfall, Chandra river", "સિસ્સુ ધોધ, ચંદ્રા નદી") },
    { day: 7, date: "2026-11-14", end: "2026-11-15", name: T("Gondla homestay", "ગોંદલા હોમસ્ટે"), lat: 32.513, lon: 77.0208, night: true,
      what: T("Valley View Homestay — 2 nights", "વેલી વ્યૂ હોમસ્ટે — 2 રાત") },
    { day: 8, date: "2026-11-15", name: T("Jispa & Darcha", "જિસ્પા અને દારચા"), lat: 32.64, lon: 77.185,
      what: T("Full day: Gemur, Jispa, Bhaga river, Darcha", "આખો દિવસ: ગેમુર, જિસ્પા, ભાગા નદી, દારચા") },
    { day: 9, date: "2026-11-16", name: T("Mandi", "મંડી"), lat: 31.708, lon: 76.9318, night: true,
      what: T("By the Beas river", "બિયાસ નદી કિનારે") },
    { day: 10, date: "2026-11-17", name: T("Chandigarh", "ચંડીગઢ"), lat: 30.7333, lon: 76.7794,
      what: T("Sukhna Lake, train home 5:55 PM", "સુખના લેક, ઘરે જવાની ટ્રેન સાંજે 5:55") },
  ];
})();
