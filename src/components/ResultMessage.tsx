export default function ResultMessage({ expression }: { expression: string }) {
  const message: {
    [key: string]: JSX.Element;
  } = {
    angry: (
      <>
        Porque la expresion <span className="text-black">enojada?</span>
      </>
    ),
    disgusted: (
      <>
        Su expresion es <span className="text-black">disgusto.</span>
      </>
    ),
    fearful: (
      <>
        A que le tienes <span className="text-black">miedo?</span>
      </>
    ),
    happy: (
      <>
        Hoy estas <span className="text-black">feliz.</span> Que suerte!
      </>
    ),
    neutral: (
      <>
        Hoy te encuentras <span className="text-black">neutro.</span>
      </>
    ),
    sad: (
      <>
        Hoy te encuentras <span className="text-black">triste.</span>
      </>
    ),
    surprised: (
      <>
        Parece que recibiste una <span className="text-black">sorpresa.</span>
      </>
    ),
  };

  return <>{message[expression]}</>;
}
