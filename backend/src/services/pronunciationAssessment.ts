import { PronunciationWord, Title } from '../../../shared/types/recording.js';
import config from '../config/config.js';
import { getTitle } from '../utils/getTitle.js';
import fs from 'fs';
import sdk from 'microsoft-cognitiveservices-speech-sdk';

const GET_TIP: Record<string, string> = {
  i: "For the /i/ (ee) vowel, your tongue should be high and close to the roof of your mouth, as in 'see'. Lips should be spread.",
  ɪ: "For the /ɪ/ (ih) vowel, the tongue is slightly lower than /i/, as in 'bit'. Lips should be relaxed.",
  e: "For the /e/ vowel, the tongue is mid-high and lips spread, like in some non-American 'bait' pronunciations.",
  ɛ: "For the /ɛ/ (eh) vowel, your tongue and jaw should be at a medium height: lower than /ɪ/, as in 'it,' but higher than /æ/, as in 'bad.'",
  æ: "For the /æ/ (a) vowel, open your mouth wide and lower your jaw more than for /ɛ/, as in 'cat'.",
  ɑ: "For the /ɑ/ (ah) vowel, the tongue is low and the mouth is wide open, as in 'father'.",
  ʌ: "For the /ʌ/ (uh) vowel, the tongue is in a mid-central position, as in 'cup'.",
  ə: "For the /ə/ (schwa), the tongue is relaxed and centered, used in unstressed syllables like the 'a' in 'sofa'.",
  u: "For the /u/ (oo) vowel, the tongue is high and back with rounded lips, as in 'food'.",
  ʊ: "For the /ʊ/ (uh as in book) vowel, the tongue is high-mid back and lips rounded, as in 'good'.",
  o: "For the /o/ vowel, lips are rounded and the tongue is mid-high and back, like in some accents of 'go'.",
  ɔ: "For the /ɔ/ (aw) vowel, the tongue is back and slightly lower, lips rounded, as in 'thought'.",
  ɜ: "For the /ɜ/ (er) vowel, the tongue is mid-central, lips slightly rounded, often with r-coloring.",
  r: "Your mouth should be almost closed for /r/. This will help you get your tongue up high. People also generally round their lips for /r/.",
  l: "For /l/, the tongue touches the alveolar ridge just behind the upper front teeth. The sides of the tongue allow air to flow around.",
  m: "For /m/, close your lips and let air flow through your nose, as in 'man'.",
  n: "For /n/, touch your tongue to the alveolar ridge and let air flow through your nose, as in 'no'.",
  ŋ: "For /ŋ/, raise the back of your tongue to the soft palate and allow air through the nose, as in 'sing'.",
  p: "For /p/, press your lips together and release with a burst of air, as in 'pen'.",
  b: "For /b/, press your lips together and release with voice, as in 'bat'.",
  t: "For /t/, touch the tip of your tongue to the alveolar ridge and release a burst of air, as in 'top'.",
  d: "For /d/, similar to /t/ but with vocal cord vibration, as in 'dog'.",
  k: "For /k/, raise the back of your tongue to the soft palate and release air, as in 'cat'.",
  g: "For /g/, similar to /k/ but voiced, as in 'go'.",
  f: "For /f/, touch your top teeth to your bottom lip and blow air, as in 'fun'.",
  v: "For /v/, like /f/ but with vocal cord vibration, as in 'van'.",
  θ: "For /θ/, place your tongue between your teeth and blow air, as in 'think'.",
  ð: "For /ð/, same tongue position as /θ/ but voiced, as in 'this'.",
  s: "For /s/, direct air over the edge of your tongue towards the teeth, as in 'see'.",
  z: "For /z/, same as /s/ but voiced, as in 'zoo'.",
  ʃ: "For /ʃ/, round your lips slightly and let air pass over the tongue to the palate, as in 'shoe'.",
  ʒ: "For /ʒ/, like /ʃ/ but voiced, as in the 's' in 'measure'.",
  tʃ: "For /tʃ/, combine a /t/ and /ʃ/ sound, as in 'chop'.",
  dʒ: "For /dʒ/, combine a /d/ and /ʒ/ sound, as in 'judge'.",
  h: "For /h/, exhale sharply through an open mouth and throat, as in 'hat'.",
  w: "For /w/, round your lips and raise the back of the tongue as in 'we'.",
  oʊ: "For the /oʊ/ diphthong, start with your tongue in a mid-back position with rounded lips, similar to /o/, and glide toward a higher position, as in 'go' or 'no'. Keep your lips rounded and slightly move your tongue upward during the glide.",
  aɪ: "For the /aɪ/ diphthong, start with your mouth open and tongue low and centered (like /ɑ/), then glide your tongue forward and up toward /ɪ/, as in 'my', 'eye', or 'bite'.",
  ɡ: "For /ɡ/, raise the back of your tongue to the soft palate and release with vocal cord vibration, as in 'go' or 'give'. It's the voiced counterpart to /k/.",
  ɝ: "For the /ɝ/ (as in 'bird' or 'learn') vowel, position your tongue in the middle of your mouth, slightly raised, and curl the tongue tip upward without touching the roof. Lips are slightly rounded, and the sound is 'r-colored' — meaning it ends with an /r/-like quality.",
  aʊ: "For the /aʊ/ diphthong, start with your mouth open and your tongue low and central (similar to /a/), then glide your tongue upward and slightly back toward /ʊ/, as in 'now', 'house', or 'out'. Lips should start unrounded and gradually round during the glide.",
  eɪ: "For the /eɪ/ diphthong, start with your tongue in a mid-front position and lips unrounded, similar to /e/, then glide upward slightly toward /ɪ/. This diphthong appears in words like 'say', 'day', and 'face'. Keep the tongue movement subtle and controlled.",
  ɔɪ: "For the /ɔɪ/ diphthong, start with your tongue low-mid and slightly back (like /ɔ/), with rounded lips, then glide forward and upward toward /ɪ/, as in 'boy', 'toy', or 'choice'. Unround your lips slightly during the glide.",
};

const GET_DESCRIPTION: Record<Title, string> = {
  Beginner: 'Start your journey by practicing basic words and sounds. Focus on clear, slow speech and repeat after native speakers to build a strong foundation.',
  Elementary: 'Make a list of “tricky” words or sentences you find hard to pronounce, then say them out loud here. You\'ll get immediate feedback on your pronunciation!',
  Intermediate: 'You\'re getting the hang of it! Now focus on stress and rhythm. Try reading longer sentences and work on sounding more natural and confident.',
  Advanced: 'You\'re almost there! Focus on refining intonation patterns, connected speech, and reducing your accent. Practice with longer conversations or presentations.',
  Fluent: 'Excellent work! Your pronunciation is clear, natural, and easy to understand. Keep maintaining it by speaking regularly and exploring different speaking styles.'
};

export async function analyzePronunciationFile(
  file: Express.Multer.File,
  script: string
) {
  console.log('[DEBUG] analyzePronunciationFile called');
  console.log('[DEBUG] File path:', file?.path);
  console.log('[DEBUG] Script length:', script?.length);

  return new Promise((resolve, reject) => {
    try {
      if (!file.path || !fs.existsSync(file.path)) {
        console.error('[ERROR] Audio file not found:', file?.path);
        throw new Error('Audio file not found on disk.');
      }
      console.log('[DEBUG] Audio file found on disk.');

      const audioBuffer = fs.readFileSync(file.path);
      console.log('[DEBUG] Audio file read. Size:', audioBuffer.length, 'bytes');

      const pushStream = sdk.AudioInputStream.createPushStream();
      console.log('[DEBUG] Created pushStream');

      pushStream.write(
        audioBuffer.buffer.slice(
          audioBuffer.byteOffset,
          audioBuffer.byteOffset + audioBuffer.byteLength
        )
      );
      console.log('[DEBUG] Audio written to pushStream');
      pushStream.close();
      console.log('[DEBUG] pushStream closed');

      const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        config.AZURE_SPEECH_KEY,
        config.AZURE_REGION
      );
      console.log('[DEBUG] Speech config created with region:', config.AZURE_REGION);

      speechConfig.speechRecognitionLanguage = 'en-US';

      const assessmentConfig = new sdk.PronunciationAssessmentConfig(
        script,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Phoneme,
        true
      );
      assessmentConfig.enableProsodyAssessment = true;
      assessmentConfig.phonemeAlphabet = 'IPA';
      console.log('[DEBUG] PronunciationAssessmentConfig created');

      const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
      console.log('[DEBUG] Recognizer created');

      assessmentConfig.applyTo(recognizer);
      console.log('[DEBUG] Assessment config applied to recognizer');

      let totalScore = 0;
      let totalWords = 0;
      const words: PronunciationWord[] = [];

      recognizer.recognized = (_, e) => {
        console.log('[DEBUG] recognizer.recognized fired');
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
          console.log('[DEBUG] Recognized speech:', e.result.text);
          try {
            const json = e.result.properties.getProperty(
              sdk.PropertyId.SpeechServiceResponse_JsonResult
            );
            console.log('[DEBUG] Raw JSON result length:', json.length);

            const res = JSON.parse(json);
            const nbest = res.NBest[0];

            if (nbest.Words) {
              console.log('[DEBUG] Words recognized:', nbest.Words.length);
              totalScore += nbest.PronunciationAssessment.PronScore * nbest.Words.length;
              totalWords += nbest.Words.length;

              // Build word JSON
              nbest.Words.forEach((w: any) => {
                console.log('[DEBUG] Word:', w.Word, 'Score:', w.PronunciationAssessment.AccuracyScore);

                // Build phonemes JSON for each word
                const phonemes = w.Phonemes.map((p: any) => {
                  const phoneme = p.Phoneme;
                  const phonemeScore = p.PronunciationAssessment.AccuracyScore;
                  const tip = phonemeScore < 70 ? GET_TIP[phoneme] : null;

                  return {
                    phoneme: phoneme,
                    score: phonemeScore,
                    ...(tip ? { tip } : {}),
                  };
                });

                words.push({
                  text: w.Word,
                  score: w.PronunciationAssessment.AccuracyScore,
                  phonemes,
                });
              });
            } else {
              console.log('[DEBUG] No words in NBest result');
            }
          } catch (err) {
            console.error('[ERROR] Failed to parse recognition result JSON:', err);
          }
        } else {
          console.log('[DEBUG] Recognition result reason:', e.result.reason);
        }
      };

      recognizer.sessionStopped = () => {
        console.log('[DEBUG] Session stopped. Total words:', totalWords, 'Total score:', totalScore);
        recognizer.stopContinuousRecognitionAsync(() => {
          recognizer.close();
          console.log('[DEBUG] Recognizer closed. Resolving promise.');

          // Build pronunciation result JSON
          const overallScore = Math.round(totalScore / totalWords);
          const title = getTitle(overallScore);
          const description = GET_DESCRIPTION[title];
          const result = {
            score: overallScore,
            title: title,
            description: description,
            transcript: words
          }
          resolve(result);
        });
      };

      recognizer.canceled = (_, e) => {
        console.log('[DEBUG] Canceled event. Reason:', e.reason);

        if (e.reason === sdk.CancellationReason.EndOfStream) {
          // Normal case, don't treat as error
          console.log('[DEBUG] Cancellation due to EndOfStream (safe to ignore)');
          return;
        }

        if (e.reason === sdk.CancellationReason.Error) {
          console.error('[ERROR] Recognition canceled due to error:', e.errorDetails);
          recognizer.stopContinuousRecognitionAsync(() => {
            recognizer.close();
            reject(new Error(`Recognition canceled: [${e.reason}] ${e.errorDetails}`));
          });
        }
      };

      recognizer.startContinuousRecognitionAsync(
        () => {
          console.log('[DEBUG] Recognition started successfully');
        },
        (err) => {
          console.error('[ERROR] Failed to start recognition:', err);
          reject(new Error('Failed to start recognition: ' + err));
        }
      );
    } catch (outerErr) {
      console.error('[ERROR] analyzePronunciationFile outer exception:', outerErr);
      reject(outerErr);
    }
  });
}
