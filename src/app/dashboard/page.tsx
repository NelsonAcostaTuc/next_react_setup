import { useEffect } from 'react';

export default function Page() {
  useEffect(() => {
    console.log('Hola mundo');
  }, []);
  return <h1>Hello, Dashboard Page!</h1>;
}
