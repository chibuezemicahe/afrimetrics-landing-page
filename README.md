# Afrimetrics Landing Page

A modern landing page for Afrimetrics, a platform providing visual analytics for Africa's financial markets. This project includes a responsive frontend with a waitlist form that submits data to Google Sheets and redirects users to a thank you page.

## Features

- Responsive design optimized for all device sizes
- Interactive UI elements with smooth animations
- Waitlist form with client-side validation
- Google Sheets integration for form submissions
- Thank you page for successful submissions
- Ping mechanism to keep Render free tier instance active
- Modern CSS with gradients, animations, and visual effects

## Project Structure

```
├── public/               # Frontend assets
│   ├── css/             # CSS stylesheets
│   ├── js/              # JavaScript files
│   ├── images/          # Image assets
│   └── index.html       # Main HTML file
├── server.js            # Express.js server configuration
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd afrimetrics-landing-page
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   PORT=3001
   ```

### Running the Application

#### Development Mode

```bash
npm run dev
```

This will start the server with nodemon, which automatically restarts the server when changes are detected.

#### Production Mode

```bash
npm start
```

### Accessing the Application

Open your browser and navigate to `http://localhost:3001` (or the port you specified in the `.env` file).

## Google Sheets Integration

The waitlist form submits data directly to a Google Sheet using Google Apps Script. To set up the integration:

1. Create a new Google Sheet with the following headers in the first row:
   - Timestamp
   - Full Name
   - Email
   - Phone

2. Open the Script Editor (Extensions > Apps Script)

3. Copy the code from `google-sheet-script.js` into the script editor

4. Deploy the script as a web app:
   - Click Deploy > New deployment
   - Select type: Web app
   - Set "Who has access" to "Anyone"
   - Click Deploy
   - Copy the web app URL

5. Update the `scriptURL` variable in `public/js/main.js` with your web app URL

## Ping Mechanism

To prevent the Render free tier instance from sleeping, a ping mechanism has been implemented:

- The server has a `/ping` endpoint that responds with "pong"
- A client-side script (`public/js/ping.js`) pings the server every 5 minutes
- This script is included in all pages to ensure the server stays active

## Future Enhancements

- Database integration for storing waitlist submissions
- Email confirmation for waitlist subscribers
- Admin dashboard for managing waitlist entries
- Social media integration
- Analytics tracking

## License

This project is licensed under the ISC License - see the LICENSE file for details.