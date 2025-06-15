// src/lib/supabaseClient.js
import {createClient} from '@supabase/supabase-js'

const supabaseUrl = 'https://erxubvcjrzetozqfzkpg.supabase.co' // вставь сюда свой URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyeHVidmNqcnpldG96cWZ6a3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTY1MDYsImV4cCI6MjA2NTU3MjUwNn0.2Y0kf55MnX0AtNzUlvTvBSU-jt4saltvtL9Drr4HNYY' // вставь сюда свой anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey)