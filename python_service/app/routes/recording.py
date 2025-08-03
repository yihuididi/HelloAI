from fastapi import APIRouter, UploadFile, File
from app.services.recording.whisper import transcribe_audio

router = APIRouter(prefix="/recording")

@router.post("/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    return await transcribe_audio(audio)