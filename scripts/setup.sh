#!/bin/bash

# Setup script for Student Profile App
# This script initializes the Supabase database with the required schema

echo "Setting up Student Profile Database..."
echo ""
echo "Make sure you have:"
echo "1. Connected Supabase integration from the Connect sidebar"
echo "2. Added environment variables to the Vars section"
echo ""
echo "To run the SQL schema, go to the Supabase dashboard and run:"
echo "1. Copy content from scripts/001_create_students_table.sql"
echo "2. Execute it in the Supabase SQL editor"
echo ""
echo "After setup, you can:"
echo "1. Visit http://localhost:3000 to see the student directory"
echo "2. Visit http://localhost:3000/admin/sign-up to create an admin account"
echo "3. Login and manage student profiles from the dashboard"
echo ""
