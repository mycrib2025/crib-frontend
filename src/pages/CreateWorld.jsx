const createWorld = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      api.post("/users/..."),
      {
        name,
        isPrivate,
        stars: layers.stars,
        clouds: layers.clouds,
        aurora: layers.aurora,
        fantasyLevel: layers.fantasy ? 80 : 30,
        dreamIntensity: 50
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("🌍 World created!");
    setName("");
  } catch (err) {
    console.error(err);
    alert("Failed to create world");
  }
};
