// @ts-nocheck
// Ported 1:1 from the Design canvas board. Page state works like the canvas; shared keys live in the Haiba store.
import { useEffect } from "react";
import { useDC } from "../dc";

export function useVals() {
  const { state, setState, props, nav } = useDC({ view: '', seenExit: false, step: 0, gift: -1 });
  useEffect(() => {
  }, []);

    
    var WORTH = { gifts: 30, spotify: 3, chatgpt: 9, travel: 5, points: 1 };
    var worthN = WORTH.gifts + WORTH.spotify + WORTH.chatgpt + WORTH.travel + WORTH.points;
    var p = Number(props.price ?? '20');
    var name = props.name ?? 'Yusuf';
    var bhd = function (x) { return 'BHD ' + x.toFixed(2); };
    var view = state.view || (props.state === 'Exit sheet' ? 'exit' : props.state === 'Reserved' ? 'reserved' : 'page');
    // Value builds up month by month: when does the year pay for itself? (from promo D)
    var monthVal = function (m) { return 2.5 + (m <= 3 ? 1 + 3 : 0) + (m === 1 ? WORTH.travel + 0.5 : 0.08); };
    var cum = 0, payback = 12;
    for (var m = 1; m <= 12; m++) { cum += monthVal(m); if (cum >= p) { payback = m; break; } }
    var dayOne = WORTH.spotify + WORTH.chatgpt + WORTH.travel + 2.5 + 0.5;
    var shopName = props.shop ?? 'The Coffee Bean';
    var SHOPGIFT = { 'The Coffee Bean': 'a free drink', 'Wingman': 'a free student box', 'VOX Cinemas': 'a free cinema ticket' };
    var common = {
      name: name,
      price: 'BHD ' + p, priceYear: 'BHD ' + p + ' a year', rest: 'BHD ' + (p - 1),
      perMonth: bhd(p / 12), worth: 'BHD ' + worthN + '+', free: 'BHD ' + (worthN - p) + '+ extra',
      paybackPct: Math.round(p / worthN * 100) + '%',
      // Spotify, ChatGPT, travel data, the first gift and welcome points all land on day one
      dayOneSticker: dayOne >= p ? 'Pays for itself on day one' : 'BHD ' + dayOne + ' of it on day one',
      dayOneLine: dayOne >= p ? 'It pays for itself on day one. Then a new free gift every month.' : 'BHD ' + dayOne + ' of it lands on day one. Then a new free gift every month.',
      dayOneHead: dayOne >= p ? 'It pays for itself on day one.' : 'You get BHD ' + dayOne + ' of it on day one.',
      dayOneChip: dayOne >= p ? 'Pays for itself on day one' : 'BHD ' + dayOne + ' back on day one',
      dayOneRest: 'Spotify, ChatGPT, data and your first gift come first. Then a new gift every month.',
      // Exit sheet: what they missed last month at their own shop (from promo F)
      missTitle: SHOPGIFT[shopName] ? 'Last month you went to ' + shopName : 'Every month without Haiba',
      missBody: SHOPGIFT[shopName] ? 'With Haiba, you would get ' + SHOPGIFT[shopName] + ' and 80 points there.' : 'Without Haiba, you miss a free gift and points every month.',
      exitOpen: view === 'exit', reservedOpen: view === 'reserved',
      openExit: function () { setState({ view: state.seenExit ? 'page' : 'exit', seenExit: true }); },
      closeExit: function () { setState({ view: 'page' }); },
      reserve: function () { setState({ view: 'reserved' }); },
      closeReserved: function () { setState({ view: 'page' }); }
    };
    return common;
}
