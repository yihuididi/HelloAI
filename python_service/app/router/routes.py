from fastapi import APIRouter, UploadFile, File
from python_service.app.services.recording.whisper import transcribe_audio

router = APIRouter(prefix="/recording")

@router.post("/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    audio_bytes = await audio.read()
    return transcribe_audio(audio_bytes)