import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const UserDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!router.isReady || !id) return;

        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/users?id=${id}`);
                if (!response.ok) {
                    throw new Error('User not found');
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [router.isReady, id]);

    if (loading) return <p>Loading...</p>;

    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <p>{error}</p>
                <Link href="/users">Kembali ke Daftar Pengguna</Link>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <h1>Pengguna Tidak Ditemukan</h1>
                <Link href="/users">Kembali ke Daftar Pengguna</Link>
            </div>
        );
    }

    return (
        <div>
            <h1>Detail Pengguna</h1>
            <p><strong>Nama:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <Link href="/users">Kembali ke Daftar Pengguna</Link>
        </div>
    );
};

export default UserDetail;