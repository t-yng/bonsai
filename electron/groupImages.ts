import imghash from "imghash";
import leven from "js-levenshtein";
import { Image } from "@common/models/Image";

const SIMILAR_THRESHOLD = 12;

export const groupSimilarImages = async (images: Image[]) => {
  const skip = (groups: Image[][], image: Image) => {
    return groups.find((group) =>
      group.map((img) => img.filePath).includes(image.filePath)
    );
  };

  let groups: Image[][] = [];
  for (let i = 0; i < images.length - 1; i++) {
    const image1 = images[i];
    if (skip(groups, image1)) {
      continue;
    }
    const hash1 = await imghash.hash(image1.filePath);
    const similarImages = [image1];
    for (let j = i + 1; j < images.length; j++) {
      const image2 = images[j];
      if (skip(groups, image2)) {
        continue;
      }
      const hash2 = await imghash.hash(image2.filePath);
      const distance = leven(hash1, hash2);
      if (distance <= SIMILAR_THRESHOLD) {
        similarImages.push(image2);
      }
    }
    groups.push(similarImages);
  }

  return groups;
};
