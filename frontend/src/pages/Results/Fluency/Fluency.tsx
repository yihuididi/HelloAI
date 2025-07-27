import CircularProgressBar from '../../../components/CircularProgressBar/CircularProgressBar';
import useAdjustTooltipPosition from '../../../hooks/useAdjustTooltipPosition';
import useIsMobile from '../../../hooks/useIsMobile';
import lstyles from '../Layout.module.css';
import PopOver from '../PopOver/PopOver';
import Transcript from '../Transcript/Transcript';
import tstyles from '../Transcript/Transcript.module.css';
import styles from './Fluency.module.css';
import React, { useRef, useState } from 'react';
import { RxStretchHorizontally } from 'react-icons/rx';

const data = {
  score: 95,
  title: 'Fluent',
  description: 'Excellent fluency! You speak smoothly and naturally, with few interruptions or hesitations. Maintain this level with regular speaking practice.',
  transcript: [
    { text: 'Lorem ', classification: 'normal' },
    { text: 'ipsum ', classification: 'normal' },
    { text: 'dolor ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'sit ', classification: 'normal' },
    { text: 'amet, ', classification: 'normal' },
    { text: 'consectetur ', classification: 'normal' },
    { text: 'adipiscing ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'elit, ', classification: 'normal' },
    { text: 'sed ', classification: 'bad pause', tip: 'This is a bad pause - it broke the flow of the sentence.' },
    { text: 'do ', classification: 'normal' },
    { text: 'eiusmod ', classification: 'normal' },
    { text: 'tempor ', classification: 'good pause', tip: 'This is a good pause - it gave the listener time to digest the previous idea.' },
    { text: 'incididunt ', classification: 'normal' },
    { text: 'ut ', classification: 'normal' },
    { text: 'labore ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'dolore ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'magna ', classification: 'normal' },
    { text: 'aliqua.', classification: 'normal' },
    { text: 'Ut ', classification: 'normal' },
    { text: 'enim ', classification: 'normal' },
    { text: 'ad ', classification: 'normal' },
    { text: 'minim ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'veniam, ', classification: 'normal' },
    { text: 'quis ', classification: 'normal' },
    { text: 'nostrud ', classification: 'normal' },
    { text: 'exercitation ', classification: 'normal' },
    { text: 'ullamco ', classification: 'good pause', tip: 'This is a good pause - it created a natural break in the sentence.' },
    { text: 'laboris ', classification: 'normal' },
    { text: 'nisi ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'ut ', classification: 'normal' },
    { text: 'aliquip ', classification: 'normal' },
    { text: 'ex ', classification: 'normal' },
    { text: 'ea ', classification: 'bad pause', tip: 'This is a bad pause - it interrupted the sentence unnaturally.' },
    { text: 'commodo ', classification: 'normal' },
    { text: 'consequat. ', classification: 'normal' },
    { text: 'Duis ', classification: 'normal' },
    { text: 'aute ', classification: 'normal' },
    { text: 'irure ', classification: 'normal' },
    { text: 'dolor ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'in ', classification: 'normal' },
    { text: 'reprehenderit ', classification: 'normal' },
    { text: 'in ', classification: 'normal' },
    { text: 'voluptate ', classification: 'normal' },
    { text: 'velit ', classification: 'normal' },
    { text: 'esse ', classification: 'normal' },
    { text: 'cillum ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'dolore ', classification: 'normal' },
    { text: 'eu ', classification: 'normal' },
    { text: 'fugiat ', classification: 'normal' },
    { text: 'nulla ', classification: 'good pause', tip: 'This is a good pause - it gave the sentence a brief, effective rhythm.' },
    { text: 'pariatur. ', classification: 'normal' },
    { text: 'Excepteur ', classification: 'normal' },
    { text: 'sint ', classification: 'normal' },
    { text: 'occaecat ', classification: 'normal' },
    { text: 'cupidatat ', classification: 'bad pause', tip: 'This is a bad pause - it made the phrase feel disjointed.' },
    { text: 'non ', classification: 'normal' },
    { text: 'proident, ', classification: 'normal' },
    { text: 'sunt ', classification: 'normal' },
    { text: 'in ', classification: 'normal' },
    { text: 'culpa ', classification: 'normal' },
    { text: 'qui ', classification: 'normal' },
    { text: 'officia ', classification: 'normal' },
    { text: 'deserunt ', classification: 'normal' },
    { text: 'mollit ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'anim ', classification: 'normal' },
    { text: 'id ', classification: 'normal' },
    { text: 'est ', classification: 'normal' },
    { text: 'laborum. ', classification: 'normal' },
    { text: 'Sed ', classification: 'normal' },
    { text: 'ut ', classification: 'normal' },
    { text: 'perspiciatis ', classification: 'normal' },
    { text: 'unde ', classification: 'normal' },
    { text: 'omnis ', classification: 'normal' },
    { text: 'iste ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'natus ', classification: 'normal' },
    { text: 'error ', classification: 'normal' },
    { text: 'sit ', classification: 'normal' },
    { text: 'voluptatem ', classification: 'normal' },
    { text: 'accusantium ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'doloremque ', classification: 'normal' },
    { text: 'laudantium, ', classification: 'normal' },
    { text: 'totam ', classification: 'normal' },
    { text: 'rem ', classification: 'normal' },
    { text: 'aperiam, ', classification: 'normal' },
    { text: 'eaque ', classification: 'bad pause', tip: 'This is a bad pause - it caused a jarring break in the sentence.' },
    { text: 'ipsa ', classification: 'normal' },
    { text: 'quae ', classification: 'normal' },
    { text: 'ab ', classification: 'normal' },
    { text: 'illo ', classification: 'normal' },
    { text: 'inventore ', classification: 'normal' },
    { text: 'veritatis ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'quasi ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'architecto ', classification: 'normal' },
    { text: 'beatae ', classification: 'normal' },
    { text: 'vitae ', classification: 'normal' },
    { text: 'dicta ', classification: 'normal' },
    { text: 'sunt ', classification: 'normal' },
    { text: 'explicabo. ', classification: 'normal' },
    { text: 'Nemo ', classification: 'normal' },
    { text: 'enim ', classification: 'good pause', tip: 'This is a good pause - it gave weight to the transition between ideas.' },
    { text: 'ipsam ', classification: 'normal' },
    { text: 'voluptatem ', classification: 'normal' },
    { text: 'quia ', classification: 'normal' },
    { text: 'voluptas ', classification: 'normal' },
    { text: 'sit ', classification: 'normal' },
    { text: 'aspernatur ', classification: 'normal' },
    { text: 'aut ', classification: 'normal' },
    { text: 'odit ', classification: 'normal' },
    { text: 'aut ', classification: 'normal' },
    { text: 'fugit, ', classification: 'normal' },
    { text: 'sed ', classification: 'bad pause', tip: 'This is a bad pause - it interrupted the contrast being made.' },
    { text: 'quia ', classification: 'normal' },
    { text: 'consequuntur ', classification: 'normal' },
    { text: 'magni ', classification: 'normal' },
    { text: 'dolores ', classification: 'normal' },
    { text: 'eos ', classification: 'normal' },
    { text: 'qui ', classification: 'normal' },
    { text: 'ratione ', classification: 'normal' },
    { text: 'voluptatem ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'sequi ', classification: 'normal' },
    { text: 'nesciunt. ', classification: 'normal' },
    { text: 'Neque ', classification: 'normal' },
    { text: 'porro ', classification: 'normal' },
    { text: 'quisquam ', classification: 'normal' },
    { text: 'est, ', classification: 'normal' },
    { text: 'qui ', classification: 'normal' },
    { text: 'dolorem ', classification: 'normal' },
    { text: 'ipsum ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'quia ', classification: 'normal' },
    { text: 'dolor ', classification: 'normal' },
    { text: 'sit ', classification: 'normal' },
    { text: 'amet, ', classification: 'normal' },
    { text: 'consectetur, ', classification: 'normal' },
    { text: 'adipisci ', classification: 'normal' },
    { text: 'velit, ', classification: 'normal' },
    { text: 'sed ', classification: 'normal' },
    { text: 'quia ', classification: 'normal' },
    { text: 'non ', classification: 'normal' },
    { text: 'numquam ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'eius ', classification: 'normal' },
    { text: 'modi ', classification: 'normal' },
    { text: 'tempora ', classification: 'normal' },
    { text: 'incidunt ', classification: 'normal' },
    { text: 'ut ', classification: 'normal' },
    { text: 'labore ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'dolore ', classification: 'normal' },
    { text: 'magnam ', classification: 'good pause', tip: 'This is a good pause - it allowed space before a new thought.' },
    { text: 'aliquam ', classification: 'normal' },
    { text: 'quaerat ', classification: 'normal' },
    { text: 'voluptatem. ', classification: 'normal' },
    { text: 'Ut ', classification: 'normal' },
    { text: 'enim ', classification: 'normal' },
    { text: 'ad ', classification: 'normal' },
    { text: 'minima ', classification: 'normal' },
    { text: 'veniam, ', classification: 'normal' },
    { text: 'quis ', classification: 'normal' },
    { text: 'nostrum ', classification: 'normal' },
    { text: 'exercitationem ', classification: 'normal' },
    { text: 'ullam ', classification: 'normal' },
    { text: 'corporis ', classification: 'normal' },
    { text: 'suscipit ', classification: 'normal' },
    { text: 'laboriosam, ', classification: 'normal' },
    { text: 'nisi ', classification: 'normal' },
    { text: 'ut ', classification: 'normal' },
    { text: 'aliquid ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'ex ', classification: 'normal' },
    { text: 'ea ', classification: 'normal' },
    { text: 'commodi ', classification: 'normal' },
    { text: 'consequatur? ', classification: 'normal' },
    { text: 'Quis ', classification: 'normal' },
    { text: 'autem ', classification: 'normal' },
    { text: 'vel ', classification: 'normal' },
    { text: 'eum ', classification: 'normal' },
    { text: 'iure ', classification: 'normal' },
    { text: 'reprehenderit ', classification: 'normal' },
    { text: 'qui ', classification: 'normal' },
    { text: 'in ', classification: 'normal' },
    { text: 'ea ', classification: 'normal' },
    { text: 'voluptate ', classification: 'normal' },
    { text: 'velit ', classification: 'normal' },
    { text: 'esse ', classification: 'normal' },
    { text: 'quam ', classification: 'normal' },
    { text: 'nihil ', classification: 'bad pause', tip: 'This is a bad pause - it made the sentence lose momentum.' },
    { text: 'molestiae ', classification: 'normal' },
    { text: 'consequatur, ', classification: 'normal' },
    { text: 'vel ', classification: 'normal' },
    { text: 'illum ', classification: 'normal' },
    { text: 'qui ', classification: 'normal' },
    { text: 'dolorem ', classification: 'normal' },
    { text: 'eum ', classification: 'normal' },
    { text: 'fugiat ', classification: 'normal' },
    { text: 'quo ', classification: 'normal' },
    { text: 'voluptas ', classification: 'normal' },
    { text: 'nulla ', classification: 'good pause', tip: 'This is a good pause - it gave emphasis to the final point.' },
    { text: 'pariatur? ', classification: 'normal' },
    { text: 'At ', classification: 'normal' },
    { text: 'vero ', classification: 'normal' },
    { text: 'eos ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'accusamus ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'et ', classification: 'normal' },
    { text: 'iusto ', classification: 'normal' },
    { text: 'odio ', classification: 'normal' },
    { text: 'dignissimos ', classification: 'normal' },
    { text: 'ducimus ', classification: 'normal' },
    { text: 'qui ', classification: 'normal' },
    { text: 'blanditiis ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'praesentium ', classification: 'normal' },
    { text: 'voluptatum ', classification: 'normal' },
    { text: 'deleniti ', classification: 'normal' },
    { text: 'atque ', classification: 'normal' },
    { text: 'corrupti ', classification: 'normal' },
    { text: 'quos ', classification: 'normal' },
    { text: 'dolores ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'quas ', classification: 'bad pause', tip: 'This is a bad pause - it disrupted the flow of the list.' },
    { text: 'molestias ', classification: 'normal' },
    { text: 'excepturi ', classification: 'normal' },
    { text: 'sint ', classification: 'normal' },
    { text: 'occaecati ', classification: 'normal' },
    { text: 'cupiditate ', classification: 'normal' },
    { text: 'non ', classification: 'normal' },
    { text: 'provident, ', classification: 'normal' },
    { text: 'similique ', classification: 'normal' },
    { text: 'sunt ', classification: 'normal' },
    { text: 'in ', classification: 'normal' },
    { text: 'culpa ', classification: 'normal' },
    { text: 'qui ', classification: 'normal' },
    { text: 'officia ', classification: 'normal' },
    { text: 'deserunt ', classification: 'normal' },
    { text: 'mollitia ', classification: 'good pause', tip: 'This is a good pause - it added a dramatic pause before the conclusion.' },
    { text: 'animi, ', classification: 'normal' },
    { text: 'id ', classification: 'normal' },
    { text: 'est ', classification: 'normal' },
    { text: 'laborum ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'dolorum ', classification: 'normal' },
    { text: 'fuga. ', classification: 'normal' },
    { text: 'Et ', classification: 'normal' },
    { text: 'harum ', classification: 'normal' },
    { text: 'quidem ', classification: 'normal' },
    { text: 'rerum ', classification: 'normal' },
    { text: 'facilis ', classification: 'normal' },
    { text: 'est ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'expedita ', classification: 'normal' },
    { text: 'distinctio. ', classification: 'normal' },
    { text: 'Nam ', classification: 'normal' },
    { text: 'libero ', classification: 'normal' },
    { text: 'tempore, ', classification: 'normal' },
    { text: 'cum ', classification: 'normal' },
    { text: 'soluta ', classification: 'normal' },
    { text: 'nobis ', classification: 'normal' },
    { text: 'est ', classification: 'normal' },
    { text: 'eligendi ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'optio ', classification: 'normal' },
    { text: 'cumque ', classification: 'normal' },
    { text: 'nihil ', classification: 'normal' },
    { text: 'impedit ', classification: 'normal' },
    { text: 'quo ', classification: 'normal' },
    { text: 'minus ', classification: 'normal' },
    { text: 'id ', classification: 'filler', tip: 'Filler words can make your speech sound uncertain. Try pausing briefly instead. It helps you sound more confident and deliberate.' },
    { text: 'quod ', classification: 'normal' },
    { text: 'maxime ', classification: 'normal' },
    { text: 'placeat ', classification: 'normal' },
    { text: 'facere ', classification: 'normal' },
    { text: 'possimus, ', classification: 'normal' },
    { text: 'omnis ', classification: 'normal' },
    { text: 'voluptas ', classification: 'normal' },
    { text: 'assumenda ', classification: 'normal' },
    { text: 'est, ', classification: 'normal' },
    { text: 'omnis ', classification: 'normal' },
    { text: 'dolor ', classification: 'normal' },
    { text: 'repellendus. ', classification: 'normal' },
    { text: 'Temporibus ', classification: 'normal' },
    { text: 'autem ', classification: 'good pause', tip: 'This is a good pause - it introduced a contrasting idea.' },
    { text: 'quibusdam ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'aut ', classification: 'normal' },
    { text: 'officiis ', classification: 'normal' },
    { text: 'debitis ', classification: 'normal' },
    { text: 'aut ', classification: 'normal' },
    { text: 'rerum ', classification: 'normal' },
    { text: 'necessitatibus ', classification: 'hesitation', tip: 'You hesitated on this word! Hesitations often happen when you\'re unsure of the next word. Practice slowing down and using short pauses instead of dragging words.' },
    { text: 'saepe ', classification: 'normal' },
    { text: 'eveniet ', classification: 'normal' },
    { text: 'ut ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'voluptates ', classification: 'normal' },
    { text: 'repudiandae ', classification: 'normal' },
    { text: 'sint ', classification: 'normal' },
    { text: 'et ', classification: 'normal' },
    { text: 'molestiae ', classification: 'normal' },
    { text: 'non ', classification: 'normal' },
    { text: 'recusandae. ', classification: 'normal' },
    { text: 'Itaque ', classification: 'normal' },
    { text: 'earum ', classification: 'normal' },
    { text: 'rerum ', classification: 'normal' },
    { text: 'hic ', classification: 'normal' },
    { text: 'tenetur ', classification: 'normal' },
    { text: 'a ', classification: 'normal' },
    { text: 'sapiente ', classification: 'normal' },
    { text: 'delectus, ', classification: 'normal' },
    { text: 'ut ', classification: 'normal' },
    { text: 'aut ', classification: 'normal' },
    { text: 'reiciendis ', classification: 'normal' },
    { text: 'voluptatibus ', classification: 'normal' },
    { text: 'maiores ', classification: 'normal' },
    { text: 'alias ', classification: 'normal' },
    { text: 'consequatur ', classification: 'normal' },
    { text: 'aut ', classification: 'normal' },
    { text: 'perferendis ', classification: 'normal' },
    { text: 'doloribus ', classification: 'normal' },
    { text: 'asperiores ', classification: 'normal' },
    { text: 'repellat.', classification: 'normal' }
  ]
};

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>
}

function Fluency({ containerRef }: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectActiveIndex = (i: number) => {
    setActiveIndex(prev => (prev === i ? -1 : i));
  };
  const activeWord = activeIndex < 0 ? null : data.transcript[activeIndex];

  const isMobile = useIsMobile();
  const targetRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const position = useAdjustTooltipPosition({
    containerRef: containerRef,
    targetRef: targetRef,
    tooltipRef: tooltipRef,
    deps: [activeIndex]
  });

  return (
    <>
      <div className={`${lstyles.container} ${lstyles.score}`}>
        <CircularProgressBar
          value={data.score}
          description={data.title as 'Fluent'}
          diameter={isMobile ? '150px' : '200px'}
          thickness={isMobile ? '8px' : '11px'}
          fontSize={isMobile ? '1rem' : '1.25rem'}
        />
        <h3>Your fluency is <strong>{data.title}</strong>.</h3>
        <h4>{data.description}</h4>
      </div>

      <div className={lstyles.container}>
        <Transcript>
          <div className={tstyles.pane1}>
            <div className={tstyles.header}>Transcript</div>
            {data.transcript.map((word, i) => (
              <span key={i} className={tstyles.word}>
                {word.classification === 'filler' ? (
                  <button
                    className={tstyles.red}
                    onClick={() => selectActiveIndex(i)}
                    ref={activeIndex === i ? targetRef : null}
                  >
                    {word.text}
                  </button>
                ) : word.classification === 'hesitation' ? (
                  <button
                    className={tstyles.blue}
                    onClick={() => selectActiveIndex(i)}
                    ref={activeIndex === i ? targetRef : null}
                  >
                  </button>
                ) : word.classification === 'good pause' ? (
                  <button
                    className={tstyles.green}
                    onClick={() => selectActiveIndex(i)}
                    ref={activeIndex === i ? targetRef : null}
                  >
                    <RxStretchHorizontally className={styles.pause} />{' '}
                  </button>
                ) : word.classification === 'bad pause' ? (
                  <button
                    className={tstyles.red}
                    onClick={() => selectActiveIndex(i)}
                    ref={activeIndex === i ? targetRef : null}
                  >
                    <RxStretchHorizontally className={styles.pause} />{' '}
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
            <div className={styles.text}>
              {activeWord.classification === 'good pause' || activeWord.classification === 'bad pause'
                ? <RxStretchHorizontally />
                : activeWord.text}
            </div>
            <div className={styles.description}>
              {activeWord.classification}
            </div>
          </div>
          {activeWord.tip}
        </PopOver>
      )}
    </>
  );
}

export default Fluency;