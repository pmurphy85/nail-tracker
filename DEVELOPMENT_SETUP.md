# 🔧 Development Setup Guide

This guide will help you set up the NailTracker development environment on multiple computers.

## 📋 Quick Setup Checklist

### **One-Time Setup (Per Computer):**

- [ ] Install Node.js 20+
- [ ] Install Java JDK 17
- [ ] Install Android Studio
- [ ] Configure Android SDK
- [ ] Set environment variables
- [ ] Clone repository
- [ ] Install dependencies

### **Daily Development:**

- [ ] `git pull origin main`
- [ ] `npm install` (if package.json changed)
- [ ] Make your changes
- [ ] Test on device/emulator
- [ ] Commit and push changes

## 🖥️ Computer-Specific Setup

### **Office Desktop Setup:**
Current Status: ✅ **Primary Development Machine**
- Location: `C:\Users\marke\Desktop\Coding Projects\Claude Code\NailTracker`
- Git configured and initialized
- Ready for GitHub push

### **Bedroom Laptop Setup:**
Status: ⏳ **Pending Setup**

Follow these steps on your laptop:

1. **Install Prerequisites:**
   ```bash
   # Download and install:
   # - Node.js 20+ from https://nodejs.org/
   # - JDK 17 from Oracle
   # - Android Studio from https://developer.android.com/studio
   ```

2. **Configure Environment Variables:**
   ```bash
   # Add to Windows Environment Variables:
   ANDROID_HOME = C:\Users\[YOUR_USERNAME]\AppData\Local\Android\Sdk
   JAVA_HOME = C:\Program Files\Java\jdk-17

   # Add to PATH:
   %ANDROID_HOME%\platform-tools
   %ANDROID_HOME%\tools
   %ANDROID_HOME%\tools\bin
   ```

3. **Clone Repository:**
   ```bash
   git clone https://github.com/[YOUR_USERNAME]/nail-tracker.git
   cd nail-tracker
   npm install
   ```

## 🔄 Multi-Computer Workflow

### **Switching Between Computers:**

#### **Before Leaving Current Computer:**
```bash
# Save all changes
git add .
git commit -m "feat: describe what you worked on"
git push origin main
```

#### **Starting Work on Different Computer:**
```bash
# Get latest changes
git pull origin main

# Install any new dependencies
npm install

# Check environment
npx react-native doctor

# Start development
npx react-native run-android
```

### **Best Practices:**

1. **Always commit before switching computers**
2. **Use descriptive commit messages**
3. **Pull before starting work**
4. **Test on both devices regularly**
5. **Keep README updated with any setup changes**

## 🚨 Troubleshooting by Computer

### **Common Issues on Windows:**

**ANDROID_HOME not found:**
```bash
# Check if set correctly:
echo %ANDROID_HOME%

# Should output: C:\Users\[USERNAME]\AppData\Local\Android\Sdk
```

**ADB not found:**
```bash
# Add to PATH in System Environment Variables:
%ANDROID_HOME%\platform-tools
```

**Metro bundler won't start:**
```bash
# Clear cache and restart:
npx react-native start --reset-cache
```

**Build errors after pulling:**
```bash
# Clean and rebuild:
cd android
.\gradlew clean
cd ..
npx react-native run-android
```

### **Sync Issues:**

**Merge conflicts:**
```bash
# If you have uncommitted changes and need to pull:
git stash
git pull origin main
git stash pop

# Resolve conflicts in your editor, then:
git add .
git commit -m "fix: resolve merge conflicts"
```

**Different Node.js versions:**
```bash
# Use Node Version Manager if needed
# Install nvm and use consistent Node version
nvm use 20
```

## 📱 Device Testing Strategy

### **Office Desktop:**
- Primary device: [Your phone model]
- Emulator: Pixel 6 API 33

### **Bedroom Laptop:**
- Same device for consistency
- Or secondary test device

### **Testing Checklist:**
- [ ] App launches without crashes
- [ ] Navigation works smoothly
- [ ] Camera opens and captures photos
- [ ] Notifications appear
- [ ] Data persists between app sessions
- [ ] Streak tracking works correctly

## 🔐 Environment Configuration

### **Shared Settings (.env.example):**
- Keep sensitive data out of git
- Use `.env.example` as template
- Each computer has its own `.env` file

### **Computer-Specific Settings:**
```bash
# Office Desktop
DEBUG_MODE=true
DEVICE_NAME=office-desktop

# Bedroom Laptop
DEBUG_MODE=true
DEVICE_NAME=bedroom-laptop
```

## 📋 Development Scripts

Create these shortcuts for common tasks:

### **Windows Batch Scripts (optional):**

**start-dev.bat:**
```batch
@echo off
echo Starting NailTracker development...
cd C:\path\to\nail-tracker
git pull origin main
npm install
npx react-native run-android
```

**commit-push.bat:**
```batch
@echo off
set /p message="Commit message: "
git add .
git commit -m "%message%"
git push origin main
echo Changes pushed successfully!
```

## 📝 Development Log Template

Keep track of what you work on:

```markdown
## [Date] - [Computer]

### What I worked on:
- [ ] Feature/bug description

### Files changed:
- src/screens/[ScreenName].tsx
- src/services/[ServiceName].ts

### Next steps:
- [ ] Todo item 1
- [ ] Todo item 2

### Issues encountered:
- Issue description and solution
```

## 🆘 Emergency Recovery

If something goes wrong:

### **Reset to Last Working State:**
```bash
# Nuclear option - loses uncommitted changes
git reset --hard HEAD
git clean -fd
npm install
```

### **Start Fresh:**
```bash
# Delete local repo and re-clone
cd ..
rmdir /s nail-tracker
git clone https://github.com/[YOUR_USERNAME]/nail-tracker.git
cd nail-tracker
npm install
```

---

## 📞 Getting Help

1. **Check this guide first**
2. **Look at main README.md**
3. **Check GitHub Issues**
4. **Run `npx react-native doctor`**
5. **Google the exact error message**

Remember: The goal is seamless development across your devices! 🚀