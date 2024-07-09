import type { PostResolved } from "@semicolon/api/schema";
import { AspectRatio } from "@semicolon/ui/aspect-ratio";
import { Separator } from "@semicolon/ui/separator";
import { cn } from "@semicolon/ui/utils";
import Image from "next/image";
import Link from "next/link";

export function ThumbGrid({
  className,
  id,
  media,
  username,
}: PostResolved & Omit<React.HTMLAttributes<HTMLDivElement>, "content">) {
  if (media.length === 0) {
    throw new Error(`ThumbGrid must be supplied at least one image URL.`);
  }

  switch (media.length) {
    case 1:
      return (
        <div className={cn("w-full overflow-hidden rounded-lg", className)}>
          {media.map((src, i) => (
            <AspectRatio ratio={4 / 3} className="bg-muted w-full" key={i}>
              <Link
                href={`/${username}/post/${id}/photo/${i + 1}`}
                onClick={(e) => e.stopPropagation()}
                scroll={false}
              >
                <Image
                  src={src}
                  alt={`${username}'s image (${i + 1})`}
                  fill
                  sizes="(max-width: 768px) 75vw, (max-width: 1024px) 50vw, (max-width: 1280px) 40vw, 35vw"
                  className="rounded-md object-cover"
                />
              </Link>
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
          {media.map((src, i) => (
            <>
              <AspectRatio ratio={3 / 2} className="bg-muted w-full" key={i}>
                <Link
                  href={`/${username}/post/${id}/photo/${i + 1}`}
                  onClick={(e) => e.stopPropagation()}
                  scroll={false}
                >
                  <Image
                    src={src}
                    alt={`${username}'s image (${i + 1})`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </Link>
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
            <Link
              href={`/${username}/post/${id}/photo/1`}
              onClick={(e) => e.stopPropagation()}
              scroll={false}
            >
              <Image
                src={media[0]!} // eslint-disable-line @typescript-eslint/no-non-null-assertion
                alt={`${username}'s image (1)`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </Link>
          </AspectRatio>
          <Separator orientation="vertical" />
          <AspectRatio ratio={4 / 3} className="bg-muted w-full">
            <div className="flex flex-col">
              {media.slice(1).map((src, i) => (
                <>
                  <AspectRatio
                    ratio={4 / 3}
                    className="bg-muted w-full"
                    key={i}
                  >
                    <Link
                      href={`/${username}/post/${id}/photo/${i + 2}`}
                      onClick={(e) => e.stopPropagation()}
                      scroll={false}
                    >
                      <Image
                        src={src}
                        alt={`${username}'s image (${i + 2})`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </Link>
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
            "flex w-full flex-col overflow-hidden rounded-lg",
            className,
          )}
        >
          <AspectRatio ratio={2} className="bg-muted w-full">
            <div className="flex flex-row">
              {media.slice(0, 2).map((src, i) => (
                <>
                  <AspectRatio ratio={1} className="bg-muted h-full" key={i}>
                    <Link
                      href={`/${username}/post/${id}/photo/${i + 1}`}
                      onClick={(e) => e.stopPropagation()}
                      scroll={false}
                    >
                      <Image
                        src={src}
                        alt={`${username}'s image (${i + 1})`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </Link>
                  </AspectRatio>
                  {i === 0 && <Separator orientation="vertical" />}
                </>
              ))}
            </div>
          </AspectRatio>
          <Separator orientation="horizontal" />
          <AspectRatio ratio={2} className="bg-muted w-full">
            <div className="flex flex-row">
              {media.slice(2, 4).map((src, i) => (
                <>
                  <AspectRatio ratio={1} className="bg-muted h-full" key={i}>
                    <Link
                      href={`/${username}/post/${id}/photo/${i + 3}`}
                      onClick={(e) => e.stopPropagation()}
                      scroll={false}
                    >
                      <Image
                        src={src}
                        alt={`${username}'s image (${i + 3})`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </Link>
                  </AspectRatio>
                  {i === 0 && <Separator orientation="vertical" />}
                </>
              ))}
            </div>
          </AspectRatio>
        </div>
      );
  }
}
