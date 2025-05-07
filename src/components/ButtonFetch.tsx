interface ButtonProps {
  hiddenButton: () => void
}

export function ButtonFetch({ hiddenButton } : ButtonProps) {

  async function handleClick() {
    const eslandVotes = localStorage.getItem('eslandVotes');
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(eslandVotes)
    };

    fetch('/api/votes', options)
      .then(res => res.text())
      .then(res => {
        if (res === 'ok') {
          alert('Tus Votos fueron Enviados corectamente');
          const $button = document.querySelector('.the-super-ultra-button');
          $button?.classList.add('invisible');
          hiddenButton();
          return;
        }
      })
      .catch(e => {
        alert('Error: We have a lot of Traffic right now 👻');
      });
  }

  return (
    <button className='button the-super-ultra-button' onClick={handleClick}>
      <div className='blob1'></div>
      <div className='blob2'></div>
      <div className='inner'>Envia Tus Votos</div>
    </button>
  );
}
