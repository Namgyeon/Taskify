import clsx from "clsx";
import Image from "next/image";

type FeatureCardProps = {
  point: number;
  title: string;
  imgSrc: string;
  reverse?: boolean;
};

const FeatureCard = ({
  point,
  title,
  imgSrc,
  reverse = false,
}: FeatureCardProps) => (
  <article
    className={clsx(
      `flex flex-col lg:flex-row lg:justify-between gap-48 lg:gap-0 rounded-lg bg-[#171717]`,
      reverse && `lg:flex-row-reverse`
    )}
  >
    <div className="flex flex-col lg:flex-1/2 gap-15 pt-15 md:p-15 items-center md:items-start">
      <p className="text-2lg font-medium text-[#9FA6B2]">Point {point}</p>
      <h2 className="text-4xl font-bold text-center md:text-left text-white whitespace-pre-line">
        {title}
      </h2>
    </div>
    <div className="p-6 md:pl-38 lg:p-0 lg:flex-1/2">
      <Image
        src={imgSrc}
        alt={`기능이미지${point}`}
        width={600}
        height={500}
        className="w-full h-auto"
      />
    </div>
  </article>
);

const Feature = () => {
  return (
    <div className="flex flex-col gap-13">
      <FeatureCard
        point={1}
        title={`일의 우선순위를
          관리하세요`}
        imgSrc="/landing/feature-1.svg"
      />
      <FeatureCard
        point={2}
        title={`해야 할 일을
          등록하세요`}
        imgSrc="/landing/feature-2.svg"
        reverse={true}
      />
    </div>
  );
};

export default Feature;
