import { useEffect, useRef } from "react";

function Image({ url }) {
  const imageRef = useRef(null);

  const onIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      imageRef.current.src = url;
    }
  };

  useEffect(() => {
    const { current } = imageRef;

    var observer = new IntersectionObserver(onIntersection, {
      root: null, // default is the viewport
      threshold: 0.5 // percentage of target's visible area. Triggers "onIntersection" on 50% of target i.e 100px
    });

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [imageRef]);

  return <img ref={imageRef} height="200px" width="200px" alt="sample" />;
}

function ImageGallery({ images }) {
  return (
    <div 
      style={{
        display: "grid",
        gridTemplateColumns: "auto auto auto",
        justifyContent: "center",
        gap: "10px"
      }}
    >
      {images.map((image, idx) => (
        <Image key={idx} url={image} />
      ))}
    </div>
  );
}

export default ImageGallery;

