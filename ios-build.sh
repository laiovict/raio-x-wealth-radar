
#!/bin/bash

# iOS build script for Capacitor
echo "Starting Capacitor iOS build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Install Capacitor iOS
echo "Adding iOS platform..."
npx cap add ios

# Build the project
echo "Building the project..."
npm run build

# Update Capacitor iOS
echo "Updating iOS platform..."
npx cap update ios

# Sync with Capacitor
echo "Syncing with Capacitor..."
npx cap sync ios

# Open Xcode for further configuration
echo "Opening Xcode..."
npx cap open ios

echo "Done! Please configure your app in Xcode and then archive for TestFlight submission."
echo ""
echo "Important steps in Xcode:"
echo "1. Set your Bundle Identifier"
echo "2. Set your Team (Apple Developer account)"
echo "3. Configure signing certificates"
echo "4. Adjust app capabilities as needed"
echo "5. Build and Archive for TestFlight submission"
