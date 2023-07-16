npm install
echo "Installing dependencies for backend..."
cd web
echo "Installing dependencies for frontend..."
npm install
echo "Building frontend..."
npm run build
cd ..
echo "Starting..."
npm start