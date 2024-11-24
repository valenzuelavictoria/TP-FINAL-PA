import React, { useState, useEffect } from 'react';

function Trailers() {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    // Aquí se puede realizar una solicitud para obtener los trailers
    // Simulamos datos con una lista
    setTrailers([{ id: 1, title: 'Trailer 1' }, { id: 2, title: 'Trailer 2' }]);
  }, []);

  return (
    <div>
      <h1>Trailers</h1>
      <ul>
        {trailers.map(trailer => (
          <li key={trailer.id}>{trailer.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Trailers;
