# SL2

## Folder contents

1. **backend**

This folder contains the API code.
- Express.js App http://localhost:8000
- MongoDB Integration
- Swagger UI Documentation http://localhost:8000/api-docs or https://api.dragoffs.com/api-docs/

2. **client**

This folder contains the frontend code.
- Next.js App http://localhost:3000/

## Requirements

1. [Git](https://git-scm.com/)
2. [Node.js](https://nodejs.org/en/) _(v.16.16.0 or latest)_

## How to run

### Linux 

1. Clone this repo `git clone https://github.com/Dragoffs/SL2.git`
2. Move into the directory:`cd SL2`
3. Run `npm start`
4. Open `localhost:3000` and you should be able to see the app.

### Windows

1. Clone this repo `git clone https://github.com/Dragoffs/SL2.git`
2. Move into the directory SL2: `cd SL2`
3. Run `npm install`
4. Run `npm run windows`
5. Open `localhost:3000` and you should be able to see the app.

## How to run locally

### Set up

1. Clone this repo `git clone https://github.com/Dragoffs/SL2.git`
2. Move into the directory:`cd SL2`
3. Move into the directory: `cd client`
4. Open up `.env.local`
5. Swap the values between `NEXT_PUBLIC_API_ROUTE` and `NEXT_PUBLIC_API_LOCAL`

### Linux 

1. Move to the root directory `SL2`
2. Run `npm start`
3. Open `localhost:3000` and you should be able to see the app.

### Windows

1. Move to the root directory `SL2`
2. Run `npm install`
3. Run `npm run windows`
4. Open `localhost:3000` and you should be able to see the app.
