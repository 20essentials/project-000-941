import data from '@/data/editions-vote.json';
import '@/styles/Votes.css';
import { useEffect, useState, type CSSProperties } from 'react';

import { ButtonFetch } from '@/components/ButtonFetch';
const arrowIcon = '/assets/arrow.png';
const youtubeIcon = '/assets/brand-youtube.svg';
const { length: dataLength } = data;
type ArrayOfArray = Array<Array<string>>;
const MAX_VOTES = 4;
const LAST_INDEX = 12;

export function Votes({ children }: any) {
  const [index, setIndex] = useState(0);
  // const [index, setIndex] = useState(11);
  const [arrayVotes, setArrayVotes] = useState<ArrayOfArray>(
    Array.from({ length: dataLength }, _ => [])
  );

  useEffect(() => {
    const votesFromLocalStorage = localStorage.getItem('eslandVotes');
    if (votesFromLocalStorage) {
      setArrayVotes(JSON.parse(votesFromLocalStorage));
    }
  }, []);

  const { categoryName, candidates, id } = data[index] ?? [];
  let arrayIds = arrayVotes[index];

  useEffect(() => {
    if (index === LAST_INDEX) return;
    function handleKey(event: KeyboardEvent) {
      const { key } = event;
      if (['ArrowRight', 'D', 'd'].includes(key)) {
        addIndex();
      }
      if (['ArrowLeft', 'A', 'a'].includes(key)) {
        restIndex();
      }
    }

    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [index]);

  useEffect(() => {
    addSelectedClass();
  }, [index]);

  useEffect(() => {
    localStorage.setItem('eslandVotes', JSON.stringify(arrayVotes));
  }, [arrayVotes]);

  function addSelectedClass() {
    arrayIds?.forEach((id, index) => {
      const currenCard = document.getElementById(id);
      currenCard?.classList.toggle('selected', true);
      const outputRank = currenCard?.querySelector('.numberOfRank');
      if (outputRank) {
        outputRank.textContent = (index + 1).toString();
      }
    });
  }

  function addIndex() {
    setIndex(prevIndex => prevIndex + 1);
  }

  function handleIndex(num: number) {
    setIndex(num);
  }

  function restIndex() {
    const prevIndex = (index - 1 + dataLength) % dataLength;
    setIndex(prevIndex);
  }

  function handleVote(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const articleElement = e.currentTarget;
    const { id } = articleElement;

    setArrayVotes((prevVotes: ArrayOfArray) => {
      const newArrayVotes = structuredClone(prevVotes);
      if (arrayIds.includes(id) && arrayIds.length < MAX_VOTES + 1) {
        articleElement.classList.remove('selected');
        const newArrayIds = arrayIds.filter(theId => theId !== id);
        return newArrayVotes.with(index, newArrayIds);
      }
      if (arrayIds.length === 4) return newArrayVotes;
      newArrayVotes[index].push(id);
      return newArrayVotes;
    });
  }

  addSelectedClass();

  return (
    <section className='container-total'>
      <h1 className='title'>
        {index !== LAST_INDEX ? (
          categoryName
        ) : (
          <>
            'TUS VOTOS FINALES'
            <ButtonFetch />
          </>
        )}
      </h1>
      <aside className='center'>
        {index === LAST_INDEX ? (
          <FinalVotes
            data={data}
            arrayVotes={arrayVotes}
            handleIndex={handleIndex}
          />
        ) : (
          <Candidates candidates={candidates} handleVote={handleVote} />
        )}
      </aside>
      <aside className='bottom'>
        <h2 className='current-category'>
          {index !== LAST_INDEX && (
            <>
              Categoría <output>{index + 1}</output>/{dataLength}
            </>
          )}
        </h2>

        <aside className='container-arrows'>
          <button onClick={restIndex} className='left-button arrow'>
            <img src={arrowIcon} alt='arrow' />
          </button>
          {index !== LAST_INDEX && (
            <button onClick={addIndex} className='right-button arrow'>
              <img src={arrowIcon} alt='arrow' />
            </button>
          )}
        </aside>
        {children}
      </aside>
    </section>
  );
}

interface Candidate {
  id: string;
  image: string | null;
  link?: string | null;
  name: string;
}
interface CandidatesProps {
  candidates: Candidate[];
  handleVote: (e: React.MouseEvent<HTMLElement>) => void;
}

function Candidates({ candidates, handleVote }: CandidatesProps) {
  return candidates.map(({ id, image, link = '/votes', name }, index) => (
    <article
      key={id}
      className='card'
      id={id}
      onClick={handleVote}
      style={{ '--d': `${index * 0.1}s` } as CSSProperties}
    >
      <img
        className='cardImage'
        src={`/streamer-assets/${image}`}
        alt={name}
      />
      <p className='description'>{name}</p>
      <a href={link ?? '/votes'} className='link videoLink'>
        <img src={youtubeIcon} alt='Youtube Icon' />
      </a>
      <button className='link numVote'>
        <output className='numberOfRank'>{index}</output>
      </button>
    </article>
  ));
}

interface theData {
  categoryName: string;
  id: string;
  candidates: Candidate[];
}

function FinalVotes({
  data,
  arrayVotes,
  handleIndex
}: {
  data: theData[];
  arrayVotes: ArrayOfArray;
  handleIndex: (index: number) => void;
}) {
  return data.map(({ categoryName, candidates, id }, index) => {
    const firstId = arrayVotes[index][0];
    const image = firstId
      ? candidates.find(el => el.id === firstId)?.image
      : 'nothing.avif';

    return (
      <article
        key={id}
        className='card selected'
        id={id}
        onClick={() => handleIndex(index)}
        style={{ '--d': `${index * 0.1}s` } as CSSProperties}
      >
        <img
          className='cardImage'
          src={`/streamer-assets/${image}`}
          alt={categoryName}
        />
        <p className='description'>{categoryName}</p>
      </article>
    );
  });
}
