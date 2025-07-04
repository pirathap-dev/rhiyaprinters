export const uploadToImgBB = async (file) => {
  const apiKey = "11de4658f6b8ca8df0592a631b46a634"; 
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.data.url;
};
