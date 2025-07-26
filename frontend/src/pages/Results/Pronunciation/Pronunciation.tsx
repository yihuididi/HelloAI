import CircularProgressBar from '../../../components/CircularProgressBar/CircularProgressBar';
import HorizontalProgressBar from '../../../components/HorizontalProgressBar/HorizontalProgressBar';
import useAdjustContainerPosition from '../../../hooks/useAdjustTooltipPosition';
import useIsMobile from '../../../hooks/useIsMobile';
import lstyles from '../Layout.module.css';
import PopOver from '../PopOver/PopOver';
import Transcript from '../Transcript/Transcript';
import tstyles from '../Transcript/Transcript.module.css';
import styles from './Pronunciation.module.css';
import React, { useRef, useState } from 'react';

const data = {
  score: 75,
  title: 'Advanced',
  description: 'You\'re almost there! Focus on refining intonation patterns, connected speech, and reducing your accent. Practice with longer conversations or presentations.',
  transcript: [
    {
      text: "Lorem ",
      score: 78,
      phonemes: [
        { phoneme: "l", score: 80, tip: "For /l/, the tongue touches the alveolar ridge just behind the upper front teeth." },
        { phoneme: "ɔ", score: 75, tip: "For the /ɔ/ (aw) vowel, the tongue is back and slightly lower, lips rounded, as in 'thought'." },
        { phoneme: "r", score: 85, tip: "Your mouth should be almost closed for /r/. This will help you get your tongue up high." },
        { phoneme: "ə", score: 60, tip: "For the /ə/ (schwa), the tongue is relaxed and centered, used in unstressed syllables like the 'a' in 'sofa'." },
        { phoneme: "m", score: 90, tip: "For /m/, close your lips and let air flow through your nose, as in 'man'." },
      ],
    },
    {
      text: "ipsum ",
      score: 64,
      phonemes: [
        { phoneme: "ɪ", score: 55, tip: "For the /ɪ/ (ih) vowel, the tongue is slightly lower than /i/, as in 'bit'." },
        { phoneme: "p", score: 75, tip: "For /p/, press your lips together and release with a burst of air." },
        { phoneme: "s", score: 80, tip: "For /s/, direct air over the edge of your tongue towards the teeth." },
        { phoneme: "ə", score: 65, tip: "For the /ə/ (schwa), the tongue is relaxed and centered, used in unstressed syllables." },
        { phoneme: "m", score: 55, tip: "For /m/, close your lips and let air flow through your nose." },
      ],
    },
    {
      text: "dolor ",
      score: 69,
      phonemes: [
        { phoneme: "d", score: 85, tip: "For /d/, similar to /t/ but with vocal cord vibration." },
        { phoneme: "o", score: 62, tip: "For the /o/ vowel, lips are rounded and the tongue is mid-high and back." },
        { phoneme: "l", score: 80, tip: "For /l/, the tongue touches the alveolar ridge just behind the upper front teeth." },
        { phoneme: "ɝ", score: 50, tip: "For the /ɝ/ (as in 'bird'), position your tongue mid-mouth and curl the tip upward." },
      ],
    },
    {
      text: "sit ",
      score: 83,
      phonemes: [
        { phoneme: "s", score: 88, tip: "For /s/, direct air over the edge of your tongue towards the teeth." },
        { phoneme: "ɪ", score: 78, tip: "For the /ɪ/ (ih) vowel, the tongue is slightly lower than /i/, as in 'bit'." },
        { phoneme: "t", score: 84, tip: "For /t/, touch the tip of your tongue to the alveolar ridge and release a burst of air." },
      ],
    },
    {
      text: "amet ",
      score: 58,
      phonemes: [
        { phoneme: "æ", score: 55, tip: "For /æ/, open your mouth wide and lower your jaw more than for /ɛ/, as in 'cat'." },
        { phoneme: "m", score: 60, tip: "For /m/, close your lips and let air flow through your nose." },
        { phoneme: "ɛ", score: 50, tip: "For /ɛ/, your tongue and jaw should be at medium height." },
        { phoneme: "t", score: 70, tip: "For /t/, touch the tip of your tongue to the alveolar ridge and release a burst of air." },
      ],
    },
    {
      text: "consectetur ",
      score: 85,
      phonemes: [
        { phoneme: "k", score: 80, tip: "For /k/, raise the back of your tongue to the soft palate and release air." },
        { phoneme: "ɑ", score: 88, tip: "For /ɑ/, the tongue is low and the mouth is wide open, as in 'father'." },
        { phoneme: "n", score: 90, tip: "For /n/, touch your tongue to the alveolar ridge and let air flow through your nose." },
        { phoneme: "s", score: 85, tip: "For /s/, direct air over the edge of your tongue towards the teeth." },
        { phoneme: "ɛ", score: 87, tip: "For /ɛ/, your tongue and jaw should be at medium height." },
        { phoneme: "k", score: 80, tip: "For /k/, raise the back of your tongue to the soft palate and release air." },
        { phoneme: "t", score: 90, tip: "For /t/, touch the tip of your tongue to the alveolar ridge and release a burst of air." },
        { phoneme: "ɝ", score: 77, tip: "For /ɝ/, position your tongue mid-mouth and curl the tip upward." },
      ],
    },
    {
      text: "elit ",
      score: 92,
      phonemes: [
        { phoneme: "ɛ", score: 95, tip: "For /ɛ/, your tongue and jaw should be at medium height." },
        { phoneme: "l", score: 90, tip: "For /l/, the tongue touches the alveolar ridge just behind the upper front teeth." },
        { phoneme: "ɪ", score: 93, tip: "For the /ɪ/ (ih) vowel, the tongue is slightly lower than /i/." },
        { phoneme: "t", score: 91, tip: "For /t/, touch the tip of your tongue to the alveolar ridge and release a burst of air." },
      ],
    },
    {
      text: "sed ",
      score: 65,
      phonemes: [
        { phoneme: "s", score: 60, tip: "For /s/, direct air over the edge of your tongue towards the teeth." },
        { phoneme: "ɛ", score: 67, tip: "For /ɛ/, your tongue and jaw should be at medium height." },
        { phoneme: "d", score: 70, tip: "For /d/, similar to /t/ but with vocal cord vibration." },
      ],
    },
    {
      text: "do ",
      score: 80,
      phonemes: [
        { phoneme: "d", score: 85, tip: "For /d/, similar to /t/ but with vocal cord vibration." },
        { phoneme: "oʊ", score: 75, tip: "For the /oʊ/ diphthong, start mid-back and glide higher with rounded lips." },
      ],
    },
    {
      text: "eiusmod ",
      score: 55,
      phonemes: [
        { phoneme: "i", score: 60, tip: "For the /i/ (ee) vowel, tongue should be high and close to the roof of your mouth." },
        { phoneme: "ə", score: 55, tip: "For /ə/, the tongue is relaxed and centered." },
        { phoneme: "s", score: 50, tip: "For /s/, direct air over the edge of your tongue towards the teeth." },
        { phoneme: "m", score: 45, tip: "For /m/, close your lips and let air flow through your nose." },
        { phoneme: "ɑ", score: 50, tip: "For /ɑ/, the tongue is low and the mouth is wide open." },
        { phoneme: "d", score: 60, tip: "For /d/, similar to /t/ but with vocal cord vibration." },
      ],
    },
    {
      text: "tempor ",
      score: 90,
      phonemes: [
        { phoneme: "t", score: 92, tip: "For /t/, touch the tip of your tongue to the alveolar ridge." },
        { phoneme: "ɛ", score: 85, tip: "For /ɛ/, your tongue and jaw should be at medium height." },
        { phoneme: "m", score: 90, tip: "For /m/, close your lips and let air flow through your nose." },
        { phoneme: "p", score: 89, tip: "For /p/, press your lips together and release with a burst of air." },
        { phoneme: "ɝ", score: 87, tip: "For /ɝ/, tongue mid-mouth, slightly raised, curl tip upward." },
      ],
    },
    {
      text: "incididunt ",
      score: 72,
      phonemes: [
        { phoneme: "ɪ", score: 70, tip: "For the /ɪ/ (ih) vowel, the tongue is slightly lower than /i/." },
        { phoneme: "n", score: 75, tip: "For /n/, touch your tongue to the alveolar ridge." },
        { phoneme: "s", score: 65, tip: "For /s/, direct air over the edge of your tongue." },
        { phoneme: "ɪ", score: 70, tip: "For /ɪ/, tongue is slightly lower than /i/." },
        { phoneme: "d", score: 60, tip: "For /d/, vocal cord vibration." },
        { phoneme: "ə", score: 68, tip: "Relaxed, central tongue position." },
        { phoneme: "n", score: 75, tip: "Let air flow through your nose." },
        { phoneme: "t", score: 72, tip: "Tip of your tongue to the alveolar ridge." },
      ],
    },
    {
      text: "ut ",
      score: 95,
      phonemes: [
        { phoneme: "ʌ", score: 93, tip: "Tongue is mid-central, as in 'cup'." },
        { phoneme: "t", score: 96, tip: "Tip of the tongue to the alveolar ridge." },
      ],
    },
    {
      text: "labore ",
      score: 81,
      phonemes: [
        { phoneme: "l", score: 88, tip: "Tongue touches behind the upper teeth." },
        { phoneme: "ə", score: 70, tip: "Relaxed, central tongue position." },
        { phoneme: "b", score: 85, tip: "Press your lips together and release with voice." },
        { phoneme: "ɔ", score: 80, tip: "Back and slightly lower tongue, lips rounded." },
        { phoneme: "r", score: 84, tip: "Mouth nearly closed, lips rounded." },
        { phoneme: "e", score: 76, tip: "Tongue mid-high and lips spread." },
      ],
    },
    {
      text: "et ",
      score: 89,
      phonemes: [
        { phoneme: "ɛ", score: 87, tip: "Tongue and jaw at medium height." },
        { phoneme: "t", score: 90, tip: "Tip of the tongue to the alveolar ridge." },
      ],
    },
    {
      text: "dolore ",
      score: 88,
      phonemes: [
        { phoneme: "d", score: 86, tip: "Press tongue to alveolar ridge and vibrate." },
        { phoneme: "ə", score: 80, tip: "Relaxed and centered tongue." },
        { phoneme: "l", score: 90, tip: "Tongue touches alveolar ridge." },
        { phoneme: "ɔ", score: 84, tip: "Back and slightly lower tongue, lips rounded." },
        { phoneme: "r", score: 88, tip: "Rounded lips, high tongue." },
        { phoneme: "e", score: 83, tip: "Mid-high tongue and spread lips." },
      ],
    },
    {
      text: "magna ",
      score: 70,
      phonemes: [
        { phoneme: "m", score: 72, tip: "Close lips and let air through nose." },
        { phoneme: "æ", score: 75, tip: "Open wide and lower your jaw, as in 'cat'." },
        { phoneme: "g", score: 68, tip: "Raise back of your tongue to the soft palate." },
        { phoneme: "n", score: 73, tip: "Tongue to alveolar ridge." },
        { phoneme: "ə", score: 60, tip: "Relaxed and central tongue." },
      ],
    },
    {
      text: "aliqua.",
      score: 61,
      phonemes: [
        { phoneme: "æ", score: 58, tip: "Mouth wide and jaw low, as in 'cat'." },
        { phoneme: "l", score: 65, tip: "Tongue touches behind upper front teeth." },
        { phoneme: "ɪ", score: 55, tip: "Slightly lower than /i/, relaxed lips." },
        { phoneme: "k", score: 60, tip: "Back of the tongue to soft palate, release air." },
        { phoneme: "w", score: 70, tip: "Round lips, back of the tongue raised." },
        { phoneme: "ə", score: 50, tip: "Relaxed, central tongue, like the 'a' in 'sofa'." },
      ],
    },
    {
      text: " Ut ",
      score: 83,
      phonemes: [
        { phoneme: "ʌ", score: 85, tip: "For the /ʌ/ (uh) vowel, the tongue is in a mid-central position, as in 'cup'." },
        { phoneme: "t", score: 81, tip: "For /t/, touch the tip of your tongue to the alveolar ridge and release a burst of air." }
      ]
    },
    {
      text: "enim ",
      score: 71,
      phonemes: [
        { phoneme: "ɛ", score: 75, tip: "For /ɛ/, your tongue and jaw should be at a medium height." },
        { phoneme: "n", score: 60, tip: "For /n/, touch your tongue to the alveolar ridge and let air flow through your nose." },
        { phoneme: "ɪ", score: 65, tip: "For the /ɪ/ (ih) vowel, the tongue is slightly lower than /i/, as in 'bit'." },
        { phoneme: "m", score: 80, tip: "For /m/, close your lips and let air flow through your nose, as in 'man'." }
      ]
    },
    {
      text: "ad ",
      score: 68,
      phonemes: [
        { phoneme: "æ", score: 62, tip: "For /æ/, open your mouth wide and lower your jaw more than for /ɛ/, as in 'cat'." },
        { phoneme: "d", score: 74, tip: "For /d/, similar to /t/ but with vocal cord vibration, as in 'dog'." }
      ]
    },
    {
      text: "minim ",
      score: 88,
      phonemes: [
        { phoneme: "m", score: 90, tip: "For /m/, close your lips and let air flow through your nose." },
        { phoneme: "ɪ", score: 85, tip: "Tongue is slightly lower than /i/." },
        { phoneme: "n", score: 88, tip: "Touch your tongue to the alveolar ridge." },
        { phoneme: "ɪ", score: 87, tip: "Tongue is slightly lower than /i/." },
        { phoneme: "m", score: 91, tip: "Air flows through the nose." }
      ]
    },
    {
      text: "veniam,",
      score: 63,
      phonemes: [
        { phoneme: "v", score: 65, tip: "For /v/, like /f/ but with vocal cord vibration, as in 'van'." },
        { phoneme: "ɛ", score: 50, tip: "Tongue and jaw at medium height." },
        { phoneme: "n", score: 58, tip: "Tongue to alveolar ridge, nasal airflow." },
        { phoneme: "ɪ", score: 72, tip: "Slightly lower than /i/, relaxed lips." },
        { phoneme: "ə", score: 67, tip: "Relaxed and centered tongue." },
        { phoneme: "m", score: 75, tip: "Lips closed, nasal airflow." }
      ]
    },
    {
      text: " quis ",
      score: 91,
      phonemes: [
        { phoneme: "k", score: 94, tip: "Raise the back of your tongue to the soft palate and release air." },
        { phoneme: "w", score: 90, tip: "Round your lips and raise the back of the tongue." },
        { phoneme: "ɪ", score: 89, tip: "Tongue is slightly lower than /i/." },
        { phoneme: "s", score: 91, tip: "Direct air over the tongue edge toward the teeth." }
      ]
    },
    {
      text: "nostrud ",
      score: 69,
      phonemes: [
        { phoneme: "n", score: 75, tip: "Tongue to alveolar ridge, nasal airflow." },
        { phoneme: "ɑ", score: 65, tip: "Tongue low, mouth wide open, as in 'father'." },
        { phoneme: "s", score: 60, tip: "Direct air over the tongue edge." },
        { phoneme: "t", score: 70, tip: "Tip of the tongue to the alveolar ridge." },
        { phoneme: "ɹ", score: 58, tip: "Mouth nearly closed, lips generally rounded." },
        { phoneme: "ʌ", score: 73, tip: "Tongue in mid-central position." },
        { phoneme: "d", score: 66, tip: "Vocal cord vibration while tongue hits the ridge." }
      ]
    },
    {
      text: "exercitation ",
      score: 84,
      phonemes: [
        { phoneme: "ɛ", score: 85, tip: "Tongue and jaw at medium height." },
        { phoneme: "k", score: 88, tip: "Raise the back of your tongue to the soft palate and release air." },
        { phoneme: "s", score: 82, tip: "Direct air over the tongue edge." },
        { phoneme: "ɝ", score: 90, tip: "Tongue mid-mouth, slightly raised, with r-coloring." },
        { phoneme: "s", score: 87, tip: "Direct air over the tongue edge." },
        { phoneme: "ɪ", score: 85, tip: "Tongue slightly lower than /i/." },
        { phoneme: "t", score: 90, tip: "Tip of tongue to the alveolar ridge." },
        { phoneme: "eɪ", score: 92, tip: "Glide from mid-front to slightly higher tongue position." },
        { phoneme: "ʃ", score: 80, tip: "Round lips slightly and let air pass over the tongue to the palate." },
        { phoneme: "ən", score: 83, tip: "Unstressed schwa followed by nasal 'n'." }
      ]
    },
    {
      text: "ullamco ",
      score: 75,
      phonemes: [
        { phoneme: "ʌ", score: 78, tip: "Tongue in mid-central position." },
        { phoneme: "l", score: 70, tip: "Tongue touches the alveolar ridge." },
        { phoneme: "æ", score: 60, tip: "Open your mouth wide and lower your jaw, as in 'cat'." },
        { phoneme: "m", score: 74, tip: "Lips closed, air through the nose." },
        { phoneme: "k", score: 80, tip: "Back of the tongue to soft palate, release air." },
        { phoneme: "oʊ", score: 73, tip: "Start mid-back and glide higher with rounded lips." }
      ]
    },
    {
      text: "laboris ",
      score: 86,
      phonemes: [
        { phoneme: "l", score: 90, tip: "Tongue touches the alveolar ridge." },
        { phoneme: "ə", score: 84, tip: "Relaxed and centered tongue." },
        { phoneme: "b", score: 88, tip: "Press your lips together and release with voice." },
        { phoneme: "ɔ", score: 83, tip: "Tongue is back and slightly lower, lips rounded." },
        { phoneme: "ɹ", score: 87, tip: "Mouth nearly closed, lips rounded." },
        { phoneme: "ɪ", score: 85, tip: "Slightly lower than /i/, relaxed lips." },
        { phoneme: "s", score: 90, tip: "Air over the tongue edge, toward the teeth." }
      ]
    },
    {
      text: "nisi ",
      score: 59,
      phonemes: [
        { phoneme: "n", score: 60, tip: "Touch tongue to alveolar ridge, air through nose." },
        { phoneme: "ɪ", score: 50, tip: "Tongue is slightly lower than /i/." },
        { phoneme: "s", score: 62, tip: "Air over tongue edge, toward the teeth." },
        { phoneme: "i", score: 55, tip: "Tongue high and close to the roof of your mouth." }
      ]
    },
    {
      text: "ut ",
      score: 88,
      phonemes: [
        { phoneme: "ʌ", score: 87, tip: "Tongue in mid-central position." },
        { phoneme: "t", score: 90, tip: "Tip of tongue to alveolar ridge." }
      ]
    },
    {
      text: "aliquip ",
      score: 66,
      phonemes: [
        { phoneme: "æ", score: 55, tip: "Open wide and lower your jaw, as in 'cat'." },
        { phoneme: "l", score: 60, tip: "Tongue to alveolar ridge." },
        { phoneme: "ɪ", score: 50, tip: "Slightly lower than /i/, relaxed lips." },
        { phoneme: "k", score: 70, tip: "Back of tongue to soft palate, release air." },
        { phoneme: "w", score: 75, tip: "Round lips, raise back of tongue." },
        { phoneme: "ɪ", score: 68, tip: "Slightly lower than /i/, relaxed lips." },
        { phoneme: "p", score: 72, tip: "Press lips together, release air." }
      ]
    },
    {
      text: "ex ",
      score: 82,
      phonemes: [
        { phoneme: "ɛ", score: 85, tip: "Tongue and jaw at medium height." },
        { phoneme: "k", score: 80, tip: "Back of tongue to soft palate." },
        { phoneme: "s", score: 81, tip: "Air over tongue toward the teeth." }
      ]
    },
    {
      text: "ea ",
      score: 92,
      phonemes: [
        { phoneme: "i", score: 94, tip: "Tongue high and close to the roof of your mouth." },
        { phoneme: "ə", score: 90, tip: "Relaxed and centered tongue." }
      ]
    },
    {
      text: "commodo ",
      score: 73,
      phonemes: [
        { phoneme: "k", score: 75, tip: "Raise back of tongue to soft palate." },
        { phoneme: "ɑ", score: 72, tip: "Tongue low, mouth wide open." },
        { phoneme: "m", score: 78, tip: "Lips closed, nasal airflow." },
        { phoneme: "ə", score: 70, tip: "Relaxed and centered tongue." },
        { phoneme: "d", score: 74, tip: "Vocal cord vibration while tongue hits ridge." },
        { phoneme: "oʊ", score: 68, tip: "Start mid-back, glide higher with rounded lips." }
      ]
    },
    {
      text: "consequat.",
      score: 80,
      phonemes: [
        { phoneme: "k", score: 82, tip: "Back of the tongue to soft palate." },
        { phoneme: "ɑ", score: 78, tip: "Low tongue, mouth wide open." },
        { phoneme: "n", score: 85, tip: "Tongue to alveolar ridge, air through nose." },
        { phoneme: "s", score: 76, tip: "Air over tongue toward the teeth." },
        { phoneme: "ə", score: 70, tip: "Relaxed and centered tongue." },
        { phoneme: "k", score: 75, tip: "Back of tongue to soft palate." },
        { phoneme: "w", score: 80, tip: "Round lips, back of tongue raised." },
        { phoneme: "ɑ", score: 83, tip: "Low tongue, mouth wide open." },
        { phoneme: "t", score: 84, tip: "Tongue tip touches alveolar ridge." }
      ]
    },
    {
      text: " Duis ",
      score: 84,
      phonemes: [
        { phoneme: "d", score: 88, tip: "For /d/, similar to /t/ but with vocal cord vibration, as in 'dog'." },
        { phoneme: "u", score: 82, tip: "For /u/, the tongue is high and back with rounded lips, as in 'food'." },
        { phoneme: "i", score: 85, tip: "For /i/, your tongue should be high and close to the roof of your mouth, as in 'see'." },
        { phoneme: "s", score: 80, tip: "For /s/, direct air over the edge of your tongue towards the teeth." }
      ]
    },
    {
      text: "aute ",
      score: 65,
      phonemes: [
        { phoneme: "ɑ", score: 60, tip: "For /ɑ/, the tongue is low and the mouth is wide open, as in 'father'." },
        { phoneme: "ʊ", score: 68, tip: "For /ʊ/, the tongue is high-mid back and lips rounded, as in 'good'." },
        { phoneme: "t", score: 70, tip: "For /t/, touch the tip of your tongue to the alveolar ridge and release a burst of air." },
        { phoneme: "e", score: 60, tip: "For /e/, the tongue is mid-high and lips spread." }
      ]
    },
    {
      text: "irure ",
      score: 72,
      phonemes: [
        { phoneme: "ɪ", score: 70, tip: "For /ɪ/, the tongue is slightly lower than /i/, as in 'bit'." },
        { phoneme: "ɹ", score: 75, tip: "For /r/, your mouth should be almost closed, lips generally rounded." },
        { phoneme: "ʊ", score: 65, tip: "For /ʊ/, the tongue is high-mid back and lips rounded." },
        { phoneme: "ɹ", score: 78, tip: "For /r/, round your lips and raise the tongue high." },
        { phoneme: "e", score: 70, tip: "For /e/, the tongue is mid-high and lips spread." }
      ]
    },
    {
      text: "dolor ",
      score: 79,
      phonemes: [
        { phoneme: "d", score: 82, tip: "For /d/, similar to /t/ but with vocal cord vibration." },
        { phoneme: "oʊ", score: 77, tip: "For /oʊ/, start with tongue in mid-back and glide upward with rounded lips." },
        { phoneme: "l", score: 85, tip: "For /l/, the tongue touches the alveolar ridge just behind the upper front teeth." },
        { phoneme: "ɝ", score: 70, tip: "For /ɝ/, tongue mid-mouth, slightly raised, with r-coloring." }
      ]
    },
    {
      text: "in ",
      score: 75,
      phonemes: [
        { phoneme: "ɪ", score: 74, tip: "For /ɪ/, the tongue is slightly lower than /i/." },
        { phoneme: "n", score: 76, tip: "For /n/, touch your tongue to the alveolar ridge and let air flow through your nose." }
      ]
    },
    {
      text: "reprehenderit ",
      score: 64,
      phonemes: [
        { phoneme: "ɹ", score: 66, tip: "For /r/, mouth almost closed, lips generally rounded." },
        { phoneme: "ɛ", score: 70, tip: "For /ɛ/, tongue and jaw should be at medium height." },
        { phoneme: "p", score: 60, tip: "For /p/, press your lips together and release with a burst of air." },
        { phoneme: "ɹ", score: 55, tip: "For /r/, round your lips and raise the tongue." },
        { phoneme: "ɛ", score: 63, tip: "For /ɛ/, tongue and jaw at medium height." },
        { phoneme: "h", score: 68, tip: "For /h/, exhale sharply through an open mouth and throat." },
        { phoneme: "ɛ", score: 70, tip: "Medium tongue height, lips relaxed." },
        { phoneme: "n", score: 72, tip: "Tongue to alveolar ridge." },
        { phoneme: "d", score: 65, tip: "Voiced release, tongue tip to ridge." },
        { phoneme: "ɝ", score: 68, tip: "Mid-mouth, slightly raised, r-colored." },
        { phoneme: "t", score: 69, tip: "Tip of tongue touches alveolar ridge." }
      ]
    },
    {
      text: "in ",
      score: 73,
      phonemes: [
        { phoneme: "ɪ", score: 75, tip: "For /ɪ/, the tongue is slightly lower than /i/." },
        { phoneme: "n", score: 71, tip: "For /n/, touch your tongue to the alveolar ridge and let air flow through your nose." }
      ]
    },
    {
      text: "voluptate ",
      score: 87,
      phonemes: [
        { phoneme: "v", score: 90, tip: "For /v/, like /f/ but voiced." },
        { phoneme: "ə", score: 85, tip: "For /ə/, tongue is relaxed and centered." },
        { phoneme: "l", score: 88, tip: "Tongue touches alveolar ridge." },
        { phoneme: "ʌ", score: 86, tip: "Mid-central tongue position." },
        { phoneme: "p", score: 90, tip: "Press lips together and release." },
        { phoneme: "t", score: 83, tip: "Tip of tongue touches alveolar ridge." },
        { phoneme: "eɪ", score: 88, tip: "Start mid-front and glide toward /ɪ/." },
        { phoneme: "t", score: 85, tip: "Burst of air from alveolar ridge." }
      ]
    },
    {
      text: "velit ",
      score: 92,
      phonemes: [
        { phoneme: "v", score: 95, tip: "For /v/, voiced airflow with lips and teeth." },
        { phoneme: "ɛ", score: 90, tip: "Medium height tongue and relaxed lips." },
        { phoneme: "l", score: 94, tip: "Tongue touches alveolar ridge." },
        { phoneme: "ɪ", score: 93, tip: "Slightly lower than /i/, relaxed." },
        { phoneme: "t", score: 89, tip: "Burst of air from the alveolar ridge." }
      ]
    },
    {
      text: "esse ",
      score: 60,
      phonemes: [
        { phoneme: "ɛ", score: 62, tip: "Medium height tongue and jaw." },
        { phoneme: "s", score: 58, tip: "Air over tongue to the teeth." },
        { phoneme: "i", score: 65, tip: "Tongue high and close to the roof of the mouth." }
      ]
    },
    {
      text: "cillum ",
      score: 70,
      phonemes: [
        { phoneme: "s", score: 68, tip: "Direct air over the edge of your tongue." },
        { phoneme: "ɪ", score: 70, tip: "Tongue slightly lower than /i/." },
        { phoneme: "l", score: 72, tip: "Touch alveolar ridge with tongue." },
        { phoneme: "ə", score: 65, tip: "Relaxed and central tongue." },
        { phoneme: "m", score: 75, tip: "Lips closed and air through the nose." }
      ]
    },
    {
      text: "dolore ",
      score: 76,
      phonemes: [
        { phoneme: "d", score: 78, tip: "Tongue to alveolar ridge, voiced release." },
        { phoneme: "oʊ", score: 74, tip: "Rounded lips, mid-high back tongue, gliding upward." },
        { phoneme: "l", score: 79, tip: "Tongue to alveolar ridge." },
        { phoneme: "ɔ", score: 70, tip: "Back and slightly lower tongue, lips rounded." },
        { phoneme: "ɹ", score: 75, tip: "Round your lips and raise your tongue high." },
        { phoneme: "e", score: 73, tip: "Mid-high tongue and spread lips." }
      ]
    },
    {
      text: "eu ",
      score: 81,
      phonemes: [
        { phoneme: "j", score: 80, tip: "Raise your tongue close to the roof of your mouth as in 'yes'." },
        { phoneme: "u", score: 82, tip: "For /u/, the tongue is high and back with rounded lips." }
      ]
    },
    {
      text: "fugiat ",
      score: 62,
      phonemes: [
        { phoneme: "f", score: 60, tip: "Touch top teeth to bottom lip and blow air." },
        { phoneme: "u", score: 65, tip: "Tongue high and back, lips rounded." },
        { phoneme: "ʒ", score: 55, tip: "Like /ʃ/ but voiced, as in the 's' in 'measure'." },
        { phoneme: "æ", score: 70, tip: "Open your mouth wide and lower your jaw, as in 'cat'." },
        { phoneme: "t", score: 58, tip: "Burst of air from the alveolar ridge." }
      ]
    },
    {
      text: "nulla ",
      score: 89,
      phonemes: [
        { phoneme: "n", score: 90, tip: "Tongue to alveolar ridge, nasal airflow." },
        { phoneme: "ʌ", score: 87, tip: "Mid-central tongue position." },
        { phoneme: "l", score: 92, tip: "Tongue touches alveolar ridge." },
        { phoneme: "ə", score: 85, tip: "Relaxed and centered tongue." }
      ]
    },
    {
      text: "pariatur.",
      score: 77,
      phonemes: [
        { phoneme: "p", score: 75, tip: "Press lips together and release with a burst of air." },
        { phoneme: "æ", score: 72, tip: "Open your mouth wide and lower your jaw, as in 'cat'." },
        { phoneme: "ɹ", score: 79, tip: "Mouth almost closed, tongue raised." },
        { phoneme: "i", score: 80, tip: "Tongue high and close to the roof of your mouth." },
        { phoneme: "ə", score: 76, tip: "Relaxed and centered tongue." },
        { phoneme: "t", score: 74, tip: "Tip of the tongue to the alveolar ridge." },
        { phoneme: "ɝ", score: 78, tip: "Tongue mid-mouth, slightly raised, r-colored." }
      ]
    },
    {
      text: " Excepteur ",
      score: 91,
      phonemes: [
        { phoneme: "ɛ", score: 90, tip: "Open-mid front unrounded vowel, like 'bed'" },
        { phoneme: "k", score: 92, tip: "Voiceless velar plosive, like 'key'" },
        { phoneme: "s", score: 89, tip: "Voiceless alveolar fricative, like 'see'" },
        { phoneme: "ɛ", score: 91, tip: "Open-mid front unrounded vowel, like 'bed'" },
        { phoneme: "p", score: 93, tip: "Voiceless bilabial plosive, like 'pen'" },
        { phoneme: "t", score: 90, tip: "Voiceless alveolar plosive, like 'top'" },
        { phoneme: "ɝ", score: 94, tip: "R-colored vowel, like 'her' (stressed)" },
      ],
    },
    {
      text: "sint ",
      score: 66,
      phonemes: [
        { phoneme: "s", score: 70, tip: "Voiceless alveolar fricative, like 'see'" },
        { phoneme: "ɪ", score: 62, tip: "Near-close near-front unrounded vowel, like 'bit'" },
        { phoneme: "n", score: 65, tip: "Alveolar nasal, like 'no'" },
        { phoneme: "t", score: 68, tip: "Voiceless alveolar plosive, like 'top'" },
      ],
    },
    {
      text: "occaecat ",
      score: 87,
      phonemes: [
        { phoneme: "ɑ", score: 85, tip: "Open back unrounded vowel, like 'father'" },
        { phoneme: "k", score: 90, tip: "Voiceless velar plosive, like 'key'" },
        { phoneme: "eɪ", score: 88, tip: "Diphthong, like 'day'" },
        { phoneme: "k", score: 89, tip: "Voiceless velar plosive, like 'key'" },
        { phoneme: "æ", score: 84, tip: "Near-open front unrounded vowel, like 'cat'" },
        { phoneme: "t", score: 86, tip: "Voiceless alveolar plosive, like 'top'" },
      ],
    },
    {
      text: "cupidatat ",
      score: 71,
      phonemes: [
        { phoneme: "k", score: 78, tip: "Voiceless velar plosive, like 'key'" },
        { phoneme: "ju", score: 74, tip: "Glide + close back rounded vowel, like 'you'" },
        { phoneme: "p", score: 76, tip: "Voiceless bilabial plosive, like 'pen'" },
        { phoneme: "ɪ", score: 68, tip: "Near-close near-front unrounded vowel, like 'bit'" },
        { phoneme: "d", score: 69, tip: "Voiced alveolar plosive, like 'dog'" },
        { phoneme: "ə", score: 73, tip: "Mid-central vowel (schwa), like 'sofa'" },
        { phoneme: "t", score: 66, tip: "Voiceless alveolar plosive, like 'top'" },
      ],
    },
    {
      text: "non ",
      score: 67,
      phonemes: [
        { phoneme: "n", score: 65, tip: "Alveolar nasal, like 'no'" },
        { phoneme: "ɑ", score: 60, tip: "Open back unrounded vowel, like 'father'" },
        { phoneme: "n", score: 72, tip: "Alveolar nasal, like 'no'" },
      ],
    },
    {
      text: "proident, ",
      score: 89,
      phonemes: [
        { phoneme: "p", score: 87, tip: "Voiceless bilabial plosive, like 'pen'" },
        { phoneme: "r", score: 91, tip: "Alveolar approximant, like 'red'" },
        { phoneme: "oʊ", score: 90, tip: "Diphthong, like 'go'" },
        { phoneme: "ɪ", score: 88, tip: "Near-close near-front unrounded vowel, like 'bit'" },
        { phoneme: "d", score: 85, tip: "Voiced alveolar plosive, like 'dog'" },
        { phoneme: "ə", score: 86, tip: "Mid-central vowel (schwa), like 'sofa'" },
        { phoneme: "n", score: 89, tip: "Alveolar nasal, like 'no'" },
        { phoneme: "t", score: 87, tip: "Voiceless alveolar plosive, like 'top'" },
      ],
    },
    {
      text: "sunt ",
      score: 90,
      phonemes: [
        { phoneme: "s", score: 92, tip: "Voiceless alveolar fricative, like 'see'" },
        { phoneme: "ʌ", score: 88, tip: "Open-mid back unrounded vowel, like 'cup'" },
        { phoneme: "n", score: 89, tip: "Alveolar nasal, like 'no'" },
        { phoneme: "t", score: 90, tip: "Voiceless alveolar plosive, like 'top'" },
      ],
    },
    {
      text: "in ",
      score: 74,
      phonemes: [
        { phoneme: "ɪ", score: 72, tip: "Near-close near-front unrounded vowel, like 'bit'" },
        { phoneme: "n", score: 76, tip: "Alveolar nasal, like 'no'" },
      ],
    },
    {
      text: "culpa ",
      score: 62,
      phonemes: [
        { phoneme: "k", score: 64, tip: "Voiceless velar plosive, like 'key'" },
        { phoneme: "ʌ", score: 61, tip: "Open-mid back unrounded vowel, like 'cup'" },
        { phoneme: "l", score: 59, tip: "Alveolar lateral approximant, like 'light'" },
        { phoneme: "p", score: 63, tip: "Voiceless bilabial plosive, like 'pen'" },
        { phoneme: "ə", score: 64, tip: "Mid-central vowel (schwa), like 'sofa'" },
      ],
    },
    {
      text: "qui ",
      score: 86,
      phonemes: [
        { phoneme: "k", score: 85, tip: "Voiceless velar plosive, like 'key'" },
        { phoneme: "w", score: 86, tip: "Voiced labio-velar approximant, like 'we'" },
        { phoneme: "i", score: 87, tip: "Close front unrounded vowel, like 'see'" },
      ],
    },
    {
      text: "officia ",
      score: 78,
      phonemes: [
        { phoneme: "ɑ", score: 77, tip: "Open back unrounded vowel, like 'father'" },
        { phoneme: "f", score: 80, tip: "Voiceless labiodental fricative, like 'fun'" },
        { phoneme: "ɪ", score: 76, tip: "Near-close near-front unrounded vowel, like 'bit'" },
        { phoneme: "ʃ", score: 75, tip: "Voiceless postalveolar fricative, like 'ship'" },
        { phoneme: "ə", score: 79, tip: "Mid-central vowel (schwa), like 'sofa'" },
      ],
    },
    {
      text: "deserunt ",
      score: 83,
      phonemes: [
        { phoneme: "d", score: 82, tip: "Voiced alveolar plosive, like 'dog'" },
        { phoneme: "ə", score: 80, tip: "Mid-central vowel (schwa), like 'sofa'" },
        { phoneme: "z", score: 85, tip: "Voiced alveolar fricative, like 'zoo'" },
        { phoneme: "ɝ", score: 86, tip: "R-colored vowel, like 'her' (stressed)" },
        { phoneme: "ə", score: 84, tip: "Mid-central vowel (schwa), like 'sofa'" },
        { phoneme: "n", score: 81, tip: "Alveolar nasal, like 'no'" },
        { phoneme: "t", score: 82, tip: "Voiceless alveolar plosive, like 'top'" },
      ],
    },
    {
      text: "mollit ",
      score: 77,
      phonemes: [
        { phoneme: "m", score: 75, tip: "Bilabial nasal, like 'man'" },
        { phoneme: "ɑ", score: 73, tip: "Open back unrounded vowel, like 'father'" },
        { phoneme: "l", score: 79, tip: "Alveolar lateral approximant, like 'light'" },
        { phoneme: "ɪ", score: 80, tip: "Near-close near-front unrounded vowel, like 'bit'" },
        { phoneme: "t", score: 78, tip: "Voiceless alveolar plosive, like 'top'" },
      ],
    },
    {
      text: "anim ",
      score: 85,
      phonemes: [
        { phoneme: "æ", score: 83, tip: "Near-open front unrounded vowel, like 'cat'" },
        { phoneme: "n", score: 84, tip: "Alveolar nasal, like 'no'" },
        { phoneme: "ɪ", score: 85, tip: "Near-close near-front unrounded vowel, like 'bit'" },
        { phoneme: "m", score: 86, tip: "Bilabial nasal, like 'man'" },
      ],
    },
    {
      text: "id ",
      score: 71,
      phonemes: [
        { phoneme: "ɪ", score: 70, tip: "Near-close near-front unrounded vowel, like 'bit'" },
        { phoneme: "d", score: 72, tip: "Voiced alveolar plosive, like 'dog'" },
      ],
    },
    {
      text: "est ",
      score: 88,
      phonemes: [
        { phoneme: "ɛ", score: 89, tip: "Open-mid front unrounded vowel, like 'bed'" },
        { phoneme: "s", score: 87, tip: "Voiceless alveolar fricative, like 'see'" },
        { phoneme: "t", score: 88, tip: "Voiceless alveolar plosive, like 'top'" },
      ],
    },
    {
      text: "laborum. ",
      score: 79,
      phonemes: [
        { phoneme: "l", score: 77, tip: "Alveolar lateral approximant, like 'light'" },
        { phoneme: "ə", score: 76, tip: "Mid-central vowel (schwa), like 'sofa'" },
        { phoneme: "b", score: 78, tip: "Voiced bilabial plosive, like 'bat'" },
        { phoneme: "ɔ", score: 80, tip: "Open-mid back rounded vowel, like 'thought'" },
        { phoneme: "ɹ", score: 81, tip: "Alveolar approximant, like 'red'" },
        { phoneme: "ə", score: 79, tip: "Mid-central vowel (schwa), like 'sofa'" },
        { phoneme: "m", score: 82, tip: "Bilabial nasal, like 'man'" },
      ],
    },
  ]
};

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>
}

function Pronunciation({ containerRef }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectActiveIndex = (i: number) => {
    setActiveIndex(prev => (prev === i ? -1 : i));
  };
  const activeWord = activeIndex < 0 ? null : data.transcript[activeIndex];

  const isMobile = useIsMobile();
  const targetRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const position = useAdjustContainerPosition({
    containerRef: containerRef,
    targetRef: targetRef,
    tooltipRef: tooltipRef,
    deps: [activeIndex],
  });

  return (
    <div>
      <div className={`${lstyles.container} ${lstyles.score}`}>
        <CircularProgressBar
          value={data.score}
          description={data.title as 'Advanced'}
          diameter={isMobile ? '150px' : '200px'}
          thickness={isMobile ? '8px' : '11px'}
          fontSize={isMobile ? '1rem' : '1.25rem'}
        />
        <h3>Your pronunciation is <strong>{data.title}</strong>.</h3>
        <h4>{data.description}</h4>
      </div>

      <div className={lstyles.container}>
        <Transcript>
          <div className={tstyles.pane1}>
            <div className={tstyles.header}>Transcript</div>
            {data.transcript.map((word, i) => (
              <span key={i} className={tstyles.word}>
                {word.score < 70 ? (
                  <button
                    className={tstyles.red}
                    onClick={() => selectActiveIndex(i)}
                    ref={activeIndex === i ? targetRef : null}
                  >
                    {word.text}
                  </button>
                ) : (
                  word.text
                )}
              </span>
            ))}
          </div>
        </Transcript>
      </div>

      {activeWord && (
        <PopOver
          onClose={() => setActiveIndex(-1)}
          target={containerRef}
          position={position}
          ref={tooltipRef}
        >
          <div className={styles.header}>
            <div className={styles.text}>{activeWord.text}</div>
            <div className={styles.phonemes}>
              /
              {activeWord.phonemes.map((p, i) => (
                <span key={i}>{p.phoneme}</span>
              ))}
              /
            </div>
          </div>
          <div className={styles.progressContainer}>
            <HorizontalProgressBar
              score={activeWord.score}
              fontColor='var(--color-gray-dark)'
              animation={!isMobile}
            />
          </div>
          <div className={styles.table}>
            <div className={styles.title}>
              <span className={styles.soundTitle}>Sound</span>
              <span className={styles.saidTitle}>You said</span>
            </div>
            {activeWord.phonemes.map((p, i) => (
              <div className={styles.row} key={i}>
                <span className={styles.soundResult}>/{p.phoneme}/</span>
                <span className={styles.saidResult}>
                  {p.score < 70 ? (
                    <>
                      <div className={styles.incorrect}>Incorrect</div>
                      <div className={styles.details}>{p.tip}</div>
                    </>
                  ) : (
                    <div className={styles.correct}>Correct</div>
                  )}
                </span>
              </div>
            ))}
          </div>
        </PopOver>
      )}
    </div>
  );
}

export default Pronunciation;