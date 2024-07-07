import { AspectRatio } from "@semicolon/ui/aspect-ratio";
import { Separator } from "@semicolon/ui/separator";
import { cn } from "@semicolon/ui/utils";
import Image from "next/image";

export function ThumbGrid({
  className,
  srcs,
}: React.HTMLAttributes<HTMLDivElement> & {
  srcs: string[];
}) {
  if (srcs.length === 0) {
    throw new Error(`ThumbGrid must be supplied at least one image URL.`);
  }

  switch (srcs.length) {
    case 1:
      return (
        <div className={cn("w-full overflow-hidden rounded-lg", className)}>
          {srcs.map((src, i) => (
            <AspectRatio ratio={4 / 3} className="bg-muted w-full" key={i}>
              <Image
                src={src}
                alt="Photo by Drew Beamer"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-md object-cover"
              />
            </AspectRatio>
          ))}
        </div>
      );
    case 2:
      return (
        <div
          className={cn(
            "flex w-full flex-row overflow-hidden rounded-lg",
            className,
          )}
        >
          {srcs.map((src, i) => (
            <>
              <AspectRatio ratio={3 / 2} className="bg-muted w-full" key={i}>
                <Image
                  src={src}
                  alt="Photo by Drew Beamer"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </AspectRatio>
              {i === 0 && <Separator orientation="vertical" />}
            </>
          ))}
        </div>
      );
    case 3:
      return (
        <div
          className={cn(
            "flex w-full flex-row overflow-hidden rounded-lg",
            className,
          )}
        >
          <AspectRatio ratio={4 / 3} className="bg-muted w-full">
            <Image
              src={srcs[0]!} // eslint-disable-line @typescript-eslint/no-non-null-assertion
              alt="Photo by Drew Beamer"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </AspectRatio>
          <Separator orientation="vertical" />
          <AspectRatio ratio={4 / 3} className="bg-muted w-full">
            <div className="flex flex-col">
              {srcs.slice(1).map((src, i) => (
                <>
                  <AspectRatio
                    ratio={4 / 3}
                    className="bg-muted w-full"
                    key={i}
                  >
                    <Image
                      src={src}
                      alt="Photo by Drew Beamer"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </AspectRatio>
                  {i === 0 && <Separator />}
                </>
              ))}
            </div>
          </AspectRatio>
        </div>
      );
    default:
      return (
        <div
          className={cn(
            "flex w-full flex-row overflow-hidden rounded-lg",
            className,
          )}
        >
          <AspectRatio ratio={4 / 3} className="bg-muted w-full">
            <div className="flex flex-col">
              {srcs.slice(0, 2).map((src, i) => (
                <>
                  <AspectRatio
                    ratio={4 / 3}
                    className="bg-muted w-full"
                    key={i}
                  >
                    <Image
                      src={src}
                      alt="Photo by Drew Beamer"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </AspectRatio>
                  {i === 0 && <Separator />}
                </>
              ))}
            </div>
          </AspectRatio>
          <Separator orientation="vertical" />
          <AspectRatio ratio={4 / 3} className="bg-muted w-full">
            <div className="flex flex-col">
              {srcs.slice(2, 4).map((src, i) => (
                <>
                  <AspectRatio
                    ratio={4 / 3}
                    className="bg-muted w-full"
                    key={i}
                  >
                    <Image
                      src={src}
                      alt="Photo by Drew Beamer"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </AspectRatio>
                  {i === 0 && <Separator />}
                </>
              ))}
            </div>
          </AspectRatio>
        </div>
      );
  }
}
