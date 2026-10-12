/* Trip data — edit this file to update the itinerary.
   Every text field has an English (en) and Gujarati (gu) version.
   Photos: `file` is a Wikimedia Commons file name, `taken` is the month the
   photo was taken (YYYY-MM; November/December photos chosen where available). */

const T = (en, gu) => ({ en, gu });
// Google Maps links (official URL format; opens the Maps app on phones).
const mapsFind = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const mapsDir = (q) => "https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=" + encodeURIComponent(q);

window.TRIP = {
  start: "2026-11-08",
  end: "2026-11-17",
  title: T(
    "Diwali Trip to Punjab & Himachal Pradesh",
    "પંજાબ અને હિમાચલ પ્રદેશની દિવાળી યાત્રા"
  ),
  dates: T("8 – 17 November 2026", "8 નવેમ્બર – 17 નવેમ્બર, 2026"),
  route: [
    T("Ahmedabad", "અમદાવાદ"),
    T("Amritsar", "અમૃતસર"),
    T("Dalhousie", "ડેલહાઉસી"),
    T("Dharamshala", "ધર્મશાળા"),
    T("Kangra", "કાંગડા"),
    T("Kullu", "કુલ્લુ"),
    T("Lahaul", "લાહૌલ"),
    T("Mandi", "મંડી"),
    T("Chandigarh", "ચંડીગઢ"),
  ],
  note: T(
    "<strong>Spiti / Kaza is not on this plan.</strong> Kaza is a 10 to 12-hour drive one way from Sissu over the Kunzum Pass, so it can't be done as a day trip. By mid-November, Kunzum Pass is almost always closed due to heavy snow. This itinerary routes you through the snowy Lahaul Valley (Keylong) instead.",
    "<strong>સ્પીતિ / કાઝા આ પ્રવાસમાં નથી.</strong> કુંઝુમ પાસ થઈને સિસ્સુથી કાઝા જવાનો એક તરફનો રસ્તો 10 થી 12 કલાકનો ડ્રાઇવ છે, તેથી દિવસની મુલાકાત શક્ય નથી. નવેમ્બરના મધ્ય સુધીમાં, ભારે બરફવર્ષાને કારણે કુંઝુમ પાસ લગભગ હંમેશા બંધ રહે છે. આ પ્રવાસ કાર્યક્રમ તમને બરફ આચ્છાદિત લાહૌલ ખીણ (કેલોંગ) તરફ લઈ જાય છે."
  ),

  trains: [
    {
      day: 1,
      number: "19107",
      name: "Janmabhoomi Express",
      from: T("Gandhinagar Capital (GNC)", "ગાંધીનગર કેપિટલ (GNC)"),
      to: T("Jalandhar City", "જલંધર સિટી"),
      depart: T("Sun 8 Nov · 10:05 AM", "રવિ 8 નવે · સવારે 10:05"),
      arrive: T("Mon 9 Nov · 10:00 AM", "સોમ 9 નવે · સવારે 10:00"),
      cls: "3A",
      pnr: "••••••0791",
      coach: "B1",
      berths: "37, 38, 40",
    },
    {
      day: 10,
      number: "19412",
      name: "DLPC GNC Express",
      from: T("Chandigarh (CDG)", "ચંડીગઢ (CDG)"),
      to: T("Gandhinagar Capital (GNC)", "ગાંધીનગર કેપિટલ (GNC)"),
      depart: T("Tue 17 Nov · 05:55 PM", "મંગળ 17 નવે · સાંજે 05:55"),
      arrive: T("Wed 18 Nov · 03:05 PM", "બુધ 18 નવે · બપોરે 03:05"),
      cls: "3A",
      pnr: "••••••7012",
      coach: "B2",
      berths: "27, 29, 30",
    },
  ],

  days: [
    {
      n: 1,
      date: "2026-11-08",
      title: T("The Departure", "પ્રસ્થાન"),
      where: T("Ahmedabad → on the train", "અમદાવાદ → ટ્રેનમાં"),
      wake: T("As per your comfort", "તમારી અનુકૂળતા મુજબ"),
      items: [
        {
          time: T("09:00 AM", "સવારે 09:00"),
          text: T(
            "Board Janmabhoomi Express from Ahmedabad (boarding station: Gandhinagar Capital (GNC) at 10:05 AM).",
            "અમદાવાદથી જન્મભૂમિ એક્સપ્રેસમાં બેસો (બોર્ડિંગ સ્ટેશન: ગાંધીનગર કેપિટલ (GNC) સવારે 10:05 વાગ્યે)."
          ),
        },
      ],
      train: 0,
      night: T("On the train", "ટ્રેનમાં"),
      places: [
        { file: "Palanpur_Junction_Railway_Station.jpg", taken: "2023-12", name: T("On the way: Palanpur Junction", "રસ્તામાં: પાલનપુર જંક્શન") },
      ],
    },
    {
      n: 2,
      date: "2026-11-09",
      title: T("The Golden Hour", "ગોલ્ડન ટેમ્પલ"),
      where: T("Jalandhar → Amritsar", "જલંધર → અમૃતસર"),
      wake: T("07:30 AM (on the train, to get ready for arrival)", "સવારે 07:30 (આગમન માટે તૈયાર થવા ટ્રેનમાં)"),
      items: [
        {
          time: T("10:00 AM", "સવારે 10:00"),
          text: T(
            "Arrive at Jalandhar City Railway Station. Hire your Tempo Traveller.",
            "જલંધર સિટી રેલ્વે સ્ટેશન પર આગમન. તમારું ટેમ્પો ટ્રાવેલર ભાડે કરો."
          ),
        },
        {
          time: T("10:30 AM – 12:30 PM", "સવારે 10:30 – બપોરે 12:30"),
          text: T("Drive from Jalandhar to Amritsar.", "જલંધરથી અમૃતસર ડ્રાઇવ."),
          drive: true,
        },
        {
          time: T("12:30 PM", "બપોરે 12:30"),
          text: T("Hotel check-in near the Golden Temple and lunch.", "ગોલ્ડન ટેમ્પલ નજીક હોટેલ ચેક-ઇન અને લંચ."),
        },
        {
          time: T("02:00 PM", "બપોરે 02:00"),
          text: T("Depart for the Wagah Border.", "વાઘા બોર્ડર માટે રવાના."),
          drive: true,
        },
        {
          time: T("04:15 – 05:00 PM", "સાંજે 04:15 – 05:00"),
          text: T(
            "Attari-Wagah Border Ceremony.",
            "અટારી-વાઘા બોર્ડર સમારોહ."
          ),
          tip: T(
            "Winter timings usually start at 4:15 PM, but arrive early to get seats.",
            "શિયાળાનો સમય સામાન્ય રીતે સાંજે 4:15 વાગ્યે શરૂ થાય છે, પરંતુ બેઠક મેળવવા વહેલા પહોંચો."
          ),
        },
        {
          time: T("07:30 PM", "સાંજે 07:30"),
          text: T("Sri Harmandir Sahib (Golden Temple) & Langar Hall.", "શ્રી હરિમંદિર સાહિબ (ગોલ્ડન ટેમ્પલ) અને લંગર હોલ."),
        },
      ],
      stay: {
        status: "pending",
        name: T("Hotel near the Golden Temple", "ગોલ્ડન ટેમ્પલ નજીક હોટેલ"),
        map: mapsFind("Hotels near Golden Temple, Amritsar"),
        mapLabel: T("Find hotels on Google Maps", "Google Maps પર હોટેલ શોધો"),
      },
      night: T("Amritsar", "અમૃતસર"),
      places: [
        { file: "Golden_Temple_Night_view.jpg", taken: "2018-12", name: T("Golden Temple at night", "રાત્રે ગોલ્ડન ટેમ્પલ") },
        { file: "The_famous_'langar'-_free_meals_for_one_and_all_(38938496121).jpg", taken: "2017-11", name: T("Langar Hall, Golden Temple", "લંગર હોલ, ગોલ્ડન ટેમ્પલ") },
        { file: "India_Pakistan_Border_Wagha_(15027737723).jpg", taken: "2010-12", name: T("Attari-Wagah Beating Retreat ceremony", "અટારી-વાઘા બોર્ડર સમારોહ") },
      ],
    },
    {
      n: 3,
      date: "2026-11-10",
      title: T("Ascent to Dalhousie & The Peak", "ડેલહાઉસી અને શિખર તરફ પ્રયાણ"),
      where: T("Amritsar → Dalhousie", "અમૃતસર → ડેલહાઉસી"),
      wake: T(
        "05:30 AM (early start for a long drive and a daylight trek)",
        "સવારે 05:30 (લાંબી ડ્રાઇવ અને દિવસના પ્રકાશમાં ટ્રેકિંગ માટે વહેલી શરૂઆત)"
      ),
      items: [
        { time: T("07:00 AM", "સવારે 07:00"), text: T("Depart Amritsar.", "અમૃતસરથી રવાના."), drive: true },
        {
          time: T("12:30 PM", "બપોરે 12:30"),
          text: T(
            "Arrive in Dalhousie, check into your hotel, and grab a quick lunch.",
            "ડેલહાઉસી આગમન, હોટેલમાં ચેક-ઇન અને ઝડપી લંચ."
          ),
        },
        { time: T("01:30 PM", "બપોરે 01:30"), text: T("Drive to the Dainkund Peak base.", "દૈનકુંડ પીક બેઝ તરફ ડ્રાઇવ."), drive: true },
        {
          time: T("02:00 – 05:00 PM", "બપોરે 02:00 – સાંજે 05:00"),
          text: T("Dainkund Peak Trek (2 km trek).", "દૈનકુંડ પીક ટ્રેક (2 કિમી ટ્રેક)."),
          tip: T(
            "Start by 2 PM so you are off the trail before the sun sets around 5:30 PM.",
            "બપોરે 2 વાગ્યા સુધીમાં શરૂ કરો જેથી સાંજે 5:30 વાગ્યાની આસપાસ સૂર્યાસ્ત પહેલાં ટ્રેક પૂરો થાય."
          ),
        },
        {
          time: T("06:00 PM", "સાંજે 06:00"),
          text: T(
            "Evening stroll at the Town Center, Mall Road, and colonial viewpoints.",
            "ટાઉન સેન્ટર, મોલ રોડ અને મનોરમ્ય દ્રશ્યો પર સાંજના સમયે વોક."
          ),
        },
      ],
      stay: {
        status: "confirmed",
        name: T("Hotel Himdhara Dalhousie", "Hotel Himdhara Dalhousie"),
        map: mapsFind("Hotel Himdhara, Baloon Church Road, Dalhousie, Himachal Pradesh 176304"),
        directions: mapsDir("Hotel Himdhara, Baloon Church Road, Dalhousie, Himachal Pradesh 176304"),
        via: "MakeMyTrip",
        id: "NH••••••••0644",
        address: T(
          "Church Baloon Road, near Gandhi Chowk, Dalhousie – 176304",
          "ચર્ચ બલૂન રોડ, ગાંધી ચોક નજીક, ડેલહાઉસી – 176304"
        ),
        checkin: T("Tue 10 Nov, after 02:00 PM", "મંગળ 10 નવે, બપોરે 02:00 પછી"),
        checkout: T("Wed 11 Nov, before 12:00 PM", "બુધ 11 નવે, બપોરે 12:00 પહેલાં"),
      },
      night: T("Dalhousie", "ડેલહાઉસી"),
      places: [
        { file: "Dalhousie_Dainkund_01.jpg", name: T("Dainkund Peak", "દૈનકુંડ પીક") },
        { file: "St_John's_Church,_Dalhousie.jpg", taken: "2014-11", name: T("St John's Church, Gandhi Chowk, Dalhousie", "સેન્ટ જોન ચર્ચ, ગાંધી ચોક, ડેલહાઉસી") },
      ],
    },
    {
      n: 4,
      date: "2026-11-11",
      title: T("The Lake & The Valley", "ધર્મશાળા / મેકલિયોડ ગંજ"),
      where: T("Dalhousie → Chamera Lake → Dharamshala", "ડેલહાઉસી → ચમેરા લેક → ધર્મશાળા"),
      wake: T("07:00 AM", "સવારે 07:00"),
      items: [
        { time: T("08:30 AM", "સવારે 08:30"), text: T("Drive to Chamera Lake (approx. 1.5 hours).", "ચમેરા લેક તરફ ડ્રાઇવ (લગભગ 1.5 કલાક)."), drive: true },
        { time: T("10:00 – 11:30 AM", "સવારે 10:00 – 11:30"), text: T("Explore Chamera Lake (boating available).", "ચમેરા લેકની મુલાકાત (બોટિંગ ઉપલબ્ધ).") },
        { time: T("11:30 AM – 04:00 PM", "સવારે 11:30 – સાંજે 04:00"), text: T("Drive from Chamera Lake to Dharamshala.", "ચમેરા લેકથી ધર્મશાળા તરફ ડ્રાઇવ."), drive: true },
        { time: T("04:00 PM", "સાંજે 04:00"), text: T("Arrive in Dharamshala / McLeod Ganj and check in.", "ધર્મશાળા / મેકલિયોડ ગંજ આગમન અને ચેક-ઇન.") },
        { time: T("05:30 PM", "સાંજે 05:30"), text: T("Evening exploring McLeod Ganj Mall Road.", "મેકલિયોડ ગંજ મોલ રોડ પર મુલાકાત.") },
      ],
      stay: {
        status: "confirmed",
        name: T("Hotel Pine View", "Hotel Pine View"),
        map: mapsFind("Hotel Pine View, Sudher, Dharamshala, Himachal Pradesh 176215"),
        directions: mapsDir("Hotel Pine View, Sudher, Dharamshala, Himachal Pradesh 176215"),
        via: "MakeMyTrip",
        id: "NH••••••••9134",
        address: T("VPO Sudher, Dharamshala – 176215", "VPO સુધેર, ધર્મશાળા – 176215"),
        checkin: T("Wed 11 Nov, after 12:00 PM", "બુધ 11 નવે, બપોરે 12:00 પછી"),
        checkout: T("Fri 13 Nov, before 12:00 PM", "શુક્ર 13 નવે, બપોરે 12:00 પહેલાં"),
        nights: T("2 nights (Nov 11 – 13) · Night 1", "2 રાત (11 – 13 નવે) · પહેલી રાત"),
      },
      night: T("Dharamshala / McLeod Ganj", "ધર્મશાળા / મેકલિયોડ ગંજ"),
      places: [
        { file: "Chamera_Lake.jpg", taken: "2005-04", name: T("Chamera Lake & Dam on the Ravi", "ચમેરા લેક અને રાવી નદી ડેમ") },
        { file: "Panoramic_view_of_McLeod_Ganj_during_winters,_2005.jpg", taken: "2005-02", name: T("McLeod Ganj in winter, Dhauladhar behind", "શિયાળામાં મેકલિયોડ ગંજ (પાછળ ધૌલાધાર)") },
      ],
    },
    {
      n: 5,
      date: "2026-11-12",
      title: T("Tibetan Heritage & Waterfalls", "ધર્મશાળા / મેકલિયોડ ગંજ"),
      where: T("McLeod Ganj", "મેકલિયોડ ગંજ"),
      wake: T("06:00 AM", "સવારે 06:00"),
      items: [
        { time: T("07:00 AM", "સવારે 07:00"), text: T("Leave the hotel to enjoy the crisp mountain air.", "પહાડી તાજી હવાનો આનંદ માણવા હોટેલથી નીકળો.") },
        { time: T("07:30 AM", "સવારે 07:30"), text: T("Breakfast at a local bakery near the Main Square.", "મેઇન સ્ક્વેર નજીકની સ્થાનિક બેકરીમાં નાસ્તો.") },
        { time: T("08:45 AM", "સવારે 08:45"), text: T("Dalai Lama Temple & Museum (catch the morning chants).", "દલાઈ લામા મંદિર અને મ્યુઝિયમ (સવારના પ્રાર્થના મંત્રો સાંભળો).") },
        { time: T("11:00 AM", "સવારે 11:00"), text: T("Bhagsunag Temple and the hike to Bhagsu Waterfall.", "ભાગસુનાગ મંદિર અને ભાગસુ ધોધ તરફ હાઇકિંગ.") },
        { time: T("01:15 PM", "બપોરે 01:15"), text: T("Lunch at a hillside cafe with a view.", "સુંદર દ્રશ્ય ધરાવતી હિલસાઇડ કાફેમાં લંચ.") },
        { time: T("03:15 PM", "બપોરે 03:15"), text: T("St. John in the Wilderness Church.", "સેન્ટ જોન ઇન ધ વાઇલ્ડરનેસ ચર્ચ.") },
        {
          time: T("04:30 PM", "સાંજે 04:30"),
          text: T("Naddi View Point.", "નડ્ડી વ્યૂ પોઇન્ટ."),
          tip: T("Arrive before the 5:30 PM sunset.", "સાંજે 5:30 વાગ્યાના સૂર્યાસ્ત પહેલા પહોંચો."),
        },
        { time: T("06:30 PM", "સાંજે 06:30"), text: T("Free time in Main Square for shopping and exploring.", "મેઇન સ્ક્વેરમાં ખરીદી અને મુલાકાત માટે મફત સમય.") },
        { time: T("07:30 PM", "સાંજે 07:30"), text: T("Dinner (authentic Tibetan food).", "ડિનર (પ્રામાણિક તિબેટીયન ખોરાક).") },
      ],
      stay: {
        status: "confirmed",
        name: T("Hotel Pine View", "Hotel Pine View"),
        map: mapsFind("Hotel Pine View, Sudher, Dharamshala, Himachal Pradesh 176215"),
        directions: mapsDir("Hotel Pine View, Sudher, Dharamshala, Himachal Pradesh 176215"),
        nights: T("Night 2 of 2", "બીજી રાત"),
      },
      night: T("Dharamshala / McLeod Ganj", "ધર્મશાળા / મેકલિયોડ ગંજ"),
      places: [
        { file: "McLeod_Ganj_from_the_Dalai_Lama_Temple_(6466149411).jpg", taken: "2011-12", name: T("View from the Dalai Lama Temple", "દલાઈ લામા મંદિર પરથી દ્રશ્ય") },
        { file: "Bhagsu_nag_temple.jpg", taken: "2019-12", name: T("Bhagsunag Temple", "ભાગસુનાગ મંદિર") },
        { file: "Bhagsu_waterfall.jpg", taken: "2017-03", name: T("Bhagsu Waterfall", "ભાગસુ ધોધ") },
        { file: "Dharamsala-St_John_in_the_Wilderness-11-mit_Glockenhaus-2016-gje.jpg", name: T("St. John in the Wilderness Church", "સેન્ટ જોન ઇન ધ વાઇલ્ડરનેસ ચર્ચ") },
        { file: "Village_of_Naddi_04.jpg", taken: "2018-05", name: T("Naddi village & the Dhauladhar range", "નડ્ડી ગામ અને ધૌલાધાર પર્વતમાળા") },
      ],
    },
    {
      n: 6,
      date: "2026-11-13",
      title: T("Forts & Blessings", "કાંગડા ફોર્ટ / માતા બગલામુખી"),
      where: T("Dharamshala → Kangra", "ધર્મશાળા → કાંગડા"),
      wake: T("06:00 AM", "સવારે 06:00"),
      items: [
        { time: T("07:00 AM", "સવારે 07:00"), text: T("Leave the hotel and drive down into the lower Dharamshala valley.", "હોટેલ છોડીને નીચલી ધર્મશાળા ખીણમાં ડ્રાઇવ કરો."), drive: true },
        { time: T("07:45 AM", "સવારે 07:45"), text: T("Breakfast in Kotwali Bazaar.", "કોટવાલી બજારમાં નાસ્તો.") },
        { time: T("09:00 AM", "સવારે 09:00"), text: T("HPCA Stadium.", "HPCA સ્ટેડિયમ.") },
        { time: T("10:30 AM", "સવારે 10:30"), text: T("Kunal Pathri Temple in the tea gardens.", "ચાના બગીચાઓમાં કુનાલ પથરી મંદિર.") },
        {
          time: T("11:45 AM – 01:30 PM", "સવારે 11:45 – બપોરે 01:30"),
          text: T("Norbulingka Institute.", "નોરબુલિંગકા ઇન્સ્ટિટ્યૂટ."),
          tip: T("Closed on Sundays, but today is Friday, so it is open.", "રવિવારે બંધ હોય છે, પરંતુ આજે શુક્રવાર હોવાથી ખુલ્લું છે."),
        },
        { time: T("01:30 PM", "બપોરે 01:30"), text: T("Lunch at Norbulingka’s garden cafe.", "નોરબુલિંગકાના ગાર્ડન કાફેમાં લંચ.") },
        { time: T("02:30 – 03:30 PM", "બપોરે 02:30 – 03:30"), text: T("Drive to Kangra Fort.", "કાંગડા ફોર્ટ તરફ ડ્રાઇવ."), drive: true },
        {
          time: T("03:30 – 05:00 PM", "બપોરે 03:30 – સાંજે 05:00"),
          text: T("Explore Kangra Fort.", "કાંગડા ફોર્ટની મુલાકાત."),
          tip: T("Closes at 5:30 PM.", "સાંજે 5:30 વાગ્યે બંધ થાય છે."),
        },
        { time: T("05:00 – 06:00 PM", "સાંજે 05:00 – 06:00"), text: T("Drive to Mata Baglamukhi Temple.", "માતા બગલામુખી મંદિર તરફ ડ્રાઇવ."), drive: true },
        {
          time: T("06:00 – 07:00 PM", "સાંજે 06:00 – 07:00"),
          text: T("Darshan at Mata Baglamukhi.", "માતા બગલામુખી ખાતે દર્શન."),
          tip: T("Open until 11:30 PM.", "રાત્રે 11:30 સુધી ખુલ્લું."),
        },
      ],
      stay: {
        status: "pending",
        name: T("Hotel in Kangra", "કાંગડામાં હોટેલ"),
        map: mapsFind("Hotels in Kangra, Himachal Pradesh"),
        mapLabel: T("Find hotels on Google Maps", "Google Maps પર હોટેલ શોધો"),
      },
      night: T("Kangra", "કાંગડા"),
      places: [
        { file: "Dharamshala_Cricket_Stadium_Landscape.jpg", taken: "2017-03", name: T("HPCA Stadium, Dharamshala", "HPCA સ્ટેડિયમ, ધર્મશાળા") },
        { file: "Mann_Tea_Estate_1.jpg", taken: "2016-06", name: T("Dharamshala tea gardens (Kunal Pathri area)", "ધર્મશાળાના ચાના બગીચા (કુનાલ પથરી વિસ્તાર)") },
        { file: "Norbulinka.JPG", taken: "2010-08", name: T("Norbulingka Institute", "નોરબુલિંગકા ઇન્સ્ટિટ્યૂટ") },
        { file: "Kangra_Fort_,Himachal_Pradesh_26_(cropped).jpg", taken: "2018-10", name: T("Kangra Fort", "કાંગડા ફોર્ટ") },
        { file: "Maa_Baglamukhi_Temple_Bankhandi_(Kangra).jpg", name: T("Mata Baglamukhi Temple, Bankhandi", "માતા બગલામુખી મંદિર, બનખંડી") },
      ],
    },
    {
      n: 7,
      date: "2026-11-14",
      title: T("The Spiritual Circuit & Paragliding Hub", "બીર બિલિંગ"),
      where: T("Kangra → Baijnath → Bir → Kullu", "કાંગડા → વૈજનાથ → બીર → કુલ્લુ"),
      wake: T("06:00 AM (early start for heavy driving)", "સવારે 06:00 (લાંબી ડ્રાઇવ માટે વહેલી શરૂઆત)"),
      items: [
        { time: T("07:30 AM", "સવારે 07:30"), text: T("Drive from Kangra to Baijnath.", "કાંગડાથી વૈજનાથ ડ્રાઇવ."), drive: true },
        { time: T("09:30 AM", "સવારે 09:30"), text: T("Shree Shiv Baijnath Temple.", "શ્રી શિવ વૈજનાથ મંદિર.") },
        { time: T("10:30 AM", "સવારે 10:30"), text: T("Tashi Jong Khampagar Monastery.", "તાશી જોંગ ખામ્પાગર મઠ.") },
        { time: T("11:30 AM", "સવારે 11:30"), text: T("Sherabling Monastery.", "શેરાબલિંગ મઠ.") },
        { time: T("01:00 PM", "બપોરે 01:00"), text: T("Lunch in Bir and a quick look at the Bir Billing paragliding landing site.", "બીરમાં લંચ અને બીર બિલિંગ પેરાગ્લાઇડિંગ લેન્ડિંગ સાઇટની ટૂંકી મુલાકાત.") },
        { time: T("02:30 – 06:30 PM", "બપોરે 02:30 – સાંજે 06:30"), text: T("Drive from Bir to Kullu (approx. 4 hours via Mandi).", "બીરથી મંડી થઈને કુલ્લુ તરફ ડ્રાઇવ (લગભગ 4 કલાક)."), drive: true },
      ],
      stay: {
        status: "pending",
        name: T("Hotel in Kullu", "કુલ્લુમાં હોટેલ"),
        map: mapsFind("Hotels in Kullu, Himachal Pradesh"),
        mapLabel: T("Find hotels on Google Maps", "Google Maps પર હોટેલ શોધો"),
      },
      night: T("Kullu", "કુલ્લુ"),
      places: [
        { file: "Baijnath_Temple.jpg", taken: "2017-04", name: T("Shree Shiv Baijnath Temple", "શ્રી શિવ વૈજનાથ મંદિર") },
        { file: "Sherabling_Monastery_-_Inner_Sanctum.jpg", name: T("Sherabling Monastery", "શેરાબલિંગ મઠ") },
        { file: "BIR_BILLING_PARAGLIDING.jpg", taken: "2017-12", name: T("Paragliding at Bir Billing", "બીર બિલિંગ પેરાગ્લાઇડિંગ") },
      ],
    },
    {
      n: 8,
      date: "2026-11-15",
      title: T("Through the Tunnel to Lahaul", "અટલ ટનલ થઈને સિસ્સુ"),
      where: T("Kullu → Atal Tunnel → Sissu → Keylong", "કુલ્લુ → અટલ ટનલ → સિસ્સુ → કેલોંગ"),
      wake: T("07:00 AM", "સવારે 07:00"),
      items: [
        { time: T("08:30 – 11:30 AM", "સવારે 08:30 – 11:30"), text: T("Drive from Kullu to Sissu via the Atal Tunnel.", "અટલ ટનલ થઈને કુલ્લુથી સિસ્સુ ડ્રાઇવ."), drive: true },
        { time: T("11:30 AM – 02:00 PM", "સવારે 11:30 – બપોરે 02:00"), text: T("Explore Sissu, the waterfall viewpoint, and the Chandra River banks.", "સિસ્સુ, વોટરફોલ વ્યૂપોઇન્ટ અને ચંદ્રા નદીના કિનારાની મુલાકાત.") },
        { time: T("02:00 – 03:30 PM", "બપોરે 02:00 – 03:30"), text: T("Drive further north into the Lahaul Valley to Keylong (approx. 30 km).", "લાહૌલ ખીણમાં આગળ ઉત્તર તરફ કેલોંગ ડ્રાઇવ (લગભગ 30 કિમી)."), drive: true },
        { time: T("03:30 – 05:00 PM", "બપોરે 03:30 – સાંજે 05:00"), text: T("Check into your hotel and enjoy the uninterrupted views of the glaciated Kardang peaks.", "હોટેલમાં ચેક-ઇન કરો અને કરડાંગ શિખરોના સુંદર દ્રશ્યોનો આનંદ માણો.") },
      ],
      stay: {
        status: "confirmed",
        name: T("Valley View Homestay Fuktal, Lahaul", "Valley View Homestay Fuktal, Lahaul"),
        map: mapsFind("Valley View Homestay, Gondla, Lahaul, Himachal Pradesh 175140"),
        directions: mapsDir("Valley View Homestay, Gondla, Lahaul, Himachal Pradesh 175140"),
        via: "Goibibo",
        id: "GH••••••••0370",
        address: T("Village Fuktal, Gondla, Lahaul – 175140", "ગામ ફુકતાલ, ગોંદલા, લાહૌલ – 175140"),
        checkin: T("Sun 15 Nov, 12:00 – 02:00 PM", "રવિ 15 નવે, બપોરે 12:00 – 02:00"),
        checkout: T("Mon 16 Nov, before 10:00 AM", "સોમ 16 નવે, સવારે 10:00 પહેલાં"),
      },
      night: T("Keylong / Lahaul", "કેલોંગ / લાહૌલ"),
      places: [
        { file: "Atal_Tunnel_01.jpg", name: T("Atal Tunnel (Rohtang)", "અટલ ટનલ (રોહતાંગ)") },
        { file: "Sissu_Water_Fall.jpg", taken: "2016-06", name: T("Sissu Waterfall", "સિસ્સુ વોટરફોલ") },
        { file: "Keylong_West_Lahaul_Himachal_Oct22_A7C_03375_panorama.jpg", taken: "2022-10", name: T("Keylong & the Kardang peaks", "કેલોંગ અને કરડાંગ શિખરો") },
      ],
    },
    {
      n: 9,
      date: "2026-11-16",
      title: T("The Lahaul Morning & Descent to Mandi", "લાહૌલ / કેલોંગ"),
      where: T("Keylong → Atal Tunnel → Mandi", "કેલોંગ → અટલ ટનલ → મંડી"),
      wake: T("06:30 AM", "સવારે 06:30"),
      items: [
        { time: T("07:30 – 09:00 AM", "સવારે 07:30 – 09:00"), text: T("Enjoy a crisp, snowy morning in Keylong.", "કેલોંગમાં તાજી, બરફીલી સવારનો આનંદ માણો.") },
        {
          time: T("09:00 AM – 03:30 PM", "સવારે 09:00 – બપોરે 03:30"),
          text: T(
            "Scenic drive from Keylong back through the Atal Tunnel, bypassing Manali, straight down the river valley to Mandi (approx. 6.5 hours of driving).",
            "કેલોંગથી અટલ ટનલ થઈને મનાલીને બાયપાસ કરીને મંડી સુધીની મનોહર ડ્રાઇવ (લગભગ 6.5 કલાક)."
          ),
          tip: T("Leave early to account for mountain traffic.", "પહાડી ટ્રાફિકને ધ્યાનમાં રાખીને વહેલા નીકળો."),
          drive: true,
        },
        { time: T("03:30 PM", "બપોરે 03:30"), text: T("Late lunch on arrival in Mandi (or stop along the route).", "મંડી આગમન પર મોડું લંચ (અથવા રસ્તામાં રોકાણ).") },
        { time: T("05:00 PM", "સાંજે 05:00"), text: T("Check into your hotel and relax by the Beas River.", "હોટેલમાં ચેક-ઇન કરો અને બિયાસ નદીના કિનારે આરામ કરો.") },
      ],
      stay: {
        status: "pending",
        name: T("Hotel in Mandi, by the Beas River", "મંડીમાં બિયાસ નદી કિનારે હોટેલ"),
        map: mapsFind("Hotels near Beas River, Mandi, Himachal Pradesh"),
        mapLabel: T("Find hotels on Google Maps", "Google Maps પર હોટેલ શોધો"),
      },
      night: T("Mandi", "મંડી"),
      places: [
        { file: "Aerail_view_of_Lahaul_valley_in_winter.JPG", name: T("Lahaul valley in winter", "શિયાળામાં લાહૌલ ખીણ") },
        { file: "Victoria_Bridge_Mandi.JPG", taken: "2011-12", name: T("Victoria Bridge over the Beas, Mandi", "બિયાસ પર વિક્ટોરિયા બ્રિજ, મંડી") },
      ],
    },
    {
      n: 10,
      date: "2026-11-17",
      title: T("The Journey Home", "ઘર તરફની મુસાફરી"),
      where: T("Mandi → Chandigarh → home", "મંડી → ચંડીગઢ → ઘર"),
      wake: T("06:30 AM", "સવારે 06:30"),
      items: [
        {
          time: T("07:30 AM – 12:30 PM", "સવારે 07:30 – બપોરે 12:30"),
          text: T("Drive from Mandi to Chandigarh (approx. 5 hours).", "મંડીથી ચંડીગઢ ડ્રાઇવ (લગભગ 5 કલાક)."),
          tip: T("Leave early to account for mountain traffic.", "પહાડી ટ્રાફિકને ધ્યાનમાં રાખીને વહેલા નીકળો."),
          drive: true,
        },
        { time: T("12:30 – 03:00 PM", "બપોરે 12:30 – 03:00"), text: T("Lunch in Chandigarh. If time permits, a quick walk around Sukhna Lake.", "ચંડીગઢમાં લંચ. જો સમય મળે, તો સુખના લેક આસપાસ વોક લો.") },
        { time: T("04:00 PM", "બપોરે 04:00"), text: T("Arrive at Chandigarh Railway Station.", "ચંડીગઢ રેલ્વે સ્ટેશન આગમન.") },
        { time: T("05:55 PM", "સાંજે 05:55"), text: T("Board the train to Gandhinagar from Chandigarh (CDG).", "ચંડીગઢ (CDG) પરથી ગાંધીનગરની ટ્રેનમાં બેસો.") },
      ],
      train: 1,
      night: T("On the train (arrive GNC Wed 18 Nov, 03:05 PM)", "ટ્રેનમાં (18 નવે બપોરે 03:05 GNC પહોંચશે)"),
      places: [
        { file: "Sunset_view_at_Sukhna_Lake_,Chandigarh_,_India.JPG", taken: "2014-11", name: T("Sunset at Sukhna Lake, Chandigarh", "સુખના લેક પર સૂર્યાસ્ત, ચંડીગઢ") },
      ],
    },
  ],
};
