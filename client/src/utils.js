import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import formatDistanceStrict from "date-fns/formatDistanceStrict";

export const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const maObjs = [
  {
    id: "h98ZbeAb8QO2wZ-dPMO6iw",
    alias: "ekf-martial-arts-chicago-2",
    name: "EKF Martial Arts",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/0ndV4m2JDqw6e33KNzNgCA/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/ekf-martial-arts-chicago-2?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 27,
    categories: [
      {
        alias: "martialarts",
        title: "Martial Arts",
      },
      {
        alias: "boxing",
        title: "Boxing",
      },
      {
        alias: "taichi",
        title: "Tai Chi",
      },
    ],
    rating: 5,
    coordinates: {
      latitude: 41.9901150128242,
      longitude: -87.6696621693116,
    },
    transactions: [],
    location: {
      address1: "5951 N Clark St",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60660",
      country: "US",
      state: "IL",
      display_address: ["5951 N Clark St", "Chicago, IL 60660"],
    },
    phone: "+17737196488",
    display_phone: "(773) 719-6488",
    distance: 3689.2084660293776,
  },
  {
    id: "QddR_H3xqZJdvB_BG89OnA",
    alias: "degerberg-academy-of-martial-arts-chicago",
    name: "Degerberg Academy of Martial Arts",
    image_url:
      "https://s3-media4.fl.yelpcdn.com/bphoto/whqTXU4FE_awexsD4p55sQ/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/degerberg-academy-of-martial-arts-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 62,
    categories: [
      {
        alias: "martialarts",
        title: "Martial Arts",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 41.9673652648926,
      longitude: -87.6873321533203,
    },
    transactions: [],
    location: {
      address1: "4717 N Lincoln Ave",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60625",
      country: "US",
      state: "IL",
      display_address: ["4717 N Lincoln Ave", "Chicago, IL 60625"],
    },
    phone: "+17737285300",
    display_phone: "(773) 728-5300",
    distance: 4634.187809691016,
  },
  {
    id: "aGCUksjACc8-AYhpz_F7QA",
    alias: "ultimate-martial-arts-lincolnwood",
    name: "Ultimate Martial Arts",
    image_url:
      "https://s3-media2.fl.yelpcdn.com/bphoto/oR9SeKioxjdvPd5iO1Yj4A/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/ultimate-martial-arts-lincolnwood?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 54,
    categories: [
      {
        alias: "martialarts",
        title: "Martial Arts",
      },
    ],
    rating: 4,
    coordinates: {
      latitude: 42.0118849,
      longitude: -87.7271591,
    },
    transactions: [],
    location: {
      address1: "3922 W Touhy Ave",
      address2: "",
      address3: "",
      city: "Lincolnwood",
      zip_code: "60712",
      country: "US",
      state: "IL",
      display_address: ["3922 W Touhy Ave", "Lincolnwood, IL 60712"],
    },
    phone: "+18476793330",
    display_phone: "(847) 679-3330",
    distance: 1656.674952110059,
  },
  {
    id: "8JPoLXa-9BKrim-7D-1jaQ",
    alias: "redzovic-jiu-jitsu-lincoln-square-chicago",
    name: "Redzovic Jiu Jitsu - Lincoln Square",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/zeC3G3U3mQiX0cy1Dfs_pQ/o.jpg",
    is_closed: false,
    url: "https://www.yelp.com/biz/redzovic-jiu-jitsu-lincoln-square-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    review_count: 28,
    categories: [
      {
        alias: "martialarts",
        title: "Martial Arts",
      },
    ],
    rating: 4.5,
    coordinates: {
      latitude: 41.9709525257349,
      longitude: -87.6901070773602,
    },
    transactions: [],
    location: {
      address1: "4900 N Lincoln Ave",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60625",
      country: "US",
      state: "IL",
      display_address: ["4900 N Lincoln Ave", "Chicago, IL 60625"],
    },
    phone: "+17733345189",
    display_phone: "(773) 334-5189",
    distance: 4161.617650585135,
  },
];

export const restaurantObjects = [
  {
    id: "9mhqcimD0CYvqxzfj_VXnQ",
    alias: "little-bad-wolf-chicago",
    name: "Little Bad Wolf",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/Cf_ZeAt323eQv83zdhxASA/o.jpg",
    is_claimed: true,
    is_closed: false,
    url: "https://www.yelp.com/biz/little-bad-wolf-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    phone: "+17739426399",
    display_phone: "(773) 942-6399",
    review_count: 1748,
    categories: [
      {
        alias: "tradamerican",
        title: "American (Traditional)",
      },
      {
        alias: "beerbar",
        title: "Beer Bar",
      },
      {
        alias: "cocktailbars",
        title: "Cocktail Bars",
      },
    ],
    rating: 4.5,
    location: {
      address1: "1541 W Bryn Mawr Ave",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60660",
      country: "US",
      state: "IL",
      display_address: ["1541 W Bryn Mawr Ave", "Chicago, IL 60660"],
      cross_streets: "Ashland Ave & Clark St",
    },
    coordinates: {
      latitude: 41.983356,
      longitude: -87.669057,
    },
    photos: [
      "https://s3-media3.fl.yelpcdn.com/bphoto/Cf_ZeAt323eQv83zdhxASA/o.jpg",
      "https://s3-media2.fl.yelpcdn.com/bphoto/toArQxfxcRhOTenGCVMtAQ/o.jpg",
      "https://s3-media1.fl.yelpcdn.com/bphoto/Wsqimf33E95n3Jkr9pR_6g/o.jpg",
    ],
    price: "$$",
    hours: [
      {
        open: [
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 0,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 1,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 2,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 3,
          },
          {
            is_overnight: true,
            start: "1100",
            end: "0100",
            day: 4,
          },
          {
            is_overnight: true,
            start: "1100",
            end: "0100",
            day: 5,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "0000",
            day: 6,
          },
        ],
        hours_type: "REGULAR",
        is_open_now: false,
      },
    ],
    transactions: ["delivery", "pickup"],
  },
  {
    id: "e9aAISx0navH8qMr33X4TA",
    alias: "mother-cluckers-kitchen-chicago-chicago",
    name: "Mother Cluckers Kitchen - Chicago",
    image_url:
      "https://s3-media3.fl.yelpcdn.com/bphoto/YOgwO43W8xy9wYEutkwudw/o.jpg",
    is_claimed: true,
    is_closed: false,
    url: "https://www.yelp.com/biz/mother-cluckers-kitchen-chicago-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    phone: "+17736854630",
    display_phone: "(773) 685-4630",
    review_count: 886,
    categories: [
      {
        alias: "southern",
        title: "Southern",
      },
      {
        alias: "tradamerican",
        title: "American (Traditional)",
      },
    ],
    rating: 4.5,
    location: {
      address1: "5200 N Elston Ave",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60630",
      country: "US",
      state: "IL",
      display_address: ["5200 N Elston Ave", "Chicago, IL 60630"],
      cross_streets: "Laporte Ave & Foster Ave",
    },
    coordinates: {
      latitude: 41.9752685744915,
      longitude: -87.7522482539673,
    },
    photos: [
      "https://s3-media3.fl.yelpcdn.com/bphoto/YOgwO43W8xy9wYEutkwudw/o.jpg",
      "https://s3-media3.fl.yelpcdn.com/bphoto/m6sJUAlj18RH1xpunrrTTA/o.jpg",
      "https://s3-media1.fl.yelpcdn.com/bphoto/_rr95Pu5Ji6BxaUC1C391A/o.jpg",
    ],
    price: "$$",
    hours: [
      {
        open: [
          {
            is_overnight: false,
            start: "1100",
            end: "2000",
            day: 0,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2000",
            day: 2,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2000",
            day: 3,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 4,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 5,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2000",
            day: 6,
          },
        ],
        hours_type: "REGULAR",
        is_open_now: false,
      },
    ],
    transactions: ["delivery", "pickup"],
  },
  {
    id: "xA_jOrFrywsyht2-_8wU2w",
    alias: "land-and-lake-andersonville-chicago",
    name: "Land & Lake Andersonville",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/vEx4eUxDt2t3nvXOsc2n-w/o.jpg",
    is_claimed: true,
    is_closed: false,
    url: "https://www.yelp.com/biz/land-and-lake-andersonville-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    phone: "+17737399072",
    display_phone: "(773) 739-9072",
    review_count: 34,
    categories: [
      {
        alias: "tradamerican",
        title: "American (Traditional)",
      },
    ],
    rating: 4.5,
    location: {
      address1: "5420 N Clark St",
      address2: null,
      address3: "",
      city: "Chicago",
      zip_code: "60640",
      country: "US",
      state: "IL",
      display_address: ["5420 N Clark St", "Chicago, IL 60640"],
      cross_streets: "Rascher Ave & Balmoral Ave",
    },
    coordinates: {
      latitude: 41.980472,
      longitude: -87.66852,
    },
    photos: [
      "https://s3-media1.fl.yelpcdn.com/bphoto/vEx4eUxDt2t3nvXOsc2n-w/o.jpg",
      "https://s3-media2.fl.yelpcdn.com/bphoto/w9-cvQK5SjdlJ9JJMC-JPQ/o.jpg",
      "https://s3-media4.fl.yelpcdn.com/bphoto/kBVrY39BL_6A1uCbFPhNAA/o.jpg",
    ],
    price: "$$",
    hours: [
      {
        open: [
          {
            is_overnight: false,
            start: "1600",
            end: "2100",
            day: 1,
          },
          {
            is_overnight: false,
            start: "1600",
            end: "2100",
            day: 2,
          },
          {
            is_overnight: false,
            start: "1600",
            end: "2100",
            day: 3,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2200",
            day: 4,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2200",
            day: 5,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 6,
          },
        ],
        hours_type: "REGULAR",
        is_open_now: false,
      },
    ],
    transactions: ["delivery"],
  },
  {
    id: "ysMipfzNQQFweoLSpGJTaA",
    alias: "pho-le-777-chicago",
    name: "Pho Le 777",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/eYsb9LOD-4KhwDQB56rWsg/o.jpg",
    is_claimed: false,
    is_closed: false,
    url: "https://www.yelp.com/biz/pho-le-777-chicago?adjust_creative=CbTAfRmoCY_s6Ex6jqjcQg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=CbTAfRmoCY_s6Ex6jqjcQg",
    phone: "",
    display_phone: "",
    review_count: 1,
    categories: [
      {
        alias: "vietnamese",
        title: "Vietnamese",
      },
    ],
    rating: 5,
    location: {
      address1: "6257 N McCormick Blvd",
      address2: "",
      address3: null,
      city: "Chicago",
      zip_code: "60659",
      country: "US",
      state: "IL",
      display_address: ["6257 N McCormick Blvd", "Chicago, IL 60659"],
      cross_streets: "",
    },
    coordinates: {
      latitude: 41.99546514676066,
      longitude: -87.71261516958475,
    },
    photos: [
      "https://s3-media1.fl.yelpcdn.com/bphoto/eYsb9LOD-4KhwDQB56rWsg/o.jpg",
      "https://s3-media4.fl.yelpcdn.com/bphoto/Uj3jSbtR_CVc9R53tYkdyA/o.jpg",
      "https://s3-media2.fl.yelpcdn.com/bphoto/GPAjRL5_Pqrzt4ouL9oGkw/o.jpg",
    ],
    transactions: ["delivery", "pickup"],
  },
];

const now = new Date();

export const events = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2015, 3, 7),
    end: new Date(2015, 3, 10),
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2015, 3, 9, 0, 0, 0),
    end: new Date(2015, 3, 10, 0, 0, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2015, 3, 11),
    end: new Date(2015, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2015, 3, 12, 10, 30, 0, 0),
    end: new Date(2015, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2015, 3, 12, 12, 0, 0, 0),
    end: new Date(2015, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2015, 3, 12, 14, 0, 0, 0),
    end: new Date(2015, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2022, 3, 12, 17, 0, 0, 0),
    end: new Date(2022, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2015, 3, 12, 20, 0, 0, 0),
    end: new Date(2015, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: "Planning Meeting with Paige",
    start: new Date(2015, 3, 13, 8, 0, 0),
    end: new Date(2015, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: "Inconvenient multi-day Conference Call",
    start: new Date(2015, 3, 13, 9, 30, 0),
    end: new Date(2015, 3, 14, 1, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2015, 3, 13, 11, 30, 0),
    end: new Date(2015, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: "Quote Follow-up - Tea by Tina",
    start: new Date(2015, 3, 13, 15, 30, 0),
    end: new Date(2015, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: "Late Same Night Event",
    start: new Date(2015, 3, 17, 19, 30, 0),
    end: new Date(2015, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2015, 3, 20, 19, 30, 0),
    end: new Date(2015, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2015, 3, 14, 15, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: "Dutch Song Producing",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: "Itaewon Halloween Meeting",
    start: new Date(2015, 3, 14, 16, 30, 0),
    end: new Date(2015, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: "Online Coding Test",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: "An overlapped Event",
    start: new Date(2015, 3, 14, 17, 0, 0),
    end: new Date(2015, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: "Phone Interview yeah here",
    start: new Date(2022, 3, 14, 17, 0, 0),
    end: new Date(2022, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: "Cooking Class",
    start: new Date(2015, 3, 14, 17, 30, 0),
    end: new Date(2015, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: "Go to the gym",
    start: new Date(2015, 3, 14, 18, 30, 0),
    end: new Date(2015, 3, 14, 20, 0, 0),
  },
];

export function getNextDayOfTheWeek(dayName, refDate = new Date()) {
  const dayOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"].indexOf(
    dayName.slice(0, 3).toLowerCase()
  );
  if (dayOfWeek < 0) return;
  refDate.setHours(0, 0, 0, 0);
  refDate.setDate(refDate.getDate() + ((dayOfWeek + 7 - refDate.getDay()) % 7));
  return refDate;
}

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

export const gapiConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  clientId: process.env.REACT_APP_CLIENT_ID,
  discoveryDocs: [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ],
  scope: "https://www.googleapis.com/auth/calendar.events",
};

export const gcalConfig = {
  calendarId: "primary",
  timeMin: new Date().toISOString(),
  showDeleted: false,
  singleEvents: true,
  maxResults: 10,
  orderBy: "startTime",
};

export function utilAlert(expr, obj) {
  let type;
  switch (expr) {
    case "gcal":
      type =
        " -is an event from your google calendar, and will be added to your profile calendar automatically";
      break;
    case "logInCal":
      type =
        "you dont have permision to edit this buisness's calendar, log in to your profile calendar to make changes to your personal calendar";
      break;
    case "logInGoogle":
      type =
        "log in to google calendar to make changes to your official personal calendar";
      break;
    case "gcalProfile":
      type =
        " -is an imported event from your google calendar, go to your google calendar to edit your personal events. Please try again and select a highlighted event to edit";
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }
  window.alert(`${obj?.title} ${type}`);
}

// export function convertToTimeInput(date) {
//   const dateFormatted = format(date, "EEEE',' MMMM d',' ha");
//   return dateFormatted;
// }

export function convertToTimeInput(date) {
  const dateFormatted = format(date, "kk:mm");
  return dateFormatted;
}

export function formatLocal(start) {
  if (!start) return;
  return start.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}

export function formatTooltipTime(e) {
  const duration = formatDistanceStrict(e.start, e.end);
  return `(${duration})`;
}

export const gapiResponse = {
  result: {
    kind: "calendar#events",
    etag: '"p334d95femervc0g"',
    summary: "flex4lease@gmail.com",
    updated: "2022-03-08T20:58:22.013Z",
    timeZone: "America/Chicago",
    accessRole: "owner",
    defaultReminders: [
      {
        method: "popup",
        minutes: 30,
      },
    ],
    items: [
      {
        kind: "calendar#event",
        etag: '"3293546140366000"',
        id: "3i3b0qqov3bilepslbbck0tqqn",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=M2kzYjBxcW92M2JpbGVwc2xiYmNrMHRxcW4gZmxleDRsZWFzZUBt",
        created: "2022-03-08T20:57:50.000Z",
        updated: "2022-03-08T20:57:50.183Z",
        summary: "speak w yak",
        creator: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        organizer: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2022-03-11T15:00:00-06:00",
          timeZone: "America/Chicago",
        },
        end: {
          dateTime: "2022-03-11T16:00:00-06:00",
          timeZone: "America/Chicago",
        },
        iCalUID: "3i3b0qqov3bilepslbbck0tqqn@google.com",
        sequence: 0,
        reminders: {
          useDefault: true,
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3293546203751000"',
        id: "5vdcegi16n1smmrvvb5e6i86be",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=NXZkY2VnaTE2bjFzbW1ydnZiNWU2aTg2YmUgZmxleDRsZWFzZUBt",
        created: "2022-03-08T20:58:06.000Z",
        updated: "2022-03-08T20:58:22.013Z",
        summary: "possible travel",
        creator: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        organizer: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2022-03-13T10:00:00-05:00",
          timeZone: "America/Chicago",
        },
        end: {
          dateTime: "2022-03-13T10:30:00-05:00",
          timeZone: "America/Chicago",
        },
        transparency: "transparent",
        iCalUID: "5vdcegi16n1smmrvvb5e6i86be@google.com",
        sequence: 1,
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 30,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3292922226490000"',
        id: "3s8pmu5smg5km38thv8otpb5gs_20220528T160000Z",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=M3M4cG11NXNtZzVrbTM4dGh2OG90cGI1Z3NfMjAyMjA1MjhUMTYwMDAwWiBmbGV4NGxlYXNlQG0",
        created: "2022-03-05T06:18:33.000Z",
        updated: "2022-03-05T06:18:33.378Z",
        summary: "martial arts Event!",
        description: "travel and train musashi",
        location: "800 Howard St., San Francisco, CA 94103",
        creator: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        organizer: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2022-05-28T11:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: "2022-05-28T19:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        recurringEventId: "3s8pmu5smg5km38thv8otpb5gs",
        originalStartTime: {
          dateTime: "2022-05-28T11:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        iCalUID: "3s8pmu5smg5km38thv8otpb5gs@google.com",
        sequence: 0,
        attendees: [
          {
            email: "lpage@example.com",
            responseStatus: "needsAction",
          },
          {
            email: "sbrin@example.com",
            responseStatus: "needsAction",
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 10,
            },
            {
              method: "email",
              minutes: 1440,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3292922226490000"',
        id: "3s8pmu5smg5km38thv8otpb5gs_20220529T160000Z",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=M3M4cG11NXNtZzVrbTM4dGh2OG90cGI1Z3NfMjAyMjA1MjlUMTYwMDAwWiBmbGV4NGxlYXNlQG0",
        created: "2022-03-05T06:18:33.000Z",
        updated: "2022-03-05T06:18:33.378Z",
        summary: "martial arts Event!",
        description: "travel and train musashi",
        location: "800 Howard St., San Francisco, CA 94103",
        creator: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        organizer: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2022-05-29T11:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: "2022-05-29T19:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        recurringEventId: "3s8pmu5smg5km38thv8otpb5gs",
        originalStartTime: {
          dateTime: "2022-05-29T11:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        iCalUID: "3s8pmu5smg5km38thv8otpb5gs@google.com",
        sequence: 0,
        attendees: [
          {
            email: "lpage@example.com",
            responseStatus: "needsAction",
          },
          {
            email: "sbrin@example.com",
            responseStatus: "needsAction",
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 10,
            },
            {
              method: "email",
              minutes: 1440,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3292873092503000"',
        id: "es54ha640fv74i2biti2aji5mc_20220628T160000Z",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=ZXM1NGhhNjQwZnY3NGkyYml0aTJhamk1bWNfMjAyMjA2MjhUMTYwMDAwWiBmbGV4NGxlYXNlQG0",
        created: "2022-03-04T23:29:06.000Z",
        updated: "2022-03-04T23:29:06.365Z",
        summary: "Awesome Event!",
        description: "Really great refreshments",
        location: "800 Howard St., San Francisco, CA 94103",
        creator: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        organizer: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2022-06-28T11:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: "2022-06-28T19:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        recurringEventId: "es54ha640fv74i2biti2aji5mc",
        originalStartTime: {
          dateTime: "2022-06-28T11:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        iCalUID: "es54ha640fv74i2biti2aji5mc@google.com",
        sequence: 0,
        attendees: [
          {
            email: "lpage@example.com",
            responseStatus: "needsAction",
          },
          {
            email: "sbrin@example.com",
            responseStatus: "needsAction",
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 10,
            },
            {
              method: "email",
              minutes: 1440,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3292873092503000"',
        id: "es54ha640fv74i2biti2aji5mc_20220629T160000Z",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=ZXM1NGhhNjQwZnY3NGkyYml0aTJhamk1bWNfMjAyMjA2MjlUMTYwMDAwWiBmbGV4NGxlYXNlQG0",
        created: "2022-03-04T23:29:06.000Z",
        updated: "2022-03-04T23:29:06.365Z",
        summary: "Awesome Event!",
        description: "Really great refreshments",
        location: "800 Howard St., San Francisco, CA 94103",
        creator: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        organizer: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2022-06-29T11:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        end: {
          dateTime: "2022-06-29T19:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        recurringEventId: "es54ha640fv74i2biti2aji5mc",
        originalStartTime: {
          dateTime: "2022-06-29T11:00:00-05:00",
          timeZone: "America/Los_Angeles",
        },
        iCalUID: "es54ha640fv74i2biti2aji5mc@google.com",
        sequence: 0,
        attendees: [
          {
            email: "lpage@example.com",
            responseStatus: "needsAction",
          },
          {
            email: "sbrin@example.com",
            responseStatus: "needsAction",
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 10,
            },
            {
              method: "email",
              minutes: 1440,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3293003731182000"',
        id: "jo96abvquohe2qv5u8g7apetss_20220928T160000Z",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=am85NmFidnF1b2hlMnF2NXU4ZzdhcGV0c3NfMjAyMjA5MjhUMTYwMDAwWiBmbGV4NGxlYXNlQG0",
        created: "2022-03-05T17:37:45.000Z",
        updated: "2022-03-05T17:37:45.723Z",
        summary: "Give Martial Arts seminar!",
        description: "travel and train the students",
        location: "3922 W Touhy Ave, Lincolnwood, IL 60712",
        creator: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        organizer: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2022-09-28T11:00:00-05:00",
          timeZone: "America/Chicago",
        },
        end: {
          dateTime: "2022-10-28T19:00:00-05:00",
          timeZone: "America/Chicago",
        },
        recurringEventId: "jo96abvquohe2qv5u8g7apetss",
        originalStartTime: {
          dateTime: "2022-09-28T11:00:00-05:00",
          timeZone: "America/Chicago",
        },
        iCalUID: "jo96abvquohe2qv5u8g7apetss@google.com",
        sequence: 0,
        attendees: [
          {
            email: "lpage@example.com",
            responseStatus: "needsAction",
          },
          {
            email: "sbrin@example.com",
            responseStatus: "needsAction",
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 10,
            },
            {
              method: "email",
              minutes: 1440,
            },
          ],
        },
        eventType: "default",
      },
      {
        kind: "calendar#event",
        etag: '"3293003731182000"',
        id: "jo96abvquohe2qv5u8g7apetss_20220929T160000Z",
        status: "confirmed",
        htmlLink:
          "https://www.google.com/calendar/event?eid=am85NmFidnF1b2hlMnF2NXU4ZzdhcGV0c3NfMjAyMjA5MjlUMTYwMDAwWiBmbGV4NGxlYXNlQG0",
        created: "2022-03-05T17:37:45.000Z",
        updated: "2022-03-05T17:37:45.723Z",
        summary: "Give Martial Arts seminar!",
        description: "travel and train the students",
        location: "3922 W Touhy Ave, Lincolnwood, IL 60712",
        creator: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        organizer: {
          email: "flex4lease@gmail.com",
          self: true,
        },
        start: {
          dateTime: "2022-09-29T11:00:00-05:00",
          timeZone: "America/Chicago",
        },
        end: {
          dateTime: "2022-10-29T19:00:00-05:00",
          timeZone: "America/Chicago",
        },
        recurringEventId: "jo96abvquohe2qv5u8g7apetss",
        originalStartTime: {
          dateTime: "2022-09-29T11:00:00-05:00",
          timeZone: "America/Chicago",
        },
        iCalUID: "jo96abvquohe2qv5u8g7apetss@google.com",
        sequence: 0,
        attendees: [
          {
            email: "lpage@example.com",
            responseStatus: "needsAction",
          },
          {
            email: "sbrin@example.com",
            responseStatus: "needsAction",
          },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            {
              method: "popup",
              minutes: 10,
            },
            {
              method: "email",
              minutes: 1440,
            },
          ],
        },
        eventType: "default",
      },
    ],
  },
  body: '{\n "kind": "calendar#events",\n "etag": "\\"p334d95femervc0g\\"",\n "summary": "flex4lease@gmail.com",\n "updated": "2022-03-08T20:58:22.013Z",\n "timeZone": "America/Chicago",\n "accessRole": "owner",\n "defaultReminders": [\n  {\n   "method": "popup",\n   "minutes": 30\n  }\n ],\n "items": [\n  {\n   "kind": "calendar#event",\n   "etag": "\\"3293546140366000\\"",\n   "id": "3i3b0qqov3bilepslbbck0tqqn",\n   "status": "confirmed",\n   "htmlLink": "https://www.google.com/calendar/event?eid=M2kzYjBxcW92M2JpbGVwc2xiYmNrMHRxcW4gZmxleDRsZWFzZUBt",\n   "created": "2022-03-08T20:57:50.000Z",\n   "updated": "2022-03-08T20:57:50.183Z",\n   "summary": "speak w yak",\n   "creator": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "organizer": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "start": {\n    "dateTime": "2022-03-11T15:00:00-06:00",\n    "timeZone": "America/Chicago"\n   },\n   "end": {\n    "dateTime": "2022-03-11T16:00:00-06:00",\n    "timeZone": "America/Chicago"\n   },\n   "iCalUID": "3i3b0qqov3bilepslbbck0tqqn@google.com",\n   "sequence": 0,\n   "reminders": {\n    "useDefault": true\n   },\n   "eventType": "default"\n  },\n  {\n   "kind": "calendar#event",\n   "etag": "\\"3293546203751000\\"",\n   "id": "5vdcegi16n1smmrvvb5e6i86be",\n   "status": "confirmed",\n   "htmlLink": "https://www.google.com/calendar/event?eid=NXZkY2VnaTE2bjFzbW1ydnZiNWU2aTg2YmUgZmxleDRsZWFzZUBt",\n   "created": "2022-03-08T20:58:06.000Z",\n   "updated": "2022-03-08T20:58:22.013Z",\n   "summary": "possible travel",\n   "creator": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "organizer": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "start": {\n    "dateTime": "2022-03-13T10:00:00-05:00",\n    "timeZone": "America/Chicago"\n   },\n   "end": {\n    "dateTime": "2022-03-13T10:30:00-05:00",\n    "timeZone": "America/Chicago"\n   },\n   "transparency": "transparent",\n   "iCalUID": "5vdcegi16n1smmrvvb5e6i86be@google.com",\n   "sequence": 1,\n   "reminders": {\n    "useDefault": false,\n    "overrides": [\n     {\n      "method": "popup",\n      "minutes": 30\n     }\n    ]\n   },\n   "eventType": "default"\n  },\n  {\n   "kind": "calendar#event",\n   "etag": "\\"3292922226490000\\"",\n   "id": "3s8pmu5smg5km38thv8otpb5gs_20220528T160000Z",\n   "status": "confirmed",\n   "htmlLink": "https://www.google.com/calendar/event?eid=M3M4cG11NXNtZzVrbTM4dGh2OG90cGI1Z3NfMjAyMjA1MjhUMTYwMDAwWiBmbGV4NGxlYXNlQG0",\n   "created": "2022-03-05T06:18:33.000Z",\n   "updated": "2022-03-05T06:18:33.378Z",\n   "summary": "martial arts Event!",\n   "description": "travel and train musashi",\n   "location": "800 Howard St., San Francisco, CA 94103",\n   "creator": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "organizer": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "start": {\n    "dateTime": "2022-05-28T11:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "end": {\n    "dateTime": "2022-05-28T19:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "recurringEventId": "3s8pmu5smg5km38thv8otpb5gs",\n   "originalStartTime": {\n    "dateTime": "2022-05-28T11:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "iCalUID": "3s8pmu5smg5km38thv8otpb5gs@google.com",\n   "sequence": 0,\n   "attendees": [\n    {\n     "email": "lpage@example.com",\n     "responseStatus": "needsAction"\n    },\n    {\n     "email": "sbrin@example.com",\n     "responseStatus": "needsAction"\n    }\n   ],\n   "reminders": {\n    "useDefault": false,\n    "overrides": [\n     {\n      "method": "popup",\n      "minutes": 10\n     },\n     {\n      "method": "email",\n      "minutes": 1440\n     }\n    ]\n   },\n   "eventType": "default"\n  },\n  {\n   "kind": "calendar#event",\n   "etag": "\\"3292922226490000\\"",\n   "id": "3s8pmu5smg5km38thv8otpb5gs_20220529T160000Z",\n   "status": "confirmed",\n   "htmlLink": "https://www.google.com/calendar/event?eid=M3M4cG11NXNtZzVrbTM4dGh2OG90cGI1Z3NfMjAyMjA1MjlUMTYwMDAwWiBmbGV4NGxlYXNlQG0",\n   "created": "2022-03-05T06:18:33.000Z",\n   "updated": "2022-03-05T06:18:33.378Z",\n   "summary": "martial arts Event!",\n   "description": "travel and train musashi",\n   "location": "800 Howard St., San Francisco, CA 94103",\n   "creator": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "organizer": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "start": {\n    "dateTime": "2022-05-29T11:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "end": {\n    "dateTime": "2022-05-29T19:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "recurringEventId": "3s8pmu5smg5km38thv8otpb5gs",\n   "originalStartTime": {\n    "dateTime": "2022-05-29T11:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "iCalUID": "3s8pmu5smg5km38thv8otpb5gs@google.com",\n   "sequence": 0,\n   "attendees": [\n    {\n     "email": "lpage@example.com",\n     "responseStatus": "needsAction"\n    },\n    {\n     "email": "sbrin@example.com",\n     "responseStatus": "needsAction"\n    }\n   ],\n   "reminders": {\n    "useDefault": false,\n    "overrides": [\n     {\n      "method": "popup",\n      "minutes": 10\n     },\n     {\n      "method": "email",\n      "minutes": 1440\n     }\n    ]\n   },\n   "eventType": "default"\n  },\n  {\n   "kind": "calendar#event",\n   "etag": "\\"3292873092503000\\"",\n   "id": "es54ha640fv74i2biti2aji5mc_20220628T160000Z",\n   "status": "confirmed",\n   "htmlLink": "https://www.google.com/calendar/event?eid=ZXM1NGhhNjQwZnY3NGkyYml0aTJhamk1bWNfMjAyMjA2MjhUMTYwMDAwWiBmbGV4NGxlYXNlQG0",\n   "created": "2022-03-04T23:29:06.000Z",\n   "updated": "2022-03-04T23:29:06.365Z",\n   "summary": "Awesome Event!",\n   "description": "Really great refreshments",\n   "location": "800 Howard St., San Francisco, CA 94103",\n   "creator": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "organizer": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "start": {\n    "dateTime": "2022-06-28T11:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "end": {\n    "dateTime": "2022-06-28T19:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "recurringEventId": "es54ha640fv74i2biti2aji5mc",\n   "originalStartTime": {\n    "dateTime": "2022-06-28T11:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "iCalUID": "es54ha640fv74i2biti2aji5mc@google.com",\n   "sequence": 0,\n   "attendees": [\n    {\n     "email": "lpage@example.com",\n     "responseStatus": "needsAction"\n    },\n    {\n     "email": "sbrin@example.com",\n     "responseStatus": "needsAction"\n    }\n   ],\n   "reminders": {\n    "useDefault": false,\n    "overrides": [\n     {\n      "method": "popup",\n      "minutes": 10\n     },\n     {\n      "method": "email",\n      "minutes": 1440\n     }\n    ]\n   },\n   "eventType": "default"\n  },\n  {\n   "kind": "calendar#event",\n   "etag": "\\"3292873092503000\\"",\n   "id": "es54ha640fv74i2biti2aji5mc_20220629T160000Z",\n   "status": "confirmed",\n   "htmlLink": "https://www.google.com/calendar/event?eid=ZXM1NGhhNjQwZnY3NGkyYml0aTJhamk1bWNfMjAyMjA2MjlUMTYwMDAwWiBmbGV4NGxlYXNlQG0",\n   "created": "2022-03-04T23:29:06.000Z",\n   "updated": "2022-03-04T23:29:06.365Z",\n   "summary": "Awesome Event!",\n   "description": "Really great refreshments",\n   "location": "800 Howard St., San Francisco, CA 94103",\n   "creator": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "organizer": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "start": {\n    "dateTime": "2022-06-29T11:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "end": {\n    "dateTime": "2022-06-29T19:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "recurringEventId": "es54ha640fv74i2biti2aji5mc",\n   "originalStartTime": {\n    "dateTime": "2022-06-29T11:00:00-05:00",\n    "timeZone": "America/Los_Angeles"\n   },\n   "iCalUID": "es54ha640fv74i2biti2aji5mc@google.com",\n   "sequence": 0,\n   "attendees": [\n    {\n     "email": "lpage@example.com",\n     "responseStatus": "needsAction"\n    },\n    {\n     "email": "sbrin@example.com",\n     "responseStatus": "needsAction"\n    }\n   ],\n   "reminders": {\n    "useDefault": false,\n    "overrides": [\n     {\n      "method": "popup",\n      "minutes": 10\n     },\n     {\n      "method": "email",\n      "minutes": 1440\n     }\n    ]\n   },\n   "eventType": "default"\n  },\n  {\n   "kind": "calendar#event",\n   "etag": "\\"3293003731182000\\"",\n   "id": "jo96abvquohe2qv5u8g7apetss_20220928T160000Z",\n   "status": "confirmed",\n   "htmlLink": "https://www.google.com/calendar/event?eid=am85NmFidnF1b2hlMnF2NXU4ZzdhcGV0c3NfMjAyMjA5MjhUMTYwMDAwWiBmbGV4NGxlYXNlQG0",\n   "created": "2022-03-05T17:37:45.000Z",\n   "updated": "2022-03-05T17:37:45.723Z",\n   "summary": "Give Martial Arts seminar!",\n   "description": "travel and train the students",\n   "location": "3922 W Touhy Ave, Lincolnwood, IL 60712",\n   "creator": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "organizer": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "start": {\n    "dateTime": "2022-09-28T11:00:00-05:00",\n    "timeZone": "America/Chicago"\n   },\n   "end": {\n    "dateTime": "2022-10-28T19:00:00-05:00",\n    "timeZone": "America/Chicago"\n   },\n   "recurringEventId": "jo96abvquohe2qv5u8g7apetss",\n   "originalStartTime": {\n    "dateTime": "2022-09-28T11:00:00-05:00",\n    "timeZone": "America/Chicago"\n   },\n   "iCalUID": "jo96abvquohe2qv5u8g7apetss@google.com",\n   "sequence": 0,\n   "attendees": [\n    {\n     "email": "lpage@example.com",\n     "responseStatus": "needsAction"\n    },\n    {\n     "email": "sbrin@example.com",\n     "responseStatus": "needsAction"\n    }\n   ],\n   "reminders": {\n    "useDefault": false,\n    "overrides": [\n     {\n      "method": "popup",\n      "minutes": 10\n     },\n     {\n      "method": "email",\n      "minutes": 1440\n     }\n    ]\n   },\n   "eventType": "default"\n  },\n  {\n   "kind": "calendar#event",\n   "etag": "\\"3293003731182000\\"",\n   "id": "jo96abvquohe2qv5u8g7apetss_20220929T160000Z",\n   "status": "confirmed",\n   "htmlLink": "https://www.google.com/calendar/event?eid=am85NmFidnF1b2hlMnF2NXU4ZzdhcGV0c3NfMjAyMjA5MjlUMTYwMDAwWiBmbGV4NGxlYXNlQG0",\n   "created": "2022-03-05T17:37:45.000Z",\n   "updated": "2022-03-05T17:37:45.723Z",\n   "summary": "Give Martial Arts seminar!",\n   "description": "travel and train the students",\n   "location": "3922 W Touhy Ave, Lincolnwood, IL 60712",\n   "creator": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "organizer": {\n    "email": "flex4lease@gmail.com",\n    "self": true\n   },\n   "start": {\n    "dateTime": "2022-09-29T11:00:00-05:00",\n    "timeZone": "America/Chicago"\n   },\n   "end": {\n    "dateTime": "2022-10-29T19:00:00-05:00",\n    "timeZone": "America/Chicago"\n   },\n   "recurringEventId": "jo96abvquohe2qv5u8g7apetss",\n   "originalStartTime": {\n    "dateTime": "2022-09-29T11:00:00-05:00",\n    "timeZone": "America/Chicago"\n   },\n   "iCalUID": "jo96abvquohe2qv5u8g7apetss@google.com",\n   "sequence": 0,\n   "attendees": [\n    {\n     "email": "lpage@example.com",\n     "responseStatus": "needsAction"\n    },\n    {\n     "email": "sbrin@example.com",\n     "responseStatus": "needsAction"\n    }\n   ],\n   "reminders": {\n    "useDefault": false,\n    "overrides": [\n     {\n      "method": "popup",\n      "minutes": 10\n     },\n     {\n      "method": "email",\n      "minutes": 1440\n     }\n    ]\n   },\n   "eventType": "default"\n  }\n ]\n}\n',
  headers: {
    "cache-control": "private, max-age=0, must-revalidate, no-transform",
    "content-encoding": "gzip",
    "content-length": "1474",
    "content-type": "application/json; charset=UTF-8",
    date: "Thu, 10 Mar 2022 16:59:32 GMT",
    expires: "Thu, 10 Mar 2022 16:59:32 GMT",
    server: "ESF",
    vary: "Origin, X-Origin, Referer",
  },
  status: 200,
  statusText: null,
};
