import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tool_name, tool_url, category, tagline, free_tier, description, submitter_name, submitter_email } = body;

    // Basic validation
    if (!tool_name || !tool_url || !category || !tagline || !free_tier) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // Insert into tool_submissions table
    const { error } = await supabase
      .from('tool_submissions')
      .insert({
        tool_name,
        tool_url,
        category,
        tagline,
        free_tier,
        description: description ?? null,
        submitter_name: submitter_name ?? null,
        submitter_email: submitter_email ?? null,
        status: 'pending',
      });

    if (error) {
      console.error('[submit-tool API]', error);
      return NextResponse.json(
        { error: 'Failed to save submission. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[submit-tool API] unexpected error:', err);
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    );
  }
}
