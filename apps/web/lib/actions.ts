"use server";

import { faker } from "@faker-js/faker";
import { auth } from "@semicolon/auth";
import { PutBlobResult, put } from "@vercel/blob";
import _ from "lodash";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function uploadMedia(
  formData: FormData,
): Promise<PutBlobResult | null> {
  if (!(await auth())) {
    redirect("/flow/signup");
  }

  const media = formData.get("media") as File | null;

  if (!(media instanceof File)) {
    return null;
  }

  if (process.env.NODE_ENV === "production") {
    try {
      const blob = await put(media.name, media, {
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
