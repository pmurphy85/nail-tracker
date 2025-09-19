# 💅 NailTracker - Nail Biting Habit Tracker

A comprehensive React Native app designed to help users overcome nail biting habits through streak tracking, progress photos, journaling, and smart pattern recognition.

## 🌟 Features

### **Streak Tracking**
- Daily streak counter with milestone achievements
- Longest streak tracking and encouragement messages
- Visual progress indicators and celebration notifications

### **Smart Photo Progress**
- Camera with hand positioning overlay for consistent shots
- Progress comparison with transparent overlay of previous photos
- Timeline view of all progress photos with analysis
- Automatic progress metrics and improvement tracking

### **Comprehensive Journaling**
- Success/failure/urge tracking with detailed context
- Trigger identification (stress, boredom, anxiety, etc.)
- Location and time-based pattern recognition
- Mood tracking and personalized insights

### **Urge Management**
- Emergency "urge button" with immediate coping strategies
- Smart notifications based on user patterns
- Customizable reminder scheduling
- Breathing exercises and distraction techniques

### **Pattern Recognition**
- AI-powered analysis of triggers and behaviors
- Peak urge time identification
- Location-based risk assessment
- Weekly progress trends and insights

## 🛠️ Tech Stack

- **React Native 0.81.4** with TypeScript
- **React Navigation** for seamless navigation
- **AsyncStorage** for local data persistence
- **React Native Camera** for progress photos
- **React Native Push Notification** for smart reminders
- **React Native Vector Icons** for beautiful UI
- **React Native Linear Gradient** for modern design

## 📋 Prerequisites

### **Required Software:**
- Node.js 20+ ([Download](https://nodejs.org/))
- Java Development Kit (JDK 17) ([Download](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html))
- Android Studio ([Download](https://developer.android.com/studio))
- Git ([Download](https://git-scm.com/))

### **Environment Variables (Windows):**
```bash
ANDROID_HOME = C:\Users\[USERNAME]\AppData\Local\Android\Sdk
JAVA_HOME = C:\Program Files\Java\jdk-17

# Add to PATH:
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\tools
%ANDROID_HOME%\tools\bin
```

### **Environment Variables (macOS/Linux):**
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.jdk/Contents/Home
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

## 🚀 Getting Started

### **1. Clone the Repository**
```bash
git clone https://github.com/[YOUR_USERNAME]/nail-tracker.git
cd nail-tracker
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Setup Android (for Android development)**

#### **Install Android SDK Components:**
1. Open Android Studio
2. Go to **Tools → SDK Manager**
3. Install:
   - Android SDK Platform 33 (API Level 33)
   - Android SDK Build-Tools 33.0.0
   - Android Emulator
   - Android SDK Platform-Tools

#### **Setup Device/Emulator:**

**Option A: Physical Device (Recommended)**
1. Enable **Developer Options** on your Android device
2. Enable **USB Debugging**
3. Connect device via USB
4. Verify connection: `adb devices`

**Option B: Android Emulator**
1. Open Android Studio → **Device Manager**
2. Create virtual device (Pixel 6, API 33)
3. Start the emulator

### **4. Run the App**

#### **For Android:**
```bash
npx react-native run-android
```

#### **For iOS (macOS only):**
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

### **5. Start Metro Bundler (if not started automatically)**
```bash
npx react-native start
```

## 💻 Multi-Computer Development Setup

### **Initial Setup on New Computer:**

1. **Install Prerequisites** (Node.js, JDK, Android Studio)
2. **Clone Repository:**
   ```bash
   git clone https://github.com/[YOUR_USERNAME]/nail-tracker.git
   cd nail-tracker
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Configure Environment Variables** (see Prerequisites section)
5. **Setup Android Studio and SDK**
6. **Run the app:** `npx react-native run-android`

### **Daily Development Workflow:**

#### **Before Starting Work:**
```bash
git pull origin main
npm install  # In case new dependencies were added
```

#### **After Making Changes:**
```bash
git add .
git commit -m "feat: description of changes"
git push origin main
```

#### **Working with Branches (Recommended):**
```bash
# Create and switch to feature branch
git checkout -b feature/new-feature-name

# Make your changes, then:
git add .
git commit -m "feat: implement new feature"
git push origin feature/new-feature-name

# Create Pull Request on GitHub, then merge
```

## 📁 Project Structure

```
nail-tracker/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Main app screens
│   │   ├── HomeScreen.tsx      # Dashboard with streak and quick actions
│   │   ├── ProgressScreen.tsx  # Photo timeline and analytics
│   │   ├── JournalScreen.tsx   # Entry management and insights
│   │   ├── CameraScreen.tsx    # Photo capture with overlay
│   │   └── SettingsScreen.tsx  # App configuration
│   ├── navigation/         # Navigation configuration
│   │   ├── AppNavigator.tsx    # Main navigation setup
│   │   └── TabNavigator.tsx    # Bottom tab navigation
│   ├── services/           # Business logic and data management
│   │   ├── StreakService.ts    # Streak tracking and calculations
│   │   ├── JournalService.ts   # Journal entries and pattern analysis
│   │   ├── PhotoService.ts     # Photo management and storage
│   │   └── NotificationService.ts  # Smart notifications
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts           # App-wide type definitions
│   └── assets/             # Images and static files
├── android/                # Android-specific code
├── ios/                    # iOS-specific code (for future iOS support)
├── App.tsx                 # Main app component
└── package.json           # Dependencies and scripts
```

## 🔧 Key Scripts

```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run tests
npm test

# Lint code
npm run lint

# Check React Native environment
npx react-native doctor
```

## 🐛 Troubleshooting

### **Common Issues:**

**"adb not found" Error:**
- Ensure Android SDK is installed and ANDROID_HOME is set
- Add platform-tools to your PATH

**Metro bundler issues:**
```bash
npx react-native start --reset-cache
```

**Build failures:**
```bash
cd android && ./gradlew clean && cd ..
npx react-native run-android
```

**Dependencies issues:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Platform-Specific Setup:**

**Windows:**
- Use Command Prompt or PowerShell as Administrator
- Ensure Windows Subsystem for Linux (WSL) is not interfering

**macOS:**
- Install Xcode for iOS development
- Use Homebrew for easier dependency management

**Linux:**
- Install Android Studio manually
- Configure PATH variables in ~/.bashrc or ~/.zshrc

## 🎯 Development Guidelines

### **Code Style:**
- Use TypeScript for all new files
- Follow existing naming conventions
- Use absolute imports with @ aliases
- Write descriptive commit messages

### **Git Workflow:**
- Create feature branches for new features
- Use meaningful commit messages with prefixes:
  - `feat:` - new features
  - `fix:` - bug fixes
  - `docs:` - documentation updates
  - `style:` - formatting changes
  - `refactor:` - code refactoring

### **Testing:**
- Test on both physical devices and emulators
- Verify features work across different Android versions
- Test notification permissions and camera access

## 📱 Permissions Required

- **Camera** - For progress photos
- **Storage** - For saving photos locally
- **Notifications** - For habit reminders and encouragement

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the **Troubleshooting** section above
2. Run `npx react-native doctor` to diagnose environment issues
3. Create an issue on GitHub with:
   - Your operating system and version
   - Node.js and React Native versions
   - Complete error messages
   - Steps to reproduce the issue

## 🎉 Acknowledgments

- React Native team for the amazing framework
- All contributors to the open-source libraries used
- The habit-tracking community for inspiration and feedback

---

**Happy coding! 🚀 Let's help people overcome nail biting habits together!**