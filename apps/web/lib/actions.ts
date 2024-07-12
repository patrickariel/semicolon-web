"use server";

import { faker } from "@faker-js/faker";
import { auth } from "@semicolon/auth";
import { PutBlobResult, put } from "@vercel/blob";
import imageType from "image-type";
import _ from "lodash";
import { revalidatePath } from "next/cache";

export async function uploadMedia(
  formData: FormData,
): Promise<PutBlobResult | null> {
  if (!(await auth())) {
    return null;
  }

  const media = formData.get("media") as File | null;

  if (!(media instanceof File)) {
    return null;
  } else if (!["image/png", "image/jpeg", "image/webp"].includes(media.type)) {
    return null;
  }

  const arrayBuffer = await media.arrayBuffer();
  const type = await imageType(new Uint8Array(arrayBuffer));

  if (!type) {
    return null;
  } else if (!["image/png", "image/jpeg", "image/webp"].includes(type.mime)) {
    return null;
  }

  if (process.env.NODE_ENV === "production") {
    try {
      const blob = await put(media.name, arrayBuffer, {
        access: "public",
      });

      revalidatePath("/");

      return blob;
    } catch (_) {
      return null;
    }
  } else {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const url = faker.image.urlPicsumPhotos({
      width: _.random(800, 1600),
      height: _.random(800, 1600),
    });

    return _.sample([
      null,
      {
        pathname: `profilesv1/${media.name}`,
        contentType: media.type,
        contentDisposition: `attachment; filename="${media.name}"`,
        url,
        downloadUrl: url,
      },
    ]);
  }
}
