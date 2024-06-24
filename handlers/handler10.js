const handler10 = (data) => {
  const processData = data.toString().toUpperCase();
  return Buffer.from(processData);
};

export default handler10;
