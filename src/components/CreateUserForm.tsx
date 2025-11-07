'use client';

import { useState } from "react";

export default function CreateUserForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setMessage('')

        const res = await fetch('/api/admin/createUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        })

        const data = await res.json()
        if (res.ok) {
            setMessage(`User "${username}" created!`)
            setUsername('')
            setPassword('')
        } else {
            setMessage(`Error: ${data.error}`)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-3xl shadow-2xl max-w-sm m-auto p-3">
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-2"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-2"
                required
            />
            <button type="submit" className=" mx-auto py-1 px-2 rounded-xl size-fit hover:bg-gray-400">Add User</button>
            {message && <p>{message}</p>}
        </form>
    );
}