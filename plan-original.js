/* Earlier plan (alt.html): the original itinerary from the trip doc, kept for
   reference. data.js already holds it; this only labels the page. */

(function () {
  const T = (en, gu) => ({ en, gu });
  window.TRIP.alt = true;
  window.TRIP.planNote = {
    title: T("Earlier plan — kept for reference", "અગાઉનો પ્લાન — સંદર્ભ માટે"),
    changes: [
      T("This is the original plan from the trip document. The final plan is on the main page.", "આ પ્રવાસ દસ્તાવેજનો મૂળ પ્લાન છે. અંતિમ પ્લાન મુખ્ય પેજ પર છે."),
      T("It includes Chamera Lake, Kangra Fort and a night in Kangra.", "તેમાં ચમેરા લેક, કાંગડા ફોર્ટ અને કાંગડામાં એક રાત છે."),
      T("Only one night in Lahaul — no full day at Jispa.", "લાહૌલમાં ફક્ત એક રાત — જિસ્પામાં આખો દિવસ નથી."),
    ],
  };

  const pace = {
    1: ["relaxed", T("Train day — rest on board", "ટ્રેનનો દિવસ — આરામ")],
    2: ["moderate", T("Arrive after the night train; Wagah and Golden Temple", "રાતની ટ્રેન પછી આગમન; વાઘા અને ગોલ્ડન ટેમ્પલ")],
    3: ["tough", T("5:30 AM start, ~5.5 h drive, then the Dainkund trek", "સવારે 5:30 શરૂઆત, ~5.5 કલાક ડ્રાઇવ, પછી દૈનકુંડ ટ્રેક")],
    4: ["busy", T("Chamera Lake, then ~5 h on the road", "ચમેરા લેક, પછી ~5 કલાક રસ્તા પર")],
    5: ["moderate", T("Walking day, no long drive", "ચાલવાનો દિવસ, લાંબી ડ્રાઇવ નહીં")],
    6: ["busy", T("Many stops from Dharamshala to Kangra", "ધર્મશાળાથી કાંગડા સુધી ઘણા સ્ટોપ")],
    7: ["tough", T("Kangra → Baijnath → Bir → Kullu, ~8 h on the road", "કાંગડા → વૈજનાથ → બીર → કુલ્લુ, ~8 કલાક રસ્તા પર")],
    8: ["moderate", T("Tunnel, Sissu and Keylong", "ટનલ, સિસ્સુ અને કેલોંગ")],
    9: ["busy", T("~6.5 h drive down to Mandi", "મંડી સુધી ~6.5 કલાક ડ્રાઇવ")],
    10: ["moderate", T("~5 h drive before the evening train", "સાંજની ટ્રેન પહેલાં ~5 કલાક ડ્રાઇવ")],
  };
  window.TRIP.days.forEach((d) => {
    if (pace[d.n]) [d.pace, d.paceWhy] = pace[d.n];
  });
})();
