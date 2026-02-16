
import { TripItinerary } from '../types';

export const nzItinerary: TripItinerary = {
  title: "2026 紐西蘭南島深度之旅",
  destination: "紐西蘭 · 南島",
  duration: "14 Days",
  essentialInfo: {
    currency: "紐西蘭元 (NZD)",
    weather: "2月 (夏季) 15-25°C",
    voltage: "230V (八字型插座)",
    drivingSide: "左側行駛 (右駕)"
  },
  packingList: [
    {
      category: "重要文件",
      items: ["護照正本", "NZeTA 簽證", "國際/台灣駕照", "保險單據", "活動預約單"]
    },
    {
      category: "衣物穿搭",
      items: ["防風防水外套", "薄羽絨衣", "登山/健行鞋", "太陽眼鏡", "防曬乳"]
    },
    {
      category: "電子產品",
      items: ["八字型轉接頭", "行動電源", "離線地圖", "紐西蘭 SIM 卡"]
    }
  ],
  reminders: [
    {
      category: "行車安全",
      icon: "car",
      items: ["左側行駛", "單線橋樑讓路標誌", "嚴格遵守速限", "遇到 STOP 標誌需停秒"]
    },
    {
      category: "生活須知",
      icon: "info",
      items: ["無痕山林垃圾隨身帶", "夏季紫外線強", "晚上觀星極冷", "超商 8 點後可能打烊"]
    }
  ],
  days: [
    {
      dayNumber: 0,
      date: "2/17 (Tue)",
      shortDate: "2/17",
      title: "啟程：前往南半球",
      location: "桃園機場",
      weatherForecast: { temp: "22-28°C", condition: "晴" },
      outfitSuggestion: "輕便衣物、圍巾、好脫的鞋",
      accommodation: { name: "飛機上 (CI0051)", address: "TPE Airport T2", mapUrl: "" },
      activities: [{ 
        type: 'transport', 
        time: "23:50", 
        location: "航班 CI0051 (TPE → SYD)", 
        description: "開啟期待已久的紐西蘭旅程！小撇步：機上乾燥，記得多補充水分。", 
        platform: "中華航空", 
        arrivalNotice: "請於 21:00 前抵達機場辦理登機" 
      }]
    },
    {
      dayNumber: 1,
      date: "2/18 (Wed)",
      shortDate: "2/18",
      title: "抵達皇后鎮",
      location: "皇后鎮",
      drivingTime: "Uber 接駁 (約 20 分鐘)",
      weatherForecast: { temp: "14-21°C", condition: "多雲" },
      outfitSuggestion: "薄羽絨、保暖長褲、步行鞋",
      accommodation: { name: "Hilton Queenstown", address: "Peninsula Road, Queenstown", mapUrl: "https://www.google.com/maps/search/?api=1&query=Hilton+Queenstown" },
      activities: [
        { 
          type: 'transport', 
          time: "16:05", 
          location: "航班 QF0123 (SYD → ZQN)", 
          description: "由雪梨飛往皇后鎮。降落前請留意窗外風景。", 
          platform: "澳洲航空" 
        }
      ]
    },
    {
      dayNumber: 2,
      date: "2/19 (Thu)",
      shortDate: "2/19",
      title: "皇后鎮極限挑戰",
      location: "皇后鎮",
      drivingTime: "步行 & Uber",
      weatherForecast: { temp: "15-23°C", condition: "晴" },
      outfitSuggestion: "機能服、防風外套、運動鞋",
      accommodation: { name: "Hilton Queenstown", address: "Queenstown", mapUrl: "" },
      activities: [
        { 
          type: 'activity', 
          time: "09:30", 
          duration: "4hr",
          location: "Nevis Bungy", 
          description: "挑戰紐西蘭最高 134 公尺高空彈跳。", 
          bookingStatus: 'reserved',
          platform: "官網/Gmail",
          arrivalNotice: "請於 30 分鐘前抵達 AJ Hackett Bungy Centre"
        },
        { 
          type: 'restaurant', 
          time: "12:00", 
          location: "Fergburger", 
          description: "皇后鎮靈魂漢堡店，採用高品質草飼牛。CBD 區最熱門景點。", 
          cuisine: "漢堡",
          hours: "08:00 - 02:00",
          bookingStatus: 'none'
        },
        { 
          type: 'activity', 
          time: "15:00", 
          duration: "2hr",
          location: "Tandem Paraglide", 
          description: "在空中鳥瞰皇后鎮美景。備註：可線上 check in。", 
          bookingStatus: 'reserved',
          platform: "官網/Gmail",
          arrivalNotice: "請於 30 分鐘前抵達 Skytrek Tandem Centre"
        },
        { 
          type: 'restaurant', 
          time: "18:15", 
          location: "Bella Cucina", 
          description: "正統北義風味料理。窯烤披薩與手工寬麵必嚐。", 
          cuisine: "義大利餐廳", 
          hours: "12:00 - 22:00",
          bookingStatus: 'reserved' 
        }
      ]
    },
    {
      dayNumber: 3,
      date: "2/20 (Fri)",
      shortDate: "2/20",
      title: "噴射快艇與高空跳傘",
      location: "皇后鎮",
      drivingTime: "步行 & Uber",
      weatherForecast: { temp: "16-24°C", condition: "晴" },
      outfitSuggestion: "速乾衣物、遮陽帽",
      accommodation: { name: "Hilton Queenstown", address: "Queenstown", mapUrl: "" },
      activities: [
        { 
          type: 'activity', 
          time: "10:30", 
          duration: "2 hr",
          location: "Shotover Jet", 
          description: "河谷噴射快艇冒險。請進入 The Station Building 櫃檯報到。", 
          bookingStatus: 'reserved',
          platform: "官網/Gmail",
          arrivalNotice: "請於 45 分鐘前抵達報到"
        },
        { 
          type: 'activity', 
          time: "14:30", 
          duration: "3 hr",
          location: "Tandem Skydive", 
          description: "體驗南半球最高空的驚險跳傘。", 
          bookingStatus: 'reserved',
          platform: "官網/Gmail",
          arrivalNotice: "請於 10 分鐘前抵達 NZone Shop"
        },
        { 
          type: 'restaurant', 
          time: "18:30", 
          location: "The Bunker", 
          description: "Steamer Wharf 隱藏版高級餐酒館。氛圍極佳，適合享受寧靜晚餐。", 
          cuisine: "高級餐酒館", 
          hours: "17:00 - 22:00",
          bookingStatus: 'reserved' 
        }
      ]
    },
    {
      dayNumber: 4,
      date: "2/21 (Sat)",
      shortDate: "2/21",
      title: "螢火蟲洞奇幻之旅",
      location: "蒂阿瑙",
      drivingTime: "自駕約 2 小時",
      weatherForecast: { temp: "15-22°C", condition: "晴" },
      accommodation: { name: "Distinction Te Anau", address: "Te Anau", mapUrl: "" },
      activities: [
        { 
          type: 'restaurant', 
          time: "12:00", 
          location: "Miles Better Pies", 
          description: "蒂阿瑙最強補給站，推薦皮薄酥脆的鹿肉派。", 
          cuisine: "紐西蘭鹹派", 
          hours: "07:00 - 15:00",
          bookingStatus: 'none' 
        },
        { 
          type: 'activity', 
          time: "20:15", 
          duration: "2.5 hr",
          location: "蒂阿瑙螢火蟲洞", 
          description: "地下溶洞螢火蟲探索。", 
          bookingStatus: 'reserved',
          platform: "Klook",
          arrivalNotice: "請於 30 分鐘前抵達 RealNZ Te Anau Visitor Centre"
        }
      ]
    },
    {
      dayNumber: 5,
      date: "2/22 (Sun)",
      shortDate: "2/22",
      title: "世界遺產：米佛峽灣",
      location: "米佛峽灣 / 蒂阿瑙",
      drivingTime: "搭乘接駁巴士",
      weatherForecast: { temp: "12-18°C", condition: "偶雨" },
      accommodation: { name: "Distinction Te Anau", address: "Te Anau", mapUrl: "" },
      activities: [
        { 
          type: 'activity', 
          time: "10:00", 
          duration: "7 hr",
          location: "峽灣一日遊 (Milford Sound)", 
          description: "世界遺產峽灣巡航。備註：本行程包含接駁巴士往返。", 
          bookingStatus: 'reserved',
          platform: "Klook",
          arrivalNotice: "請於 10 分鐘前抵達 Te Anau i-Site Centre 集合"
        },
        { 
          type: 'restaurant', 
          time: "18:15", 
          location: "Ristorante Pizzeria Paradiso", 
          description: "蒂阿瑙評價極高的義大利麵與披薩店。", 
          cuisine: "義大利餐廳", 
          hours: "15:00 - 22:00",
          bookingStatus: 'reserved' 
        }
      ]
    },
    {
      dayNumber: 6,
      date: "2/23 (Mon)",
      shortDate: "2/23",
      title: "純淨之巔：庫克山",
      location: "庫克山 / 普卡基湖",
      drivingTime: "自駕約 5 小時",
      weatherForecast: { temp: "10-20°C", condition: "晴" },
      accommodation: { name: "The Hermitage Hotel", address: "Mt Cook", mapUrl: "" },
      activities: [
        { 
          type: 'restaurant', 
          time: "14:00", 
          location: "Mt Cook Alpine Salmon Shop", 
          description: "普卡基湖畔，品嚐最純淨的冰河水鮭魚。", 
          cuisine: "鮭魚店 / 輕食", 
          hours: "09:00 - 17:00",
          bookingStatus: 'none' 
        }
      ]
    },
    {
      dayNumber: 7,
      date: "2/24 (Tue)",
      shortDate: "2/24",
      title: "冰川與暗空星辰",
      location: "特卡波 / 庫克山",
      drivingTime: "自駕約 1.5 小時",
      weatherForecast: { temp: "12-22°C", condition: "晴" },
      accommodation: { name: "Haka House Tekapo", address: "Tekapo", mapUrl: "" },
      activities: [
        { 
          type: 'activity', 
          time: "09:30", 
          duration: "1.5 hr",
          location: "Tasman Glacier 直升機", 
          description: "直升機登陸塔斯曼冰川，壯闊景觀。", 
          bookingStatus: 'reserved',
          platform: "Klook",
          arrivalNotice: "請於 30 分鐘前抵達 Mount Cook Airport"
        },
        { 
          type: 'restaurant', 
          time: "12:00", 
          location: "Kohan Restaurant", 
          description: "名聞遐邇的湖畔日料，鮭魚丼必點。建議電話訂位。", 
          cuisine: "日式料理", 
          hours: "11:30 - 14:00; 18:00 - 20:30",
          bookingStatus: 'suggested',
          arrivalNotice: "可能要打電話才能訂"
        },
        { 
          type: 'activity', 
          time: "21:30", 
          duration: "2 hr",
          location: "Silver River Stargazing", 
          description: "在特卡波暗空保護區觀星。備註：似乎有接送。", 
          bookingStatus: 'reserved',
          platform: "官網/Gmail",
          arrivalNotice: "請於 15 分鐘前抵達 Kiwi Treasures & Information Centre"
        }
      ]
    },
    {
      dayNumber: 8,
      date: "2/25 (Wed)",
      shortDate: "2/25",
      title: "西海岸公路旅行",
      location: "格雷茅斯",
      drivingTime: "自駕約 5 小時",
      weatherForecast: { temp: "16-24°C", condition: "多雲" },
      accommodation: { name: "Paroa Hotel", address: "Greymouth", mapUrl: "" },
      activities: [
        { 
          type: 'restaurant', 
          time: "08:30", 
          location: "The Greedy Cow Cafe", 
          description: "特卡波熱門咖啡廳，適合開啟長途駕駛前的早晨。", 
          cuisine: "早午餐", 
          hours: "07:30 - 16:00",
          bookingStatus: 'none' 
        },
        { 
          type: 'restaurant', 
          time: "18:30", 
          location: "Monteith's Brewery", 
          description: "格雷茅斯百年釀酒廠餐廳，氣氛熱鬧。", 
          cuisine: "啤酒廠餐廳", 
          hours: "11:30 - 21:00",
          bookingStatus: 'reserved' 
        }
      ]
    },
    {
      dayNumber: 9,
      date: "2/26 (Thu)",
      shortDate: "2/26",
      title: "薄餅岩與藍色峽谷",
      location: "格雷茅斯 / 霍基蒂卡",
      drivingTime: "自駕約 1 小時 (往返)",
      weatherForecast: { temp: "18-25°C", condition: "晴" },
      accommodation: { name: "Paroa Hotel", address: "Greymouth", mapUrl: "" },
      activities: [
        { 
          type: 'restaurant', 
          time: "07:30", 
          location: "Blanchfield's Bakery", 
          description: "在地人喜愛的烘焙店。", 
          cuisine: "麵包店 / 輕食", 
          hours: "06:30 - 15:00",
          bookingStatus: 'none' 
        },
        { 
          type: 'activity', 
          time: "10:30", 
          location: "HOKITIKA GORGE", 
          description: "早餐後前往欣賞令人驚嘆的蒂芬妮藍冰河水與絕美吊橋，森林步道輕鬆好走。", 
          bookingStatus: 'none' 
        },
        { 
          type: 'restaurant', 
          time: "18:00", 
          location: "Fat Pipi Pizza", 
          description: "位於霍基蒂卡的超人氣披薩，推薦銀魚披薩 (Whitebait Pizza)。", 
          cuisine: "披薩餐廳", 
          hours: "17:00 - 20:00",
          bookingStatus: 'none' 
        }
      ]
    },
    {
      dayNumber: 10,
      date: "2/27 (Fri)",
      shortDate: "2/27",
      title: "與羊駝約會",
      location: "阿卡羅阿",
      drivingTime: "自駕約 4.5 小時",
      weatherForecast: { temp: "16-23°C", condition: "晴" },
      accommodation: { name: "Blythcliffe B&B", address: "Akaroa", mapUrl: "" },
      activities: [
        { 
          type: 'activity', 
          time: "16:00", 
          duration: "1.5 hr",
          location: "羊駝牧場 (Shamarra Alpaca Farm)", 
          description: "在法式風情小鎮與可愛羊駝親密互動。", 
          bookingStatus: 'reserved',
          platform: "Klook",
          arrivalNotice: "請於 15 分鐘前集合"
        },
        { 
          type: 'restaurant', 
          time: "18:00", 
          location: "The Akaroa Fish & Chip Shop", 
          description: "坐在港邊吃剛炸好的新鮮炸魚薯條。", 
          cuisine: "炸魚薯條", 
          hours: "11:30 - 19:00",
          bookingStatus: 'none' 
        }
      ]
    },
    {
      dayNumber: 11,
      date: "2/28 (Sat)",
      shortDate: "2/28",
      title: "基督城美食大滿貫",
      location: "基督城 CBD",
      drivingTime: "自駕約 1.5 小時",
      weatherForecast: { temp: "15-24°C", condition: "晴" },
      accommodation: { name: "Captain's Club Hotel", address: "CHC Airport", mapUrl: "" },
      activities: [
        { 
          type: 'restaurant', 
          time: "08:30", 
          location: "C1 Espresso", 
          description: "特色氣壓管送餐，一定要試試他們的咖啡。", 
          cuisine: "咖啡 / 早午餐", 
          hours: "07:00 - 15:00",
          bookingStatus: 'none' 
        },
        { 
          type: 'restaurant', 
          time: "15:00", 
          location: "Rollickin Gelato Café", 
          description: "Cashel Street 必吃的超酷義式冰淇淋。", 
          cuisine: "冰淇淋 / 甜點", 
          hours: "11:00 - 22:00",
          bookingStatus: 'none' 
        },
        { 
          type: 'restaurant', 
          time: "18:30", 
          location: "King of Snake", 
          description: "基督城最高評價亞洲融合餐廳。晚餐時段剩吧檯位置。", 
          cuisine: "亞洲融合餐廳 (高價位)", 
          hours: "17:00 - 22:00",
          bookingStatus: 'reserved',
          arrivalNotice: "晚餐時間剩吧檯有位置"
        }
      ]
    },
    {
      dayNumber: 12,
      date: "3/1 (Sun)",
      shortDate: "3/1",
      title: "告別南島：歸途",
      location: "基督城",
      drivingTime: "還車並前往機場",
      weatherForecast: { temp: "16-24°C", condition: "晴" },
      accommodation: { name: "飛機上", address: "CHC/SYD Airport", mapUrl: "" },
      activities: [
        { 
          type: 'restaurant', 
          time: "09:00", 
          location: "Little Poms Cafe", 
          description: "精緻精巧的早午餐點，享受紐西蘭最後一個悠閒早晨。", 
          cuisine: "早午餐 / 咖啡", 
          hours: "06:30 - 15:00",
          bookingStatus: 'none' 
        },
        { 
          type: 'activity', 
          time: "11:00", 
          location: "Riverside Market", 
          description: "基督城最美室內市集，各國美食應有盡有，適合採買伴手禮。", 
          cuisine: "美食市集", 
          hours: "07:00 - 21:00",
          bookingStatus: 'none' 
        },
        { 
          type: 'activity', 
          time: "13:30", 
          location: "Return Rental Car (還車)", 
          description: "前往機場租車櫃檯辦理還車手續。請檢查油箱是否加滿，並確認車內無遺漏物品。", 
          bookingStatus: 'none',
          arrivalNotice: "請預留 30 分鐘檢查時間"
        },
        { 
          type: 'transport', 
          time: "16:35", 
          location: "航班 CI9994 (CHC → SYD)", 
          description: "基督城飛往雪梨。請提早 3 小時抵達機場辦理報到手續。", 
          platform: "中華航空/澳洲航空",
          arrivalNotice: "下午 1:30 前往機場報到"
        },
        { 
          type: 'transport', 
          time: "22:10", 
          location: "航班 CI0052 (SYD → TPE)", 
          description: "雪梨飛往桃園。在雪梨機場轉機，準備回到溫暖的家。", 
          platform: "中華航空" 
        }
      ]
    },
    {
      dayNumber: 13,
      date: "3/2 (Mon)",
      shortDate: "3/2",
      title: "平安抵台",
      location: "桃園機場",
      outfitSuggestion: "休閒服裝",
      accommodation: { name: "甜蜜的家", address: "台北", mapUrl: "" },
      activities: [
        { 
          type: 'transport', 
          time: "06:00", 
          location: "桃園國際機場 (TPE)", 
          description: "平安降落。結束精彩的 2026 紐西蘭旅程。", 
          platform: "中華航空 (CI0052)" 
        }
      ]
    }
  ]
};
