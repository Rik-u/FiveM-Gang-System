import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
    const { username, password } = await req.json()
    const email = `${username}@example.com` // fake email

    const { data: user, error } = await supabaseAdmin.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: username,
            },
        },
    })

    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    await supabaseAdmin.from('Account').insert({
        uId: user.user!.id,
        username: username,
    })

    return NextResponse.json({ success: true })
}