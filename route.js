/* Stops for the journey map, in travel order (by road, Jalandhar to Chandigarh).
   day: which day card the stop links to. night: true if you sleep here.
   end: last date, for a stop covering more than one day. */

(function () {
  const T = (en, gu) => ({ en, gu });
  window.TRIP.route = [
    { day: 2, date: "2026-11-09", name: T("Jalandhar City", "જલંધર સિટી"), lat: 31.326, lon: 75.5762,
      what: T("Arrive by train 10 AM, pick up the Tempo Traveller", "સવારે 10 ટ્રેનથી આગમન, ટેમ્પો ટ્રાવેલર લો") },
    { day: 2, date: "2026-11-09", name: T("Amritsar", "અમૃતસર"), lat: 31.62, lon: 74.8765, night: true,
      what: T("Golden Temple, Wagah Border", "ગોલ્ડન ટેમ્પલ, વાઘા બોર્ડર") },
    { day: 3, date: "2026-11-10", name: T("Dalhousie", "ડેલહાઉસી"), lat: 32.536, lon: 75.97, night: true,
      what: T("Dainkund Peak trek, Mall Road", "દૈનકુંડ પીક ટ્રેક, મોલ રોડ") },
    { day: 4, date: "2026-11-11", name: T("Chamera Lake", "ચમેરા લેક"), lat: 32.589, lon: 76.003,
      what: T("Lake visit, boating", "લેકની મુલાકાત, બોટિંગ") },
    { day: 4, date: "2026-11-11", end: "2026-11-12", name: T("McLeod Ganj / Dharamshala", "મેકલિયોડ ગંજ / ધર્મશાળા"), lat: 32.2427, lon: 76.3234, night: true,
      what: T("Dalai Lama Temple, Bhagsu, Naddi — 2 nights", "દલાઈ લામા મંદિર, ભાગસુ, નડ્ડી — 2 રાત") },
    { day: 6, date: "2026-11-13", name: T("Kangra", "કાંગડા"), lat: 32.0998, lon: 76.2691, night: true,
      what: T("Norbulingka, Kangra Fort, Mata Baglamukhi", "નોરબુલિંગકા, કાંગડા ફોર્ટ, માતા બગલામુખી") },
    { day: 7, date: "2026-11-14", name: T("Baijnath", "વૈજનાથ"), lat: 32.0526, lon: 76.6487,
      what: T("Shree Shiv Baijnath Temple", "શ્રી શિવ વૈજનાથ મંદિર") },
    { day: 7, date: "2026-11-14", name: T("Bir", "બીર"), lat: 32.044, lon: 76.723,
      what: T("Monasteries, paragliding landing site", "મઠ, પેરાગ્લાઇડિંગ લેન્ડિંગ સાઇટ") },
    { day: 7, date: "2026-11-14", name: T("Kullu", "કુલ્લુ"), lat: 31.9578, lon: 77.1095, night: true,
      what: T("Night stay", "રાત્રિ રોકાણ") },
    { day: 8, date: "2026-11-15", name: T("Atal Tunnel", "અટલ ટનલ"), lat: 32.385, lon: 77.15,
      what: T("Through the tunnel into Lahaul", "ટનલ થઈને લાહૌલમાં") },
    { day: 8, date: "2026-11-15", name: T("Sissu", "સિસ્સુ"), lat: 32.48, lon: 77.125,
      what: T("Sissu waterfall, Chandra river", "સિસ્સુ ધોધ, ચંદ્રા નદી") },
    { day: 8, date: "2026-11-15", name: T("Gondla / Keylong", "ગોંદલા / કેલોંગ"), lat: 32.513, lon: 77.0208, night: true,
      what: T("Valley View Homestay", "વેલી વ્યૂ હોમસ્ટે") },
    { day: 9, date: "2026-11-16", name: T("Mandi", "મંડી"), lat: 31.708, lon: 76.9318, night: true,
      what: T("By the Beas river", "બિયાસ નદી કિનારે") },
    { day: 10, date: "2026-11-17", name: T("Chandigarh", "ચંડીગઢ"), lat: 30.7333, lon: 76.7794,
      what: T("Sukhna Lake, train home 5:55 PM", "સુખના લેક, ઘરે જવાની ટ્રેન સાંજે 5:55") },
  ];
})();
