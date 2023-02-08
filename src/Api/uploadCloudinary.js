export const uploadCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file[0]);
  data.append("upload_preset", "mygifts");
  data.append("api_key", "994582966388659");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dtmhsomgg/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );
  const info = await res.json();
  const src = await info.secure_url;

  return src;
};
