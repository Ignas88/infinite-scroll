import {useState, useEffect} from 'react';
import '@/App.css';
import {fetchPhotos, type Photo} from '@api/photos';

function App() {
  const [initialPhotos, setInitialPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getInitialPhotos = async () => {
      try {
        const photos = await fetchPhotos({});
        setInitialPhotos(photos);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getInitialPhotos();
  }, []);

  if (isLoading) return 'Loading...';
  if (initialPhotos.length === 0) return 'No Photos';

  return (
    <div>{initialPhotos.map(({src, alt}) => <div style={{width: 300, height: 300}}><img style={{width: '100%', height: '100%'}} src={src.large} alt={alt}/>
    </div>)}
    </div>
  );
}

export default App;
