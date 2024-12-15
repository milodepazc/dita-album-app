
# Dita Album App

This web application displays the top 100 albums from iTunes, built with **React** and **TypeScript**. It was designed to provide a seamless, responsive user experience while showcasing solid engineering practices, including testing, performance optimization, and code maintainability. The app focuses on delivering a clean and functional UI with dynamic search and filtering options. 

It highlights **best practices** such as lazy loading, memoization, infinite scroll for better performance and ensuring the UI is fully responsive across devices. It also incorporates test coverage for all core functionality to maintain high-quality standards.


## Table of Contents
- [License](#license)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Features](#features)
- [Performance Considerations](#performance-considerations)
- [Testing](#testing)
- [Development Commands](#development-commands)
- [Environment Variables](#environment-variables)
- [Album Filtering & Performance Enhancements](#album-filtering)

## License

This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this software in compliance with the license terms.

## Installation

To get started with the project, clone the repository and install the dependencies:

```bash
git clone https://github.com/milodepazc/dita-album-app.git
cd dita-album-app
npm install
```

You’ll also need to set up environment variables (explained below).

## Running the App

To run the app in development mode:

```bash
npm start
```

The app will run on [http://localhost:3000](http://localhost:3000).

## Features

- **Top 100 Albums**: Fetches and displays the top 100 albums from the iTunes API.
- **Responsive Design**: Built with **Bootstrap** to ensure it works seamlessly across devices.
- **Search and Filtering**: Users can search and filter albums by title, artist, genre, and year of release.
- **Sorting**: Albums can be sorted by ascending, descending, or as listed from the iTunes feed.
- **Cross-browser Support**: Verified to work across major browsers for consistent behavior.
- **(Special Feature) Advanced Search and Performance Optimization**: More details in the separate file SurpriseFeature.md.

## Testing

The app includes comprehensive unit tests written with **Jest** and **React Testing Library** to ensure the functionality works as expected.

To run the tests:

```bash
npm test
```

### Unit Tests

The tests are organized in the `src/tests` directory and cover core app functionalities:

- **Fetching and rendering albums**: Ensures that the app fetches data from the iTunes API and displays it correctly.
- **Search and filter functionality**: Verifies that albums can be searched and filtered by artist, genre, and year range.
- **Sorting behavior**: Tests to ensure albums are sorted as expected when different sort options are selected.

### Current Test Cases
- **Album fetching and display**: Confirms that albums are fetched and rendered on the page.
- **Filtering albums by search query**: Tests the search functionality to filter albums based on title and artist input.
- **Year range and genre filtering**: Verifies accuracy of album filtering by genre and release year.
- **Sorting albums**: Checks that albums are sorted in the correct order based on the user's selection.
- **Component Interaction**: Checks that components interact correctly to provide a smooth experience, especially with filter resets and sorting changes.

## Development Commands

I use the following commands to maintain code quality, formatting, and testing:

### **Linting**
To check for code quality and ensure the code follows best practices using **ESLint**:
```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

### **Code Formatting**
To format the codebase using **Prettier**:

```bash
npm run format
```

## Environment Variables

The app uses an environment variable to configure the iTunes API URL. Create a `.env` file in the root of the project, or copy the `.env.example` file provided.

Your `.env` file should include:

```plaintext
REACT_APP_ITUNES_API_URL=https://itunes.apple.com/us/rss/topalbums/limit=100/json
```

Once the `.env` file is created, restart the server to apply the changes.


## Album Filtering

This application goes beyond basic album display by incorporating advanced filtering capabilities, great user experience improvements and thoughtful performance optimizations. These features work together to create a very nice, interactive and efficient application.

### Core Features:
- **Advanced Filtering**: Users can search albums by name or artist, filter by genre and narrow results down based on the release year. The filters dynamically adapt to available albums, ensuring the most relevant options are always presented.
  
- **Dynamic Sorting**: Multiple sorting options (Ascending, Descending, and As Listed) allow users to easily browse through albums in their preferred order.

### Performance Optimizations:
- **Lazy Loading**: Components like the album grid and filter sections are lazy-loaded, reducing the initial load time and improving the overall performance of the app.
  
- **Infinite Scroll**: Albums are loaded in chunks as the user scrolls, preventing the app from becoming unresponsive when dealing with large datasets. This ensures that only a portion of albums is loaded at a time, improving memory and rendering performance.
  
- **Memoization**: The app uses memoization techniques to cache and reuse expensive operations (like filtering and sorting albums) when possible, further improving rendering performance and responsiveness.

### User Experience:

- **Mobile Responsiveness**: The app is fully responsive, ensuring a great experience across devices of all sizes. Filters and sorting options are presented in an intuitive way, making it easy to navigate both on desktop and mobile.
  
- **Cross-browser Compatibility**: This app has been tested and optimized for consistent behavior across all modern browsers.

These advanced filtering features mixed with performance optimizations and a focus on user experience, make this application highly scalable, maintainable, and ready for real-world use cases. 