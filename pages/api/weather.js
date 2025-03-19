export default async function handler(req, res) {
    const API_KEY = "79db8a13ce9266f8df4ff80da7bd3d95";  // Simpan API Key di sini
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: "Kota harus diisi!" });
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        const data = await response.json();

        if (response.status !== 200) {
            return res.status(response.status).json({ error: data.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Terjadi kesalahan pada server!" });
    }
}