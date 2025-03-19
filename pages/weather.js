import { useState } from 'react';

const WeatherPage = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        if (!city) {
            setError("Masukkan nama kota!");
            return;
        }

        setLoading(true);
        setError(null);
        setWeather(null);

        try {
            const response = await fetch(`/api/weather?city=${city}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Kota tidak ditemukan");
            }

            setWeather(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Informasi Cuaca</h1>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Masukkan nama kota..."
                style={{ padding: '10px', marginRight: '10px' }}
            />
            <button onClick={fetchWeather} style={{ padding: '10px' }}>Cari</button>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {weather && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '20px', display: 'inline-block' }}>
                    <h2>{weather.name}, {weather.sys.country}</h2>
                    <p>Suhu: {weather.main.temp}°C</p>
                    <p>Kelembaban: {weather.main.humidity}%</p>
                    <p>Kecepatan Angin: {weather.wind.speed} m/s</p>
                    <p>Kondisi: {weather.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherPage;