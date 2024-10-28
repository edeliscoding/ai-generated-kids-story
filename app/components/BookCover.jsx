import React from "react";
import Image from "next/image";

function BookCover({ imageUrl }) {
  return (
    <div>
      <Image src={imageUrl} alt="cover" width={500} height={500} />
    </div>
  );
}

export default BookCover;
