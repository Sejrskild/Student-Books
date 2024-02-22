import vision from "@google-cloud/vision";

// Returns a string of text labels from an image in base64 format
const getTextLabels = async (image) => {
  const client = new vision.ImageAnnotatorClient();

  const request = {
    image: {
      content: image,
    },
  };

  const [result] = await client.textDetection(request);
  return result.textAnnotations[0].description;
};

export default getTextLabels;
