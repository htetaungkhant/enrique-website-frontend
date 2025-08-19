import { cn } from "@/lib/utils";
import { IconButton } from "../common/Button";

const BlogCard = ({
  image,
  title,
  learnMoreHref,
  className,
  titleClassName,
}) => {
  return (
    <div
      className={cn(
        "p-4 lg:px-5 lg:py-6 h-64 lg:h-[22rem] rounded-[2rem] shadow-xl ring ring-[#A5F3CC40] shadow-[#A5F3CC40] flex flex-col justify-between bg-center bg-cover bg-no-repeat overflow-hidden relative",
        className
      )}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent"></div>

      <h2
        className={cn(
          "text-2xl md:text-3xl xl:text-4xl font-bold line-clamp-5 relative",
          titleClassName
        )}
      >
        {title}
      </h2>
      <div className="relative">
        <IconButton
          href={learnMoreHref}
          title="LEARN MORE"
          iconClassName="text-black bg-white rounded-full border-[1px] border-black"
        />
      </div>
    </div>
  );
};

export default BlogCard;
