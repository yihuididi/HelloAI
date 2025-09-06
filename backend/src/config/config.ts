import dotenv from 'dotenv';
dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  PYTHON_SERVICE_URL: process.env.PYTHON_SERVICE_URL,
  MONGO_URI: process.env.MONGO_URI!,
  JWT_SECRET: process.env.JWT_SECRET!,
  QNA_MODEL_NAME: process.env.QNA_MODEL_NAME!,
  PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY!,
  R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID!,
  R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID!,
  R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY!,
  R2_BUCKET_NAME: process.env.R2_BUCKET_NAME!,
  AZURE_SPEECH_KEY: process.env.AZURE_SPEECH_KEY!,
  AZURE_REGION: process.env.AZURE_REGION!,
  NODE_ENV: process.env.NODE_ENV || 'development'
};

export default config;