const { createClient } = require('@supabase/supabase-js')

const url = process.env.SUPABASE_URL
const publishable_key = process.env.SUPABASE_PUBLISHABLE_KEY

if (!url || !publishable_key) {
    throw new Error("Configure o .env!")
}

const supabase = createClient(url, publishable_key, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
    },
})

module.exports = supabase;