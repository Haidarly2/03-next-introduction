export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        if (id) {
            const user = users.find((u) => u.id.toString() === id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        }

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}