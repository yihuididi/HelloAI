import CircularProgressBar from '../../../components/CircularProgressBar/CircularProgressBar';
import useAdjustTooltipPosition from '../../../hooks/useAdjustTooltipPosition';
import useIsMobile from '../../../hooks/useIsMobile';
import lstyles from '../Layout.module.css';
import PopOver from '../PopOver/PopOver';
import Transcript from '../Transcript/Transcript';
import tstyles from '../Transcript/Transcript.module.css';
import styles from './Intonation.module.css';
import React, { useRef, useState } from 'react';

const data = {
  score: 49,
  title: 'Elementary',
  description: 'Focus on word stress and sentence rhythm. Practice emphasizing nouns, verbs, and adjectives in your speech to sound clearer and more natural.',
  transcript: [
    { text: 'Lorem ', expected: true, actual: true },
    { text: 'ipsum ', expected: false, actual: false },
    { text: 'dolor ', expected: true, actual: false },
    { text: 'sit ', expected: false, actual: false },
    { text: 'amet, ', expected: true, actual: true },
    { text: 'consectetur ', expected: false, actual: false },
    { text: 'adipiscing ', expected: true, actual: false },
    { text: 'elit, ', expected: false, actual: false },
    { text: 'sed ', expected: true, actual: true },
    { text: 'do ', expected: false, actual: true },
    { text: 'eiusmod ', expected: true, actual: true },
    { text: 'tempor ', expected: false, actual: false },
    { text: 'incididunt ', expected: true, actual: false },
    { text: 'ut ', expected: false, actual: false },
    { text: 'labore ', expected: true, actual: true },
    { text: 'et ', expected: false, actual: false },
    { text: 'dolore ', expected: true, actual: true },
    { text: 'magna ', expected: true, actual: false },
    { text: 'aliqua. ', expected: false, actual: false },
    { text: 'Ut ', expected: false, actual: false },
    { text: 'enim ', expected: true, actual: true },
    { text: 'ad ', expected: false, actual: false },
    { text: 'minim ', expected: true, actual: false },
    { text: 'veniam, ', expected: true, actual: true },
    { text: 'quis ', expected: false, actual: false },
    { text: 'nostrud ', expected: true, actual: false },
    { text: 'exercitation ', expected: true, actual: true },
    { text: 'ullamco ', expected: false, actual: true },
    { text: 'laboris ', expected: true, actual: true },
    { text: 'nisi ', expected: false, actual: false },
    { text: 'ut ', expected: true, actual: true },
    { text: 'aliquip ', expected: false, actual: false },
    { text: 'ex ', expected: true, actual: false },
    { text: 'ea ', expected: false, actual: false },
    { text: 'commodo ', expected: true, actual: true },
    { text: 'consequat. ', expected: false, actual: false },
    { text: 'Duis ', expected: true, actual: false },
    { text: 'aute ', expected: false, actual: false },
    { text: 'irure ', expected: true, actual: true },
    { text: 'dolor ', expected: true, actual: false },
    { text: 'in ', expected: false, actual: false },
    { text: 'reprehenderit ', expected: true, actual: true },
    { text: 'in ', expected: false, actual: false },
    { text: 'voluptate ', expected: true, actual: true },
    { text: 'velit ', expected: false, actual: false },
    { text: 'esse ', expected: false, actual: false },
    { text: 'cillum ', expected: true, actual: true },
    { text: 'dolore ', expected: true, actual: false },
    { text: 'eu ', expected: false, actual: false },
    { text: 'fugiat ', expected: true, actual: true },
    { text: 'nulla ', expected: false, actual: false },
    { text: 'pariatur. ', expected: false, actual: false },
    { text: 'Excepteur ', expected: true, actual: true },
    { text: 'sint ', expected: false, actual: false },
    { text: 'occaecat ', expected: true, actual: false },
    { text: 'cupidatat ', expected: false, actual: false },
    { text: 'non ', expected: true, actual: true },
    { text: 'proident, ', expected: false, actual: false },
    { text: 'sunt ', expected: true, actual: false },
    { text: 'in ', expected: false, actual: false },
    { text: 'culpa ', expected: true, actual: true },
    { text: 'qui ', expected: false, actual: false },
    { text: 'officia ', expected: true, actual: false },
    { text: 'deserunt ', expected: true, actual: true },
    { text: 'mollit ', expected: false, actual: false },
    { text: 'anim ', expected: true, actual: true },
    { text: 'id ', expected: false, actual: false },
    { text: 'est ', expected: true, actual: false },
    { text: 'laborum. ', expected: false, actual: false },
    { text: 'Sed ', expected: true, actual: true },
    { text: 'ut ', expected: false, actual: false },
    { text: 'perspiciatis ', expected: true, actual: false },
    { text: 'unde ', expected: false, actual: false },
    { text: 'omnis ', expected: true, actual: true },
    { text: 'iste ', expected: false, actual: false },
    { text: 'natus ', expected: true, actual: false },
    { text: 'error ', expected: true, actual: true },
    { text: 'sit ', expected: false, actual: false },
    { text: 'voluptatem ', expected: true, actual: true },
    { text: 'accusantium ', expected: false, actual: false },
    { text: 'doloremque ', expected: true, actual: false },
    { text: 'laudantium, ', expected: true, actual: true },
    { text: 'totam ', expected: false, actual: false },
    { text: 'rem ', expected: true, actual: true },
    { text: 'aperiam, ', expected: false, actual: false },
    { text: 'eaque ', expected: true, actual: false },
    { text: 'ipsa ', expected: false, actual: false },
    { text: 'quae ', expected: true, actual: true },
    { text: 'ab ', expected: false, actual: false },
    { text: 'illo ', expected: true, actual: false },
    { text: 'inventore ', expected: true, actual: true },
    { text: 'veritatis ', expected: false, actual: false },
    { text: 'et ', expected: false, actual: false },
    { text: 'quasi ', expected: true, actual: true },
    { text: 'architecto ', expected: true, actual: false },
    { text: 'beatae ', expected: false, actual: false },
    { text: 'vitae ', expected: true, actual: true },
    { text: 'dicta ', expected: false, actual: false },
    { text: 'sunt ', expected: true, actual: false },
    { text: 'explicabo. ', expected: false, actual: false },
    { text: 'Nemo ', expected: true, actual: true },
    { text: 'enim ', expected: false, actual: false },
    { text: 'ipsam ', expected: true, actual: false },
    { text: 'voluptatem ', expected: true, actual: true },
    { text: 'quia ', expected: false, actual: false },
    { text: 'voluptas ', expected: true, actual: false },
    { text: 'sit ', expected: false, actual: false },
    { text: 'aspernatur ', expected: true, actual: true },
    { text: 'aut ', expected: false, actual: false },
    { text: 'odit ', expected: true, actual: false },
    { text: 'aut ', expected: false, actual: false },
    { text: 'fugit, ', expected: true, actual: true },
    { text: 'sed ', expected: false, actual: false },
    { text: 'quia ', expected: true, actual: true },
    { text: 'consequuntur ', expected: false, actual: false },
    { text: 'magni ', expected: true, actual: true },
    { text: 'dolores ', expected: false, actual: false },
    { text: 'eos ', expected: true, actual: false },
    { text: 'qui ', expected: false, actual: false },
    { text: 'ratione ', expected: true, actual: true },
    { text: 'voluptatem ', expected: true, actual: false },
    { text: 'sequi ', expected: false, actual: false },
    { text: 'nesciunt. ', expected: true, actual: true },
    { text: 'Neque ', expected: true, actual: true },
    { text: 'porro ', expected: false, actual: false },
    { text: 'quisquam ', expected: true, actual: false },
    { text: 'est, ', expected: false, actual: false },
    { text: 'qui ', expected: true, actual: true },
    { text: 'dolorem ', expected: true, actual: false },
    { text: 'ipsum ', expected: false, actual: false },
    { text: 'quia ', expected: true, actual: true },
    { text: 'dolor ', expected: false, actual: false },
    { text: 'sit ', expected: true, actual: false },
    { text: 'amet, ', expected: true, actual: true },
    { text: 'consectetur, ', expected: false, actual: false },
    { text: 'adipisci ', expected: true, actual: false },
    { text: 'velit, ', expected: false, actual: false },
    { text: 'sed ', expected: true, actual: true },
    { text: 'quia ', expected: false, actual: false },
    { text: 'non ', expected: true, actual: false },
    { text: 'numquam ', expected: true, actual: true },
    { text: 'eius ', expected: false, actual: false },
    { text: 'modi ', expected: true, actual: true },
    { text: 'tempora ', expected: false, actual: false },
    { text: 'incidunt ', expected: true, actual: true },
    { text: 'ut ', expected: false, actual: false },
    { text: 'labore ', expected: true, actual: false },
    { text: 'et ', expected: false, actual: false },
    { text: 'dolore ', expected: true, actual: true },
    { text: 'magnam ', expected: true, actual: false },
    { text: 'aliquam ', expected: false, actual: false },
    { text: 'quaerat ', expected: true, actual: true },
    { text: 'voluptatem. ', expected: false, actual: false },
    { text: 'Ut ', expected: false, actual: false },
    { text: 'enim ', expected: true, actual: true },
    { text: 'ad ', expected: false, actual: false },
    { text: 'minima ', expected: true, actual: false },
    { text: 'veniam, ', expected: true, actual: true },
    { text: 'quis ', expected: false, actual: false },
    { text: 'nostrum ', expected: true, actual: true },
    { text: 'exercitationem ', expected: false, actual: false },
    { text: 'ullam ', expected: true, actual: true },
    { text: 'corporis ', expected: false, actual: false },
    { text: 'suscipit ', expected: true, actual: false },
    { text: 'laboriosam, ', expected: false, actual: false },
    { text: 'nisi ', expected: true, actual: true },
    { text: 'ut ', expected: false, actual: false },
    { text: 'aliquid ', expected: true, actual: false },
    { text: 'ex ', expected: false, actual: false },
    { text: 'ea ', expected: true, actual: true },
    { text: 'commodi ', expected: false, actual: false },
    { text: 'consequatur? ', expected: true, actual: false },
    { text: 'Quis ', expected: true, actual: true },
    { text: 'autem ', expected: false, actual: false },
    { text: 'vel ', expected: true, actual: false },
    { text: 'eum ', expected: false, actual: false },
    { text: 'iure ', expected: true, actual: true },
    { text: 'reprehenderit ', expected: true, actual: true },
    { text: 'qui ', expected: false, actual: false },
    { text: 'in ', expected: false, actual: false },
    { text: 'ea ', expected: true, actual: false },
    { text: 'voluptate ', expected: false, actual: false },
    { text: 'velit ', expected: true, actual: true },
    { text: 'esse ', expected: false, actual: false },
    { text: 'quam ', expected: true, actual: true },
    { text: 'nihil ', expected: false, actual: false },
    { text: 'molestiae ', expected: true, actual: false },
    { text: 'consequatur, ', expected: false, actual: false },
    { text: 'vel ', expected: true, actual: true },
    { text: 'illum ', expected: false, actual: false },
    { text: 'qui ', expected: true, actual: true },
    { text: 'dolorem ', expected: false, actual: false },
    { text: 'eum ', expected: true, actual: false },
    { text: 'fugiat ', expected: false, actual: false },
    { text: 'quo ', expected: true, actual: true },
    { text: 'voluptas ', expected: false, actual: false },
    { text: 'nulla ', expected: true, actual: false },
    { text: 'pariatur? ', expected: false, actual: false },
    { text: 'At ', expected: true, actual: true },
    { text: 'vero ', expected: false, actual: false },
    { text: 'eos ', expected: true, actual: false },
    { text: 'et ', expected: false, actual: false },
    { text: 'accusamus ', expected: true, actual: true },
    { text: 'et ', expected: false, actual: false },
    { text: 'iusto ', expected: true, actual: true },
    { text: 'odio ', expected: false, actual: false },
    { text: 'dignissimos ', expected: true, actual: false },
    { text: 'ducimus ', expected: false, actual: false },
    { text: 'qui ', expected: true, actual: true },
    { text: 'blanditiis ', expected: true, actual: false },
    { text: 'praesentium ', expected: false, actual: false },
    { text: 'voluptatum ', expected: true, actual: true },
    { text: 'deleniti ', expected: false, actual: false },
    { text: 'atque ', expected: true, actual: true },
    { text: 'corrupti ', expected: false, actual: false },
    { text: 'quos ', expected: true, actual: false },
    { text: 'dolores ', expected: true, actual: true },
    { text: 'et ', expected: false, actual: false },
    { text: 'quas ', expected: true, actual: false },
    { text: 'molestias ', expected: false, actual: false },
    { text: 'excepturi ', expected: true, actual: true },
    { text: 'sint ', expected: false, actual: false },
    { text: 'occaecati ', expected: true, actual: true },
    { text: 'cupiditate ', expected: true, actual: false },
    { text: 'non ', expected: false, actual: false },
    { text: 'provident, ', expected: true, actual: false },
    { text: 'similique ', expected: false, actual: false },
    { text: 'sunt ', expected: true, actual: true },
    { text: 'in ', expected: false, actual: false },
    { text: 'culpa ', expected: true, actual: false },
    { text: 'qui ', expected: false, actual: false },
    { text: 'officia ', expected: true, actual: true },
    { text: 'deserunt ', expected: false, actual: false },
    { text: 'mollitia ', expected: true, actual: true },
    { text: 'animi, ', expected: false, actual: false },
    { text: 'id ', expected: true, actual: false },
    { text: 'est ', expected: false, actual: false },
    { text: 'laborum ', expected: true, actual: true },
    { text: 'et ', expected: false, actual: false },
    { text: 'dolorum ', expected: true, actual: false },
    { text: 'fuga. ', expected: false, actual: false },
    { text: 'Et ', expected: true, actual: true },
    { text: 'harum ', expected: false, actual: false },
    { text: 'quidem ', expected: true, actual: false },
    { text: 'rerum ', expected: false, actual: false },
    { text: 'facilis ', expected: true, actual: true },
    { text: 'est ', expected: true, actual: false },
    { text: 'et ', expected: false, actual: false },
    { text: 'expedita ', expected: true, actual: true },
    { text: 'distinctio. ', expected: false, actual: false },
    { text: 'Nam ', expected: true, actual: true },
    { text: 'libero ', expected: false, actual: false },
    { text: 'tempore, ', expected: true, actual: true },
    { text: 'cum ', expected: false, actual: false },
    { text: 'soluta ', expected: true, actual: false },
    { text: 'nobis ', expected: true, actual: true },
    { text: 'est ', expected: false, actual: false },
    { text: 'eligendi ', expected: true, actual: false },
    { text: 'optio ', expected: false, actual: false },
    { text: 'cumque ', expected: true, actual: true },
    { text: 'nihil ', expected: false, actual: false },
    { text: 'impedit ', expected: true, actual: false },
    { text: 'quo ', expected: false, actual: false },
    { text: 'minus ', expected: true, actual: true },
    { text: 'id ', expected: false, actual: false },
    { text: 'quod ', expected: true, actual: true },
    { text: 'maxime ', expected: false, actual: false },
    { text: 'placeat ', expected: true, actual: true },
    { text: 'facere ', expected: false, actual: false },
    { text: 'possimus, ', expected: true, actual: false },
    { text: 'omnis ', expected: false, actual: false },
    { text: 'voluptas ', expected: true, actual: true },
    { text: 'assumenda ', expected: false, actual: false },
    { text: 'est, ', expected: true, actual: false },
    { text: 'omnis ', expected: false, actual: false },
    { text: 'dolor ', expected: true, actual: true },
    { text: 'repellendus. ', expected: false, actual: false },
    { text: 'Temporibus ', expected: true, actual: false },
    { text: 'autem ', expected: false, actual: false },
    { text: 'quibusdam ', expected: true, actual: true },
    { text: 'et ', expected: false, actual: false },
    { text: 'aut ', expected: true, actual: false },
    { text: 'officiis ', expected: false, actual: false },
    { text: 'debitis ', expected: true, actual: true },
    { text: 'aut ', expected: false, actual: false },
    { text: 'rerum ', expected: true, actual: false },
    { text: 'necessitatibus ', expected: false, actual: false },
    { text: 'saepe ', expected: true, actual: true },
    { text: 'eveniet ', expected: true, actual: false },
    { text: 'ut ', expected: false, actual: false },
    { text: 'et ', expected: true, actual: true },
    { text: 'voluptates ', expected: false, actual: false },
    { text: 'repudiandae ', expected: true, actual: true },
    { text: 'sint ', expected: false, actual: false },
    { text: 'et ', expected: true, actual: false },
    { text: 'molestiae ', expected: false, actual: false },
    { text: 'non ', expected: true, actual: true },
    { text: 'recusandae. ', expected: false, actual: false },
    { text: 'Itaque ', expected: true, actual: true },
    { text: 'earum ', expected: false, actual: false },
    { text: 'rerum ', expected: true, actual: false },
    { text: 'hic ', expected: false, actual: false },
    { text: 'tenetur ', expected: true, actual: true },
    { text: 'a ', expected: false, actual: false },
    { text: 'sapiente ', expected: true, actual: false },
    { text: 'delectus, ', expected: false, actual: false },
    { text: 'ut ', expected: true, actual: true },
    { text: 'aut ', expected: false, actual: false },
    { text: 'reiciendis ', expected: true, actual: false },
    { text: 'voluptatibus ', expected: false, actual: false },
    { text: 'maiores ', expected: true, actual: true },
    { text: 'alias ', expected: false, actual: false },
    { text: 'consequatur ', expected: true, actual: false },
    { text: 'aut ', expected: false, actual: false },
    { text: 'perferendis ', expected: true, actual: true },
    { text: 'doloribus ', expected: false, actual: false },
    { text: 'asperiores ', expected: true, actual: true },
    { text: 'repellat.', expected: false, actual: false }
  ]
};

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>
}

function Intonation({ containerRef }: Props) {
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
          description={data.title as 'Elementary'}
          diameter={isMobile ? '150px' : '200px'}
          thickness={isMobile ? '8px' : '11px'}
          fontSize={isMobile ? '1rem' : '1.25rem'}
        />
        <h3>Your intonation is <strong>{data.title}</strong>.</h3>
        <h4>{data.description}</h4>
      </div>

      <div className={lstyles.container}>
        <Transcript>
          <div className={tstyles.pane1}>
            <div className={tstyles.header}>Transcript</div>
            {data.transcript.map((word, i) => (
              <span key={i} className={tstyles.word}>
                {word.expected !== word.actual ? (
                  <button
                    className={tstyles.red}
                    onClick={() => selectActiveIndex(i)}
                    ref={activeIndex === i ? targetRef: null}
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
          </div>
          {activeWord.expected ? 'Make sure you say this word with more energy. It was too soft!' : 'You incorrectly emphasized this word. Say it softly next time!'}
        </PopOver>
      )}
    </>
  );
}

export default Intonation;