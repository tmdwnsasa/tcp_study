const handler11 = (data) => {
  const processData = data.reverse().toString();

  return Buffer.from(processData);
};

export default handler11;
