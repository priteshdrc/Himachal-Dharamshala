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
})();
