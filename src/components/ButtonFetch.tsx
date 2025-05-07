export function ButtonFetch() {
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
          return;
        }
      })
      .catch(e => {
        alert('Error: We have a lot of Traffic right now 👻');
      });
  }

  return (
    <button className='button' onClick={handleClick}>
      <div className='blob1'></div>
      <div className='blob2'></div>
      <div className='inner'>Envia Tus Votos</div>
    </button>
  );
}
