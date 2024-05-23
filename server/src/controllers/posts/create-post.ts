import { supabase } from "@/lib/supabaseClient";
import { HttpStatusCode } from "@/types";
import { User } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { Request, Response } from "express";

export async function createPost(req: Request, res: Response) {
  try {
    const user = req.user as User;
    const space = req.locals.space;

    const { title, body, tag } = req.body as {
      title: string;
      body: string;
      tag: string;
    };

    console.log("body", req.body);
    // Check if the title is empty
    if (!title) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: "Post title is required" });
    }

    // random likes count
    const likes = Math.floor(Math.random() * 20000);

    // create a new post
    const post = await supabase
      .from("posts")
      .insert([
        {
          title,
          body,
          tag_id: +tag || null,
          space_id: space.id as number,
          creator: user.id,
          likes,
        },
      ])
      .select("id")
      .single();

    if (post.error) throw post.error;

    if (req.files) {
      const images = req.files as Express.Multer.File[];

      console.log("images", images);

      // upload images to storage
      const uploadedImages = await uploadImagesToStorage(
        images,
        user,
        post.data.id
      );

      // insert the images in the database
      await insertImagesToPost(uploadedImages, post.data.id, user);
    }

    return res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.error("Error creating space:", error);

    if (error.code) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      error: "Internal server error. Could not create space",
    });
  }
}

// helper functions to upload images to the database

async function uploadImagesToStorage(
  files: Express.Multer.File[],
  user: User,
  postID: number
) {
  const images = files;

  const uploadedImagesUrls = [];

  for (const image of images) {
    // convert the image buffer to base64
    const fileBase64 = decode(image.buffer.toString("base64"));

    // generate a random file name
    const fileName = generateRandomFileName(image.originalname);

    const { data: imageData, error: imageError } = await supabase.storage
      .from("images")
      .upload(`${user.id}/${fileName}`, fileBase64, {
        contentType: image.mimetype,
      });

    if (imageError) {
      // delete the post if there is an error
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postID)
        .eq("creator", user.id);

      if (error) {
        console.error("Error deleting post:", error);
      }

      throw imageError;
    }

    // get public url of the uploaded file
    const { data: uploadedImage } = supabase.storage
      .from("images")
      .getPublicUrl(imageData.path);

    uploadedImagesUrls.push(uploadedImage.publicUrl);
  }

  return uploadedImagesUrls;
}

async function insertImagesToPost(
  images: string[],
  postID: number,
  user: User
) {
  const imagesData = images.map((image) => {
    return { post_id: postID, url: image, user_id: user.id };
  });

  const { error } = await supabase.from("images").insert(imagesData);

  if (error) {
    // delete the post if there is an error
    const { error } = await supabase.from("posts").delete().eq("id", postID);

    if (error) {
      console.error("Error deleting post:", error);
    }

    throw error;
  }
}

function generateRandomFileName(name: Express.Multer.File["originalname"]) {
  const fileExt = name.split(".").pop();
  const fileName = name.split(".")[0];
  return fileName + Math.floor(Math.random() * 100) + "." + fileExt;
}
