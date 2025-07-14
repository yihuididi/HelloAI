# HelloAI

## Starting app on localhost:

1. Clone this repo
1. Run `cd HelloAI` to change directory into `HelloAI/`
1. Run `npm install` to install node dependencies
1. Run `cd backend` to change directory into `backend/`
1. Create a `.env` file in `backend/` and fill up the necessary environment fields:
   - PORT=<your_port>
   - MONGO_URI=<your_mongo_connection_string>
   - JWT_SECRET=<your_jwt_secret>
   - QNA_MODEL_NAME=<your_choice_of_sonar_model>
   - PERPLEXITY_API_KEY=<your_perplexity_api_key>
1. Run `npm run dev` to start the backend server. You should see:
   `Server started at http://localhost:<PORT>
    MongoDB connected: <connection_info>`
1. On a separate terminal, (from `HelloAI/`) run `cd frontend/` to change directory into `frontend/`
1. Run `npm run dev` to start the website. You should see:
   `VITE <version #> ready in <time> ms`
