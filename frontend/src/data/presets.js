export const DEMO_PRESETS = [
  {
    id: "hanoi-8",
    name: "Hà Nội · 8 khách",
    depot: { id: 0, name: "Kho trung tâm", lat: 21.0278, lng: 105.8342, open_time: "08:00", close_time: "17:00" },
    vehicle: { number: 2, capacity: 70 },
    customers: [
      { id: 1, name: "KH 01", lat: 21.0307, lng: 105.8336, demand: 15, ready_time: "08:00", due_time: "09:30", service_time: 10 },
      { id: 2, name: "KH 02", lat: 21.0356, lng: 105.8421, demand: 20, ready_time: "08:30", due_time: "10:30", service_time: 10 },
      { id: 3, name: "KH 03", lat: 21.0218, lng: 105.8447, demand: 10, ready_time: "09:00", due_time: "11:00", service_time: 10 },
      { id: 4, name: "KH 04", lat: 21.0292, lng: 105.8508, demand: 25, ready_time: "09:30", due_time: "12:00", service_time: 15 },
      { id: 5, name: "KH 05", lat: 21.0411, lng: 105.8297, demand: 15, ready_time: "10:00", due_time: "12:30", service_time: 10 },
      { id: 6, name: "KH 06", lat: 21.0179, lng: 105.8362, demand: 20, ready_time: "10:30", due_time: "13:00", service_time: 10 },
      { id: 7, name: "KH 07", lat: 21.0338, lng: 105.8602, demand: 10, ready_time: "11:00", due_time: "14:00", service_time: 10 },
      { id: 8, name: "KH 08", lat: 21.0129, lng: 105.8498, demand: 20, ready_time: "12:00", due_time: "15:00", service_time: 15 }
    ]
  },
  {
    id: "hanoi-15",
    name: "Hà Nội · 15 khách",
    depot: { id: 0, name: "Kho trung tâm", lat: 21.0278, lng: 105.8342, open_time: "08:00", close_time: "17:00" },
    vehicle: { number: 5, capacity: 75 },
    customers: [
      { id: 1, lat: 21.0307, lng: 105.8336, demand: 15, ready_time: "08:00", due_time: "09:30", service_time: 10 },
      { id: 2, lat: 21.0356, lng: 105.8421, demand: 20, ready_time: "08:15", due_time: "10:15", service_time: 10 },
      { id: 3, lat: 21.0218, lng: 105.8447, demand: 10, ready_time: "08:30", due_time: "11:00", service_time: 10 },
      { id: 4, lat: 21.0292, lng: 105.8508, demand: 25, ready_time: "09:00", due_time: "11:30", service_time: 15 },
      { id: 5, lat: 21.0411, lng: 105.8297, demand: 15, ready_time: "09:30", due_time: "12:00", service_time: 10 },
      { id: 6, lat: 21.0179, lng: 105.8362, demand: 20, ready_time: "10:00", due_time: "12:30", service_time: 10 },
      { id: 7, lat: 21.0338, lng: 105.8602, demand: 10, ready_time: "10:15", due_time: "13:00", service_time: 10 },
      { id: 8, lat: 21.0129, lng: 105.8498, demand: 20, ready_time: "10:30", due_time: "13:30", service_time: 15 },
      { id: 9, lat: 21.0453, lng: 105.8541, demand: 15, ready_time: "11:00", due_time: "14:00", service_time: 10 },
      { id: 10, lat: 21.0197, lng: 105.8237, demand: 20, ready_time: "11:00", due_time: "14:30", service_time: 10 },
      { id: 11, lat: 21.0394, lng: 105.8159, demand: 10, ready_time: "11:30", due_time: "15:00", service_time: 10 },
      { id: 12, lat: 21.0078, lng: 105.8337, demand: 25, ready_time: "12:00", due_time: "15:30", service_time: 15 },
      { id: 13, lat: 21.0504, lng: 105.8382, demand: 15, ready_time: "12:30", due_time: "16:00", service_time: 10 },
      { id: 14, lat: 21.0248, lng: 105.8677, demand: 20, ready_time: "13:00", due_time: "17:00", service_time: 10 },
      { id: 15, lat: 21.0007, lng: 105.8487, demand: 15, ready_time: "13:30", due_time: "17:30", service_time: 10 }
    ]
  },
  {
    id: "hanoi-50",
    name: "Hà Nội · 50 khách",
    depot: {
      id: 0,
      name: "Kho trung tâm",
      lat: 21.0278,
      lng: 105.8342,
      open_time: "08:00",
      close_time: "18:00"
    },
    vehicle: {
      number: 10,
      capacity: 100
    },
    customers: [
      {
        id: 1,
        name: "KH 01",
        lat: 21.0776,
        lng: 105.8427,
        demand: 15,
        ready_time: "08:00",
        due_time: "10:00",
        service_time: 10
      },
      {
        id: 2,
        name: "KH 02",
        lat: 21.0037,
        lng: 105.7823,
        demand: 15,
        ready_time: "08:14",
        due_time: "11:14",
        service_time: 10
      },
      {
        id: 3,
        name: "KH 03",
        lat: 21.0299,
        lng: 105.8456,
        demand: 10,
        ready_time: "08:24",
        due_time: "10:24",
        service_time: 15
      },
      {
        id: 4,
        name: "KH 04",
        lat: 20.989,
        lng: 105.8479,
        demand: 15,
        ready_time: "08:44",
        due_time: "10:14",
        service_time: 10
      },
      {
        id: 5,
        name: "KH 05",
        lat: 20.9995,
        lng: 105.8818,
        demand: 20,
        ready_time: "08:36",
        due_time: "11:06",
        service_time: 10
      },
      {
        id: 6,
        name: "KH 06",
        lat: 21.0436,
        lng: 105.8459,
        demand: 20,
        ready_time: "09:01",
        due_time: "11:31",
        service_time: 10
      },
      {
        id: 7,
        name: "KH 07",
        lat: 20.9753,
        lng: 105.8212,
        demand: 10,
        ready_time: "08:55",
        due_time: "12:25",
        service_time: 15
      },
      {
        id: 8,
        name: "KH 08",
        lat: 20.9856,
        lng: 105.7925,
        demand: 20,
        ready_time: "09:22",
        due_time: "11:22",
        service_time: 10
      },
      {
        id: 9,
        name: "KH 09",
        lat: 21.0297,
        lng: 105.8485,
        demand: 15,
        ready_time: "09:18",
        due_time: "11:18",
        service_time: 10
      },
      {
        id: 10,
        name: "KH 10",
        lat: 20.9906,
        lng: 105.8462,
        demand: 20,
        ready_time: "09:32",
        due_time: "12:02",
        service_time: 15
      },
      {
        id: 11,
        name: "KH 11",
        lat: 21.0247,
        lng: 105.8649,
        demand: 15,
        ready_time: "09:58",
        due_time: "11:58",
        service_time: 15
      },
      {
        id: 12,
        name: "KH 12",
        lat: 21.0557,
        lng: 105.8836,
        demand: 10,
        ready_time: "09:58",
        due_time: "13:28",
        service_time: 10
      },
      {
        id: 13,
        name: "KH 13",
        lat: 21.0565,
        lng: 105.7875,
        demand: 10,
        ready_time: "10:08",
        due_time: "11:38",
        service_time: 15
      },
      {
        id: 14,
        name: "KH 14",
        lat: 21.0643,
        lng: 105.8515,
        demand: 20,
        ready_time: "10:19",
        due_time: "13:19",
        service_time: 10
      },
      {
        id: 15,
        name: "KH 15",
        lat: 20.9908,
        lng: 105.7845,
        demand: 20,
        ready_time: "10:32",
        due_time: "12:32",
        service_time: 10
      },
      {
        id: 16,
        name: "KH 16",
        lat: 20.975,
        lng: 105.8201,
        demand: 10,
        ready_time: "11:04",
        due_time: "14:34",
        service_time: 10
      },
      {
        id: 17,
        name: "KH 17",
        lat: 21.0657,
        lng: 105.8335,
        demand: 20,
        ready_time: "11:03",
        due_time: "14:03",
        service_time: 10
      },
      {
        id: 18,
        name: "KH 18",
        lat: 21.063,
        lng: 105.7892,
        demand: 20,
        ready_time: "11:18",
        due_time: "13:18",
        service_time: 10
      },
      {
        id: 19,
        name: "KH 19",
        lat: 20.9913,
        lng: 105.8688,
        demand: 15,
        ready_time: "11:26",
        due_time: "13:56",
        service_time: 15
      },
      {
        id: 20,
        name: "KH 20",
        lat: 21.0862,
        lng: 105.8387,
        demand: 15,
        ready_time: "11:42",
        due_time: "15:12",
        service_time: 15
      },
      {
        id: 21,
        name: "KH 21",
        lat: 20.9981,
        lng: 105.8842,
        demand: 15,
        ready_time: "11:46",
        due_time: "13:46",
        service_time: 10
      },
      {
        id: 22,
        name: "KH 22",
        lat: 21.0272,
        lng: 105.8304,
        demand: 15,
        ready_time: "12:00",
        due_time: "14:00",
        service_time: 15
      },
      {
        id: 23,
        name: "KH 23",
        lat: 21.0692,
        lng: 105.7873,
        demand: 15,
        ready_time: "12:21",
        due_time: "15:51",
        service_time: 15
      },
      {
        id: 24,
        name: "KH 24",
        lat: 21.008,
        lng: 105.8557,
        demand: 20,
        ready_time: "12:24",
        due_time: "15:54",
        service_time: 10
      },
      {
        id: 25,
        name: "KH 25",
        lat: 20.9791,
        lng: 105.8379,
        demand: 15,
        ready_time: "12:47",
        due_time: "15:17",
        service_time: 15
      },
      {
        id: 26,
        name: "KH 26",
        lat: 21.0296,
        lng: 105.8672,
        demand: 15,
        ready_time: "12:32",
        due_time: "15:32",
        service_time: 10
      },
      {
        id: 27,
        name: "KH 27",
        lat: 20.9667,
        lng: 105.8206,
        demand: 20,
        ready_time: "12:45",
        due_time: "15:45",
        service_time: 15
      },
      {
        id: 28,
        name: "KH 28",
        lat: 21.0026,
        lng: 105.8295,
        demand: 10,
        ready_time: "13:22",
        due_time: "15:22",
        service_time: 15
      },
      {
        id: 29,
        name: "KH 29",
        lat: 21.0076,
        lng: 105.7796,
        demand: 15,
        ready_time: "13:16",
        due_time: "15:46",
        service_time: 10
      },
      {
        id: 30,
        name: "KH 30",
        lat: 20.9707,
        lng: 105.8534,
        demand: 25,
        ready_time: "13:22",
        due_time: "14:52",
        service_time: 15
      },
      {
        id: 31,
        name: "KH 31",
        lat: 21.0192,
        lng: 105.8309,
        demand: 25,
        ready_time: "13:27",
        due_time: "14:57",
        service_time: 10
      },
      {
        id: 32,
        name: "KH 32",
        lat: 21.0528,
        lng: 105.8161,
        demand: 20,
        ready_time: "13:40",
        due_time: "17:10",
        service_time: 10
      },
      {
        id: 33,
        name: "KH 33",
        lat: 20.9947,
        lng: 105.8375,
        demand: 20,
        ready_time: "14:12",
        due_time: "17:42",
        service_time: 15
      },
      {
        id: 34,
        name: "KH 34",
        lat: 21.0372,
        lng: 105.7888,
        demand: 10,
        ready_time: "14:07",
        due_time: "15:37",
        service_time: 10
      },
      {
        id: 35,
        name: "KH 35",
        lat: 20.9966,
        lng: 105.8777,
        demand: 10,
        ready_time: "14:26",
        due_time: "15:56",
        service_time: 10
      },
      {
        id: 36,
        name: "KH 36",
        lat: 21.0257,
        lng: 105.8177,
        demand: 15,
        ready_time: "14:31",
        due_time: "16:31",
        service_time: 10
      },
      {
        id: 37,
        name: "KH 37",
        lat: 21.0572,
        lng: 105.8724,
        demand: 20,
        ready_time: "14:43",
        due_time: "17:43",
        service_time: 10
      },
      {
        id: 38,
        name: "KH 38",
        lat: 21.0803,
        lng: 105.863,
        demand: 15,
        ready_time: "14:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 39,
        name: "KH 39",
        lat: 21.0834,
        lng: 105.8045,
        demand: 25,
        ready_time: "15:00",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 40,
        name: "KH 40",
        lat: 21.0567,
        lng: 105.799,
        demand: 10,
        ready_time: "15:00",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 41,
        name: "KH 41",
        lat: 21.0218,
        lng: 105.901,
        demand: 15,
        ready_time: "15:00",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 42,
        name: "KH 42",
        lat: 20.9767,
        lng: 105.8388,
        demand: 25,
        ready_time: "15:41",
        due_time: "17:41",
        service_time: 10
      },
      {
        id: 43,
        name: "KH 43",
        lat: 20.9815,
        lng: 105.8207,
        demand: 20,
        ready_time: "15:44",
        due_time: "17:14",
        service_time: 15
      },
      {
        id: 44,
        name: "KH 44",
        lat: 21.0659,
        lng: 105.8116,
        demand: 20,
        ready_time: "14:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 45,
        name: "KH 45",
        lat: 21.0807,
        lng: 105.8602,
        demand: 15,
        ready_time: "16:00",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 46,
        name: "KH 46",
        lat: 21.0446,
        lng: 105.8193,
        demand: 25,
        ready_time: "14:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 47,
        name: "KH 47",
        lat: 20.9844,
        lng: 105.86,
        demand: 20,
        ready_time: "15:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 48,
        name: "KH 48",
        lat: 21.0075,
        lng: 105.8851,
        demand: 15,
        ready_time: "16:00",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 49,
        name: "KH 49",
        lat: 21.0663,
        lng: 105.8145,
        demand: 15,
        ready_time: "15:00",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 50,
        name: "KH 50",
        lat: 21.0908,
        lng: 105.8325,
        demand: 15,
        ready_time: "16:00",
        due_time: "18:00",
        service_time: 15
      }
    ]
  },
  {
    id: "hanoi-100",
    name: "Hà Nội · 100 khách",
    depot: {
      id: 0,
      name: "Kho trung tâm",
      lat: 21.0278,
      lng: 105.8342,
      open_time: "08:00",
      close_time: "18:00"
    },
    vehicle: {
      number: 20,
      capacity: 120
    },
    customers: [
      {
        id: 1,
        name: "KH 01",
        lat: 21.0547,
        lng: 105.8743,
        demand: 10,
        ready_time: "08:00",
        due_time: "11:30",
        service_time: 10
      },
      {
        id: 2,
        name: "KH 02",
        lat: 21.0736,
        lng: 105.8529,
        demand: 25,
        ready_time: "08:00",
        due_time: "09:30",
        service_time: 10
      },
      {
        id: 3,
        name: "KH 03",
        lat: 21.0761,
        lng: 105.8585,
        demand: 15,
        ready_time: "08:13",
        due_time: "11:13",
        service_time: 10
      },
      {
        id: 4,
        name: "KH 04",
        lat: 21.0803,
        lng: 105.8896,
        demand: 25,
        ready_time: "08:22",
        due_time: "11:52",
        service_time: 10
      },
      {
        id: 5,
        name: "KH 05",
        lat: 20.9787,
        lng: 105.8741,
        demand: 25,
        ready_time: "08:08",
        due_time: "11:38",
        service_time: 10
      },
      {
        id: 6,
        name: "KH 06",
        lat: 21.0547,
        lng: 105.871,
        demand: 15,
        ready_time: "08:31",
        due_time: "11:01",
        service_time: 15
      },
      {
        id: 7,
        name: "KH 07",
        lat: 21.0587,
        lng: 105.9054,
        demand: 25,
        ready_time: "08:30",
        due_time: "10:00",
        service_time: 15
      },
      {
        id: 8,
        name: "KH 08",
        lat: 20.9649,
        lng: 105.8054,
        demand: 25,
        ready_time: "08:39",
        due_time: "12:09",
        service_time: 10
      },
      {
        id: 9,
        name: "KH 09",
        lat: 20.958,
        lng: 105.8506,
        demand: 15,
        ready_time: "08:41",
        due_time: "11:11",
        service_time: 10
      },
      {
        id: 10,
        name: "KH 10",
        lat: 21.005,
        lng: 105.7607,
        demand: 25,
        ready_time: "08:38",
        due_time: "12:08",
        service_time: 15
      },
      {
        id: 11,
        name: "KH 11",
        lat: 21.0694,
        lng: 105.7897,
        demand: 15,
        ready_time: "08:51",
        due_time: "12:21",
        service_time: 10
      },
      {
        id: 12,
        name: "KH 12",
        lat: 21.0035,
        lng: 105.8489,
        demand: 20,
        ready_time: "08:51",
        due_time: "11:51",
        service_time: 10
      },
      {
        id: 13,
        name: "KH 13",
        lat: 21.0199,
        lng: 105.8192,
        demand: 25,
        ready_time: "09:11",
        due_time: "11:41",
        service_time: 15
      },
      {
        id: 14,
        name: "KH 14",
        lat: 20.9717,
        lng: 105.7937,
        demand: 15,
        ready_time: "09:01",
        due_time: "10:31",
        service_time: 15
      },
      {
        id: 15,
        name: "KH 15",
        lat: 20.9991,
        lng: 105.7829,
        demand: 10,
        ready_time: "09:27",
        due_time: "11:57",
        service_time: 15
      },
      {
        id: 16,
        name: "KH 16",
        lat: 21.0631,
        lng: 105.7563,
        demand: 15,
        ready_time: "09:32",
        due_time: "12:32",
        service_time: 15
      },
      {
        id: 17,
        name: "KH 17",
        lat: 21.016,
        lng: 105.8373,
        demand: 20,
        ready_time: "09:35",
        due_time: "11:05",
        service_time: 10
      },
      {
        id: 18,
        name: "KH 18",
        lat: 21.0301,
        lng: 105.8132,
        demand: 20,
        ready_time: "09:44",
        due_time: "11:44",
        service_time: 10
      },
      {
        id: 19,
        name: "KH 19",
        lat: 21.0628,
        lng: 105.7949,
        demand: 15,
        ready_time: "09:32",
        due_time: "12:32",
        service_time: 10
      },
      {
        id: 20,
        name: "KH 20",
        lat: 21.0725,
        lng: 105.7911,
        demand: 10,
        ready_time: "10:00",
        due_time: "13:30",
        service_time: 15
      },
      {
        id: 21,
        name: "KH 21",
        lat: 21.0957,
        lng: 105.828,
        demand: 10,
        ready_time: "10:09",
        due_time: "12:09",
        service_time: 10
      },
      {
        id: 22,
        name: "KH 22",
        lat: 21.0414,
        lng: 105.8546,
        demand: 25,
        ready_time: "09:44",
        due_time: "12:44",
        service_time: 15
      },
      {
        id: 23,
        name: "KH 23",
        lat: 21.0209,
        lng: 105.8705,
        demand: 20,
        ready_time: "10:03",
        due_time: "13:33",
        service_time: 15
      },
      {
        id: 24,
        name: "KH 24",
        lat: 21.0013,
        lng: 105.8958,
        demand: 20,
        ready_time: "10:18",
        due_time: "13:48",
        service_time: 15
      },
      {
        id: 25,
        name: "KH 25",
        lat: 21.0236,
        lng: 105.764,
        demand: 15,
        ready_time: "10:29",
        due_time: "13:59",
        service_time: 10
      },
      {
        id: 26,
        name: "KH 26",
        lat: 20.9876,
        lng: 105.868,
        demand: 15,
        ready_time: "10:27",
        due_time: "13:27",
        service_time: 10
      },
      {
        id: 27,
        name: "KH 27",
        lat: 21.063,
        lng: 105.8306,
        demand: 15,
        ready_time: "10:18",
        due_time: "11:48",
        service_time: 15
      },
      {
        id: 28,
        name: "KH 28",
        lat: 21.0781,
        lng: 105.8746,
        demand: 20,
        ready_time: "10:35",
        due_time: "12:05",
        service_time: 15
      },
      {
        id: 29,
        name: "KH 29",
        lat: 21.0852,
        lng: 105.8633,
        demand: 25,
        ready_time: "10:43",
        due_time: "13:43",
        service_time: 10
      },
      {
        id: 30,
        name: "KH 30",
        lat: 21.0899,
        lng: 105.8151,
        demand: 20,
        ready_time: "10:45",
        due_time: "12:15",
        service_time: 10
      },
      {
        id: 31,
        name: "KH 31",
        lat: 21.1024,
        lng: 105.8307,
        demand: 15,
        ready_time: "10:51",
        due_time: "13:51",
        service_time: 15
      },
      {
        id: 32,
        name: "KH 32",
        lat: 21.0468,
        lng: 105.8494,
        demand: 20,
        ready_time: "11:04",
        due_time: "13:34",
        service_time: 10
      },
      {
        id: 33,
        name: "KH 33",
        lat: 21.0668,
        lng: 105.9014,
        demand: 10,
        ready_time: "10:53",
        due_time: "14:23",
        service_time: 15
      },
      {
        id: 34,
        name: "KH 34",
        lat: 20.9979,
        lng: 105.8253,
        demand: 10,
        ready_time: "11:17",
        due_time: "14:47",
        service_time: 15
      },
      {
        id: 35,
        name: "KH 35",
        lat: 21.0802,
        lng: 105.7692,
        demand: 15,
        ready_time: "11:14",
        due_time: "13:44",
        service_time: 10
      },
      {
        id: 36,
        name: "KH 36",
        lat: 21.036,
        lng: 105.8853,
        demand: 25,
        ready_time: "11:28",
        due_time: "14:58",
        service_time: 15
      },
      {
        id: 37,
        name: "KH 37",
        lat: 20.9788,
        lng: 105.789,
        demand: 25,
        ready_time: "11:35",
        due_time: "13:35",
        service_time: 10
      },
      {
        id: 38,
        name: "KH 38",
        lat: 21.038,
        lng: 105.9081,
        demand: 25,
        ready_time: "11:30",
        due_time: "14:00",
        service_time: 10
      },
      {
        id: 39,
        name: "KH 39",
        lat: 21.0479,
        lng: 105.7505,
        demand: 15,
        ready_time: "11:29",
        due_time: "13:29",
        service_time: 15
      },
      {
        id: 40,
        name: "KH 40",
        lat: 20.9528,
        lng: 105.8619,
        demand: 20,
        ready_time: "11:57",
        due_time: "14:27",
        service_time: 10
      },
      {
        id: 41,
        name: "KH 41",
        lat: 21.0333,
        lng: 105.8746,
        demand: 25,
        ready_time: "11:43",
        due_time: "13:43",
        service_time: 10
      },
      {
        id: 42,
        name: "KH 42",
        lat: 21.0797,
        lng: 105.794,
        demand: 10,
        ready_time: "11:53",
        due_time: "14:23",
        service_time: 10
      },
      {
        id: 43,
        name: "KH 43",
        lat: 21.0818,
        lng: 105.8885,
        demand: 10,
        ready_time: "12:09",
        due_time: "14:09",
        service_time: 10
      },
      {
        id: 44,
        name: "KH 44",
        lat: 20.9578,
        lng: 105.8672,
        demand: 20,
        ready_time: "11:52",
        due_time: "14:52",
        service_time: 10
      },
      {
        id: 45,
        name: "KH 45",
        lat: 21.0763,
        lng: 105.8161,
        demand: 20,
        ready_time: "12:00",
        due_time: "14:00",
        service_time: 10
      },
      {
        id: 46,
        name: "KH 46",
        lat: 21.0539,
        lng: 105.8152,
        demand: 20,
        ready_time: "12:20",
        due_time: "15:50",
        service_time: 10
      },
      {
        id: 47,
        name: "KH 47",
        lat: 20.989,
        lng: 105.8911,
        demand: 25,
        ready_time: "12:24",
        due_time: "14:24",
        service_time: 10
      },
      {
        id: 48,
        name: "KH 48",
        lat: 21.0373,
        lng: 105.8323,
        demand: 15,
        ready_time: "12:28",
        due_time: "14:28",
        service_time: 10
      },
      {
        id: 49,
        name: "KH 49",
        lat: 21.0552,
        lng: 105.9153,
        demand: 25,
        ready_time: "12:18",
        due_time: "14:48",
        service_time: 10
      },
      {
        id: 50,
        name: "KH 50",
        lat: 21.0304,
        lng: 105.8811,
        demand: 20,
        ready_time: "12:32",
        due_time: "16:02",
        service_time: 10
      },
      {
        id: 51,
        name: "KH 51",
        lat: 21.0965,
        lng: 105.8638,
        demand: 20,
        ready_time: "12:58",
        due_time: "15:58",
        service_time: 15
      },
      {
        id: 52,
        name: "KH 52",
        lat: 20.955,
        lng: 105.826,
        demand: 25,
        ready_time: "12:39",
        due_time: "16:09",
        service_time: 10
      },
      {
        id: 53,
        name: "KH 53",
        lat: 21.0861,
        lng: 105.8416,
        demand: 15,
        ready_time: "13:05",
        due_time: "15:05",
        service_time: 15
      },
      {
        id: 54,
        name: "KH 54",
        lat: 21.0293,
        lng: 105.829,
        demand: 20,
        ready_time: "12:51",
        due_time: "15:51",
        service_time: 15
      },
      {
        id: 55,
        name: "KH 55",
        lat: 20.9631,
        lng: 105.8085,
        demand: 20,
        ready_time: "13:13",
        due_time: "16:43",
        service_time: 15
      },
      {
        id: 56,
        name: "KH 56",
        lat: 21.0407,
        lng: 105.771,
        demand: 15,
        ready_time: "13:26",
        due_time: "16:56",
        service_time: 10
      },
      {
        id: 57,
        name: "KH 57",
        lat: 21.021,
        lng: 105.8769,
        demand: 15,
        ready_time: "13:20",
        due_time: "16:20",
        service_time: 15
      },
      {
        id: 58,
        name: "KH 58",
        lat: 21.0384,
        lng: 105.8252,
        demand: 15,
        ready_time: "13:23",
        due_time: "15:53",
        service_time: 15
      },
      {
        id: 59,
        name: "KH 59",
        lat: 20.9649,
        lng: 105.7812,
        demand: 25,
        ready_time: "13:37",
        due_time: "16:07",
        service_time: 10
      },
      {
        id: 60,
        name: "KH 60",
        lat: 21.0482,
        lng: 105.7763,
        demand: 25,
        ready_time: "13:51",
        due_time: "15:51",
        service_time: 15
      },
      {
        id: 61,
        name: "KH 61",
        lat: 21.0988,
        lng: 105.8053,
        demand: 15,
        ready_time: "13:56",
        due_time: "17:26",
        service_time: 10
      },
      {
        id: 62,
        name: "KH 62",
        lat: 21.0762,
        lng: 105.8946,
        demand: 15,
        ready_time: "13:44",
        due_time: "16:44",
        service_time: 15
      },
      {
        id: 63,
        name: "KH 63",
        lat: 21.0291,
        lng: 105.8576,
        demand: 15,
        ready_time: "13:44",
        due_time: "16:14",
        service_time: 10
      },
      {
        id: 64,
        name: "KH 64",
        lat: 21.0712,
        lng: 105.9021,
        demand: 20,
        ready_time: "13:48",
        due_time: "16:18",
        service_time: 10
      },
      {
        id: 65,
        name: "KH 65",
        lat: 21.0429,
        lng: 105.9181,
        demand: 15,
        ready_time: "14:01",
        due_time: "17:01",
        service_time: 10
      },
      {
        id: 66,
        name: "KH 66",
        lat: 21.0677,
        lng: 105.7591,
        demand: 20,
        ready_time: "14:17",
        due_time: "17:17",
        service_time: 15
      },
      {
        id: 67,
        name: "KH 67",
        lat: 20.9825,
        lng: 105.8604,
        demand: 20,
        ready_time: "14:11",
        due_time: "15:41",
        service_time: 15
      },
      {
        id: 68,
        name: "KH 68",
        lat: 21.0171,
        lng: 105.8302,
        demand: 15,
        ready_time: "14:28",
        due_time: "15:58",
        service_time: 10
      },
      {
        id: 69,
        name: "KH 69",
        lat: 20.9946,
        lng: 105.7991,
        demand: 25,
        ready_time: "14:42",
        due_time: "16:12",
        service_time: 10
      },
      {
        id: 70,
        name: "KH 70",
        lat: 21.047,
        lng: 105.7505,
        demand: 15,
        ready_time: "14:20",
        due_time: "16:50",
        service_time: 15
      },
      {
        id: 71,
        name: "KH 71",
        lat: 21.0307,
        lng: 105.8172,
        demand: 15,
        ready_time: "14:48",
        due_time: "16:48",
        service_time: 10
      },
      {
        id: 72,
        name: "KH 72",
        lat: 20.9943,
        lng: 105.7626,
        demand: 15,
        ready_time: "14:41",
        due_time: "16:41",
        service_time: 15
      },
      {
        id: 73,
        name: "KH 73",
        lat: 20.9576,
        lng: 105.7985,
        demand: 20,
        ready_time: "14:37",
        due_time: "17:07",
        service_time: 10
      },
      {
        id: 74,
        name: "KH 74",
        lat: 21.0573,
        lng: 105.9052,
        demand: 15,
        ready_time: "14:49",
        due_time: "16:19",
        service_time: 10
      },
      {
        id: 75,
        name: "KH 75",
        lat: 21.0906,
        lng: 105.8733,
        demand: 25,
        ready_time: "14:48",
        due_time: "17:18",
        service_time: 10
      },
      {
        id: 76,
        name: "KH 76",
        lat: 20.9988,
        lng: 105.8838,
        demand: 25,
        ready_time: "15:05",
        due_time: "17:35",
        service_time: 15
      },
      {
        id: 77,
        name: "KH 77",
        lat: 20.9991,
        lng: 105.8289,
        demand: 25,
        ready_time: "15:28",
        due_time: "16:58",
        service_time: 10
      },
      {
        id: 78,
        name: "KH 78",
        lat: 21.0452,
        lng: 105.8746,
        demand: 15,
        ready_time: "15:23",
        due_time: "17:53",
        service_time: 15
      },
      {
        id: 79,
        name: "KH 79",
        lat: 21.0102,
        lng: 105.9075,
        demand: 25,
        ready_time: "15:30",
        due_time: "17:30",
        service_time: 15
      },
      {
        id: 80,
        name: "KH 80",
        lat: 21.0753,
        lng: 105.84,
        demand: 15,
        ready_time: "15:16",
        due_time: "16:46",
        service_time: 10
      },
      {
        id: 81,
        name: "KH 81",
        lat: 20.9619,
        lng: 105.8108,
        demand: 25,
        ready_time: "15:00",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 82,
        name: "KH 82",
        lat: 21.0893,
        lng: 105.8862,
        demand: 10,
        ready_time: "15:00",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 83,
        name: "KH 83",
        lat: 20.9698,
        lng: 105.8836,
        demand: 25,
        ready_time: "15:41",
        due_time: "17:41",
        service_time: 10
      },
      {
        id: 84,
        name: "KH 84",
        lat: 21.0513,
        lng: 105.79,
        demand: 20,
        ready_time: "15:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 85,
        name: "KH 85",
        lat: 21.1017,
        lng: 105.8413,
        demand: 15,
        ready_time: "15:56",
        due_time: "17:56",
        service_time: 10
      },
      {
        id: 86,
        name: "KH 86",
        lat: 21.0406,
        lng: 105.813,
        demand: 25,
        ready_time: "15:30",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 87,
        name: "KH 87",
        lat: 21.0171,
        lng: 105.8754,
        demand: 15,
        ready_time: "16:00",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 88,
        name: "KH 88",
        lat: 21.0233,
        lng: 105.892,
        demand: 20,
        ready_time: "15:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 89,
        name: "KH 89",
        lat: 21.0389,
        lng: 105.8233,
        demand: 25,
        ready_time: "16:00",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 90,
        name: "KH 90",
        lat: 21.0684,
        lng: 105.8595,
        demand: 15,
        ready_time: "16:00",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 91,
        name: "KH 91",
        lat: 21.0854,
        lng: 105.8361,
        demand: 15,
        ready_time: "16:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 92,
        name: "KH 92",
        lat: 21.0773,
        lng: 105.8484,
        demand: 10,
        ready_time: "15:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 93,
        name: "KH 93",
        lat: 21.0505,
        lng: 105.8276,
        demand: 20,
        ready_time: "14:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 94,
        name: "KH 94",
        lat: 21.0148,
        lng: 105.7595,
        demand: 15,
        ready_time: "15:30",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 95,
        name: "KH 95",
        lat: 21.0904,
        lng: 105.8531,
        demand: 25,
        ready_time: "15:00",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 96,
        name: "KH 96",
        lat: 20.9979,
        lng: 105.8294,
        demand: 25,
        ready_time: "16:30",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 97,
        name: "KH 97",
        lat: 21.0103,
        lng: 105.7589,
        demand: 25,
        ready_time: "16:30",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 98,
        name: "KH 98",
        lat: 21.0088,
        lng: 105.8585,
        demand: 15,
        ready_time: "15:00",
        due_time: "18:00",
        service_time: 15
      },
      {
        id: 99,
        name: "KH 99",
        lat: 21.0459,
        lng: 105.8365,
        demand: 25,
        ready_time: "16:00",
        due_time: "18:00",
        service_time: 10
      },
      {
        id: 100,
        name: "KH 100",
        lat: 20.9877,
        lng: 105.8461,
        demand: 15,
        ready_time: "14:30",
        due_time: "18:00",
        service_time: 15
      }
    ]
  }
];

export function clonePreset(preset) {
  return JSON.parse(JSON.stringify(preset));
}
