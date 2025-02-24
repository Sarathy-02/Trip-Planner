export const QUESTIONS = [
  { id: 'startLocation', question: "Where are you starting your adventure from?", emoji: "🏠", icon: "MapPin", placeholder: "Enter your starting point" },
  { id: 'destination', question: "Where would you like to explore?", emoji: "✈️", icon: "Plane", placeholder: "Enter your dream destination" },
  { id: 'travelers', question: "How many adventurers are joining?", emoji: "👥", icon: "Users", placeholder: "Number of travelers" },
  { id: 'startDate', question: "When do you want to begin this journey?", emoji: "📅", icon: "Calendar", placeholder: "Select start date" },
  { id: 'numDays', question: "How many days will your trip last?", emoji: "⏳", icon: "Clock", placeholder: "Number of days" },
  { id: 'budget', question: "What's your budget for this adventure?", emoji: "💰", icon: "DollarSign", placeholder: "Enter your budget" },
  { id: 'currencyType', question: "Which currency will you use?", emoji: "💵", icon: "Wallet", placeholder: "" }
];

export const CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD"];

export const INITIAL_ANSWERS = {
  startLocation: '',
  destination: '',
  travelers: '',
  startDate: '',
  numDays: '',
  budget: '',
  currencyType: 'USD'
};

export const THEME_OPTIONS = {
  light: {
      mainBg: 'bg-gradient-to-br from-blue-50 to-purple-50',
      cardBg: 'bg-white',
      textColor: 'text-gray-900',
      inputBg: 'bg-gray-50',
      borderColor: 'border-gray-200'
  },
  dark: {
      mainBg: 'bg-gray-900',
      cardBg: 'bg-gray-800',
      textColor: 'text-white',
      inputBg: 'bg-gray-700',
      borderColor: 'border-gray-600'
  }
};

export const AI_PROMPT = `  
Generate a detailed travel itinerary in JSON format based on the following user inputs:  
**Start Location is {start_location}, Destination is {destination}, Number of People is {num_people},  
Start Date is {start_date}, Number of Days is {num_days}, Budget is {budget} in {currency}.**  

The itinerary must use only real-world data, ensuring the best transport options such as flights, trains,  
buses, or rental cars based on actual schedules, prices, and providers. Transport details should include:  
- Transport type  
- Provider name  
- Departure and arrival times  
- Travel duration  
- Ticket price in the specified currency  
- Booking links  

Accommodation should be dynamic, with hotel stays changing as the user moves between different cities or  
regions within the destination. Provide real hotel details, including:  
- Hotel name  
- Address  
- Price per night  
- Google rating  
- Check-in/check-out times  
- Booking links  

The itinerary should specify exact check-in and check-out times for each hotel. If the trip involves multiple  
locations, include intercity travel and hotel transitions accordingly.  

The daily schedule must follow a **structured time-based format**, ensuring a logical and seamless travel  
experience. Each activity should include a **specific time range**, such as:  

**06:00 AM:** Arrive at destination  
- **07:00 AM - 08:00 AM:** Breakfast at [breakfast_restaurant]  
- **08:30 AM - 10:30 AM:** Visit [landmark]  
- **11:00 AM - 12:30 PM:** Travel to [next_destination] by [transport_type]  
- **01:00 PM - 02:00 PM:** Lunch at [lunch_restaurant]  
- **02:30 PM - 05:00 PM:** Explore [tourist_spot]  
- **06:00 PM - 07:30 PM:** Dinner at [dinner_restaurant]  
- **08:00 PM:** Check-in at [hotel_name]  
- **Next morning:** Check-out at [check_out_time], continue the journey  

Each scheduled activity must have real-world data, including:  
- Place name  
- Address  
- Geo-coordinates (latitude, longitude)  
- Google rating  
- Opening and closing times  
- Entry fee in {currency} (if applicable)  
- Image URL  
- Official website or booking link  

The itinerary should ensure smooth transitions between locations, factoring in realistic travel durations and  
waiting times.  

The plan should cover **arrival, meals, transport, sightseeing, accommodation, and check-ins/check-outs**  
in a well-organized flow. If the itinerary involves multiple cities, intercity travel should be scheduled  
with real transport providers, and accommodations should be updated accordingly.  

The entire plan must fit within the given budget, covering all expenses such as transport, accommodation,  
food, and sightseeing.  

The response must be formatted as **valid JSON**, ensuring all details, including **coordinates, images,  
links, and schedules,** are sourced from **real-world data only, without placeholders or fictional content.**

If the  the user's budget is insufficient for the itinerary, the response should indicate the minimum budget required for cheap,expensive and moderate.
`;

