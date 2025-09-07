from app.config.logger import logger
from fastapi import UploadFile
import tempfile
import whisper

model = whisper.load_model("base")

async def transcribe_audio(audio: UploadFile) -> str:
    logger.info(f"Starting transcription for file: {audio.filename}")
    audio_bytes = await audio.read()
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as f:
        f.write(audio_bytes)
        f.flush()
        result = model.transcribe(f.name, language="en")
        logger.info(f"Transcription completed for file: {audio.filename}")
        return result["text"].strip()