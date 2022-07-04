router.get('/API_URL', async (req, res) => {
  try {
    const indexs = await Index.find();
    res.send(indexs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
