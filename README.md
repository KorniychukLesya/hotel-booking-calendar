# hotel-booking-calendar

This project is a hotel booking calendar built using Vue.js 2 and Vuex. It displays weekly reservations for each apartment, allowing users to navigate forward, backward, and return to the current week. Reservations details are fetched from a provided array and displayed in the calendar grid.

## Requirements

- Vue 2: Utilize Vue.js to create components and manage the UI.
- Vuex: Use Vuex for state management to handle reservations data and navigation state.
Calendar Display: Display reservations with a solid line from the start to the end date, showing the client's name. Each row in the table represents an apartment, and each column represents a day of the week (Mon-Sun).
Navigation Buttons: Implement three navigation buttons: "Forward" (move a week ahead), "Back" (move a week ago), "Today" (return to the current week).
Reservation Time: Consider check-in and check-out occurring from the middle of the day. Reservations start from the middle of the start date and end in the middle of the end date.
Reservation Pop-up: Implement a pop-up displaying reservation details when a user clicks on a reservation line. Display information such as the client's name, apartment details, start date, and end date.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


