"use server";

import { faker } from "@faker-js/faker";
import { put } from "@vercel/blob";
import _ from "lodash";
import { revalidatePath } from "next/cache";

export async function uploadMedia(formData: FormData) {
  const media = formData.get("media") as File;
  if (process.env.NODE_ENV === "production") {
    const blob = await put(media.name, media, {
      access: "public",
    });

    revalidatePath("/");

    return blob;
  } else {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const url = faker.image.urlPicsumPhotos({
      width: _.random(800, 1600),
      height: _.random(800, 1600),
    });

    return {
      pathname: `profilesv1/${media.name}`,
      contentType: media.type,
      contentDisposition: `attachment; filename="${media.name}"`,
      url,
      downloadUrl: url,
    };
  }
}
