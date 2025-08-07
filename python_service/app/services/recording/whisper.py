from fastapi import UploadFile
import tempfile
import whisper

model = whisper.load_model("base")

async def transcribe_audio(audio: UploadFile) -> str:
    audio_bytes = await audio.read()
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as f:
        f.write(audio_bytes)
        f.flush()
        result = model.transcribe(f.name, language="en")
        return result["text"].strip()