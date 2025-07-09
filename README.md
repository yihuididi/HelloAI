# HelloAI

## Starting app on localhost:

1. Clone this repo
1. Make sure your current working directory is `HelloAI/`. Then run `npm install` to install backend node dependencies
1. Create a `.env` file in `HelloAI/` and fill up the necessary environment fields:
   - PORT=<your_port>
   - MONGO_URI=<your_mongo_connection_string>
   - JWT_SECRET=<your_jwt_secret>
1. Run `npm run dev` to start the backend server. You should see:
   `Server started at http://localhost:<PORT>
    MongoDB connected: <connection_info>`
1. On a separate terminal, `cd` to `frontend/`
1. Run `npm install` to install frontend node dependencies after changing directory to `frontend/`
1. Run `npm run dev` to start the website. You should see:
   `VITE <version #> ready in <time> ms`
